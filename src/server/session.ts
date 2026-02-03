import { SignJWT, jwtVerify } from 'jose';

export type SessionUser = {
	email: string;
	name: string;
	picture?: string;
};

const getSecret = () => {
	const secret = import.meta.env.JWT_SECRET;
	if (!secret) throw new Error('JWT_SECRET is not configured');
	return new TextEncoder().encode(secret);
};

export const createSessionToken = async (user: SessionUser): Promise<string> => {
	const token = await new SignJWT({ user })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(getSecret());
	return token;
};

export const verifySessionToken = async (token: string): Promise<SessionUser | null> => {
	try {
		const { payload } = await jwtVerify(token, getSecret());
		return (payload.user as SessionUser) || null;
	} catch {
		return null;
	}
};

export const getSessionFromRequest = async (request: Request): Promise<SessionUser | null> => {
	const cookie = request.headers.get('cookie');
	if (!cookie) return null;

	const match = cookie.match(/session=([^;]+)/);
	if (!match) return null;

	return verifySessionToken(match[1]);
};

export const createSessionCookie = (token: string): string => {
	const isProduction = import.meta.env.NODE_ENV === 'production';
	return `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${isProduction ? '; Secure' : ''}`;
};

export const clearSessionCookie = (): string => {
	return 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
};
