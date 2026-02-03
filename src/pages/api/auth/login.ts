import type { APIRoute } from 'astro';
import { getGoogleAuthUrl } from '../../../server/googleAuth';

export const GET: APIRoute = async () => {
	try {
		const authUrl = getGoogleAuthUrl();
		return Response.redirect(authUrl, 302);
	} catch (error) {
		console.error('[OAuth Login Error]', error);
		const errorMessage = error instanceof Error ? error.message : 'Failed to initiate login';
		return new Response(
			JSON.stringify({ error: errorMessage }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
