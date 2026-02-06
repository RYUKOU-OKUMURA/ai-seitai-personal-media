import { r as requireAdmin, j as json } from '../../../chunks/adminAuth_Dnn-Cy1l.mjs';
import { n as normalizeSlugCandidate, e as ensureUniqueSlug, c as buildEventMarkdown, p as putFileToRepo } from '../../../chunks/slug_Btca7giT.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const auth = await requireAdmin(request);
  if (auth) return auth;
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid JSON body" }, { status: 400 });
    const title = typeof body.title === "string" ? body.title : "";
    const dateLabel = typeof body.dateLabel === "string" ? body.dateLabel : "";
    const tag = typeof body.tag === "string" ? body.tag : "";
    const image = typeof body.image === "string" ? body.image : "";
    const link = typeof body.link === "string" ? body.link : "";
    const draft = typeof body.draft === "boolean" ? body.draft : false;
    if (!title || !dateLabel || !tag) {
      return json({ error: "Missing required fields (title, dateLabel, tag)" }, { status: 400 });
    }
    const slugCandidate = normalizeSlugCandidate(typeof body.slug === "string" ? body.slug : "", title, "event");
    const slug = await ensureUniqueSlug("events", slugCandidate);
    const markdown = buildEventMarkdown({ title, dateLabel, tag, image, link, draft });
    const path = `src/content/events/${slug}.md`;
    await putFileToRepo({ path, content: markdown, message: `cms: add event ${slug}` });
    return json({ ok: true, event: { slug, title, dateLabel, tag, image, link, draft } });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const status = /slug/i.test(message) ? 400 : 500;
    return json({ error: message }, { status });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
