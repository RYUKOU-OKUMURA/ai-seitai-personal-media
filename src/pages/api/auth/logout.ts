import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../../server/session';

export const POST: APIRoute = async () => {
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Set-Cookie': clearSessionCookie(),
		},
	});
};
