type GoogleOAuthConfig = {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
};

const getConfig = (): GoogleOAuthConfig => {
	const clientId = import.meta.env.GOOGLE_CLIENT_ID;
	const clientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be configured');
	}

	const baseUrl = import.meta.env.SITE_URL || 'http://localhost:4321';
	const redirectUri = `${baseUrl}/api/auth/callback`;

	return { clientId, clientSecret, redirectUri };
};

export const getGoogleAuthUrl = (state?: string): string => {
	const config = getConfig();
	const params = new URLSearchParams({
		client_id: config.clientId,
		redirect_uri: config.redirectUri,
		response_type: 'code',
		scope: 'openid email profile',
		...(state ? { state } : {}),
	});

	return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

type GoogleTokenResponse = {
	access_token: string;
	refresh_token?: string;
	expires_in: number;
	scope: string;
	token_type: string;
	id_token: string;
};

export const exchangeCodeForTokens = async (code: string): Promise<GoogleTokenResponse> => {
	const config = getConfig();
	const params = new URLSearchParams({
		code,
		client_id: config.clientId,
		client_secret: config.clientSecret,
		redirect_uri: config.redirectUri,
		grant_type: 'authorization_code',
	});

	const response = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: params.toString(),
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Failed to exchange code for tokens: ${error}`);
	}

	return response.json();
};

type GoogleUserInfo = {
	email: string;
	name: string;
	picture?: string;
	email_verified: boolean;
};

export const getUserInfo = async (accessToken: string): Promise<GoogleUserInfo> => {
	const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
		headers: { Authorization: `Bearer ${accessToken}` },
	});

	if (!response.ok) {
		throw new Error('Failed to get user info from Google');
	}

	return response.json();
};

export const isAllowedEmail = (email: string): boolean => {
	const raw = import.meta.env.ALLOWED_EMAILS;
	if (!raw) {
		throw new Error('ALLOWED_EMAILS must be configured');
	}

	const allowedEmails = raw
		.split(',')
		.map((e) => e.trim())
		.filter(Boolean);
	if (allowedEmails.length === 0) {
		throw new Error('ALLOWED_EMAILS must include at least one email');
	}
	return allowedEmails.includes(email);
};
