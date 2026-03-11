import { readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import {
  AUTOMATION_STATE_DIR,
  AUTOMATION_TMP_DIR,
  PROJECT_ROOT,
  SOURCES_ROOT,
  collectMarkdownFiles,
  extractExcerpt,
  extractMarkdownTitle,
  markdownToPlainText,
  readJsonFile,
  relativeToRoot,
  writeTextFile,
} from './blog-automation-common.ts';

const DEFAULT_HISTORY_PATH = `${AUTOMATION_STATE_DIR}/blog_automation_history.json`;
const DEFAULT_MAIN_SOURCE_DIR = `${SOURCES_ROOT}/AI系`;
const DEFAULT_STYLE_DIR = `${SOURCES_ROOT}/脳内メモ`;
const DEFAULT_AUXILIARY_DIR = `${SOURCES_ROOT}/noteメンバーシップ/ぶっちゃけ日記/投稿済み`;

const MIN_CONTENT_LENGTH = 220;
const DEFAULT_MAIN_CANDIDATE_LIMIT = 6;
const DEFAULT_STYLE_LIMIT = 2;
const DEFAULT_AUXILIARY_LIMIT = 4;
const DEFAULT_RECENT_MAIN_SOURCE_LIMIT = 14;

export interface Candidate {
  path: string;
  title: string;
  excerpt: string;
  score: number;
  charCount: number;
  modifiedAt: string;
}

export interface PreparedBlogContext {
  reportDate: string;
  mainCandidates: Candidate[];
  styleReferences: Candidate[];
  auxiliaryCandidates: Candidate[];
  excludedRecentSources: string[];
}

export interface BlogAutomationHistoryEntry {
  date: string;
  kind: 'blog' | 'skip';
  contentHash: string;
  postedAt: string;
  mainSource?: string;
  blogPath?: string;
}

export interface PrepareDailyBlogContextOptions {
  historyPath?: string;
  mainSourceDir?: string;
  styleDir?: string;
  auxiliaryDir?: string;
  mainCandidateLimit?: number;
  styleLimit?: number;
  auxiliaryLimit?: number;
  recentMainSourceLimit?: number;
  projectRoot?: string;
}

function parseReportDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid date '${value}'. Use YYYY-MM-DD.`);
  }

  return value;
}

function countMeaningfulCharacters(markdown: string): number {
  return markdownToPlainText(markdown).replace(/\s+/g, '').length;
}

function paragraphCount(markdown: string): number {
  return markdownToPlainText(markdown)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean).length;
}

function recentMainSources(historyPath: string, limit: number): string[] {
  const payload = readJsonFile<{ entries?: BlogAutomationHistoryEntry[] }>(historyPath, { entries: [] });
  const entries = Array.isArray(payload.entries) ? payload.entries : [];
  const paths: string[] = [];

  for (const entry of [...entries].reverse()) {
    if (!entry || typeof entry.mainSource !== 'string' || !entry.mainSource) {
      continue;
    }
    if (paths.includes(entry.mainSource)) {
      continue;
    }
    paths.push(entry.mainSource);
    if (paths.length >= limit) {
      break;
    }
  }

  return paths.reverse();
}

function buildCandidate(absolutePath: string, projectRoot: string): Candidate | null {
  const markdown = readFileSync(absolutePath, 'utf8');
  const charCount = countMeaningfulCharacters(markdown);
  if (charCount < MIN_CONTENT_LENGTH) {
    return null;
  }

  const excerpt = extractExcerpt(markdown);
  if (excerpt.length < 30) {
    return null;
  }

  const title = extractMarkdownTitle(absolutePath, markdown);
  const stats = statSync(absolutePath);
  const ageDays = Math.max(Math.floor((Date.now() - stats.mtimeMs) / (1000 * 60 * 60 * 24)), 0);
  const richnessScore = (Math.min(charCount, 6000) / 6000) * 4.5;
  const excerptScore = (Math.min(excerpt.length, 220) / 220) * 2.0;
  const structureScore = (Math.min(paragraphCount(markdown), 6) / 6) * 1.5;
  const recencyScore = Math.max(0, 1.5 - ageDays / 45);

  return {
    path: relativeToRoot(absolutePath, projectRoot),
    title,
    excerpt,
    score: Number((richnessScore + excerptScore + structureScore + recencyScore).toFixed(2)),
    charCount,
    modifiedAt: new Date(stats.mtimeMs).toISOString(),
  };
}

function collectRankedCandidates(
  directory: string,
  limit: number,
  excludedPaths: Set<string>,
  projectRoot: string,
): Candidate[] {
  const candidates = collectMarkdownFiles(directory)
    .map((filePath) => buildCandidate(filePath, projectRoot))
    .filter((candidate): candidate is Candidate => candidate !== null)
    .filter((candidate) => !excludedPaths.has(candidate.path));

  candidates.sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }
    if (right.modifiedAt !== left.modifiedAt) {
      return right.modifiedAt.localeCompare(left.modifiedAt);
    }
    return left.path.localeCompare(right.path, 'ja');
  });

  return candidates.slice(0, limit);
}

function collectStyleReferences(directory: string, limit: number, projectRoot: string): Candidate[] {
  const candidates = collectMarkdownFiles(directory)
    .filter((filePath) => filePath.includes('-SNS-'))
    .map((filePath) => buildCandidate(filePath, projectRoot))
    .filter((candidate): candidate is Candidate => candidate !== null);

  candidates.sort((left, right) => {
    if (right.modifiedAt !== left.modifiedAt) {
      return right.modifiedAt.localeCompare(left.modifiedAt);
    }
    if (right.score !== left.score) {
      return right.score - left.score;
    }
    return left.path.localeCompare(right.path, 'ja');
  });

  return candidates.slice(0, limit);
}

export function prepareDailyBlogContext(
  reportDate: string,
  options: PrepareDailyBlogContextOptions = {},
): PreparedBlogContext {
  const historyPath = options.historyPath ?? DEFAULT_HISTORY_PATH;
  const mainSourceDir = options.mainSourceDir ?? DEFAULT_MAIN_SOURCE_DIR;
  const styleDir = options.styleDir ?? DEFAULT_STYLE_DIR;
  const auxiliaryDir = options.auxiliaryDir ?? DEFAULT_AUXILIARY_DIR;
  const projectRoot = options.projectRoot ?? PROJECT_ROOT;
  const excludedRecentSources = recentMainSources(historyPath, options.recentMainSourceLimit ?? DEFAULT_RECENT_MAIN_SOURCE_LIMIT);
  const excludedPaths = new Set(excludedRecentSources);

  return {
    reportDate,
    mainCandidates: collectRankedCandidates(
      mainSourceDir,
      options.mainCandidateLimit ?? DEFAULT_MAIN_CANDIDATE_LIMIT,
      excludedPaths,
      projectRoot,
    ),
    styleReferences: collectStyleReferences(styleDir, options.styleLimit ?? DEFAULT_STYLE_LIMIT, projectRoot),
    auxiliaryCandidates: collectRankedCandidates(
      auxiliaryDir,
      options.auxiliaryLimit ?? DEFAULT_AUXILIARY_LIMIT,
      excludedPaths,
      projectRoot,
    ),
    excludedRecentSources,
  };
}

function renderCandidateSection(title: string, candidates: Candidate[], emptyMessage: string): string[] {
  const lines = [`## ${title}`, ''];
  if (candidates.length === 0) {
    lines.push(`- ${emptyMessage}`, '');
    return lines;
  }

  candidates.forEach((candidate, index) => {
    lines.push(`### ${index + 1}. ${candidate.title}`);
    lines.push(`- Path: \`${candidate.path}\``);
    lines.push(`- Score: ${candidate.score.toFixed(2)}`);
    lines.push(`- Characters: ${candidate.charCount}`);
    lines.push(`- Updated: ${candidate.modifiedAt}`);
    lines.push(`- Excerpt: ${candidate.excerpt}`);
    lines.push('');
  });

  return lines;
}

export function buildContextMarkdown(context: PreparedBlogContext): string {
  const lines = [
    `# Daily Blog Context ${context.reportDate}`,
    '',
    '- 主ソースは `sources/AI系/` から 1 本だけ選ぶ',
    '- 文体参考は `sources/脳内メモ/*-SNS-*.md` から 2 本使う',
    '- 補助参照は必要な場合だけ `sources/noteメンバーシップ/ぶっちゃけ日記/投稿済み/` から使う',
    '- `used_sources_<date>.json` は配列で保存し、`role: "main"` は 1 件だけにする',
    '- 本文生成は `new-blog` スキルに任せ、保存先は `src/content/blog/` にする',
    '',
  ];

  if (context.excludedRecentSources.length > 0) {
    lines.push('## 最近使った主ソース', '');
    context.excludedRecentSources.forEach((path) => lines.push(`- \`${path}\``));
    lines.push('');
  }

  lines.push(
    ...renderCandidateSection('AI系 主ソース候補', context.mainCandidates, '利用できる主ソース候補がありません。'),
    ...renderCandidateSection('文体参考 SNS メモ', context.styleReferences, '文体参考に使える SNS メモがありません。'),
    ...renderCandidateSection('補助候補', context.auxiliaryCandidates, '補助候補はありません。'),
  );

  return `${lines.join('\n').trim()}\n`;
}

function defaultOutputPath(reportDate: string): string {
  return `${AUTOMATION_TMP_DIR}/context_${reportDate}.md`;
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      date: { type: 'string' },
      output: { type: 'string' },
      'dry-run': { type: 'boolean' },
    },
    strict: true,
  });

  const reportDate = parseReportDate(String(values.date ?? ''));
  const outputPath = String(values.output ?? defaultOutputPath(reportDate));
  const context = prepareDailyBlogContext(reportDate);
  const markdown = buildContextMarkdown(context);

  if (values['dry-run']) {
    process.stdout.write(markdown);
    return;
  }

  writeTextFile(outputPath, markdown);
  process.stdout.write(`${outputPath}\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
