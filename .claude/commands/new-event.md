イベント記事を新規作成するスキル。

ユーザーから提供された情報: $ARGUMENTS

## 手順

1. ユーザーの入力からイベントの情報を把握する
2. 既存のイベントファイル名を確認し、連番で次のファイル名を決定する（例: `event-6.md`）
3. 以下のフォーマットに従って `src/content/events/` に新しい `.md` ファイルを作成する
4. 作成後、`npm run cms:post -- src/content/events/ファイル名.md` で microCMS に投稿する

## microCMS 連携ルール

- この Markdown は **microCMS に自動投稿**される。`npm run cms:post` で反映。
- microCMS の event API: `title`（タイトルのみ）, `contents`（リッチエディタ）, `eyecatch`（画像）, `category`（セレクト）
- `slug` が contentId になる。同じ slug で再実行すると更新（PATCH）される。新規の場合は ID 自動生成。
- `contents` には、日程・タグ・リンク・本文が HTML として送信される（Markdown 本文は HTML に変換）。
- `image` は **http で始まる URL のみ**有効。microCMS メディアライブラリの URL を指定する。ローカルパスや空文字は送信しない。

## フロントマターのフォーマット

```yaml
---
title: "イベントタイトル"
slug: "english-slug-here"
dateLabel: "2025.01.15 (水) 20:00~"
image: ""
tag: "募集中"
link: "申し込みURL"
draft: false
---
```

### 各フィールドの説明

| フィールド | 必須 | 説明 |
|---|---|---|
| `title` | 必須 | イベントタイトル。【】で種別を示すと分かりやすい（例: "【無料ウェビナー】〜"） |
| `slug` | 必須 | microCMS の contentId（URLスラッグ）。英数字・ハイフンのみ（例: `"2026-03-15-ai-seminar"`）。日付とキーワードの組み合わせ推奨 |
| `dateLabel` | 必須 | 開催日時の表示文字列。自由形式（例: `"2025.01.15 (水) 20:00~"`, `"視聴期限：1.31まで"`） |
| `tag` | 必須 | ステータスタグ。既存例: "募集中", "残り3枠", "告知予定", "先行予約", "動画"。microCMS の category に送信される |
| `image` | 任意 | 空文字 `""` にする。画像は microCMS 管理画面のメディアライブラリからアップロードし、http の URL を指定する |
| `link` | 任意 | 申し込み・詳細ページのURL。未定の場合は `"#"` |
| `draft` | 任意 | 下書きにしたい場合は `true`。デフォルトは `false` |

## 本文について

イベント記事の本文は `contents` に HTML として送信される。補足説明がある場合は Markdown で記述する（自動で HTML 変換される）。基本的に空でもよい。

## 注意事項

- ユーザーが指定していない必須フィールド（特に `dateLabel` と `tag`）があれば、作成前に確認する
- `link` が指定されていない場合は `"#"` にする
- `image` は常に空文字 `""` にする（microCMS の eyecatch は管理画面で http URL を設定）
- ファイル名のスラッグにはすべて小文字の英数字とハイフンのみ使用する
- 作成後は `npm run cms:post -- src/content/events/ファイル名.md` を実行して microCMS に投稿する
