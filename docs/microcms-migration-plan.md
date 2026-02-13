# microCMS 移行実装プラン

## 概要

ブログ・イベントのコンテンツ管理を Markdown ファイル (Astro Content Collections) から microCMS に移行する。
ブラウザ上で記事作成・画像アップロード・公開が完結する環境を構築する。

### 前提

- 事例紹介（Case Studies）は現在の TypeScript データファイルのまま維持
- 既存のブログ2記事・イベント1件は自動投稿スクリプトで microCMS に移行
- Markdown ファイルはリポジトリに AI コンテキスト用として残す
- React コンポーネント (`AppRoot`, `InternalBlog`, `EventBoard`) は変更不要

### 運用ワークフロー（移行後）

```
AI で記事を書く → リポジトリに保存（コンテキスト用）
               → npm run cms:post で microCMS に自動投稿
               → サイトに反映
```

---

## Phase 1: microCMS セットアップ（手動作業）

microCMS 側のアカウント作成・API 定義・コンテンツ移行。コード変更なし。

- [ ] microCMS アカウント作成 (https://microcms.io/)
- [ ] `blogs` API 作成（リスト形式）
  - `title` (テキスト, 必須)
  - `publishedAt` (日時, 必須)
  - `category` (セレクト, 必須) — 選択肢: マインド / 実践ノウハウ / マインドセット / チームビルディング
  - `image` (画像, 任意)
  - `excerpt` (テキストエリア, 必須)
  - `body` (リッチエディタ, 必須)
- [ ] `events` API 作成（リスト形式）
  - `title` (テキスト, 必須)
  - `dateLabel` (テキスト, 必須)
  - `tag` (セレクト, 必須) — 選択肢: 募集中 / 残り3枠 / 告知予定 / 先行予約 / 動画 / 終了
  - `image` (画像, 任意)
  - `link` (テキスト, 任意)
  - `body` (リッチエディタ, 任意)
- [ ] 既存ブログ記事を microCMS に登録（2件）
  - `AI普及の壁` → contentId: `ai-fukyuu-no-kabe`
  - `仕組み化の本質` → contentId: `shikumika-no-honshitsu`
- [ ] 既存イベントを microCMS に登録（1件）
  - `2026-02-17生成AIセミナー` → contentId: `2026-02-17-ai-seminar`
- [ ] 画像を microCMS メディアライブラリにアップロード（3ファイル）
- [ ] API キーとサービスドメインを控える

---

## Phase 2: プロジェクト基盤の準備

SDK インストール・環境変数・クライアントライブラリの作成。

- [ ] `microcms-js-sdk` をインストール
  ```bash
  npm install microcms-js-sdk
  ```
- [ ] `.env.local` に microCMS の環境変数を設定
  ```env
  MICROCMS_SERVICE_DOMAIN=your-service-domain
  MICROCMS_API_KEY=your-api-key
  ```
- [ ] `.env.example` に microCMS 用プレースホルダーを追加
- [ ] `src/env.d.ts` に型定義を追加
  ```typescript
  readonly MICROCMS_SERVICE_DOMAIN?: string;
  readonly MICROCMS_API_KEY?: string;
  ```
- [ ] `src/lib/microcms.ts` を新規作成
  - microCMS クライアント初期化
  - `Blog` / `Event` 型定義
  - `getBlogs()` / `getBlogDetail()` フェッチ関数
  - `getEvents()` / `getEventDetail()` フェッチ関数
- [x] 自動投稿スクリプト `scripts/post-to-microcms.ts` を作成済み
  - 使い方: `npm run cms:post -- src/content/blog/記事名.md`
  - frontmatter の `slug` を contentId として使用（URLスラッグになる）
  - `slug` がなければ microCMS が自動生成
  - `draft: true` の場合は下書きとして投稿
  - 同じ `slug` で再実行すると更新（PUT）として処理される

---

## Phase 3: ページのデータソース切り替え

Astro Content Collections → microCMS API に各ページのデータ取得を順番に切り替える。

### 3-1. ホームページ

対象: `src/pages/index.astro`

- [ ] `import { getCollection } from 'astro:content'` を削除
- [ ] `import { getBlogs, getEvents } from '../lib/microcms'` に変更
- [ ] `getCollection` 呼び出しを `Promise.all([getBlogs(), getEvents()])` に置き換え
- [ ] レスポンスを `BlogPostListItem` / `EventListItem` 型にマッピング
- [ ] ローカルで動作確認: トップページにブログ・イベントが表示される

### 3-2. ブログ一覧ページ

対象: `src/pages/blog/index.astro`

- [ ] `import { getCollection }` → `import { getBlogs }` に変更
- [ ] `getCollection('blog', ...)` → `getBlogs()` に変更
- [ ] テンプレート内の `post.data.xxx` → `post.xxx` に一括修正
- [ ] `post.data.image` → `post.image?.url ?? ''` に修正
- [ ] `post.slug` → `post.id` に修正
- [ ] ローカルで動作確認: `/blog` に記事一覧が表示される

### 3-3. ブログ詳細ページ

対象: `src/pages/blog/[slug].astro`

- [ ] `import { getEntry }` → `import { getBlogDetail }` に変更
- [ ] `getEntry('blog', slug)` + `post.render()` → `getBlogDetail(slug)` に変更
- [ ] `draftKey` クエリパラメータ対応を追加（下書きプレビュー用）
- [ ] `<Content />` → `<Fragment set:html={post.body} />` に変更
- [ ] テンプレート内の `post.data.xxx` → `post.xxx` に一括修正
- [ ] `post.data.image` → `post.image?.url ?? ''` に修正
- [ ] `ogImage` の渡し方を修正
- [ ] ローカルで動作確認: 記事詳細ページのリッチテキストが正しくレンダリングされる

### 3-4. イベント詳細ページ

対象: `src/pages/events/[slug].astro`

- [ ] `import { getEntry }` → `import { getEventDetail }` に変更
- [ ] `getEntry('events', slug)` + `event.render()` → `getEventDetail(slug)` に変更
- [ ] `draftKey` クエリパラメータ対応を追加
- [ ] `<Content />` → `<Fragment set:html={event.body} />` に変更
- [ ] テンプレート内の `event.data.xxx` → `event.xxx` に一括修正
- [ ] `event.data.image` → `event.image?.url ?? ''` に修正
- [ ] ローカルで動作確認: イベント詳細ページが正しく表示される

---

## Phase 4: 動作検証

全ページの統合テストとビルド確認。

- [ ] `npm run dev` で全ページを巡回して表示確認
  - [ ] `/` トップページ（ブログセクション・イベントセクション）
  - [ ] `/blog` ブログ一覧
  - [ ] `/blog/[slug]` ブログ詳細（リッチテキスト・画像・見出し・リスト）
  - [ ] `/events/[slug]` イベント詳細
- [ ] microCMS で下書き状態の記事が一覧に表示されないことを確認
- [ ] microCMS で記事を新規公開し、サイトに即反映されることを確認
- [ ] 画像が microCMS CDN (`images.microcms-assets.io`) から配信されることを確認
- [ ] OGP 画像が正しく設定されることを確認
- [ ] `npm run build` でビルドエラーがないことを確認

---

## Phase 5: クリーンアップ

不要になったファイル・依存関係を削除。

### 5-1. Content Collections 設定の削除

- [ ] `src/content/config.ts`（Astro が Content Collections として読み込まなくなるため）

### 5-2. 画像ファイルの削除

- [ ] `public/images/blog/asset_3tqb3o2bm_1770801415736.png`
- [ ] `public/images/blog/asset_xavt163jk_1770779769342.png`
- [ ] `public/images/events/Gemini_Generated_Image_cqzj66cqzj66cqzj.png`

### 5-3. 依存関係の整理（任意）

- [ ] `rehype-raw`, `rehype-sanitize` をアンインストール
- [ ] `astro.config.mjs` の `markdown` 設定ブロックを削除

### リポジトリに残すもの（AI コンテキスト用）

以下は Astro のデータソースとしては使わないが、AI がコンテキストとして参照するためリポジトリに残す:

- `src/content/blog/*.md` — 記事 Markdown ファイル
- `src/content/events/*.md` — イベント Markdown ファイル
- `.claude/commands/new-blog.md` — 記事作成スラッシュコマンド（`slug` フィールド追加済み）
- `.claude/commands/new-event.md` — イベント作成スラッシュコマンド（`slug` フィールド追加済み）

---

## Phase 6: デプロイ

本番環境への反映。

- [ ] Vercel ダッシュボードに環境変数を設定
  - `MICROCMS_SERVICE_DOMAIN`
  - `MICROCMS_API_KEY`
- [ ] デプロイ実行
- [ ] 本番環境で全ページの動作確認
  - [ ] トップページ
  - [ ] ブログ一覧・詳細
  - [ ] イベント詳細
  - [ ] OGP 画像
- [ ] microCMS から記事を更新し、本番に反映されることを確認

---

## 変更対象ファイル一覧

| ファイル | 操作 |
|---|---|
| `src/lib/microcms.ts` | **新規作成** |
| `src/pages/index.astro` | 修正 |
| `src/pages/blog/index.astro` | 修正 |
| `src/pages/blog/[slug].astro` | 修正 |
| `src/pages/events/[slug].astro` | 修正 |
| `src/env.d.ts` | 修正 |
| `.env.example` | 修正 |
| `scripts/post-to-microcms.ts` | **作成済み** |
| `src/content/config.ts` | 削除 |
| `public/images/blog/*.png` | 削除 |
| `public/images/events/*.png` | 削除 |
| `.claude/commands/new-blog.md` | 修正済み（slug 追加） |
| `.claude/commands/new-event.md` | 修正済み（slug 追加） |

## 変更しないファイル

| ファイル | 理由 |
|---|---|
| `src/types/core.ts` | 既存インターフェースをそのまま使用 |
| `src/data/initialData.ts` | 事例紹介は TypeScript データのまま維持 |
| `src/components/features/InternalBlog.tsx` | マッピングで互換性を保つため変更不要 |
| `src/components/features/EventBoard.tsx` | 同上 |
| `src/components/core/AppRoot.tsx` | 同上 |
| `src/utils/url-safety.ts` | EventBoard.tsx で引き続き使用 |
| `src/content/blog/*.md` | AI コンテキスト用としてリポジトリに残す |
| `src/content/events/*.md` | AI コンテキスト用としてリポジトリに残す |
| `vercel.json` | CSP は `img-src https:` で microCMS CDN をカバー済み |

---

## microCMS API スキーマ早見表

### blogs API

| フィールドID | 表示名 | 種類 | 必須 |
|---|---|---|---|
| `title` | タイトル | テキストフィールド | Yes |
| `publishedAt` | 公開日 | 日時 | Yes |
| `category` | カテゴリ | セレクトフィールド | Yes |
| `image` | アイキャッチ画像 | 画像 | No |
| `excerpt` | 要約 | テキストエリア | Yes |
| `body` | 本文 | リッチエディタ | Yes |

### events API

| フィールドID | 表示名 | 種類 | 必須 |
|---|---|---|---|
| `title` | タイトル | テキストフィールド | Yes |
| `dateLabel` | 日程表示 | テキストフィールド | Yes |
| `tag` | ステータス | セレクトフィールド | Yes |
| `image` | アイキャッチ画像 | 画像 | No |
| `link` | 申し込みリンク | テキストフィールド | No |
| `body` | 本文 | リッチエディタ | No |
