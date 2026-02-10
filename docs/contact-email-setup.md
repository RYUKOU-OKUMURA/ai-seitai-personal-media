# お問い合わせフォーム セキュア運用ガイド

## 概要

現在の問い合わせ導線は以下の構成です。

1. フロント (`Contact.tsx`) で Turnstile を表示
2. `/api/contact` で以下を検証
   - strict Origin
   - CAPTCHA
   - 分散レート制限 (Upstash Redis)
   - idempotencyKey
3. メール送信は Gmail -> Resend の順でフェイルオーバー
4. 両方失敗時は Redis キューに積み、`/api/contact-retry` で再送

## 環境変数

`.env.example` の値を本番値で設定してください。

| 変数名 | 用途 |
|---|---|
| `SITE_URL`, `PUBLIC_SITE_URL` | オリジン判定の基準URL |
| `CONTACT_TO_EMAIL` | 問い合わせ受信先 |
| `TURNSTILE_SITE_KEY` | Turnstile site key (サーバー保持) |
| `PUBLIC_TURNSTILE_SITE_KEY` | Turnstile site key (クライアント公開) |
| `TURNSTILE_SECRET_KEY` | Turnstile secret key |
| `UPSTASH_REDIS_REST_URL` | Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Redis REST token |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD` | 一次送信経路 (Gmail SMTP) |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | 二次送信経路 (Resend) |
| `RESEND_DEFAULT_TO_EMAIL` | `CONTACT_TO_EMAIL` 未設定時の送信先 |
| `CONTACT_RETRY_CRON_SECRET` or `CRON_SECRET` | `/api/contact-retry` 認証 |

## レート制限仕様

- IP: `5 req / 10 min`
- IP + email-hash: `3 req / 10 min`
- global: `100 req / 1 min`

実装: `src/server/security.ts`

## 再送キュー仕様

- キュー名: `contact:retry:queue:v1`
- 失敗時: `LPUSH`
- 再送 API: `/api/contact-retry`
- 最大試行回数: 5回

Vercel cron は `vercel.json` で5分間隔で実行。

## 運用チェックリスト

1. Turnstileの site/secret が本番に設定されている
2. Upstash Redis が接続可能
3. Gmail と Resend 両方の資格情報が有効
4. `CRON_SECRET` (または `CONTACT_RETRY_CRON_SECRET`) を設定済み
5. `security-checks` (gitleaks) がCIで有効
