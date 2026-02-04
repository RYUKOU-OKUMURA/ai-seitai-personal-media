export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  url: string;
}

export interface YouTubeAPIResponse {
  videos: YouTubeVideo[];
}
