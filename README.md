<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# BOSS Personal Media

Astro + React + Tailwind のサイトです。ブログ/イベントは **Astro Content Collections**（`src/content/**`）で管理し、`/admin` から投稿すると GitHub にコミットされます。

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` (see `.env.example`) and set:
   - `ADMIN_PASSWORD` (管理画面ログイン用)
   - `GITHUB_TOKEN` (GitHub Contents API: contents read/write)
   - optional: `GITHUB_REPO`, `GITHUB_BRANCH`
3. Run the app:
   `npm run dev`

## URLs

- Public site: `/`
- Blog list: `/blog`
- Blog detail: `/blog/{slug}`
- Admin (CMS): `/admin`
