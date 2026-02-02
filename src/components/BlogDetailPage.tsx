import React from 'react';
import type { BlogPost } from '../types';

interface BlogDetailPageProps {
  id: number;
  posts: BlogPost[];
  onNavigate: (page: string) => void;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ id, posts, onNavigate }) => {
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center flex-col gap-4">
        <p>記事が見つかりませんでした。</p>
        <button onClick={() => onNavigate('home')} className="text-primary hover:underline">ホームに戻る</button>
      </div>
    );
  }

  return (
    <div className="bg-white animate-fade-in pb-20">
      <div className="bg-background-light pt-24 pb-12 px-4 border-b border-gray-200">
        <div className="max-w-[800px] mx-auto">
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-1 text-gray-500 hover:text-primary mb-6 text-sm font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            ホームに戻る
          </button>
          
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-sm text-xs font-bold mb-4">
            {post.category}
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-[#111418] mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
             <span className="material-symbols-outlined text-base">schedule</span>
             {post.date}
             <span className="mx-2">|</span>
             <span className="material-symbols-outlined text-base">person</span>
             BOSS (Clinic Owner)
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-12 bg-gray-100">
           <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <article className="prose prose-lg max-w-none text-gray-700 leading-loose">
          <p className="font-bold text-xl mb-8">
            {post.excerpt}
          </p>
          
          {/* Display content or fallback to mock text if empty (since old posts don't have content) */}
          {post.content ? (
            <div className="whitespace-pre-wrap">{post.content}</div>
          ) : (
            <div>
              <p className="mb-6">
                (この記事には本文データが登録されていません。管理画面から編集してください。)
              </p>
            </div>
          )}
        </article>

        {/* CTA in Blog */}
        <div className="mt-16 bg-[#111921] text-white p-8 rounded-xl text-center">
          <h3 className="text-xl font-bold mb-4">この記事について相談する</h3>
          <p className="text-gray-300 mb-6 text-sm">
            AI導入や経営に関するご質問は、無料相談にて承っています。
          </p>
          <button 
             onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
             className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all"
          >
            無料相談を予約
          </button>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-100 flex justify-center">
           <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold transition-colors">
              <span className="material-symbols-outlined">grid_view</span>
              記事一覧に戻る
           </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;