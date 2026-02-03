import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

let adapter;
let output = 'static';
try {
	// Optional in local/offline environments; required for Vercel deployment with /api routes.
	const { default: vercel } = await import('@astrojs/vercel/serverless');
	adapter = vercel();
	output = 'hybrid';
} catch {
	// noop
}

// https://astro.build/config
export default defineConfig({
	output,
	adapter,
	integrations: [react(), tailwind()],
});
