import type { APIRoute } from 'astro';
import { getSessionFromRequest } from '../../../server/session';

export const GET: APIRoute = async ({ request }) => {
	const user = await getSessionFromRequest(request);

	if (!user) {
		return new Response(JSON.stringify({ user: null }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return new Response(JSON.stringify({ user }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};
