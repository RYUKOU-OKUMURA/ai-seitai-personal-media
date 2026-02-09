import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { applyRateLimitHeaders, checkRateLimit, isSameOrigin } from '../../server/security';

const CONTACT_RATE_LIMIT = {
	namespace: 'contact',
	maxRequests: 5,
	windowMs: 10 * 60 * 1000,
} as const;

const MAX_BODY_BYTES = 12_000;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2_000;
const MIN_FORM_FILL_MS = 800;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

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

const escapeHtml = (value: string): string =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

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

const buildJsonResponse = (body: unknown, status: number, baseHeaders: Headers): Response => {
	const headers = new Headers(baseHeaders);
	return new Response(JSON.stringify(body), { status, headers });
};

export const POST: APIRoute = async ({ request, url }) => {
	const baseHeaders = new Headers({
		'Content-Type': 'application/json; charset=utf-8',
		'Cache-Control': 'no-store',
	});

	const rateLimit = checkRateLimit(request, CONTACT_RATE_LIMIT);
	applyRateLimitHeaders(baseHeaders, rateLimit);
	if (!rateLimit.allowed) {
		return buildJsonResponse({ error: '送信回数が上限に達しました。時間をおいて再度お試しください。' }, 429, baseHeaders);
	}

	if (!isSameOrigin(request.headers.get('origin'), url)) {
		return buildJsonResponse({ error: '不正なリクエストです。' }, 403, baseHeaders);
	}

	const contentType = request.headers.get('content-type') ?? '';
	if (!contentType.toLowerCase().includes('application/json')) {
		return buildJsonResponse({ error: '不正なリクエスト形式です。' }, 415, baseHeaders);
	}

	try {
		const body = await parseBody(request);
		if (!body) {
			return buildJsonResponse({ error: '入力内容を確認してください。' }, 400, baseHeaders);
		}

		const name = trimAndLimit(body.name, MAX_NAME_LENGTH);
		const email = trimAndLimit(body.email, MAX_EMAIL_LENGTH).replace(/[\r\n]/g, '');
		const category = trimAndLimit(body.category, 30);
		const message = trimAndLimit(body.message, MAX_MESSAGE_LENGTH);
		const website = trimAndLimit(body.website, 120);
		const submittedAt = trimAndLimit(body.submittedAt, 20);

		if (website) {
			return buildJsonResponse({ success: true }, 200, baseHeaders);
		}

		const submittedAtMs = Number.parseInt(submittedAt, 10);
		const elapsedMs = Date.now() - submittedAtMs;
		if (!Number.isFinite(submittedAtMs) || elapsedMs < MIN_FORM_FILL_MS || elapsedMs > MAX_FORM_AGE_MS) {
			return buildJsonResponse({ error: '入力内容を確認してください。' }, 400, baseHeaders);
		}

		if (!name || !email || !category) {
			return buildJsonResponse({ error: '必須項目を入力してください。' }, 400, baseHeaders);
		}
		if (!EMAIL_REGEX.test(email)) {
			return buildJsonResponse({ error: 'メールアドレスの形式が正しくありません。' }, 400, baseHeaders);
		}

		const categoryLabel = ALLOWED_CATEGORIES.get(category);
		if (!categoryLabel) {
			return buildJsonResponse({ error: 'ご相談内容の選択が不正です。' }, 400, baseHeaders);
		}

		const apiKey = import.meta.env.RESEND_API_KEY;
		if (!apiKey) {
			console.error('RESEND_API_KEY is not configured');
			return buildJsonResponse({ error: '現在お問い合わせを受け付けられません。' }, 503, baseHeaders);
		}

		const safeName = escapeHtml(name);
		const safeEmail = escapeHtml(email);
		const safeMessage = message ? escapeHtml(message).replace(/\n/g, '<br>') : '（なし）';

		const resend = new Resend(apiKey);
		const { error } = await resend.emails.send({
			from: 'お問い合わせフォーム <onboarding@resend.dev>',
			to: 'okumura@physical-balance-lab.net',
			replyTo: email,
			subject: `【お問い合わせ】${categoryLabel} - ${name}様`,
			html: `
				<h2>ウェブサイトからのお問い合わせ</h2>
				<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
					<tr>
						<td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold; width: 140px;">お名前</td>
						<td style="padding: 8px 12px; border: 1px solid #ddd;">${safeName}</td>
					</tr>
					<tr>
						<td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">メールアドレス</td>
						<td style="padding: 8px 12px; border: 1px solid #ddd;">${safeEmail}</td>
					</tr>
					<tr>
						<td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">ご相談内容</td>
						<td style="padding: 8px 12px; border: 1px solid #ddd;">${escapeHtml(categoryLabel)}</td>
					</tr>
					<tr>
						<td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">詳細メッセージ</td>
						<td style="padding: 8px 12px; border: 1px solid #ddd;">${safeMessage}</td>
					</tr>
				</table>
			`,
		});

		if (error) {
			const errorMessage =
				typeof error === 'object' && error !== null && 'message' in error
					? String((error as { message?: unknown }).message ?? 'unknown')
					: 'unknown';
			console.error('Resend error:', errorMessage);
			return buildJsonResponse({ error: 'メールの送信に失敗しました。' }, 502, baseHeaders);
		}

		return buildJsonResponse({ success: true }, 200, baseHeaders);
	} catch (err) {
		console.error('Contact API error:', err);
		return buildJsonResponse({ error: 'サーバーエラーが発生しました。' }, 500, baseHeaders);
	}
};
