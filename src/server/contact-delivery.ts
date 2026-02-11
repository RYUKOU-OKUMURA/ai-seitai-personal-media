import { createTransport } from 'nodemailer';
import {
	dequeueJsonPayloads,
	enqueueJsonPayload,
	hashSha256,
	logSecurityEvent,
	maskEmail,
} from './security';

export type MailProviderName = 'gmail' | 'resend';

export type ContactPayload = {
	name: string;
	email: string;
	organization: string;
	category: string;
	categoryLabel: string;
	message: string;
	replyTo: string;
	contactTo: string;
	idempotencyKey: string;
	attempts: number;
};

const CONTACT_RETRY_QUEUE_KEY = 'contact:retry:queue:v1';
const CONTACT_RETRY_MAX_ATTEMPTS = 5;

const toAsciiSafe = (value: string): string => value.replace(/[^\x20-\x7E]/g, '?');

const escapeHtml = (value: string): string =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const buildMailHtml = (safeName: string, safeEmail: string, safeOrganization: string, safeCategoryLabel: string, safeMessage: string): string => `
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
			<td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">院名・会社名</td>
			<td style="padding: 8px 12px; border: 1px solid #ddd;">${safeOrganization}</td>
		</tr>
		<tr>
			<td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">ご相談内容</td>
			<td style="padding: 8px 12px; border: 1px solid #ddd;">${safeCategoryLabel}</td>
		</tr>
		<tr>
			<td style="padding: 8px 12px; border: 1px solid #ddd; background: #f9f9f9; font-weight: bold;">詳細メッセージ</td>
			<td style="padding: 8px 12px; border: 1px solid #ddd;">${safeMessage}</td>
		</tr>
	</table>
`;

const sendViaGmail = async (payload: ContactPayload): Promise<void> => {
	const gmailUser = import.meta.env.GMAIL_USER?.trim();
	const gmailAppPassword = import.meta.env.GMAIL_APP_PASSWORD?.trim();
	if (!gmailUser || !gmailAppPassword) {
		throw new Error('gmail_not_configured');
	}

	const transporter = createTransport({
		service: 'gmail',
		auth: { user: gmailUser, pass: gmailAppPassword },
	});

	const safeName = escapeHtml(payload.name);
	const safeEmail = escapeHtml(payload.email);
	const safeOrganization = escapeHtml(payload.organization);
	const safeCategoryLabel = escapeHtml(payload.categoryLabel);
	const safeMessage = payload.message ? escapeHtml(payload.message).replace(/\n/g, '<br>') : '（なし）';

	await transporter.sendMail({
		from: `お問い合わせフォーム <${gmailUser}>`,
		to: payload.contactTo,
		replyTo: payload.replyTo,
		subject: `【お問い合わせ】${payload.categoryLabel} - ${payload.name}様`,
		html: buildMailHtml(safeName, safeEmail, safeOrganization, safeCategoryLabel, safeMessage),
	});
};

const sendViaResend = async (payload: ContactPayload): Promise<void> => {
	const resendApiKey = import.meta.env.RESEND_API_KEY?.trim();
	const resendFrom = import.meta.env.RESEND_FROM_EMAIL?.trim();
	if (!resendApiKey || !resendFrom) {
		throw new Error('resend_not_configured');
	}

	const safeName = escapeHtml(payload.name);
	const safeEmail = escapeHtml(payload.email);
	const safeOrganization = escapeHtml(payload.organization);
	const safeCategoryLabel = escapeHtml(payload.categoryLabel);
	const safeMessage = payload.message ? escapeHtml(payload.message).replace(/\n/g, '<br>') : '（なし）';

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${resendApiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: resendFrom,
			to: [payload.contactTo],
			reply_to: payload.replyTo,
			subject: `【お問い合わせ】${payload.categoryLabel} - ${payload.name}様`,
			html: buildMailHtml(safeName, safeEmail, safeOrganization, safeCategoryLabel, safeMessage),
		}),
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`resend_send_failed:${response.status}:${toAsciiSafe(body).slice(0, 300)}`);
	}
};

export const sendWithFailover = async (payload: ContactPayload): Promise<{ provider: MailProviderName }> => {
	try {
		await sendViaGmail(payload);
		return { provider: 'gmail' };
	} catch (gmailError) {
		logSecurityEvent({
			level: 'warn',
			event: 'contact.send.gmail_failed',
			message: 'Primary provider failed. Falling back to Resend.',
			meta: {
				error: String(gmailError),
				emailHash: hashSha256(payload.email).slice(0, 16),
			},
		});
	}

	await sendViaResend(payload);
	return { provider: 'resend' };
};

export const enqueueRetryPayload = async (payload: ContactPayload): Promise<boolean> =>
	enqueueJsonPayload(CONTACT_RETRY_QUEUE_KEY, payload as unknown as Record<string, unknown>);

const isQueuePayload = (value: unknown): value is ContactPayload => {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
	const row = value as Record<string, unknown>;
	return (
		typeof row.name === 'string' &&
		typeof row.email === 'string' &&
		typeof row.organization === 'string' &&
		typeof row.category === 'string' &&
		typeof row.categoryLabel === 'string' &&
		typeof row.message === 'string' &&
		typeof row.replyTo === 'string' &&
		typeof row.contactTo === 'string' &&
		typeof row.idempotencyKey === 'string' &&
		typeof row.attempts === 'number'
	);
};

const processRetryPayload = async (payload: ContactPayload): Promise<boolean> => {
	try {
		await sendWithFailover(payload);
		return true;
	} catch (error) {
		logSecurityEvent({
			level: 'error',
			event: 'contact.retry.send_failed',
			message: 'Retry send failed.',
			meta: {
				error: String(error),
				attempts: payload.attempts,
				emailHash: hashSha256(payload.email).slice(0, 16),
			},
		});
		return false;
	}
};

export const processContactRetryQueue = async (
	batchSize: number,
): Promise<{ processed: number; success: number; failed: number }> => {
	const queuedPayloads = await dequeueJsonPayloads(CONTACT_RETRY_QUEUE_KEY, Math.max(1, batchSize));
	let processed = 0;
	let success = 0;
	let failed = 0;

	for (const rawPayload of queuedPayloads) {
		try {
			const parsed = JSON.parse(rawPayload) as unknown;
			if (!isQueuePayload(parsed)) {
				failed += 1;
				continue;
			}

			processed += 1;
			const ok = await processRetryPayload(parsed);
			if (ok) {
				success += 1;
				continue;
			}

			const attempts = parsed.attempts + 1;
			if (attempts < CONTACT_RETRY_MAX_ATTEMPTS) {
				await enqueueRetryPayload({ ...parsed, attempts });
			}
			failed += 1;
		} catch {
			failed += 1;
		}
	}

	logSecurityEvent({
		level: 'info',
		event: 'contact.retry.summary',
		message: 'Processed contact retry queue.',
		meta: { processed, success, failed, totalPulled: queuedPayloads.length },
	});

	return { processed, success, failed };
};

export const describeConfiguredProviders = (): MailProviderName[] => {
	const providers: MailProviderName[] = [];
	if (import.meta.env.GMAIL_USER?.trim() && import.meta.env.GMAIL_APP_PASSWORD?.trim()) {
		providers.push('gmail');
	}
	if (import.meta.env.RESEND_API_KEY?.trim() && import.meta.env.RESEND_FROM_EMAIL?.trim()) {
		providers.push('resend');
	}
	return providers;
};

export const maskContactEmail = (email: string): string => maskEmail(email);
