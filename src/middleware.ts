import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (_context, next) => {
	// Google OAuth認証があるため、サブドメインによるアクセス制限は削除
	// /admin と /api/admin へのアクセスは requireAdmin() で保護される
	return next();
});
