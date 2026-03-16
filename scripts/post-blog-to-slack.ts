import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import {
  AUTOMATION_STATE_DIR,
  collapseWhitespace,
  loadProjectEnv,
  readJsonFile,
  readMarkdownDocument,
  relativeToProject,
  resolveSlackChannelId,
  resolveSlackWebhookUrl,
  sendSlackMessage,
  sha256,
  writeJsonFile,
} from './blog-automation-common.ts';
import { type PostMarkdownFileResult, postMarkdownFileToMicroCMS } from './post-to-microcms.ts';

const DEFAULT_HISTORY_PATH = `${AUTOMATION_STATE_DIR}/blog_automation_history.json`;
const MAX_HISTORY_ENTRIES = 180;
const MAX_SLACK_MESSAGE_LENGTH = 35000;

export interface UsedSource {
  role: string;
  path: string;
  title: string;
  reason: string;
}

export interface BlogAutomationHistoryEntry {
  date: string;
  kind: 'blog' | 'skip';
  contentHash: string;
  postedAt: string;
  mainSource?: string;
  blogPath?: string;
}

export interface PublishResult {
  delivered: boolean;
  skippedDuplicate: boolean;
  message: string;
  contentHash: string;
  cmsResult?: PostMarkdownFileResult;
}

export interface PublishBlogOptions {
  reportDate: string;
  blogPath: string;
  sourcesPath: string;
  historyPath?: string;
  force?: boolean;
  dryRun?: boolean;
  cmsDraft?: boolean;
  webhookUrl?: string | null;
}

export interface PublishSkipOptions {
  reportDate: string;
  reason: string;
  historyPath?: string;
  force?: boolean;
  dryRun?: boolean;
  webhookUrl?: string | null;
}

interface PublishDependencies {
  sendSlack?: (webhookUrl: string, message: string, channelId?: string | null) => Promise<void>;
  postToMicroCMS?: (blogPath: string, options: { forceDraft: boolean }) => Promise<PostMarkdownFileResult>;
}

function parseReportDate(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid date '${value}'. Use YYYY-MM-DD.`);
  }

  return value;
}

function loadHistory(historyPath: string): BlogAutomationHistoryEntry[] {
  const payload = readJsonFile<{ entries?: BlogAutomationHistoryEntry[] }>(historyPath, { entries: [] });
  return Array.isArray(payload.entries) ? payload.entries : [];
}

function saveHistory(historyPath: string, entries: BlogAutomationHistoryEntry[]): void {
  writeJsonFile(historyPath, { entries: entries.slice(-MAX_HISTORY_ENTRIES) });
}

export function loadUsedSources(sourcesPath: string): UsedSource[] {
  const payload = readJsonFile<unknown>(sourcesPath, []);
  if (!Array.isArray(payload) || payload.length === 0) {
    throw new Error('Used sources JSON must be a non-empty array.');
  }

  const usedSources = payload.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new Error('Each source entry must be an object.');
    }

    const role = String((item as Record<string, unknown>).role ?? '').trim();
    const path = String((item as Record<string, unknown>).path ?? '').trim();
    const title = String((item as Record<string, unknown>).title ?? '').trim();
    const reason = String((item as Record<string, unknown>).reason ?? '').trim();

    if (!role || !path || !title || !reason) {
      throw new Error('Each source entry requires role, path, title, and reason.');
    }

    return { role, path, title, reason };
  });

  const mainSources = usedSources.filter((source) => source.role === 'main');
  if (mainSources.length !== 1) {
    throw new Error('Used sources JSON must include exactly one main source.');
  }
  if (!mainSources[0].path.startsWith('sources/AI系/')) {
    throw new Error('The main source must come from sources/AI系/.');
  }

  return usedSources;
}

function buildSourcesSection(usedSources: UsedSource[]): string[] {
  return usedSources.map((source) => `- [${source.role}] ${source.path} | ${source.title} | ${source.reason}`);
}

export function buildBlogSlackMessage(
  reportDate: string,
  blogPath: string,
  usedSources: UsedSource[],
  cmsResult?: PostMarkdownFileResult,
): { message: string; contentHash: string } {
  const { frontmatter, body } = readMarkdownDocument(blogPath);
  const title = collapseWhitespace(String(frontmatter.title ?? ''));
  const slug = collapseWhitespace(String(frontmatter.slug ?? ''));
  const excerpt = collapseWhitespace(String(frontmatter.excerpt ?? ''));
  const relativeBlogPath = relativeToProject(blogPath);
  const contentHash = sha256(body);

  const lines = [
    `ブログ下書きを作成しました (${reportDate})`,
    `タイトル: ${title || '(未設定)'}`,
    `slug: ${slug || '(未設定)'}`,
    `excerpt: ${excerpt || '(未設定)'}`,
    `保存先: ${relativeBlogPath}`,
  ];

  if (cmsResult) {
    lines.push(`microCMS: ${cmsResult.endpoint}/${cmsResult.id} (${cmsResult.isDraft ? 'draft' : 'published'})`);
    lines.push(`管理画面: ${cmsResult.managementUrl}`);
  } else {
    lines.push('microCMS: 実行なし');
  }

  lines.push('', '使用ソース:');
  lines.push(...buildSourcesSection(usedSources));
  lines.push('', '本文:', body);

  return {
    message: lines.join('\n').trim(),
    contentHash,
  };
}

export function buildSkipMessage(reportDate: string, reason: string): { message: string; contentHash: string } {
  const message = [`本日のブログ下書きは未作成です (${reportDate})`, `理由: ${reason}`].join('\n');
  return {
    message,
    contentHash: sha256(message),
  };
}

function assertMessageLength(message: string): void {
  if (message.length > MAX_SLACK_MESSAGE_LENGTH) {
    throw new Error(
      `Slack message is too long (${message.length} characters). Reduce the article length before posting.`,
    );
  }
}

function resolveSlackTarget(
  providedWebhookUrl?: string | null,
  providedChannelId?: string | null,
  dryRun?: boolean,
): { webhookUrl: string; channelId: string | null } {
  const channelId = providedChannelId ?? resolveSlackChannelId();

  if (dryRun) {
    return { webhookUrl: providedWebhookUrl ?? 'dry-run', channelId };
  }

  if (providedWebhookUrl) {
    return { webhookUrl: providedWebhookUrl, channelId };
  }

  const webhookUrl = resolveSlackWebhookUrl();
  if (!webhookUrl) {
    throw new Error(
      'SLACK_WEBHOOK_URL is not set. Add BLOG_SLACK_WEBHOOK_URL or SLACK_WEBHOOK_URL to .env.local, the environment, SNSAutomation/.env, or SnapLog/.env.',
    );
  }
  return { webhookUrl, channelId };
}

export async function publishBlogToSlack(
  options: PublishBlogOptions,
  dependencies: PublishDependencies = {},
): Promise<PublishResult> {
  loadProjectEnv();

  const historyPath = options.historyPath ?? DEFAULT_HISTORY_PATH;
  const usedSources = loadUsedSources(options.sourcesPath);
  const mainSource = usedSources.find((source) => source.role === 'main')!;
  const history = loadHistory(historyPath);
  const contentHash = sha256(readMarkdownDocument(options.blogPath).body);
  const postToCms = dependencies.postToMicroCMS ?? ((blogPath: string, cmsOptions: { forceDraft: boolean }) =>
    postMarkdownFileToMicroCMS(blogPath, cmsOptions));
  const sendSlack = dependencies.sendSlack ?? sendSlackMessage;
  const duplicate = history.find(
    (entry) => entry.contentHash === contentHash || (entry.mainSource && entry.mainSource === mainSource.path),
  );

  if (duplicate && !options.force) {
    const { message } = buildBlogSlackMessage(options.reportDate, options.blogPath, usedSources);
    return {
      delivered: false,
      skippedDuplicate: true,
      message,
      contentHash,
    };
  }

  let cmsResult: PostMarkdownFileResult | undefined;
  if (options.cmsDraft && !options.dryRun) {
    cmsResult = await postToCms(options.blogPath, { forceDraft: true });
  }

  const { message } = buildBlogSlackMessage(options.reportDate, options.blogPath, usedSources, cmsResult);

  assertMessageLength(message);

  if (options.dryRun) {
    return {
      delivered: false,
      skippedDuplicate: false,
      message,
      contentHash,
      cmsResult,
    };
  }

  const slackTarget = dependencies.sendSlack
    ? { webhookUrl: options.webhookUrl ?? 'injected-webhook', channelId: resolveSlackChannelId() }
    : resolveSlackTarget(options.webhookUrl, undefined, options.dryRun);
  await sendSlack(slackTarget.webhookUrl, message, slackTarget.channelId);

  history.push({
    date: options.reportDate,
    kind: 'blog',
    contentHash,
    postedAt: new Date().toISOString(),
    mainSource: mainSource.path,
    blogPath: relativeToProject(options.blogPath),
  });
  saveHistory(historyPath, history);

  return {
    delivered: true,
    skippedDuplicate: false,
    message,
    contentHash,
    cmsResult,
  };
}

export async function publishSkipToSlack(
  options: PublishSkipOptions,
  dependencies: PublishDependencies = {},
): Promise<PublishResult> {
  loadProjectEnv();

  const historyPath = options.historyPath ?? DEFAULT_HISTORY_PATH;
  const history = loadHistory(historyPath);
  const sendSlack = dependencies.sendSlack ?? sendSlackMessage;
  const { message, contentHash } = buildSkipMessage(options.reportDate, options.reason);

  if (!options.force && history.some((entry) => entry.contentHash === contentHash)) {
    return {
      delivered: false,
      skippedDuplicate: true,
      message,
      contentHash,
    };
  }

  assertMessageLength(message);

  if (options.dryRun) {
    return {
      delivered: false,
      skippedDuplicate: false,
      message,
      contentHash,
    };
  }

  const slackTarget = dependencies.sendSlack
    ? { webhookUrl: options.webhookUrl ?? 'injected-webhook', channelId: resolveSlackChannelId() }
    : resolveSlackTarget(options.webhookUrl, undefined, options.dryRun);
  await sendSlack(slackTarget.webhookUrl, message, slackTarget.channelId);

  history.push({
    date: options.reportDate,
    kind: 'skip',
    contentHash,
    postedAt: new Date().toISOString(),
  });
  saveHistory(historyPath, history);

  return {
    delivered: true,
    skippedDuplicate: false,
    message,
    contentHash,
  };
}

async function main(): Promise<void> {
  const { values } = parseArgs({
    options: {
      date: { type: 'string' },
      blog: { type: 'string' },
      sources: { type: 'string' },
      'skip-reason': { type: 'string' },
      'cms-draft': { type: 'boolean' },
      force: { type: 'boolean' },
      'dry-run': { type: 'boolean' },
    },
    strict: true,
  });

  const reportDate = parseReportDate(String(values.date ?? ''));
  const blogPath = values.blog ? String(values.blog) : undefined;
  const sourcesPath = values.sources ? String(values.sources) : undefined;
  const skipReason = values['skip-reason'] ? String(values['skip-reason']) : undefined;

  if ((blogPath ? 1 : 0) + (skipReason ? 1 : 0) !== 1) {
    throw new Error('Specify exactly one of --blog or --skip-reason.');
  }

  let result: PublishResult;
  if (blogPath) {
    if (!sourcesPath) {
      throw new Error('--sources is required when --blog is provided.');
    }

    result = await publishBlogToSlack({
      reportDate,
      blogPath,
      sourcesPath,
      cmsDraft: Boolean(values['cms-draft']),
      force: Boolean(values.force),
      dryRun: Boolean(values['dry-run']),
    });
  } else {
    result = await publishSkipToSlack({
      reportDate,
      reason: skipReason!,
      force: Boolean(values.force),
      dryRun: Boolean(values['dry-run']),
    });
  }

  process.stdout.write(`${result.message}\n`);
  if (result.skippedDuplicate) {
    process.stdout.write('-- skipped duplicate delivery --\n');
    return;
  }
  if (values['dry-run']) {
    process.stdout.write('-- dry-run: nothing sent --\n');
    return;
  }
  process.stdout.write('-- delivered to Slack --\n');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
