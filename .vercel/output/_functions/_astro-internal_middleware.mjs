import { d as defineMiddleware, s as sequence } from './chunks/index_DhdGeeKL.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_D3TsFib5.mjs';
import 'piccolore';
import './chunks/astro/server_Dqlu1aGj.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (_context, next) => {
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
