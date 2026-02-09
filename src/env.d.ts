/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly YOUTUBE_API_KEY: string;
  readonly YOUTUBE_CHANNEL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
