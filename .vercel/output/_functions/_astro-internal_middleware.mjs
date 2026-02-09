import { d as defineMiddleware, s as sequence } from './chunks/index_DhdGeeKL.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_D3TsFib5.mjs';
import 'piccolore';
import './chunks/astro/server_Dqlu1aGj.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  try {
    return await next();
  } catch (error) {
    console.error("[Unhandled Request Error]", {
      method: context.request.method,
      path: context.url.pathname,
      error
    });
    if (context.url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      });
    }
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
