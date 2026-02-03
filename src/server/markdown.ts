const yamlString = (value: string) => JSON.stringify(value ?? '');

export const buildBlogMarkdown = (post: {
	title: string;
	publishedAt: string;
	category: string;
	image: string;
	excerpt: string;
	content: string;
	draft: boolean;
}) => {
	const content = (post.content ?? '').trim();
	return [
		'---',
		`title: ${yamlString(post.title)}`,
		`publishedAt: ${yamlString(post.publishedAt)}`,
		`category: ${yamlString(post.category)}`,
		`image: ${yamlString(post.image ?? '')}`,
		`excerpt: ${yamlString(post.excerpt)}`,
		`draft: ${post.draft ? 'true' : 'false'}`,
		'---',
		'',
		content,
		'',
	].join('\n');
};

export const buildEventMarkdown = (event: {
	title: string;
	dateLabel: string;
	tag: string;
	image: string;
	link: string;
	draft: boolean;
}) => {
	return [
		'---',
		`title: ${yamlString(event.title)}`,
		`dateLabel: ${yamlString(event.dateLabel)}`,
		`image: ${yamlString(event.image ?? '')}`,
		`tag: ${yamlString(event.tag)}`,
		`link: ${yamlString(event.link ?? '')}`,
		`draft: ${event.draft ? 'true' : 'false'}`,
		'---',
		'',
	].join('\n');
};

