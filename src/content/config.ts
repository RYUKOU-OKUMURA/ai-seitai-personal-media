import { defineCollection, z } from 'astro:content';
import { isSafeEventLink, isSafeImageSource } from '../utils/url-safety';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    category: z.string(),
    image: z.string().optional().default('').refine((value) => isSafeImageSource(value), {
      message: 'image must be an absolute http(s) URL or root-relative path',
    }),
    excerpt: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    dateLabel: z.string(),
    tag: z.string(),
    image: z.string().optional().default('').refine((value) => isSafeImageSource(value), {
      message: 'image must be an absolute http(s) URL or root-relative path',
    }),
    link: z.string().optional().default('#').refine((value) => isSafeEventLink(value), {
      message: 'link must be # or an absolute http(s) URL',
    }),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, events };
