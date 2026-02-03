import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

let adapter;
try {
	// Optional in local/offline environments; required for Vercel deployment with /api routes.
	const { default: vercel } = await import('@astrojs/vercel');
	adapter = vercel();
} catch {
	// noop
}

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter,
	markdown: {
		// Allow raw HTML but sanitize it to prevent XSS.
		remarkRehype: { allowDangerousHtml: true },
		rehypePlugins: [
			rehypeRaw,
			[
				rehypeSanitize,
				{
					...defaultSchema,
					attributes: {
						...defaultSchema.attributes,
						code: [...(defaultSchema.attributes?.code ?? []), 'className'],
						pre: [...(defaultSchema.attributes?.pre ?? []), 'className'],
						span: [...(defaultSchema.attributes?.span ?? []), 'className'],
					},
					protocols: {
						...defaultSchema.protocols,
						href: ['http', 'https', 'mailto', 'tel'],
						src: ['http', 'https'],
					},
				},
			],
		],
	},
	integrations: [react(), tailwind()],
});
