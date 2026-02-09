/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_Dqlu1aGj.mjs';
import 'piccolore';
import { g as getCollection, $ as $$Layout } from '../chunks/_astro_content_DQtuMFkd.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const formatDate = (iso) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return `${y}.${m}.${d}`;
  };
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => a.data.publishedAt < b.data.publishedAt ? 1 : -1
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\u9662\u9577\u30B3\u30E9\u30E0\u30FB\u30D6\u30ED\u30B0 | \u6574\u4F53\u9662\u306EAI\u4ED5\u7D44\u307F\u5316\u652F\u63F4" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-background-light min-h-screen"> <header class="bg-white border-b border-gray-200"> <div class="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10"> <a href="/" class="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-primary transition-colors"> <span class="material-symbols-outlined text-base">arrow_back</span>
ホームに戻る
</a> <div class="mt-6"> <div class="text-primary font-bold tracking-wider text-sm uppercase">Official Column</div> <h1 class="text-3xl md:text-4xl font-black text-[#111418] mt-2">院長コラム・ブログ</h1> <p class="text-gray-700 leading-relaxed mt-3">日々の気づきや、AI活用の裏話などを更新しています。</p> </div> </div> </header> <section class="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12"> ${posts.length === 0 ? renderTemplate`<div class="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-700">
まだ記事がありません。
</div>` : renderTemplate`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"> ${posts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group flex flex-col"> <div class="aspect-video overflow-hidden relative bg-gray-100"> ${post.data.image ? renderTemplate`<img${addAttribute(post.data.image, "src")}${addAttribute(post.data.title, "alt")} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">` : renderTemplate`<div class="w-full h-full bg-gray-100"></div>`} <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#111418] text-xs font-bold px-3 py-1 rounded-sm"> ${post.data.category} </div> </div> <div class="p-6 flex flex-col flex-grow"> <div class="flex items-center gap-2 text-xs text-gray-500 mb-3"> <span class="material-symbols-outlined text-sm">schedule</span> ${formatDate(post.data.publishedAt)} </div> <h2 class="text-lg font-bold text-[#111418] mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2"> ${post.data.title} </h2> <p class="text-sm text-gray-700 leading-relaxed line-clamp-3 mb-4 flex-grow">${post.data.excerpt}</p> <div class="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
続きを読む <span class="material-symbols-outlined text-sm">arrow_forward</span> </div> </div> </a>`)} </div>`} </section> <footer class="py-12"> <div class="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8"> <div class="bg-[#111921] text-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"> <div> <div class="text-xl font-black">無料相談を予約</div> <div class="text-gray-300 text-sm mt-2">AI導入や経営のご相談はお気軽にどうぞ。</div> </div> <a href="/#contact" class="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
お問い合わせへ
</a> </div> <div class="text-center text-xs text-gray-500 mt-10">© 2023 BOSS Personal Media. All rights reserved.</div> </div> </footer> </main> ` })}`;
}, "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/pages/blog/index.astro", void 0);

const $$file = "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
