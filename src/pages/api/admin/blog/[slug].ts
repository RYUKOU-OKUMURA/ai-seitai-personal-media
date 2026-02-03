import type { APIRoute } from 'astro';
import { requireAdmin } from '../../../../server/adminAuth';
import { json } from '../../../../server/http';
import { deleteFileFromRepo, putFileToRepo } from '../../../../server/github';
import { buildBlogMarkdown } from '../../../../server/markdown';
import { assertSafeSlug } from '../../../../server/slug';

export const prerender = false;

export const PUT: APIRoute = async ({ params, request }) => {
	const auth = requireAdmin(request);
	if (auth) return auth;

	try {
		const slug = assertSafeSlug(params.slug);
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

export const DELETE: APIRoute = async ({ params, request }) => {
	const auth = requireAdmin(request);
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
