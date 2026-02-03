import type { APIRoute } from 'astro';
import { getGoogleAuthUrl } from '../../../server/googleAuth';

const createOAuthStateCookie = (state: string) => {
	const isProduction = import.meta.env.NODE_ENV === 'production';
	return `oauth_state=${state}; Path=/api/auth/callback; HttpOnly; SameSite=Lax; Max-Age=${60 * 10}${
		isProduction ? '; Secure' : ''
	}`;
};

export const GET: APIRoute = async () => {
	try {
		const state = crypto.randomUUID();
		const authUrl = getGoogleAuthUrl(state);
		return new Response(null, {
			status: 302,
			headers: {
				Location: authUrl,
				'Set-Cookie': createOAuthStateCookie(state),
			},
		});
	} catch (error) {
		console.error('[OAuth Login Error]', error);
		const errorMessage = error instanceof Error ? error.message : 'Failed to initiate login';
		return new Response(
			JSON.stringify({ error: errorMessage }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
