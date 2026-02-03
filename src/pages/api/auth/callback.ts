import type { APIRoute } from 'astro';
import { exchangeCodeForTokens, getUserInfo, isAllowedEmail } from '../../../server/googleAuth';
import { createSessionToken, createSessionCookie } from '../../../server/session';

const getOAuthStateFromRequest = (request: Request): string | null => {
	const cookie = request.headers.get('cookie') ?? '';
	const match = cookie.match(/(?:^|;\s*)oauth_state=([^;]+)/);
	return match ? decodeURIComponent(match[1]) : null;
};

const clearOAuthStateCookie = (): string => {
	const isProduction = import.meta.env.NODE_ENV === 'production';
	return `oauth_state=; Path=/api/auth/callback; HttpOnly; SameSite=Lax; Max-Age=0${isProduction ? '; Secure' : ''}`;
};

export const GET: APIRoute = async ({ url, redirect, request }) => {
	try {
		const code = url.searchParams.get('code');
		if (!code) {
			return redirect('/?error=missing_code');
		}

		const state = url.searchParams.get('state');
		const storedState = getOAuthStateFromRequest(request);
		if (!state || !storedState || state !== storedState) {
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/?error=invalid_state',
					'Set-Cookie': clearOAuthStateCookie(),
				},
			});
		}

		// Exchange code for tokens
		const tokens = await exchangeCodeForTokens(code);

		// Get user info
		const userInfo = await getUserInfo(tokens.access_token);

		// Check if email is allowed
		if (!isAllowedEmail(userInfo.email)) {
			return redirect('/?error=unauthorized');
		}

		// Create session
		const sessionToken = await createSessionToken({
			email: userInfo.email,
			name: userInfo.name,
			picture: userInfo.picture,
		});

		// Set cookie and redirect to admin
		const headers = new Headers({
			Location: '/admin',
		});
		headers.append('Set-Cookie', createSessionCookie(sessionToken));
		headers.append('Set-Cookie', clearOAuthStateCookie());
		return new Response(null, {
			status: 302,
			headers,
		});
	} catch (error) {
		console.error('OAuth callback error:', error);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/?error=auth_failed',
				'Set-Cookie': clearOAuthStateCookie(),
			},
		});
	}
};
