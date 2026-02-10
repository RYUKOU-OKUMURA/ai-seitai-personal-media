export interface EventListItem {
  slug: string;
  title: string;
  dateLabel: string;
  image: string;
  tag: string;
  link: string;
}

export interface EventEditable extends EventListItem {
  draft: boolean;
}

export interface BlogPostListItem {
  slug: string;
  title: string;
  publishedAt: string; // ISO string
  category: string;
  image: string;
  excerpt: string;
}

export interface BlogPostEditable extends BlogPostListItem {
  content: string;
  draft: boolean;
}

export interface CaseStudy {
  id: number;
  client: string;
  title: string;
  tags: string[];
  images: string[]; // Array of image URLs
  excerpt: string; // Short description for the list
  content: string; // Full text
  date?: string;
}
