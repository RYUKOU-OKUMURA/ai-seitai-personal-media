import React, { useState } from 'react';
import { EventItem, BlogPost } from '../types';

interface AdminDashboardProps {
  events: EventItem[];
  posts: BlogPost[];
  onUpdateEvents: (events: EventItem[]) => void;
  onUpdatePosts: (posts: BlogPost[]) => void;
  onNavigate: (page: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  events, 
  posts, 
  onUpdateEvents, 
  onUpdatePosts,
  onNavigate 
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'blog'>('events');
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // --- Event Handlers ---
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;

    if (editingEvent.id === 0) {
      // Create new
      const newEvent = { ...editingEvent, id: Date.now() };
      onUpdateEvents([...events, newEvent]);
    } else {
      // Update existing
      const updatedEvents = events.map(ev => ev.id === editingEvent.id ? editingEvent : ev);
      onUpdateEvents(updatedEvents);
    }
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('本当に削除しますか？')) {
      onUpdateEvents(events.filter(ev => ev.id !== id));
    }
  };

  // --- Blog Handlers ---
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (editingPost.id === 0) {
      // Create new
      const newPost = { ...editingPost, id: Date.now() };
      onUpdatePosts([newPost, ...posts]);
    } else {
      // Update existing
      const updatedPosts = posts.map(p => p.id === editingPost.id ? editingPost : p);
      onUpdatePosts(updatedPosts);
    }
    setEditingPost(null);
  };

  const handleDeletePost = (id: number) => {
    if (confirm('本当に削除しますか？')) {
      onUpdatePosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Admin Header */}
      <div className="bg-[#111921] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">admin_panel_settings</span>
          管理画面 (CMS)
        </h1>
        <button 
          onClick={() => onNavigate('home')} 
          className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
        >
          サイトに戻る
        </button>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button 
            className={`px-6 py-3 font-bold rounded-t-lg transition-colors ${activeTab === 'events' ? 'bg-white text-primary border-t border-x border-gray-200' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => { setActiveTab('events'); setEditingEvent(null); }}
          >
            イベント管理
          </button>
          <button 
            className={`px-6 py-3 font-bold rounded-t-lg transition-colors ${activeTab === 'blog' ? 'bg-white text-primary border-t border-x border-gray-200' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => { setActiveTab('blog'); setEditingPost(null); }}
          >
            コラム・ブログ管理
          </button>
        </div>

        {/* --- EVENTS TAB --- */}
        {activeTab === 'events' && (
          <div>
            {!editingEvent ? (
              // List View
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">イベント一覧</h2>
                  <button 
                    onClick={() => setEditingEvent({ id: 0, title: '', date: '', image: '', tag: '', link: '' })}
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 font-bold"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> 新規追加
                  </button>
                </div>
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="border border-gray-200 rounded p-4 flex gap-4 items-center">
                      <img src={event.image} alt="" className="w-16 h-16 object-cover rounded bg-gray-100" />
                      <div className="flex-grow">
                        <div className="text-xs text-gray-500">{event.date}</div>
                        <div className="font-bold text-[#111418]">{event.title}</div>
                        <div className="text-xs text-primary font-bold">{event.tag}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingEvent(event)} className="p-2 text-gray-500 hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                        <button onClick={() => handleDeleteEvent(event.id)} className="p-2 text-gray-500 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Edit Form
              <div className="bg-white rounded-lg shadow p-6">
                 <h2 className="text-xl font-bold mb-6">{editingEvent.id === 0 ? 'イベント新規追加' : 'イベント編集'}</h2>
                 <form onSubmit={handleSaveEvent} className="space-y-4">
                   <div>
                     <label className="block text-sm font-bold mb-1">イベント名</label>
                     <input 
                       className="w-full border border-gray-300 rounded p-2" 
                       value={editingEvent.title}
                       onChange={e => setEditingEvent({...editingEvent, title: e.target.value})}
                       required
                     />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold mb-1">開催日時・期限</label>
                       <input 
                         className="w-full border border-gray-300 rounded p-2" 
                         value={editingEvent.date}
                         onChange={e => setEditingEvent({...editingEvent, date: e.target.value})}
                         placeholder="例: 2024.01.20 (土) 13:00~"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-bold mb-1">タグ（ステータス）</label>
                       <input 
                         className="w-full border border-gray-300 rounded p-2" 
                         value={editingEvent.tag}
                         onChange={e => setEditingEvent({...editingEvent, tag: e.target.value})}
                         placeholder="募集中 / 満席 / 動画"
                       />
                     </div>
                   </div>
                   <div>
                     <label className="block text-sm font-bold mb-1">画像URL (正方形推奨)</label>
                     <input 
                       className="w-full border border-gray-300 rounded p-2" 
                       value={editingEvent.image}
                       onChange={e => setEditingEvent({...editingEvent, image: e.target.value})}
                       placeholder="https://..."
                     />
                     {editingEvent.image && <img src={editingEvent.image} className="w-20 h-20 object-cover mt-2 rounded" />}
                   </div>
                   <div>
                     <label className="block text-sm font-bold mb-1">リンク先URL (Googleフォーム等)</label>
                     <input 
                       className="w-full border border-gray-300 rounded p-2" 
                       value={editingEvent.link}
                       onChange={e => setEditingEvent({...editingEvent, link: e.target.value})}
                       placeholder="https://forms.google.com/..."
                     />
                   </div>
                   <div className="flex gap-4 pt-4">
                     <button type="button" onClick={() => setEditingEvent(null)} className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">キャンセル</button>
                     <button type="submit" className="px-6 py-2 bg-primary text-white rounded font-bold hover:bg-blue-600">保存する</button>
                   </div>
                 </form>
              </div>
            )}
          </div>
        )}

        {/* --- BLOG TAB --- */}
        {activeTab === 'blog' && (
          <div>
            {!editingPost ? (
              // List View
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">記事一覧</h2>
                  <button 
                    onClick={() => setEditingPost({ id: 0, title: '', date: new Date().toLocaleDateString(), category: '', image: '', excerpt: '', content: '' })}
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 font-bold"
                  >
                    <span className="material-symbols-outlined text-sm">add</span> 記事を書く
                  </button>
                </div>
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="border border-gray-200 rounded p-4 flex gap-4 items-center">
                      <img src={post.image} alt="" className="w-24 h-16 object-cover rounded bg-gray-100" />
                      <div className="flex-grow">
                        <div className="text-xs text-gray-500">{post.date} / {post.category}</div>
                        <div className="font-bold text-[#111418] line-clamp-1">{post.title}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingPost(post)} className="p-2 text-gray-500 hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
                        <button onClick={() => handleDeletePost(post.id)} className="p-2 text-gray-500 hover:text-red-500"><span className="material-symbols-outlined">delete</span></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Edit Form
              <div className="bg-white rounded-lg shadow p-6">
                 <h2 className="text-xl font-bold mb-6">{editingPost.id === 0 ? '記事新規作成' : '記事編集'}</h2>
                 <form onSubmit={handleSavePost} className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold mb-1">タイトル</label>
                        <input 
                          className="w-full border border-gray-300 rounded p-2" 
                          value={editingPost.title}
                          onChange={e => setEditingPost({...editingPost, title: e.target.value})}
                          required
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-bold mb-1">カテゴリー</label>
                        <input 
                          className="w-full border border-gray-300 rounded p-2" 
                          value={editingPost.category}
                          onChange={e => setEditingPost({...editingPost, category: e.target.value})}
                          placeholder="マインドセット / ノウハウ / お知らせ"
                        />
                     </div>
                   </div>

                   <div>
                     <label className="block text-sm font-bold mb-1">アイキャッチ画像URL</label>
                     <input 
                       className="w-full border border-gray-300 rounded p-2" 
                       value={editingPost.image}
                       onChange={e => setEditingPost({...editingPost, image: e.target.value})}
                       placeholder="https://..."
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-bold mb-1">抜粋 (一覧用リード文)</label>
                     <textarea 
                       className="w-full border border-gray-300 rounded p-2" 
                       value={editingPost.excerpt}
                       onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})}
                       rows={3}
                     />
                   </div>

                   <div>
                     <label className="block text-sm font-bold mb-1">本文 (HTML/Markdown等は未対応・テキストのみ)</label>
                     <p className="text-xs text-gray-500 mb-2">※簡易実装のため、改行は反映されます。</p>
                     <textarea 
                       className="w-full border border-gray-300 rounded p-2 h-64" 
                       value={editingPost.content || ''}
                       onChange={e => setEditingPost({...editingPost, content: e.target.value})}
                     />
                   </div>

                   <div className="flex gap-4 pt-4">
                     <button type="button" onClick={() => setEditingPost(null)} className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">キャンセル</button>
                     <button type="submit" className="px-6 py-2 bg-primary text-white rounded font-bold hover:bg-blue-600">公開する</button>
                   </div>
                 </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;