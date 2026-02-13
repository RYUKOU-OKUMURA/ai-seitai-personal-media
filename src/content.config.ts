// Content Collections configuration
// Note: Blog and events are now managed via microCMS.
// Markdown files in src/content/ are kept for AI context only.
// These collections are defined to prevent auto-generation warnings.
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    publishedAt: z.string().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    excerpt: z.string().optional(),
    draft: z.boolean().optional(),
    slug: z.string().optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    dateLabel: z.string().optional(),
    tag: z.string().optional(),
    image: z.string().optional(),
    link: z.string().optional(),
    draft: z.boolean().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = { blog, events };
