import { r as requireAdmin, j as json } from '../../../../chunks/adminAuth_Dnn-Cy1l.mjs';
import { a as assertSafeSlug, d as deleteFileFromRepo, b as buildBlogMarkdown, p as putFileToRepo } from '../../../../chunks/slug_Btca7giT.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const PUT = async ({ params, request }) => {
  const auth = await requireAdmin(request);
  if (auth) return auth;
  try {
    const slug = assertSafeSlug(params.slug);
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid JSON body" }, { status: 400 });
    const title = typeof body.title === "string" ? body.title : "";
    const publishedAt = typeof body.publishedAt === "string" ? body.publishedAt : "";
    const category = typeof body.category === "string" ? body.category : "";
    const image = typeof body.image === "string" ? body.image : "";
    const excerpt = typeof body.excerpt === "string" ? body.excerpt : "";
    const content = typeof body.content === "string" ? body.content : "";
    const draft = typeof body.draft === "boolean" ? body.draft : false;
    if (!title || !publishedAt || !category || !excerpt) {
      return json({ error: "Missing required fields (title, publishedAt, category, excerpt)" }, { status: 400 });
    }
    const markdown = buildBlogMarkdown({ title, publishedAt, category, image, excerpt, content, draft });
    const path = `src/content/blog/${slug}.md`;
    await putFileToRepo({ path, content: markdown, message: `cms: update blog ${slug}` });
    return json({ ok: true, post: { slug, title, publishedAt, category, image, excerpt, content, draft } });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const status = /slug/i.test(message) ? 400 : 500;
    return json({ error: message }, { status });
  }
};
const DELETE = async ({ params, request }) => {
  const auth = await requireAdmin(request);
  if (auth) return auth;
  try {
    const slug = assertSafeSlug(params.slug);
    const path = `src/content/blog/${slug}.md`;
    await deleteFileFromRepo({ path, message: `cms: delete blog ${slug}` });
    return json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const status = /slug/i.test(message) ? 400 : 500;
    return json({ error: message }, { status });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	PUT,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
