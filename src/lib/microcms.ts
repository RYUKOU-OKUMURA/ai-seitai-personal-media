/**
 * microCMS クライアントライブラリ
 *
 * ブログ・イベントのコンテンツを microCMS API から取得する
 */

import { createClient } from 'microcms-js-sdk';
import type { BlogPostListItem, EventListItem } from '../types/core';

// microCMS クライアント初期化
export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN ?? '',
  apiKey: import.meta.env.MICROCMS_API_KEY ?? '',
});

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface MicroCMSImage {
  url: string;
  width?: number;
  height?: number;
}

/** API レスポンス（テンプレートは content/eyecatch、マイグレーションプランは body/image） */
export interface Blog {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  publishedAt_field?: string;
  category?: string[] | { id: string } | { id: string; name?: string } | null;
  image?: MicroCMSImage;
  eyecatch?: MicroCMSImage; // ブログテンプレート用
  excerpt?: string;
  body?: string;
  content?: string; // ブログテンプレート用
}

/** API レスポンス（title=テキスト, contents=本文, eyecatch=画像, category=タグ） */
export interface Event {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title?: string;
  contents?: string; // リッチエディタ（本文 HTML）
  eyecatch?: MicroCMSImage;
  category?: string[];
  dateLabel?: string;
  tag?: string[];
  image?: MicroCMSImage;
  link?: string;
  body?: string;
  event?: string; // 旧スキーマ用
}

interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

/** HTML から最初の h1 テキストを抽出 */
function extractH1(html: string): string {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : '';
}

/** HTML から dateLabel（text-gray-500 の p タグ）を抽出 */
function extractDateLabel(html: string): string {
  const match = html.match(
    /<p class="text-gray-500 mb-4">([\s\S]*?)<\/p>/i,
  );
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : '';
}

/** イベントの本文のみ抽出（h1 とヘッダー部分を除去） */
function extractEventBody(html: string): string {
  const body = html
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '')
    .replace(/<p class="text-gray-500 mb-4">[\s\S]*?<\/p>/i, '')
    .replace(/<span class="inline-block px-3 py-1[^"]*">[\s\S]*?<\/span>/i, '')
    .replace(/<p><a href="[^"]*" target="_blank"[^>]*>申し込みページへ<\/a><\/p>/i, '');
  return body.trim();
}

/** HTML から申し込みリンク URL を抽出 */
function extractEventLink(html: string): string {
  const match = html.match(/<a href="([^"]+)" target="_blank"[^>]*>申し込みページへ<\/a>/i);
  return match ? match[1] : '';
}

/** ブログの画像URL（image または eyecatch） */
function getBlogImageUrl(blog: Blog): string {
  return blog.image?.url ?? blog.eyecatch?.url ?? '';
}

// ---------------------------------------------------------------------------
// ブログ取得関数
// ---------------------------------------------------------------------------

/**
 * ブログ一覧を取得
 */
export async function getBlogs(): Promise<BlogPostListItem[]> {
  const response = await client.get<MicroCMSListResponse<Blog>>({
    endpoint: 'blogs',
    queries: {
      orders: '-publishedAt',
      limit: 100,
    },
  });

  return response.contents.map((blog) => {
    const cat = blog.category;
    const categoryStr = Array.isArray(cat) ? cat[0] : typeof cat === 'object' && cat && 'name' in cat ? (cat as { name?: string }).name : '';
    return {
      slug: blog.id,
      title: blog.title,
      publishedAt: blog.publishedAt,
      category: categoryStr ?? '',
      image: getBlogImageUrl(blog),
      excerpt: blog.excerpt ?? '',
    };
  });
}

/**
 * ブログ詳細を取得
 */
export async function getBlogDetail(
  contentId: string,
  draftKey?: string,
): Promise<Blog | null> {
  try {
    const queries: Record<string, string> = {};
    if (draftKey) {
      queries.draftKey = draftKey;
    }

    const blog = await client.get<Blog>({
      endpoint: 'blogs',
      contentId,
      queries,
    });

    // テンプレートは content/eyecatch、マイグレーションプランは body/image。統一して返す
    const imageUrl = getBlogImageUrl(blog);
    return {
      ...blog,
      body: blog.body ?? blog.content ?? '',
      excerpt: blog.excerpt ?? '',
      image: imageUrl ? { url: imageUrl } : undefined,
      category: Array.isArray(blog.category) ? blog.category : blog.category ? [typeof blog.category === 'object' && 'name' in blog.category ? (blog.category as { name?: string }).name ?? '' : ''] : [],
    };
  } catch {
    return null;
  }
}

/**
 * 全ブログの slug 一覧を取得（静的パス生成用）
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const response = await client.get<MicroCMSListResponse<Blog>>({
    endpoint: 'blogs',
    queries: {
      fields: 'id',
      limit: 100,
    },
  });

  return response.contents.map((blog) => blog.id);
}

// ---------------------------------------------------------------------------
// イベント取得関数
// ---------------------------------------------------------------------------

/**
 * イベント一覧を取得
 */
export async function getEvents(): Promise<EventListItem[]> {
  const response = await client.get<MicroCMSListResponse<Event>>({
    endpoint: 'event',
    queries: {
      orders: '-publishedAt',
      limit: 100,
    },
  });

  return response.contents.map((ev) => {
    const html = ev.title ?? ev.event ?? '';
    const hasStructuredData = ev.contents !== undefined;
    const titleStr = hasStructuredData ? (ev.title ?? ev.id) : (extractH1(html) || ev.id);
    const tagStr = Array.isArray(ev.category)
      ? ev.category[0] ?? ''
      : Array.isArray(ev.tag)
        ? ev.tag[0] ?? ''
        : '';
    const imageUrl = ev.eyecatch?.url ?? ev.image?.url ?? '';
    return {
      slug: ev.id,
      title: titleStr,
      dateLabel: ev.dateLabel ?? extractDateLabel(ev.contents ?? html),
      image: imageUrl,
      tag: tagStr,
      link: ev.link ?? '',
    };
  });
}

/**
 * イベント詳細を取得
 */
export async function getEventDetail(
  contentId: string,
  draftKey?: string,
): Promise<Event | null> {
  try {
    const queries: Record<string, string> = {};
    if (draftKey) {
      queries.draftKey = draftKey;
    }

    const ev = await client.get<Event>({
      endpoint: 'event',
      contentId,
      queries,
    });

    // 新スキーマ: title, contents, eyecatch, category。旧スキーマ: title/event に全 HTML
    const hasContents = ev.contents !== undefined;
    const html = ev.title ?? ev.event ?? ev.body ?? '';
    const tagArr = Array.isArray(ev.category)
      ? ev.category
      : ev.tag ?? [];
    const body = hasContents
      ? (ev.contents ?? '')
      : (extractEventBody(html) || html);
    const imageUrl = ev.eyecatch?.url ?? ev.image?.url;
    return {
      ...ev,
      title: hasContents ? (ev.title ?? ev.id) : (extractH1(html) || ev.id),
      dateLabel: ev.dateLabel ?? extractDateLabel(ev.contents ?? html),
      tag: tagArr,
      body,
      image: imageUrl ? { url: imageUrl } : undefined,
      link: ev.link ?? extractEventLink(ev.contents ?? html),
    };
  } catch {
    return null;
  }
}

/**
 * 全イベントの slug 一覧を取得（静的パス生成用）
 */
export async function getAllEventSlugs(): Promise<string[]> {
  const response = await client.get<MicroCMSListResponse<Event>>({
    endpoint: 'event',
    queries: {
      fields: 'id',
      limit: 100,
    },
  });

  return response.contents.map((event) => event.id);
}
