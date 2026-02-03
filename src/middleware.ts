import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
	const { url, redirect } = context;
	const host = context.request.headers.get('host') || '';

	// 管理画面へのアクセス制御
	if (url.pathname.startsWith('/admin')) {
		// admin サブドメインからのアクセスのみ許可
		const isAdminSubdomain = host.startsWith('admin.');

		if (!isAdminSubdomain) {
			// メインドメインからのアクセスは404を返す
			return new Response('Not Found', {
				status: 404,
				statusText: 'Not Found'
			});
		}
	}

	// 管理APIへのアクセス制御
	if (url.pathname.startsWith('/api/admin')) {
		const isAdminSubdomain = host.startsWith('admin.');

		if (!isAdminSubdomain) {
			return new Response('Forbidden', {
				status: 403,
				statusText: 'Forbidden'
			});
		}
	}

	return next();
});
