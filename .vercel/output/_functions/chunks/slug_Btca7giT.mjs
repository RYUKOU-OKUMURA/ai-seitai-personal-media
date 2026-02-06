const GITHUB_API_BASE = "https://api.github.com";
const getRepoConfig = () => {
  throw new Error("GITHUB_TOKEN is not configured on the server");
};
const encodeRepoPath = (path) => path.split("/").map(encodeURIComponent).join("/");
const githubFetch = async (path, init) => {
  const { token } = getRepoConfig();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Accept", "application/vnd.github+json");
  headers.set("X-GitHub-Api-Version", "2022-11-28");
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json; charset=utf-8");
  const res = await fetch(`${GITHUB_API_BASE}${path}`, { ...init, headers });
  return res;
};
const requireOk = async (res) => {
  if (res.ok) return res;
  const text = await res.text().catch(() => "");
  throw new Error(`GitHub API error: ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`);
};
const getContentSha = async (repoPath) => {
  const { repo, branch } = getRepoConfig();
  const res = await githubFetch(
    `/repos/${repo}/contents/${encodeRepoPath(repoPath)}?ref=${encodeURIComponent(branch)}`,
    { method: "GET" }
  );
  if (res.status === 404) return null;
  await requireOk(res);
  const data = await res.json();
  return data.sha ?? null;
};
const fileExistsInRepo = async (repoPath) => Boolean(await getContentSha(repoPath));
const putFileToRepo = async (args) => {
  const { repo, branch } = getRepoConfig();
  const existingSha = await getContentSha(args.path);
  const body = {
    message: args.message,
    branch,
    content: Buffer.from(args.content, "utf8").toString("base64"),
    ...existingSha ? { sha: existingSha } : {}
  };
  const res = await githubFetch(`/repos/${repo}/contents/${encodeRepoPath(args.path)}`, {
    method: "PUT",
    body: JSON.stringify(body)
  });
  await requireOk(res);
};
const deleteFileFromRepo = async (args) => {
  const { repo, branch } = getRepoConfig();
  const existingSha = await getContentSha(args.path);
  if (!existingSha) throw new Error(`File not found in repo: ${args.path}`);
  const body = { message: args.message, branch, sha: existingSha };
  const res = await githubFetch(`/repos/${repo}/contents/${encodeRepoPath(args.path)}`, {
    method: "DELETE",
    body: JSON.stringify(body)
  });
  await requireOk(res);
};

const yamlString = (value) => JSON.stringify(value ?? "");
const buildBlogMarkdown = (post) => {
  const content = (post.content ?? "").trim();
  return [
    "---",
    `title: ${yamlString(post.title)}`,
    `publishedAt: ${yamlString(post.publishedAt)}`,
    `category: ${yamlString(post.category)}`,
    `image: ${yamlString(post.image ?? "")}`,
    `excerpt: ${yamlString(post.excerpt)}`,
    `draft: ${post.draft ? "true" : "false"}`,
    "---",
    "",
    content,
    ""
  ].join("\n");
};
const buildEventMarkdown = (event) => {
  return [
    "---",
    `title: ${yamlString(event.title)}`,
    `dateLabel: ${yamlString(event.dateLabel)}`,
    `image: ${yamlString(event.image ?? "")}`,
    `tag: ${yamlString(event.tag)}`,
    `link: ${yamlString(event.link ?? "")}`,
    `draft: ${event.draft ? "true" : "false"}`,
    "---",
    ""
  ].join("\n");
};

const assertSafeSlug = (slug) => {
  if (typeof slug !== "string" || slug.length === 0) throw new Error("Missing slug");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Invalid slug format");
  return slug;
};
const slugify = (input) => input.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "").slice(0, 80);
const timestampSlug = (prefix) => {
  const now = /* @__PURE__ */ new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const mm = String(now.getUTCMinutes()).padStart(2, "0");
  const ss = String(now.getUTCSeconds()).padStart(2, "0");
  return `${prefix}-${y}${m}${d}${hh}${mm}${ss}`;
};
const normalizeSlugCandidate = (provided, title, prefix) => {
  const trimmed = provided.trim();
  if (trimmed) {
    const s = slugify(trimmed);
    if (!s) throw new Error("Invalid slug");
    return assertSafeSlug(s);
  }
  const fromTitle = slugify(title);
  if (fromTitle) return assertSafeSlug(fromTitle);
  return assertSafeSlug(timestampSlug(prefix));
};
const ensureUniqueSlug = async (collection, baseSlug) => {
  const directory = collection === "blog" ? "src/content/blog" : "src/content/events";
  const ext = ".md";
  let candidate = baseSlug;
  for (let i = 0; i < 50; i += 1) {
    const path = `${directory}/${candidate}${ext}`;
    const exists = await fileExistsInRepo(path);
    if (!exists) return candidate;
    candidate = `${baseSlug}-${i + 2}`;
  }
  return `${baseSlug}-${Date.now()}`;
};

export { assertSafeSlug as a, buildBlogMarkdown as b, buildEventMarkdown as c, deleteFileFromRepo as d, ensureUniqueSlug as e, normalizeSlugCandidate as n, putFileToRepo as p };
