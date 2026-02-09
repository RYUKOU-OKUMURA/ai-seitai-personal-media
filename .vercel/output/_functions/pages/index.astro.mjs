/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_Dqlu1aGj.mjs';
import 'piccolore';
import { g as getCollection, $ as $$Layout } from '../chunks/_astro_content_CfMdOxIZ.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const events = (await getCollection("events", ({ data }) => !data.draft)).map((event) => ({
    slug: event.slug,
    title: event.data.title,
    dateLabel: event.data.dateLabel,
    image: event.data.image,
    tag: event.data.tag,
    link: event.data.link
  }));
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort((a, b) => a.data.publishedAt < b.data.publishedAt ? 1 : -1).map((post) => ({
    slug: post.slug,
    title: post.data.title,
    publishedAt: post.data.publishedAt,
    category: post.data.category,
    image: post.data.image,
    excerpt: post.data.excerpt
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u6574\u4F53\u9662\u306EAI\u4ED5\u7D44\u307F\u5316\u652F\u63F4" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AppRoot", null, { "client:only": "react", "events": events, "posts": posts, "client:component-hydration": "only", "client:component-path": "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/AppRoot", "client:component-export": "default" })} ` })}`;
}, "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/pages/index.astro", void 0);

const $$file = "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
