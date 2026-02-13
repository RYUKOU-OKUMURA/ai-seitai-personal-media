# Vercel デプロイ設定

## 必須の環境変数

Vercel のプロジェクト設定で以下の環境変数を設定してください。
**設定しないと HTTP 500 エラーが発生します。**

| 変数名 | 説明 |
|--------|------|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスドメイン（例: `ai-seitai-dx`） |
| `MICROCMS_API_KEY` | microCMS の API キー |

## 設定手順

1. [Vercel Dashboard](https://vercel.com/dashboard) でプロジェクトを開く
2. **Settings** → **Environment Variables** を開く
3. 上記の変数を追加（Production / Preview / Development のいずれかで使用する環境を選択）

## その他の環境変数（任意）

お問い合わせフォーム・YouTube などを使う場合は、`.env.example` を参照して設定してください。

## ローカル環境での確認

Vercel の環境変数をローカルに取り込む場合:

```sh
vercel env pull .env.local
```
