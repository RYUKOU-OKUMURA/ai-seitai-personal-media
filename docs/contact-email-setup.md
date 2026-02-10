# お問い合わせフォーム メール設定ガイド

## 概要

ウェブサイトのお問い合わせフォームから送信された内容を、Nodemailer + Gmail SMTP 経由で指定のメールアドレスに届ける仕組み。

## 構成

```
訪問者がフォーム送信
  → /api/contact (Astro API Route)
  → Nodemailer (Gmail SMTP)
  → 指定のGmailアドレスに受信
  → reply-to に訪問者のアドレスが入るのでGmailから直接返信可能
```

## 技術スタック

- **フレームワーク:** Astro (SSR, Vercel アダプター)
- **メール送信:** Nodemailer + Gmail SMTP
- **ホスティング:** Vercel
- **パッケージ:** `nodemailer`, `@types/nodemailer` (devDependencies)

## 環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `GMAIL_USER` | Gmail SMTPの認証に使うGoogleアカウント | `okumura@physical-balance-lab.net` |
| `GMAIL_APP_PASSWORD` | Googleアプリパスワード（16文字） | `abcdefghijklmnop` |
| `CONTACT_TO_EMAIL` | メールの送信先（省略時は`GMAIL_USER`宛） | `okumura@physical-balance-lab.net` |

### 設定場所

- **ローカル開発:** `.env.local` に記載
- **本番（Vercel）:** Vercel ダッシュボード → Settings → Environment Variables

## Googleアプリパスワードの発行手順

1. https://myaccount.google.com/apppasswords にアクセス
2. 送信に使うGoogleアカウントでログイン
3. アプリ名を入力（例: 「お問い合わせフォーム」）
4. 「作成」をクリック
5. 表示された16文字のパスワードをコピー（スペースは除去して使用）

**前提条件:** Googleアカウントで2段階認証が有効になっていること

## ファイル構成

```
src/
├── components/
│   └── Contact.tsx          # フォームUI（React）
├── pages/
│   └── api/
│       └── contact.ts       # APIエンドポイント（メール送信処理）
└── server/
    └── security.ts          # レート制限・セキュリティ
```

## セキュリティ機能

- **レート制限:** 10分間に5回まで（IPアドレス単位）
- **CORS検証:** 同一オリジンのみ許可
- **ハニーポット:** bot対策の隠しフィールド
- **フォーム入力時間チェック:** 800ms未満 or 24時間超は拒否
- **入力サニタイズ:** HTMLエスケープ、文字数制限
- **メールバリデーション:** 正規表現による形式チェック

## 横展開時の手順

### 1. パッケージインストール

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### 2. APIエンドポイント作成

`src/pages/api/contact.ts` を参照。主要部分:

```typescript
import { createTransport } from 'nodemailer';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: import.meta.env.GMAIL_USER,
    pass: import.meta.env.GMAIL_APP_PASSWORD,
  },
});

await transporter.sendMail({
  from: `お問い合わせフォーム <${gmailUser}>`,
  to: contactTo,
  replyTo: visitorEmail,  // 訪問者のメールアドレス
  subject: '件名',
  html: 'HTML本文',
});
```

### 3. 環境変数設定

- ローカル: `.env.local` に `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL` を設定
- Vercel: ダッシュボードの Environment Variables に同じ値を設定
- 設定後、Vercel で Redeploy が必要

### 4. Astro設定（SSR必須）

お問い合わせAPIはサーバーサイドで動くため、Astro の output を `server` または `hybrid` にする必要がある。

## Resendではなく Nodemailer + Gmail を選んだ理由

| 項目 | Resend | Nodemailer + Gmail |
|------|--------|--------------------|
| ドメイン認証 | 必要（任意宛先に送る場合） | 不要 |
| 外部アカウント | Resendアカウント必須 | Googleアカウントのみ |
| 無料枠 | 3,000通/月 | 500通/日 |
| 送信先の制限 | 未認証だとアカウント宛のみ | 制限なし |
| DNS設定 | DKIM/SPF/MXレコード必要 | 不要 |

個人サイトのお問い合わせフォーム程度であれば Nodemailer + Gmail で十分。

## トラブルシューティング

| エラーメッセージ | 原因 | 対処 |
|----------------|------|------|
| 現在お問い合わせを受け付けられません | 環境変数が未設定 | `GMAIL_USER`と`GMAIL_APP_PASSWORD`を確認 |
| メールの送信に失敗しました | SMTP認証エラー | アプリパスワードが正しいか確認、2段階認証が有効か確認 |
| 送信成功だがメールが届かない | 送信先のMXレコード未設定 | `@gmail.com`アドレスに送るか、ドメインのMXレコードを設定 |
| 迷惑メールに振り分けられる | 送信元の信頼性が低い | 迷惑メールフォルダを確認、送信元をフィルタで許可 |
