import type { APIRoute } from 'astro';
import {
	applyRateLimitHeaders,
	buildIpEmailIdentifier,
	checkRateLimit,
	getAllowedOrigins,
	getClientIp,
	hashSha256,
	isAllowedOrigin,
	logSecurityEvent,
	maskIp,
	reserveIdempotencyKey,
} from '../../server/security';
import {
	describeConfiguredProviders,
	enqueueRetryPayload,
	maskContactEmail,
	sendWithFailover,
	type ContactPayload,
	type MailProviderName,
} from '../../server/contact-delivery';

const CONTACT_IP_RATE_LIMIT = {
	namespace: 'contact:ip',
	maxRequests: 5,
	windowMs: 10 * 60 * 1000,
} as const;

const CONTACT_IP_EMAIL_RATE_LIMIT = {
	namespace: 'contact:ip-email',
	maxRequests: 3,
	windowMs: 10 * 60 * 1000,
} as const;

const CONTACT_GLOBAL_RATE_LIMIT = {
	namespace: 'contact:global',
	maxRequests: 100,
	windowMs: 60 * 1000,
} as const;

const MAX_BODY_BYTES = 12_000;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_IDEMPOTENCY_KEY_LENGTH = 128;
const MAX_CAPTCHA_TOKEN_LENGTH = 2_000;
const MIN_FORM_FILL_MS = 800;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;
const TURNSTILE_VERIFY_TIMEOUT_MS = 8_000;

export type ContactErrorCode = 'INVALID_CAPTCHA' | 'RATE_LIMITED' | 'UNSUPPORTED_ORIGIN' | 'SEND_FAILED';

type ContactErrorResponse = {
	error: string;
	errorCode: ContactErrorCode;
};

type ContactSuccessResponse = {
	success: true;
	provider: MailProviderName;
};

type ContactQueueAcceptResponse = {
	success: true;
	queued: true;
};

const ALLOWED_CATEGORIES = new Map<string, string>([
	['consultation', 'AI導入の無料相談'],
	['training', '研修・セミナー依頼'],
	['media', '取材・メディア出演'],
	['other', 'その他'],
]);

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const trimAndLimit = (value: unknown, maxLength: number): string => {
	if (typeof value !== 'string') return '';
	return value.trim().slice(0, maxLength);
};

const parsePositiveInt = (value: string | null): number => {
	if (!value) return 0;
	const parsed = Number.parseInt(value, 10);
	return Number.isFinite(parsed) ? parsed : 0;
};

const parseBody = async (request: Request): Promise<Record<string, unknown> | null> => {
	const raw = await request.text();
	const rawBytes = new TextEncoder().encode(raw).length;
	if (!raw || rawBytes > MAX_BODY_BYTES) return null;

	try {
		const parsed = JSON.parse(raw) as unknown;
		if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
		return parsed as Record<string, unknown>;
	} catch {
		return null;
	}
};

const buildJsonResponse = <T>(body: T, status: number, baseHeaders: Headers): Response => {
	const headers = new Headers(baseHeaders);
	return new Response(JSON.stringify(body), { status, headers });
};

const buildErrorResponse = (message: string, status: number, errorCode: ContactErrorCode, baseHeaders: Headers): Response =>
	buildJsonResponse<ContactErrorResponse>({ error: message, errorCode }, status, baseHeaders);

const verifyTurnstileToken = async (token: string, remoteIp: string): Promise<boolean> => {
	const secret = import.meta.env.TURNSTILE_SECRET_KEY?.trim();
	if (!secret || !token) return false;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), TURNSTILE_VERIFY_TIMEOUT_MS);
	try {
		const formBody = new URLSearchParams();
		formBody.set('secret', secret);
		formBody.set('response', token);
		if (remoteIp && remoteIp !== 'unknown') {
			formBody.set('remoteip', remoteIp);
		}

		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: formBody.toString(),
			signal: controller.signal,
		});

		if (!response.ok) return false;
		const data = (await response.json()) as { success?: boolean };
		return data.success === true;
	} finally {
		clearTimeout(timeoutId);
	}
};

export const POST: APIRoute = async ({ request, url }) => {
	const baseHeaders = new Headers({
		'Content-Type': 'application/json; charset=utf-8',
		'Cache-Control': 'no-store',
	});

	const origin = request.headers.get('origin');
	const allowedOrigins = getAllowedOrigins(url);
	if (!isAllowedOrigin(origin, allowedOrigins)) {
		logSecurityEvent({
			level: 'warn',
			event: 'contact.origin_blocked',
			message: 'Blocked request due to unsupported origin.',
			meta: { origin: origin ?? 'missing' },
		});
		return buildErrorResponse('不正なリクエストです。', 403, 'UNSUPPORTED_ORIGIN', baseHeaders);
	}

	const contentType = request.headers.get('content-type') ?? '';
	if (!contentType.toLowerCase().includes('application/json')) {
		return buildErrorResponse('不正なリクエスト形式です。', 415, 'SEND_FAILED', baseHeaders);
	}

	const contentLength = parsePositiveInt(request.headers.get('content-length'));
	if (contentLength > MAX_BODY_BYTES) {
		return buildErrorResponse('入力サイズが大きすぎます。', 413, 'SEND_FAILED', baseHeaders);
	}

	try {
		const globalRateLimit = await checkRateLimit(request, {
			...CONTACT_GLOBAL_RATE_LIMIT,
			identifier: 'all',
		});
		applyRateLimitHeaders(baseHeaders, globalRateLimit);
		if (!globalRateLimit.allowed) {
			return buildErrorResponse('アクセスが集中しています。時間をおいて再度お試しください。', 429, 'RATE_LIMITED', baseHeaders);
		}

		const clientIp = getClientIp(request);
		const ipRateLimit = await checkRateLimit(request, {
			...CONTACT_IP_RATE_LIMIT,
			identifier: hashSha256(clientIp),
		});
		applyRateLimitHeaders(baseHeaders, ipRateLimit);
		if (!ipRateLimit.allowed) {
			logSecurityEvent({
				level: 'warn',
				event: 'contact.rate_limited.ip',
				message: 'IP contact rate limit exceeded.',
				meta: { clientIp: maskIp(clientIp) },
			});
			return buildErrorResponse('送信回数が上限に達しました。時間をおいて再度お試しください。', 429, 'RATE_LIMITED', baseHeaders);
		}

		const body = await parseBody(request);
		if (!body) {
			return buildErrorResponse('入力内容を確認してください。', 400, 'SEND_FAILED', baseHeaders);
		}

		const name = trimAndLimit(body.name, MAX_NAME_LENGTH);
		const email = trimAndLimit(body.email, MAX_EMAIL_LENGTH).replace(/[\r\n]/g, '');
		const category = trimAndLimit(body.category, 30);
		const message = trimAndLimit(body.message, MAX_MESSAGE_LENGTH);
		const website = trimAndLimit(body.website, 120);
		const submittedAt = trimAndLimit(body.submittedAt, 20);
		const captchaToken = trimAndLimit(body.captchaToken, MAX_CAPTCHA_TOKEN_LENGTH);
		const idempotencyKey = trimAndLimit(body.idempotencyKey, MAX_IDEMPOTENCY_KEY_LENGTH);

		if (website) {
			return buildJsonResponse<ContactSuccessResponse>({ success: true, provider: 'gmail' }, 200, baseHeaders);
		}

		const submittedAtMs = Number.parseInt(submittedAt, 10);
		const elapsedMs = Date.now() - submittedAtMs;
		if (!Number.isFinite(submittedAtMs) || elapsedMs < MIN_FORM_FILL_MS || elapsedMs > MAX_FORM_AGE_MS) {
			return buildErrorResponse('入力内容を確認してください。', 400, 'SEND_FAILED', baseHeaders);
		}

		if (!name || !email || !category || !captchaToken || !idempotencyKey) {
			return buildErrorResponse('必須項目を入力してください。', 400, 'SEND_FAILED', baseHeaders);
		}
		if (!EMAIL_REGEX.test(email)) {
			return buildErrorResponse('メールアドレスの形式が正しくありません。', 400, 'SEND_FAILED', baseHeaders);
		}

		const categoryLabel = ALLOWED_CATEGORIES.get(category);
		if (!categoryLabel) {
			return buildErrorResponse('ご相談内容の選択が不正です。', 400, 'SEND_FAILED', baseHeaders);
		}

		const ipEmailRateLimit = await checkRateLimit(request, {
			...CONTACT_IP_EMAIL_RATE_LIMIT,
			identifier: buildIpEmailIdentifier(clientIp, email),
		});
		applyRateLimitHeaders(baseHeaders, ipEmailRateLimit);
		if (!ipEmailRateLimit.allowed) {
			logSecurityEvent({
				level: 'warn',
				event: 'contact.rate_limited.ip_email',
				message: 'IP+email contact rate limit exceeded.',
				meta: { clientIp: maskIp(clientIp), email: maskContactEmail(email) },
			});
			return buildErrorResponse('送信回数が上限に達しました。時間をおいて再度お試しください。', 429, 'RATE_LIMITED', baseHeaders);
		}

		const captchaOk = await verifyTurnstileToken(captchaToken, clientIp);
		if (!captchaOk) {
			logSecurityEvent({
				level: 'warn',
				event: 'contact.captcha.invalid',
				message: 'Blocked request due to invalid captcha.',
				meta: { clientIp: maskIp(clientIp), email: maskContactEmail(email) },
			});
			return buildErrorResponse('CAPTCHA認証に失敗しました。', 403, 'INVALID_CAPTCHA', baseHeaders);
		}

		const isFirstSubmission = await reserveIdempotencyKey('contact:idempotency:v1', idempotencyKey, IDEMPOTENCY_TTL_MS);
		if (!isFirstSubmission) {
			logSecurityEvent({
				level: 'warn',
				event: 'contact.idempotency.duplicate',
				message: 'Duplicate idempotency key blocked.',
				meta: { idempotencyKeyHash: hashSha256(idempotencyKey).slice(0, 16) },
			});
			return buildErrorResponse('同一内容の送信が重複しています。', 409, 'RATE_LIMITED', baseHeaders);
		}

		const contactTo =
			import.meta.env.CONTACT_TO_EMAIL?.trim() ||
			import.meta.env.GMAIL_USER?.trim() ||
			import.meta.env.RESEND_DEFAULT_TO_EMAIL?.trim();
		if (!contactTo) {
			return buildErrorResponse('現在お問い合わせを受け付けられません。', 503, 'SEND_FAILED', baseHeaders);
		}

		const providers = describeConfiguredProviders();
		if (providers.length === 0) {
			return buildErrorResponse('現在お問い合わせを受け付けられません。', 503, 'SEND_FAILED', baseHeaders);
		}

		const payload: ContactPayload = {
			name,
			email,
			category,
			categoryLabel,
			message,
			replyTo: email,
			contactTo,
			idempotencyKey,
			attempts: 0,
		};

		try {
			const { provider } = await sendWithFailover(payload);
			logSecurityEvent({
				level: 'info',
				event: 'contact.send.success',
				message: 'Contact request sent successfully.',
				meta: { provider, email: maskContactEmail(email), clientIp: maskIp(clientIp) },
			});
			return buildJsonResponse<ContactSuccessResponse>({ success: true, provider }, 200, baseHeaders);
		} catch (sendErr) {
			logSecurityEvent({
				level: 'error',
				event: 'contact.send.failed',
				message: 'Primary and fallback providers failed.',
				meta: {
					error: String(sendErr),
					email: maskContactEmail(email),
					clientIp: maskIp(clientIp),
				},
			});

			const queued = await enqueueRetryPayload(payload);
			if (queued) {
				return buildJsonResponse<ContactQueueAcceptResponse>({ success: true, queued: true }, 202, baseHeaders);
			}

			return buildErrorResponse('メールの送信に失敗しました。', 502, 'SEND_FAILED', baseHeaders);
		}
	} catch (err) {
		logSecurityEvent({
			level: 'error',
			event: 'contact.api.unexpected_error',
			message: 'Unhandled contact API error.',
			meta: { error: String(err) },
		});
		return buildErrorResponse('サーバーエラーが発生しました。', 500, 'SEND_FAILED', baseHeaders);
	}
};
