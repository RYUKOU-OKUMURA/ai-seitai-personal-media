import type { APIRoute } from 'astro';
import { requireAdmin } from '../../../../server/adminAuth';
import { json } from '../../../../server/http';
import { deleteFileFromRepo, putFileToRepo } from '../../../../server/github';
import { buildEventMarkdown } from '../../../../server/markdown';
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
		const dateLabel = typeof body.dateLabel === 'string' ? body.dateLabel : '';
		const tag = typeof body.tag === 'string' ? body.tag : '';
		const image = typeof body.image === 'string' ? body.image : '';
		const link = typeof body.link === 'string' ? body.link : '';
		const draft = typeof body.draft === 'boolean' ? body.draft : false;

		if (!title || !dateLabel || !tag) {
			return json({ error: 'Missing required fields (title, dateLabel, tag)' }, { status: 400 });
		}

		const markdown = buildEventMarkdown({ title, dateLabel, tag, image, link, draft });
		const path = `src/content/events/${slug}.md`;

		await putFileToRepo({ path, content: markdown, message: `cms: update event ${slug}` });

		return json({ ok: true, event: { slug, title, dateLabel, tag, image, link, draft } });
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
		const path = `src/content/events/${slug}.md`;
		await deleteFileFromRepo({ path, message: `cms: delete event ${slug}` });
		return json({ ok: true });
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		const status = /slug/i.test(message) ? 400 : 500;
		return json({ error: message }, { status });
	}
};
