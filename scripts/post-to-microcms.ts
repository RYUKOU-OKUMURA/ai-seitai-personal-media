/**
 * Markdown 記事を microCMS に自動投稿するスクリプト
 *
 * 使い方:
 *   npm run cms:post -- src/content/blog/記事名.md
 *   npm run cms:post -- src/content/events/イベント名.md
 *
 * 動作:
 *   1. Markdown ファイルを読み込み、frontmatter と本文を分離
 *   2. 本文を Markdown → HTML に変換
 *   3. microCMS の POST/PUT API で投稿
 *
 * frontmatter に slug フィールドがあれば、その値を contentId として使用（URLスラッグになる）
 * slug がなければ microCMS が自動生成する
 * draft はデフォルト true（下書き）。公開する場合は draft: false を明示
 *
 * 必要な環境変数 (.env.local):
 *   MICROCMS_SERVICE_DOMAIN - microCMS のサービスドメイン
 *   MICROCMS_API_KEY        - 書き込み権限のある API キー
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';
import { loadProjectEnv, relativeToProject } from './blog-automation-common.ts';

export type ContentType = 'blog' | 'events';

export interface MicroCmsConfig {
  serviceDomain: string;
  apiKey: string;
}

export interface PostMarkdownOptions {
  forceDraft?: boolean;
  serviceDomain?: string;
  apiKey?: string;
}

export interface PostResult {
  id: string;
}

export interface PostMarkdownFileResult {
  absolutePath: string;
  relativePath: string;
  contentId?: string;
  contentType: ContentType;
  endpoint: string;
  id: string;
  isDraft: boolean;
  managementUrl: string;
  payload: Record<string, unknown>;
  title: string;
}

// ---------------------------------------------------------------------------
// CLI 引数パース
// ---------------------------------------------------------------------------
export function detectContentType(path: string): ContentType {
  if (path.includes('/content/blog/') || path.includes('content/blog/')) return 'blog';
  if (path.includes('/content/events/') || path.includes('content/events/')) return 'events';
  throw new Error(
    `ファイルパスからコンテンツタイプを判定できません: ${path}\n` +
      'src/content/blog/ または src/content/events/ 配下のファイルを指定してください',
  );
}

// ---------------------------------------------------------------------------
// Markdown → HTML 変換
// ---------------------------------------------------------------------------
export async function markdownToHtml(md: string): Promise<string> {
  return await marked(md, {
    breaks: false,
    gfm: true,
  });
}

// ---------------------------------------------------------------------------
// microCMS API 呼び出し
// ---------------------------------------------------------------------------
function resolveMicroCmsConfig(overrides: PostMarkdownOptions = {}): MicroCmsConfig {
  loadProjectEnv();
  const serviceDomain = overrides.serviceDomain ?? process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = overrides.apiKey ?? process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    throw new Error(
      '環境変数が設定されていません。.env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を追加してください。',
    );
  }

  return { serviceDomain, apiKey };
}

export function buildManagementUrl(serviceDomain: string, endpoint: string, id: string): string {
  return `https://${serviceDomain}.microcms.io/apis/${endpoint}/content/${id}`;
}

export async function postToMicroCMS(
  endpoint: string,
  payload: Record<string, unknown>,
  contentId?: string,
  isDraft?: boolean,
  config?: MicroCmsConfig,
): Promise<PostResult> {
  const microCmsConfig = config ?? resolveMicroCmsConfig();
  const baseUrl = `https://${microCmsConfig.serviceDomain}.microcms.io/api/v1/${endpoint}`;
  const draftQuery = isDraft ? '?status=draft' : '';

  const headers = {
    'X-MICROCMS-API-KEY': microCmsConfig.apiKey,
    'Content-Type': 'application/json',
  };

  let response: Response;
  if (contentId) {
    response = await fetch(`${baseUrl}/${contentId}${draftQuery}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    });
    // 404 または 400 "Content is not exists" の場合は新規作成として PUT を試行
    if (!response.ok) {
      const errorBody = await response.text();
      if (response.status === 404 || (response.status === 400 && errorBody.includes('Content is not exists'))) {
        response = await fetch(`${baseUrl}/${contentId}${draftQuery}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload),
        });
      } else {
        throw new Error(`microCMS API エラー (${response.status}): ${errorBody}`);
      }
    }
  } else {
    response = await fetch(`${baseUrl}${draftQuery}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
  }

  if (!response.ok) {
    const errorBody = await response.text();
    if (errorBody.includes('PATCH is forbidden')) {
      throw new Error(
        `microCMS API エラー: 既存コンテンツの更新には PATCH 権限が必要です。APIキー管理で PATCH にチェックを入れてください。`,
      );
    }
    throw new Error(`microCMS API エラー (${response.status}): ${errorBody}`);
  }

  return (await response.json()) as PostResult;
}

// ---------------------------------------------------------------------------
// ペイロード構築
// ---------------------------------------------------------------------------
function buildBlogPayload(
  frontmatter: Record<string, unknown>,
  htmlBody: string,
  isDraft: boolean,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    title: frontmatter.title,
    // ブログテンプレートは content、マイグレーションプラン準拠は body
    content: htmlBody,
  };
  // publishedAt は公開時のみ有効。下書きの場合は送信しない（microCMS API の仕様）
  if (!isDraft && frontmatter.publishedAt) {
    payload.publishedAt = frontmatter.publishedAt;
  }
  // category: テンプレートがコンテンツ参照（カテゴリAPI）の場合は送信しない。管理画面で手動設定
  return payload;
}

function buildEventPayload(
  frontmatter: Record<string, unknown>,
  htmlBody: string,
): Record<string, unknown> {
  // イベントAPI: title（テキストエリア）, contents（リッチエディタ）, eyecatch（画像）, category（セレクト）
  const title = (frontmatter.title as string) || '';
  const dateLabel = (frontmatter.dateLabel as string) || '';
  const tag = frontmatter.tag as string | undefined;
  const linkVal = (frontmatter.link as string) || '';
  const category = tag ? (Array.isArray(tag) ? tag : [tag]) : [];

  const header = [
    dateLabel && `<p class="text-gray-500 mb-4">${dateLabel}</p>`,
    tag && `<span class="inline-block px-3 py-1 bg-primary/10 text-primary rounded text-sm font-bold mb-4">${tag}</span>`,
    linkVal && linkVal !== '#' && `<p><a href="${linkVal}" target="_blank" rel="noopener">申し込みページへ</a></p>`,
  ]
    .filter(Boolean)
    .join('');
  const contentsHtml = header + htmlBody;

  const payload: Record<string, unknown> = {
    title,
    contents: contentsHtml,
    category,
  };
  // eyecatch: 画像URL（microCMS メディアライブラリの URL のみ有効。ローカルパスは送信しない）
  const imagePath = frontmatter.image as string | undefined;
  if (imagePath && imagePath.startsWith('http')) {
    payload.eyecatch = imagePath;
  }
  return payload;
}

// ---------------------------------------------------------------------------
// メイン処理
// ---------------------------------------------------------------------------
export async function postMarkdownFileToMicroCMS(
  filePath: string,
  options: PostMarkdownOptions = {},
): Promise<PostMarkdownFileResult> {
  const microCmsConfig = resolveMicroCmsConfig(options);
  const absolutePath = resolve(process.cwd(), filePath);
  const raw = readFileSync(absolutePath, 'utf-8');
  const { data: frontmatter, content: markdownBody } = matter(raw);

  const contentType = detectContentType(filePath);
  const endpoint = contentType === 'blog' ? 'blogs' : 'event';
  const contentId = (frontmatter.slug as string) || undefined;
  const isDraft = options.forceDraft === true ? true : frontmatter.draft !== false;

  const htmlBody = await markdownToHtml(markdownBody);
  const payload =
    contentType === 'blog'
      ? buildBlogPayload(frontmatter, htmlBody, isDraft)
      : buildEventPayload(frontmatter, htmlBody);

  const result = await postToMicroCMS(endpoint, payload, contentId, isDraft, microCmsConfig);

  return {
    absolutePath,
    relativePath: relativeToProject(absolutePath),
    contentId,
    contentType,
    endpoint,
    id: result.id,
    isDraft,
    managementUrl: buildManagementUrl(microCmsConfig.serviceDomain, endpoint, result.id),
    payload,
    title: String(frontmatter.title ?? ''),
  };
}

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('使い方: npm run cms:post -- <Markdownファイルパス>');
    console.error('例:     npm run cms:post -- src/content/blog/記事名.md');
    process.exit(1);
  }

  const absolutePath = resolve(process.cwd(), filePath);
  const raw = readFileSync(absolutePath, 'utf-8');
  const { data: frontmatter } = matter(raw);
  const contentType = detectContentType(filePath);
  const endpoint = contentType === 'blog' ? 'blogs' : 'event';
  const contentId = (frontmatter.slug as string) || undefined;
  const isDraft = frontmatter.draft !== false;

  console.log(`\n--- microCMS 投稿 ---`);
  console.log(`ファイル:     ${filePath}`);
  console.log(`タイプ:       ${contentType}`);
  console.log(`エンドポイント: ${endpoint}`);
  console.log(`contentId:    ${contentId ?? '(自動生成)'}`);
  console.log(`ステータス:   ${isDraft ? '下書き' : '公開'}`);
  console.log(`タイトル:     ${frontmatter.title}`);
  console.log('');

  const result = await postMarkdownFileToMicroCMS(filePath);

  console.log(`投稿完了: ${result.endpoint}/${result.id}`);
  console.log(`管理画面: ${result.managementUrl}`);
  console.log('');

  if (!frontmatter.slug) {
    console.log(`ヒント: frontmatter に slug: "${result.id}" を追加すると、次回以降は更新として扱われます`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((err) => {
    console.error('エラー:', err instanceof Error ? err.message : err);
    process.exit(1);
  });
}
