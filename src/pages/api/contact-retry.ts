import type { APIRoute } from 'astro';
import { processContactRetryQueue } from '../../server/contact-delivery';

const parseBatchSize = (requestUrl: URL): number => {
	const raw = Number.parseInt(requestUrl.searchParams.get('batch') ?? '20', 10);
	if (!Number.isFinite(raw)) return 20;
	return Math.min(100, Math.max(1, raw));
};

const isAuthorizedCron = (request: Request): boolean => {
	const authHeader = request.headers.get('authorization') ?? '';
	const expected = import.meta.env.CONTACT_RETRY_CRON_SECRET?.trim() || import.meta.env.CRON_SECRET?.trim();
	if (!expected) return false;
	return authHeader === `Bearer ${expected}`;
};

const runRetry = async (request: Request, url: URL): Promise<Response> => {
	if (!isAuthorizedCron(request)) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
		});
	}

	const batchSize = parseBatchSize(url);
	const result = await processContactRetryQueue(batchSize);
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
	});
};

export const GET: APIRoute = async ({ request, url }) => runRetry(request, url);

export const POST: APIRoute = async ({ request, url }) => runRetry(request, url);
