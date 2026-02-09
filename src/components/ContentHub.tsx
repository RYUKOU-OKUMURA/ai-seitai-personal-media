import React, { useState, useEffect } from 'react';
import type { YouTubeVideo } from '../types/youtube';

const ContentHub: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/youtube?sort=date&max=2');

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        setVideos(data.videos);
        setError(null);
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError('動画の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, []);

  const formatViewCount = (count: string) => {
    const num = parseInt(count);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '.');
  };

  return (
    <section className="py-24 bg-white" id="content">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Content Hub</span>
          <h2 className="text-3xl font-black text-[#111418]">発信・メディア</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* YouTube Highlight */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-[#111418] flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600">play_circle</span> YouTube 最新動画
            </h3>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                {error}
              </div>
            )}

            {!loading && !error && videos.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                動画が見つかりませんでした
              </div>
            )}

            {!loading && !error && videos.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block cursor-pointer"
                  >
                    <div className="aspect-video bg-gray-900 rounded-lg mb-3 overflow-hidden relative">
                      <img
                        alt={video.title}
                        className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                        src={video.thumbnail}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg opacity-80 group-hover:scale-110 transition-transform">play_arrow</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-[#111418] leading-snug group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <span className="text-sm text-gray-500 mt-1 block">
                      {formatDate(video.publishedAt)} • {formatViewCount(video.viewCount)} Views
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* Note Articles */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 h-fit shadow-sm">
            <h3 className="text-xl font-bold text-[#111418] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600">edit_note</span> note 記事
            </h3>
            <div className="space-y-4">
              <iframe
                className="note-embed"
                src="https://note.com/embed/notes/n01666893b41b"
                style={{ border: 0, display: 'block', maxWidth: '99%', width: '100%', padding: 0, margin: 0 }}
                height="230"
              ></iframe>
              <iframe
                className="note-embed"
                src="https://note.com/embed/notes/nd1e3fb5c79c8"
                style={{ border: 0, display: 'block', maxWidth: '99%', width: '100%', padding: 0, margin: 0 }}
                height="230"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHub;
