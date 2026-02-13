/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GMAIL_USER?: string;
  readonly GMAIL_APP_PASSWORD?: string;
  readonly CONTACT_TO_EMAIL?: string;
  readonly CONTACT_RETRY_CRON_SECRET?: string;
  readonly CRON_SECRET?: string;
  readonly RESEND_API_KEY?: string;
  readonly RESEND_FROM_EMAIL?: string;
  readonly RESEND_DEFAULT_TO_EMAIL?: string;
  readonly UPSTASH_REDIS_REST_URL?: string;
  readonly UPSTASH_REDIS_REST_TOKEN?: string;
  readonly SITE_URL?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly YOUTUBE_API_KEY?: string;
  readonly YOUTUBE_CHANNEL_ID?: string;
  readonly MICROCMS_SERVICE_DOMAIN?: string;
  readonly MICROCMS_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
