import type { APIRoute } from 'astro';
import { requireAdmin } from '../../../../server/adminAuth';
import { json } from '../../../../server/http';
import { ensureUniqueSlug, normalizeSlugCandidate } from '../../../../server/slug';
import { putFileToRepo } from '../../../../server/github';
import { buildBlogMarkdown } from '../../../../server/markdown';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const auth = await requireAdmin(request);
	if (auth) return auth;

	try {
		const body = await request.json().catch(() => null);
		if (!body || typeof body !== 'object') return json({ error: 'Invalid JSON body' }, { status: 400 });

		const title = typeof body.title === 'string' ? body.title : '';
		const publishedAt = typeof body.publishedAt === 'string' ? body.publishedAt : '';
		const category = typeof body.category === 'string' ? body.category : '';
		const image = typeof body.image === 'string' ? body.image : '';
		const excerpt = typeof body.excerpt === 'string' ? body.excerpt : '';
		const content = typeof body.content === 'string' ? body.content : '';
		const draft = typeof body.draft === 'boolean' ? body.draft : false;

		if (!title || !publishedAt || !category || !excerpt) {
			return json({ error: 'Missing required fields (title, publishedAt, category, excerpt)' }, { status: 400 });
		}

		const slugCandidate = normalizeSlugCandidate(typeof body.slug === 'string' ? body.slug : '', title, 'post');
		const slug = await ensureUniqueSlug('blog', slugCandidate);

		const markdown = buildBlogMarkdown({ title, publishedAt, category, image, excerpt, content, draft });
		const path = `src/content/blog/${slug}.md`;

		await putFileToRepo({ path, content: markdown, message: `cms: add blog ${slug}` });

		return json({ ok: true, post: { slug, title, publishedAt, category, image, excerpt, content, draft } });
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		const status = /slug/i.test(message) ? 400 : 500;
		return json({ error: message }, { status });
	}
};
