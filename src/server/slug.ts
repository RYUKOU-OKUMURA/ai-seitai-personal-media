import { fileExistsInRepo } from './github';

export const assertSafeSlug = (slug: unknown) => {
	if (typeof slug !== 'string' || slug.length === 0) throw new Error('Missing slug');
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid slug format');
	return slug;
};

export const slugify = (input: string) =>
	input
		.normalize('NFKD')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-+|-+$)/g, '')
		.slice(0, 80);

const timestampSlug = (prefix: string) => {
	const now = new Date();
	const y = now.getUTCFullYear();
	const m = String(now.getUTCMonth() + 1).padStart(2, '0');
	const d = String(now.getUTCDate()).padStart(2, '0');
	const hh = String(now.getUTCHours()).padStart(2, '0');
	const mm = String(now.getUTCMinutes()).padStart(2, '0');
	const ss = String(now.getUTCSeconds()).padStart(2, '0');
	return `${prefix}-${y}${m}${d}${hh}${mm}${ss}`;
};

export const normalizeSlugCandidate = (provided: string, title: string, prefix: string) => {
	const trimmed = provided.trim();
	if (trimmed) {
		const s = slugify(trimmed);
		if (!s) throw new Error('Invalid slug');
		return assertSafeSlug(s);
	}
	const fromTitle = slugify(title);
	if (fromTitle) return assertSafeSlug(fromTitle);
	return assertSafeSlug(timestampSlug(prefix));
};

export const ensureUniqueSlug = async (collection: 'blog' | 'events', baseSlug: string) => {
	const directory = collection === 'blog' ? 'src/content/blog' : 'src/content/events';
	const ext = '.md';

	let candidate = baseSlug;
	for (let i = 0; i < 50; i += 1) {
		const path = `${directory}/${candidate}${ext}`;
		const exists = await fileExistsInRepo(path);
		if (!exists) return candidate;
		candidate = `${baseSlug}-${i + 2}`;
	}
	return `${baseSlug}-${Date.now()}`;
};

