import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

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
	adapter,
	integrations: [react(), tailwind()],
});
