import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import matter from 'gray-matter';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));

export const PROJECT_ROOT = resolve(SCRIPT_DIR, '..');
export const AUTOMATION_ROOT = resolve(PROJECT_ROOT, 'automation');
export const AUTOMATION_TMP_DIR = resolve(AUTOMATION_ROOT, '.tmp');
export const AUTOMATION_STATE_DIR = resolve(AUTOMATION_ROOT, '.state');
export const SOURCES_ROOT = resolve(PROJECT_ROOT, 'sources');
export const DEFAULT_SHARED_SLACK_ENV_PATHS = [
  resolve(homedir(), 'マイドライブ（okumura@physical-balance-lab.net）', 'Obsidian Vault', 'SNSAutomation', '.env'),
  resolve(homedir(), 'マイドライブ（okumura@physical-balance-lab.net）', 'Obsidian Vault', 'SnapLog', '.env'),
];
const BLOG_SLACK_WEBHOOK_ENV_KEYS = ['BLOG_SLACK_WEBHOOK_URL', 'SLACK_WEBHOOK_URL'] as const;
const BLOG_SLACK_CHANNEL_ENV_KEYS = ['BLOG_SLACK_CHANNEL_ID', 'SLACK_CHANNEL_ID'] as const;

let projectEnvLoaded = false;

export interface MarkdownDocument {
  frontmatter: Record<string, unknown>;
  body: string;
  raw: string;
}

export function loadProjectEnv(): void {
  if (projectEnvLoaded) {
    return;
  }

  config({ path: resolve(PROJECT_ROOT, '.env.local'), quiet: true });
  projectEnvLoaded = true;
}

export function loadEnvFile(envPath: string): void {
  if (!existsSync(envPath)) {
    return;
  }

  for (const rawLine of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const normalized = line.startsWith('export ') ? line.slice(7).trim() : line;
    const separatorIndex = normalized.indexOf('=');
    if (separatorIndex <= 0) {
      continue;
    }

    const key = normalized.slice(0, separatorIndex).trim();
    const value = normalized
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

function resolveFirstEnvValue(keys: readonly string[]): string | null {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) {
      return value;
    }
  }

  return null;
}

export function resolveSlackWebhookUrl(searchPaths: string[] = DEFAULT_SHARED_SLACK_ENV_PATHS): string | null {
  loadProjectEnv();

  const existingWebhookUrl = resolveFirstEnvValue(BLOG_SLACK_WEBHOOK_ENV_KEYS);
  if (existingWebhookUrl) {
    return existingWebhookUrl;
  }

  for (const envPath of searchPaths) {
    loadEnvFile(envPath);
    const webhookUrl = resolveFirstEnvValue(BLOG_SLACK_WEBHOOK_ENV_KEYS);
    if (webhookUrl) {
      return webhookUrl;
    }
  }

  return null;
}

export function resolveSlackChannelId(searchPaths: string[] = DEFAULT_SHARED_SLACK_ENV_PATHS): string | null {
  loadProjectEnv();

  const existingChannelId = resolveFirstEnvValue(BLOG_SLACK_CHANNEL_ENV_KEYS);
  if (existingChannelId) {
    return existingChannelId;
  }

  for (const envPath of searchPaths) {
    loadEnvFile(envPath);
    const channelId = resolveFirstEnvValue(BLOG_SLACK_CHANNEL_ENV_KEYS);
    if (channelId) {
      return channelId;
    }
  }

  return null;
}

export function ensureParentDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

export function writeTextFile(filePath: string, text: string): void {
  ensureParentDir(filePath);
  writeFileSync(filePath, text, 'utf8');
}

export function readJsonFile<T>(filePath: string, fallback: T): T {
  if (!existsSync(filePath)) {
    return fallback;
  }

  try {
    return JSON.parse(readFileSync(filePath, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonFile(filePath: string, payload: unknown): void {
  writeTextFile(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

export function readMarkdownDocument(filePath: string): MarkdownDocument {
  const raw = readFileSync(filePath, 'utf8');
  const parsed = matter(raw);

  return {
    frontmatter: parsed.data as Record<string, unknown>,
    body: parsed.content.trim(),
    raw,
  };
}

export function stripFrontmatter(markdown: string): string {
  return matter(markdown).content.trim();
}

export function collapseWhitespace(text: string): string {
  return text.replace(/\u3000/g, ' ').replace(/\r/g, '\n').replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function markdownToPlainText(markdown: string): string {
  const source = stripFrontmatter(markdown);
  const lines: string[] = [];
  let inCodeBlock = false;

  for (const rawLine of source.split('\n')) {
    const line = rawLine.trimEnd();

    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    if (!line) {
      lines.push('');
      continue;
    }

    let normalized = line.replace(/^>\s?/, '');
    normalized = normalized.replace(/^#{1,6}\s+/, '');
    normalized = normalized.replace(/!\[[^\]]*]\([^)]+\)/g, ' ');
    normalized = normalized.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    normalized = normalized.replace(/[*_`>#-]+/g, ' ');
    normalized = normalized.replace(/https?:\/\/\S+/g, ' ');
    lines.push(collapseWhitespace(normalized));
  }

  return lines.join('\n').trim();
}

export function extractMarkdownTitle(filePath: string, markdown: string): string {
  const parsed = matter(markdown);
  const title = parsed.data.title;
  if (typeof title === 'string' && title.trim()) {
    return collapseWhitespace(title);
  }

  for (const rawLine of parsed.content.split('\n')) {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith('#')) {
      return collapseWhitespace(trimmed.replace(/^#+\s*/, ''));
    }
  }

  const stem = filePath.split(sep).at(-1)?.replace(/\.md$/i, '') ?? filePath;
  return collapseWhitespace(stem);
}

export function extractExcerpt(markdown: string, limit = 220): string {
  const plainText = markdownToPlainText(markdown);
  const paragraphs = plainText
    .split(/\n{2,}/)
    .map((paragraph) => collapseWhitespace(paragraph))
    .filter(Boolean);

  const candidate =
    paragraphs.find((paragraph) => paragraph.length >= 30 && !paragraph.startsWith('created:') && !paragraph.startsWith('source:')) ??
    collapseWhitespace(plainText);

  if (candidate.length <= limit) {
    return candidate;
  }

  return `${candidate.slice(0, Math.max(0, limit - 1))}…`;
}

export function collectMarkdownFiles(rootPath: string): string[] {
  if (!existsSync(rootPath)) {
    return [];
  }

  const files: string[] = [];
  const visitedDirectories = new Set<string>();

  const walk = (currentPath: string): void => {
    const stats = statSync(currentPath);

    if (stats.isDirectory()) {
      const realPath = realpathSync(currentPath);
      if (visitedDirectories.has(realPath)) {
        return;
      }

      visitedDirectories.add(realPath);
      for (const childName of readdirSync(currentPath)) {
        walk(resolve(currentPath, childName));
      }
      return;
    }

    if (stats.isFile() && extname(currentPath).toLowerCase() === '.md') {
      files.push(currentPath);
    }
  };

  walk(rootPath);
  files.sort((left, right) => left.localeCompare(right, 'ja'));
  return files;
}

export function relativeToRoot(targetPath: string, rootPath: string): string {
  const absoluteTarget = resolve(targetPath);
  const absoluteRoot = resolve(rootPath);
  const relativePath = relative(absoluteRoot, absoluteTarget);

  if (!relativePath || relativePath.startsWith('..')) {
    return absoluteTarget.split(sep).join('/');
  }

  return relativePath.split(sep).join('/');
}

export function relativeToProject(targetPath: string): string {
  return relativeToRoot(targetPath, PROJECT_ROOT);
}

export function sha256(text: string): string {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

function buildErrorParts(error: unknown): string[] {
  if (!(error instanceof Error)) {
    return [String(error)];
  }

  const parts = [error.message];
  const { cause } = error;
  if (!cause) {
    return parts;
  }

  if (cause instanceof Error) {
    if (cause.message && cause.message !== error.message) {
      parts.push(cause.message);
    }
    const causeRecord = cause as Error & {
      code?: string;
      syscall?: string;
      hostname?: string;
    };
    const metadata = [causeRecord.code, causeRecord.syscall, causeRecord.hostname].filter(Boolean).join(' ');
    if (metadata) {
      parts.push(metadata);
    }
    return parts;
  }

  if (typeof cause === 'string' && cause !== error.message) {
    parts.push(cause);
  }

  return parts;
}

export function formatNetworkFailure(target: string, error: unknown): string {
  const details = buildErrorParts(error).filter(Boolean).join(' | ');
  const dnsFailure = /\bENOTFOUND\b|EAI_AGAIN|getaddrinfo|name resolution|nodename nor servname|failed to resolve host/i.test(
    details,
  );

  if (!dnsFailure) {
    return `${target}: ${details}`;
  }

  return `${target}: ${details}. DNS resolution failed before the request reached the remote service. In Codex automations this often means the command ran inside sandboxed network restrictions, so rerun the delivery command with escalated permissions.`;
}

export async function sendSlackMessage(webhookUrl: string, message: string, channelId?: string | null): Promise<void> {
  const payload: Record<string, string> = { text: message };
  if (channelId) {
    payload.channel = channelId;
  }

  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(formatNetworkFailure('Failed to reach Slack webhook', error));
  }

  const responseText = (await response.text()).trim();
  if (!response.ok) {
    throw new Error(`Slack webhook returned HTTP ${response.status}: ${responseText}`);
  }
  if (responseText && responseText.toLowerCase() !== 'ok') {
    throw new Error(`Slack webhook returned unexpected response: ${responseText}`);
  }
}
