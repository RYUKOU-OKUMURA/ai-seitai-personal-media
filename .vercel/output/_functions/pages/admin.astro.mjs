/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro } from '../chunks/astro/server_Dqlu1aGj.mjs';
import 'piccolore';
import { g as getCollection, $ as $$Layout } from '../chunks/_astro_content_CHI-CipZ.mjs';
import { g as getSessionFromRequest } from '../chunks/session_KD2Cv45Q.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = await getSessionFromRequest(Astro2.request);
  const isAuthenticated = Boolean(user);
  const events = isAuthenticated ? (await getCollection("events")).map((event) => ({
    slug: event.slug,
    title: event.data.title,
    dateLabel: event.data.dateLabel,
    image: event.data.image,
    tag: event.data.tag,
    link: event.data.link,
    draft: event.data.draft
  })) : [];
  const posts = isAuthenticated ? (await getCollection("blog")).sort((a, b) => a.data.publishedAt < b.data.publishedAt ? 1 : -1).map((post) => ({
    slug: post.slug,
    title: post.data.title,
    publishedAt: post.data.publishedAt,
    category: post.data.category,
    image: post.data.image,
    excerpt: post.data.excerpt,
    content: post.body,
    draft: post.data.draft
  })) : [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u7BA1\u7406\u753B\u9762 | \u6574\u4F53\u9662\u306EAI\u4ED5\u7D44\u307F\u5316\u652F\u63F4" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminDashboard", null, { "client:only": "react", "events": events, "posts": posts, "client:component-hydration": "only", "client:component-path": "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/components/AdminDashboard", "client:component-export": "default" })} ` })}`;
}, "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/pages/admin/index.astro", void 0);

const $$file = "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
