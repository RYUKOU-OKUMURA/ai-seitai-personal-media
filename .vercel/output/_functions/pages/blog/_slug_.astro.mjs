/* empty css                                    */
import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_Dqlu1aGj.mjs';
import 'piccolore';
import { a as getEntry, $ as $$Layout } from '../../chunks/_astro_content_DQtuMFkd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const formatDate = (iso) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return `${y}.${m}.${d}`;
  };
  const slug = Astro2.params.slug;
  const post = slug ? await getEntry("blog", slug) : void 0;
  if (!post || post.data.draft) {
    return Astro2.redirect("/blog");
  }
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.data.title} | \u6574\u4F53\u9662\u306EAI\u4ED5\u7D44\u307F\u5316\u652F\u63F4` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-white min-h-screen"> <header class="bg-background-light pt-20 pb-10 px-4 border-b border-gray-200"> <div class="max-w-[900px] mx-auto"> <a href="/blog" class="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-primary transition-colors"> <span class="material-symbols-outlined text-base">arrow_back</span>
記事一覧に戻る
</a> <div class="mt-6 inline-block px-3 py-1 bg-primary/10 text-primary rounded-sm text-xs font-bold"> ${post.data.category} </div> <h1 class="text-2xl md:text-4xl font-black text-[#111418] mt-4 leading-tight">${post.data.title}</h1> <div class="flex items-center gap-2 text-gray-500 text-sm mt-4"> <span class="material-symbols-outlined text-base">schedule</span> ${formatDate(post.data.publishedAt)} <span class="mx-2">|</span> <span class="material-symbols-outlined text-base">person</span>
BOSS (Clinic Owner)
</div> </div> </header> <section class="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-20"> ${post.data.image ? renderTemplate`<div class="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-12 bg-gray-100"> <img${addAttribute(post.data.image, "src")}${addAttribute(post.data.title, "alt")} class="w-full h-full object-cover"> </div>` : null} <article class="max-w-none text-gray-700 leading-loose"> <p class="font-bold text-xl leading-relaxed mb-10">${post.data.excerpt}</p> <div class="prose prose-lg max-w-none text-gray-700"> ${renderComponent($$result2, "Content", Content, {})} </div> </article> <div class="mt-16 bg-[#111921] text-white p-8 rounded-xl text-center"> <h2 class="text-xl font-bold mb-4">この記事について相談する</h2> <p class="text-gray-300 mb-6 text-sm">AI導入や経営に関するご質問は、無料相談にて承っています。</p> <a href="/#contact" class="inline-block bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all">
無料相談を予約
</a> </div> </section> </main> ` })}`;
}, "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/ryukouokumura/Desktop/ai-seitai-personal-media/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
