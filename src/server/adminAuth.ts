import { json } from './http';
import { getSessionFromRequest } from './session';

export const requireAdmin = async (request: Request): Promise<Response | null> => {
	// セッション認証を優先
	const user = await getSessionFromRequest(request);
	if (user) {
		return null; // 認証成功
	}

	// 後方互換性のため、パスワード認証もサポート
	const expected = import.meta.env.ADMIN_PASSWORD;
	if (expected) {
		const provided = request.headers.get('x-admin-password') ?? '';
		if (provided === expected) {
			return null; // 認証成功
		}
	}

	return json({ error: 'Unauthorized' }, { status: 401 });
};

