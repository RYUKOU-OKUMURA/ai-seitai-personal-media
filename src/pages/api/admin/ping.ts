import type { APIRoute } from 'astro';
import { requireAdmin } from '../../../server/adminAuth';
import { json } from '../../../server/http';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
	const auth = await requireAdmin(request);
	if (auth) return auth;
	return json({ ok: true });
};
