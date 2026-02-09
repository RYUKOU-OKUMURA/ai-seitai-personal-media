import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
	try {
		return await next();
	} catch (error) {
		console.error('[Unhandled Request Error]', {
			method: context.request.method,
			path: context.url.pathname,
			error,
		});

		if (context.url.pathname.startsWith('/api/')) {
			return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
			});
		}

		return new Response('Internal Server Error', {
			status: 500,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
		});
	}
});
