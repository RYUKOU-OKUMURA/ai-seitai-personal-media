export interface EventItem {
  id: number;
  title: string;
  date: string;
  image: string;
  tag: string;
  link: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content?: string;
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