/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly YOUTUBE_API_KEY: string;
  readonly YOUTUBE_CHANNEL_ID: string;
  readonly GEMINI_API_KEY: string;
  readonly ADMIN_PASSWORD: string;
  readonly GITHUB_TOKEN: string;
  readonly GITHUB_REPO: string;
  readonly GITHUB_BRANCH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
