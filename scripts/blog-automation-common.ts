import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, realpathSync, statSync, writeFileSync } from 'node:fs';
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

export function resolveSlackWebhookUrl(): string | null {
  loadProjectEnv();
  const webhookUrl = process.env.SLACK_WEBHOOK_URL?.trim();
  return webhookUrl ? webhookUrl : null;
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

export async function sendSlackMessage(webhookUrl: string, message: string): Promise<void> {
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ text: message }),
  });

  const responseText = (await response.text()).trim();
  if (!response.ok) {
    throw new Error(`Slack webhook returned HTTP ${response.status}: ${responseText}`);
  }
  if (responseText && responseText.toLowerCase() !== 'ok') {
    throw new Error(`Slack webhook returned unexpected response: ${responseText}`);
  }
}
