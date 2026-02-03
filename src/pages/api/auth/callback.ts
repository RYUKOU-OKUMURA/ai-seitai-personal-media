import type { APIRoute } from 'astro';
import { exchangeCodeForTokens, getUserInfo, isAllowedEmail } from '../../../server/googleAuth';
import { createSessionToken, createSessionCookie } from '../../../server/session';

export const GET: APIRoute = async ({ url, redirect }) => {
	try {
		const code = url.searchParams.get('code');
		if (!code) {
			return redirect('/?error=missing_code');
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
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/admin',
				'Set-Cookie': createSessionCookie(sessionToken),
			},
		});
	} catch (error) {
		console.error('OAuth callback error:', error);
		return redirect('/?error=auth_failed');
	}
};
