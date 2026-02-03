const GITHUB_API_BASE = 'https://api.github.com';

type RepoConfig = {
	token: string;
	repo: string;
	branch: string;
};

const getRepoConfig = (): RepoConfig => {
	const token = import.meta.env.GITHUB_TOKEN;
	if (!token) throw new Error('GITHUB_TOKEN is not configured on the server');

	return {
		token,
		repo: import.meta.env.GITHUB_REPO ?? 'RYUKOU-OKUMURA/ai-seitai-personal-media',
		branch: import.meta.env.GITHUB_BRANCH ?? 'main',
	};
};

const encodeRepoPath = (path: string) => path.split('/').map(encodeURIComponent).join('/');

const githubFetch = async (path: string, init: RequestInit) => {
	const { token } = getRepoConfig();

	const headers = new Headers(init.headers);
	headers.set('Authorization', `Bearer ${token}`);
	headers.set('Accept', 'application/vnd.github+json');
	headers.set('X-GitHub-Api-Version', '2022-11-28');
	if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json; charset=utf-8');

	const res = await fetch(`${GITHUB_API_BASE}${path}`, { ...init, headers });
	return res;
};

const requireOk = async (res: Response) => {
	if (res.ok) return res;
	const text = await res.text().catch(() => '');
	throw new Error(`GitHub API error: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`);
};

const getContentSha = async (repoPath: string): Promise<string | null> => {
	const { repo, branch } = getRepoConfig();
	const res = await githubFetch(
		`/repos/${repo}/contents/${encodeRepoPath(repoPath)}?ref=${encodeURIComponent(branch)}`,
		{ method: 'GET' },
	);
	if (res.status === 404) return null;
	await requireOk(res);
	const data = (await res.json()) as { sha?: string };
	return data.sha ?? null;
};

export const fileExistsInRepo = async (repoPath: string) => Boolean(await getContentSha(repoPath));

export const putFileToRepo = async (args: { path: string; content: string; message: string }) => {
	const { repo, branch } = getRepoConfig();
	const existingSha = await getContentSha(args.path);

	const body = {
		message: args.message,
		branch,
		content: Buffer.from(args.content, 'utf8').toString('base64'),
		...(existingSha ? { sha: existingSha } : {}),
	};

	const res = await githubFetch(`/repos/${repo}/contents/${encodeRepoPath(args.path)}`, {
		method: 'PUT',
		body: JSON.stringify(body),
	});
	await requireOk(res);
};

export const deleteFileFromRepo = async (args: { path: string; message: string }) => {
	const { repo, branch } = getRepoConfig();
	const existingSha = await getContentSha(args.path);
	if (!existingSha) throw new Error(`File not found in repo: ${args.path}`);

	const body = { message: args.message, branch, sha: existingSha };
	const res = await githubFetch(`/repos/${repo}/contents/${encodeRepoPath(args.path)}`, {
		method: 'DELETE',
		body: JSON.stringify(body),
	});
	await requireOk(res);
};

