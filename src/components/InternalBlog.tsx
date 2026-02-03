import React from 'react';
import type { BlogPostListItem } from '../types';

interface InternalBlogProps {
  posts: BlogPostListItem[];
}

const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
};

const InternalBlog: React.FC<InternalBlogProps> = ({ posts }) => {
  return (
    <section className="py-24 bg-background-light" id="blog">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Official Column</span>
            <h2 className="text-3xl font-black text-[#111418]">院長コラム・ブログ</h2>
            <p className="text-gray-600 mt-2">日々の気づきや、AI活用の裏話などを更新しています。</p>
          </div>
          <a
            href="/blog"
            className="text-gray-500 font-medium hover:text-primary flex items-center gap-1 transition-colors"
          >
            記事一覧を見る <span className="material-symbols-outlined">arrow_right_alt</span>
          </a>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            記事はまだありません。
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full"
              >
                <div className="aspect-video overflow-hidden relative bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#111418] text-xs font-bold px-3 py-1 rounded-sm">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {formatDate(post.publishedAt)}
                  </div>
                  <h3 className="text-lg font-bold text-[#111418] mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    続きを読む <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InternalBlog;
