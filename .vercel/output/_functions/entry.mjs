import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BATHeAXn.mjs';
import { manifest } from './manifest_BYzFVTnZ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/api/admin/blog/_slug_.astro.mjs');
const _page3 = () => import('./pages/api/admin/blog.astro.mjs');
const _page4 = () => import('./pages/api/admin/events/_slug_.astro.mjs');
const _page5 = () => import('./pages/api/admin/events.astro.mjs');
const _page6 = () => import('./pages/api/admin/ping.astro.mjs');
const _page7 = () => import('./pages/api/auth/callback.astro.mjs');
const _page8 = () => import('./pages/api/auth/login.astro.mjs');
const _page9 = () => import('./pages/api/auth/logout.astro.mjs');
const _page10 = () => import('./pages/api/auth/me.astro.mjs');
const _page11 = () => import('./pages/api/youtube.astro.mjs');
const _page12 = () => import('./pages/blog/_slug_.astro.mjs');
const _page13 = () => import('./pages/blog.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/index.astro", _page1],
    ["src/pages/api/admin/blog/[slug].ts", _page2],
    ["src/pages/api/admin/blog/index.ts", _page3],
    ["src/pages/api/admin/events/[slug].ts", _page4],
    ["src/pages/api/admin/events/index.ts", _page5],
    ["src/pages/api/admin/ping.ts", _page6],
    ["src/pages/api/auth/callback.ts", _page7],
    ["src/pages/api/auth/login.ts", _page8],
    ["src/pages/api/auth/logout.ts", _page9],
    ["src/pages/api/auth/me.ts", _page10],
    ["src/pages/api/youtube.ts", _page11],
    ["src/pages/blog/[slug].astro", _page12],
    ["src/pages/blog/index.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "0404821c-fdb2-4b96-ac2e-cb9fa574c0f0",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
