import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    category: z.string(),
    image: z.string().optional().default(''),
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
    image: z.string().optional().default(''),
    link: z.string().optional().default(''),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, events };

