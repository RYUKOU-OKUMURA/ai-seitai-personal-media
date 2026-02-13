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

export interface Blog {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  publishedAt_field?: string; // API側の日時フィールド
  category: string[];
  image?: MicroCMSImage;
  excerpt: string;
  body: string;
}

export interface Event {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  dateLabel: string;
  tag: string[];
  image?: MicroCMSImage;
  link?: string;
  body?: string;
}

interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
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

  return response.contents.map((blog) => ({
    slug: blog.id,
    title: blog.title,
    publishedAt: blog.publishedAt,
    category: blog.category[0] ?? '',
    image: blog.image?.url ?? '',
    excerpt: blog.excerpt,
  }));
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

    return blog;
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
    endpoint: 'events',
    queries: {
      orders: '-publishedAt',
      limit: 100,
    },
  });

  return response.contents.map((event) => ({
    slug: event.id,
    title: event.title,
    dateLabel: event.dateLabel,
    image: event.image?.url ?? '',
    tag: event.tag[0] ?? '',
    link: event.link ?? '',
  }));
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

    const event = await client.get<Event>({
      endpoint: 'events',
      contentId,
      queries,
    });

    return event;
  } catch {
    return null;
  }
}

/**
 * 全イベントの slug 一覧を取得（静的パス生成用）
 */
export async function getAllEventSlugs(): Promise<string[]> {
  const response = await client.get<MicroCMSListResponse<Event>>({
    endpoint: 'events',
    queries: {
      fields: 'id',
      limit: 100,
    },
  });

  return response.contents.map((event) => event.id);
}
