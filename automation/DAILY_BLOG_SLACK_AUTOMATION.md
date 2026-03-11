# Daily Blog Slack Automation

## 推奨スケジュール

- 毎日 10:00 (Asia/Tokyo)

## Codex Automation Prompt

以下を順に実行してください。

1. Asia/Tokyo の現在日付を `YYYY-MM-DD` で求める。
2. `npm run blog:context -- --date <date>` を実行する。
3. `automation/.tmp/context_<date>.md` を読む。
4. 必ず [`new-blog` スキル](/Users/ryukouokumura/Desktop/boss-workspace/ai-seitai-personal-media/.codex/skills/new-blog/SKILL.md) を使う。
5. 記事作成時は次を厳守する。
   - 主ソースは `sources/AI系/` から 1 本だけ選ぶ。
   - 文体参考は `sources/脳内メモ/*-SNS-*.md` から 2 本選ぶ。
   - 必要なときだけ `sources/noteメンバーシップ/ぶっちゃけ日記/投稿済み/` を補助参照する。
6. 候補不足で主ソースを選べない場合は、`npm run blog:slack -- --date <date> --skip-reason '候補不足のため本日は未作成'` を実行して終了する。
7. 記事を `src/content/blog/` に新規保存する。`new-blog` スキルの frontmatter ルールに従い、記事本文には使用コンテキストを書かない。
8. 使用したコンテキストを `automation/.tmp/used_sources_<date>.json` に JSON 配列で保存する。各要素は `role`, `path`, `title`, `reason` を必須にする。
   - `role: "main"` は 1 件だけ
   - `main.path` は必ず `sources/AI系/` 配下
9. 作成した記事パスを使って `npm run blog:slack -- --date <date> --blog src/content/blog/<filename>.md --sources automation/.tmp/used_sources_<date>.json --cms-draft` を実行する。

## 追加ルール

- 出力は日本語。
- 不確実なことは推測で補わない。
- `used_sources_<date>.json` のパスは repo ルート基準の相対パスで残す。
- 使用コンテキストは Slack 投稿にだけ含め、記事本文には含めない。
- Slack にはタイトル・excerpt・保存先・本文全文・使用ソース・microCMS 結果を送る。
