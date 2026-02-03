import { json } from './http';

export const requireAdmin = (request: Request): Response | null => {
	const expected = process.env.ADMIN_PASSWORD;
	if (!expected) {
		return json({ error: 'ADMIN_PASSWORD is not configured on the server' }, { status: 500 });
	}

	const provided = request.headers.get('x-admin-password') ?? '';
	if (provided !== expected) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	return null;
};

