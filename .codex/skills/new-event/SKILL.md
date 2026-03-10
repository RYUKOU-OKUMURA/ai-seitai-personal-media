---
name: new-event
description: このリポジトリ向けのイベント記事を `src/content/events/` に新規作成し、必要に応じて `npm run cms:post -- 対象ファイル` で microCMS 投稿まで進めるスキル。ユーザーが「イベント告知を作って」「セミナー情報を追加して」「イベント下書きを作って」「イベントを microCMS に投稿して」などと言ったら使う。
---

# New Event

このリポジトリのイベント記事を、既存フォーマットと投稿フローに合わせて作成する。

## ワークフロー

### 1. 既存イベントを確認する

- 必要に応じて `src/content/events/` の既存記事を 1 本読む。
- タイトル、`dateLabel`、本文の熱量、CTA の置き方を合わせる。

### 2. ファイル名と frontmatter を決める

- 保存先は `src/content/events/` にする。
- ファイル名は `2026-02-17生成AIセミナー.md` のように、日付と日本語タイトルを組み合わせる。
- `slug` は英小文字とハイフンだけで作る。
- 公開指示がない限り `draft: true` にする。
- `link` が未定なら `"#"` を使う。

```yaml
---
title: "イベントタイトル"
slug: "english-slug-here"
dateLabel: "2026.03.15 (日) 20:00~"
image: ""
tag: "募集中"
link: "#"
draft: true
---
```

### 3. 本文を作る

- 本文は空でもよいが、告知として弱いときは簡潔な説明を足す。
- 既存記事に近い形で、参加者の悩み、得られること、開催概要を短くまとめる。
- 申し込み導線がある場合は本文内でも分かるようにする。

## 入力ルール

- `dateLabel` と `tag` は必須として扱う。
- `image` はサイト表示用のローカルパスか空文字にする。
- microCMS に `eyecatch` を送りたい場合だけ `http` から始まる URL を使う。

## 投稿ルール

- 投稿が必要なときだけ `npm run cms:post -- src/content/events/<ファイル名>.md` を実行する。
- 実行前に `.env.local` に `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` があるか確認する。
- `slug` を contentId として使うので、一度投稿した同じ `slug` は更新扱いになる点を意識する。
