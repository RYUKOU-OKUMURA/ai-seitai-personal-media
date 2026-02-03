import React, { useEffect, useMemo, useState } from 'react';
import type { BlogPostEditable, EventEditable } from '../types';

interface AdminDashboardProps {
  events: EventEditable[];
  posts: BlogPostEditable[];
}

const PASSWORD_KEY = 'boss_admin_password';

const isoToDateInput = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso.slice(0, 10);
  return date.toISOString().slice(0, 10);
};

const dateInputToIso = (value: string) => {
  if (!value) return new Date().toISOString();
  return new Date(`${value}T00:00:00.000Z`).toISOString();
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ events: initialEvents, posts: initialPosts }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'blog'>('events');
  const [events, setEvents] = useState<EventEditable[]>(initialEvents);
  const [posts, setPosts] = useState<BlogPostEditable[]>(initialPosts);

  const [passwordInput, setPasswordInput] = useState('');
  const [sessionPassword, setSessionPassword] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [editingEvent, setEditingEvent] = useState<EventEditable | null>(null);
  const [editingEventOriginalSlug, setEditingEventOriginalSlug] = useState<string | null>(null);

  const [editingPost, setEditingPost] = useState<BlogPostEditable | null>(null);
  const [editingPostOriginalSlug, setEditingPostOriginalSlug] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(PASSWORD_KEY);
    if (saved) setSessionPassword(saved);
  }, []);

  const authHeaders = useMemo(() => {
    if (!sessionPassword) return {};
    return { 'x-admin-password': sessionPassword };
  }, [sessionPassword]);

  const api = async <T,>(input: string, init: RequestInit): Promise<T> => {
    const res = await fetch(input, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers ?? {}),
        ...authHeaders,
      },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = (data && (data.error as string)) || `Request failed (${res.status})`;
      throw new Error(message);
    }
    return data as T;
  };

  const login = async () => {
    setBusy(true);
    setNotice(null);
    try {
      const candidate = passwordInput.trim();
      if (!candidate) throw new Error('パスワードを入力してください');
      const res = await fetch('/api/admin/ping', { headers: { 'x-admin-password': candidate } });
      if (!res.ok) throw new Error('パスワードが違うか、サーバー設定が未完了です');
      sessionStorage.setItem(PASSWORD_KEY, candidate);
      setSessionPassword(candidate);
      setPasswordInput('');
      setNotice('ログインしました');
    } catch (err) {
      setNotice(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(PASSWORD_KEY);
    setSessionPassword(null);
    setNotice('ログアウトしました');
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    if (!sessionPassword) return setNotice('先にログインしてください');

    setBusy(true);
    setNotice(null);
    try {
      const isCreate = !editingEventOriginalSlug;
      if (isCreate) {
        const { event } = await api<{ ok: true; event: EventEditable }>('/api/admin/events', {
          method: 'POST',
          body: JSON.stringify(editingEvent),
        });
        setEvents((prev) => [event, ...prev]);
      } else {
        const { event } = await api<{ ok: true; event: EventEditable }>(
          `/api/admin/events/${editingEventOriginalSlug}`,
          {
            method: 'PUT',
            body: JSON.stringify(editingEvent),
          },
        );
        setEvents((prev) => prev.map((ev) => (ev.slug === editingEventOriginalSlug ? event : ev)));
      }
      setEditingEvent(null);
      setEditingEventOriginalSlug(null);
      setNotice('保存しました。公開反映はVercelのビルド完了後になります。');
    } catch (err) {
      setNotice(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteEvent = async (slug: string) => {
    if (!sessionPassword) return setNotice('先にログインしてください');
    if (!confirm('本当に削除しますか？')) return;
    setBusy(true);
    setNotice(null);
    try {
      await api<{ ok: true }>(`/api/admin/events/${slug}`, { method: 'DELETE' });
      setEvents((prev) => prev.filter((ev) => ev.slug !== slug));
      setNotice('削除しました。公開反映はVercelのビルド完了後になります。');
    } catch (err) {
      setNotice(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    if (!sessionPassword) return setNotice('先にログインしてください');

    setBusy(true);
    setNotice(null);
    try {
      const payload = { ...editingPost, publishedAt: dateInputToIso(isoToDateInput(editingPost.publishedAt)) };
      const isCreate = !editingPostOriginalSlug;
      if (isCreate) {
        const { post } = await api<{ ok: true; post: BlogPostEditable }>('/api/admin/blog', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setPosts((prev) => [post, ...prev]);
      } else {
        const { post } = await api<{ ok: true; post: BlogPostEditable }>(`/api/admin/blog/${editingPostOriginalSlug}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        setPosts((prev) => prev.map((p) => (p.slug === editingPostOriginalSlug ? post : p)));
      }
      setEditingPost(null);
      setEditingPostOriginalSlug(null);
      setNotice('保存しました。公開反映はVercelのビルド完了後になります。');
    } catch (err) {
      setNotice(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!sessionPassword) return setNotice('先にログインしてください');
    if (!confirm('本当に削除しますか？')) return;
    setBusy(true);
    setNotice(null);
    try {
      await api<{ ok: true }>(`/api/admin/blog/${slug}`, { method: 'DELETE' });
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      setNotice('削除しました。公開反映はVercelのビルド完了後になります。');
    } catch (err) {
      setNotice(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#111921] text-white px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            管理画面 (CMS)
          </h1>
          <a href="/" className="md:hidden text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors">
            サイトへ
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {sessionPassword ? (
            <>
              <div className="text-xs text-gray-300">ログイン中</div>
              <button
                type="button"
                onClick={logout}
                className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
                disabled={busy}
              >
                ログアウト
              </button>
              <a
                href="/"
                className="hidden md:inline-flex text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
              >
                サイトへ
              </a>
            </>
          ) : (
            <>
              <input
                className="w-full sm:w-72 rounded bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none focus:border-white/40"
                placeholder="管理パスワード"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                disabled={busy}
              />
              <button
                type="button"
                onClick={login}
                className="text-sm bg-primary hover:bg-blue-600 px-4 py-2 rounded font-bold transition-colors disabled:opacity-60"
                disabled={busy}
              >
                ログイン
              </button>
            </>
          )}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-8">
        {notice ? (
          <div className="mb-6 bg-white border border-gray-200 rounded p-4 text-sm text-gray-700">{notice}</div>
        ) : null}

        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            className={`px-6 py-3 font-bold rounded-t-lg transition-colors ${activeTab === 'events' ? 'bg-white text-primary border-t border-x border-gray-200' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => {
              setActiveTab('events');
              setEditingEvent(null);
              setEditingEventOriginalSlug(null);
            }}
          >
            イベント管理
          </button>
          <button
            className={`px-6 py-3 font-bold rounded-t-lg transition-colors ${activeTab === 'blog' ? 'bg-white text-primary border-t border-x border-gray-200' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => {
              setActiveTab('blog');
              setEditingPost(null);
              setEditingPostOriginalSlug(null);
            }}
          >
            コラム・ブログ管理
          </button>
        </div>

        {activeTab === 'events' && (
          <div>
            {!editingEvent ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">イベント一覧</h2>
                  <button
                    onClick={() => {
                      setEditingEventOriginalSlug(null);
                      setEditingEvent({ slug: '', title: '', dateLabel: '', image: '', tag: '', link: '', draft: false });
                    }}
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 font-bold"
                    disabled={busy}
                  >
                    <span className="material-symbols-outlined text-sm">add</span> 新規追加
                  </button>
                </div>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.slug} className="border border-gray-200 rounded p-4 flex gap-4 items-center">
                      <img src={event.image} alt="" className="w-16 h-16 object-cover rounded bg-gray-100" />
                      <div className="flex-grow">
                        <div className="text-xs text-gray-500">{event.dateLabel}</div>
                        <div className="font-bold text-[#111418]">{event.title}</div>
                        <div className="text-xs text-primary font-bold flex items-center gap-2">
                          <span>{event.tag}</span>
                          {event.draft ? <span className="text-gray-500">(下書き)</span> : null}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-1">slug: {event.slug}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingEventOriginalSlug(event.slug);
                            setEditingEvent(event);
                          }}
                          className="p-2 text-gray-500 hover:text-primary"
                          disabled={busy}
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.slug)}
                          className="p-2 text-gray-500 hover:text-red-500"
                          disabled={busy}
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6">
                  {editingEventOriginalSlug ? 'イベント編集' : 'イベント新規作成'}
                </h2>
                <form onSubmit={handleSaveEvent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-1">slug (URL用・半角英数と-)</label>
                      <input
                        className="w-full border border-gray-300 rounded p-2 disabled:bg-gray-50"
                        value={editingEvent.slug}
                        onChange={(e) => setEditingEvent({ ...editingEvent, slug: e.target.value })}
                        placeholder="event-20240210"
                        disabled={Boolean(editingEventOriginalSlug)}
                      />
                      <div className="text-xs text-gray-500 mt-1">未入力なら自動生成されます</div>
                    </div>
                    <div className="flex items-end gap-3">
                      <label className="inline-flex items-center gap-2 text-sm font-bold">
                        <input
                          type="checkbox"
                          checked={editingEvent.draft}
                          onChange={(e) => setEditingEvent({ ...editingEvent, draft: e.target.checked })}
                        />
                        下書き
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1">タイトル</label>
                    <input
                      className="w-full border border-gray-300 rounded p-2"
                      value={editingEvent.title}
                      onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-1">日時 (表示用)</label>
                      <input
                        className="w-full border border-gray-300 rounded p-2"
                        value={editingEvent.dateLabel}
                        onChange={(e) => setEditingEvent({ ...editingEvent, dateLabel: e.target.value })}
                        placeholder="2024.02.10 (土)"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1">タグ</label>
                      <input
                        className="w-full border border-gray-300 rounded p-2"
                        value={editingEvent.tag}
                        onChange={(e) => setEditingEvent({ ...editingEvent, tag: e.target.value })}
                        placeholder="募集中 / 満席 / アーカイブ"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1">画像URL</label>
                    <input
                      className="w-full border border-gray-300 rounded p-2"
                      value={editingEvent.image}
                      onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1">リンクURL</label>
                    <input
                      className="w-full border border-gray-300 rounded p-2"
                      value={editingEvent.link}
                      onChange={(e) => setEditingEvent({ ...editingEvent, link: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEvent(null);
                        setEditingEventOriginalSlug(null);
                      }}
                      className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                      disabled={busy}
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded font-bold hover:bg-blue-600 disabled:opacity-60"
                      disabled={busy}
                    >
                      保存する
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blog' && (
          <div>
            {!editingPost ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">記事一覧</h2>
                  <button
                    onClick={() => {
                      setEditingPostOriginalSlug(null);
                      setEditingPost({
                        slug: '',
                        title: '',
                        publishedAt: new Date().toISOString(),
                        category: '',
                        image: '',
                        excerpt: '',
                        content: '',
                        draft: false,
                      });
                    }}
                    className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 font-bold"
                    disabled={busy}
                  >
                    <span className="material-symbols-outlined text-sm">add</span> 記事を書く
                  </button>
                </div>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.slug} className="border border-gray-200 rounded p-4 flex gap-4 items-center">
                      <img src={post.image} alt="" className="w-24 h-16 object-cover rounded bg-gray-100" />
                      <div className="flex-grow">
                        <div className="text-xs text-gray-500">
                          {formatDate(post.publishedAt)} / {post.category} {post.draft ? ' / 下書き' : ''}
                        </div>
                        <div className="font-bold text-[#111418] line-clamp-1">{post.title}</div>
                        <div className="text-[11px] text-gray-400 mt-1">/blog/{post.slug}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingPostOriginalSlug(post.slug);
                            setEditingPost(post);
                          }}
                          className="p-2 text-gray-500 hover:text-primary"
                          disabled={busy}
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.slug)}
                          className="p-2 text-gray-500 hover:text-red-500"
                          disabled={busy}
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6">{editingPostOriginalSlug ? '記事編集' : '記事新規作成'}</h2>
                <form onSubmit={handleSavePost} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-1">slug (URL用・半角英数と-)</label>
                      <input
                        className="w-full border border-gray-300 rounded p-2 disabled:bg-gray-50"
                        value={editingPost.slug}
                        onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                        placeholder="my-first-post"
                        disabled={Boolean(editingPostOriginalSlug)}
                      />
                      <div className="text-xs text-gray-500 mt-1">未入力なら自動生成されます</div>
                    </div>
                    <div className="flex items-end gap-6">
                      <div>
                        <label className="block text-sm font-bold mb-1">公開日</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded p-2"
                          value={isoToDateInput(editingPost.publishedAt)}
                          onChange={(e) => setEditingPost({ ...editingPost, publishedAt: dateInputToIso(e.target.value) })}
                          required
                        />
                      </div>
                      <label className="inline-flex items-center gap-2 text-sm font-bold">
                        <input
                          type="checkbox"
                          checked={editingPost.draft}
                          onChange={(e) => setEditingPost({ ...editingPost, draft: e.target.checked })}
                        />
                        下書き
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-1">タイトル</label>
                      <input
                        className="w-full border border-gray-300 rounded p-2"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-1">カテゴリー</label>
                      <input
                        className="w-full border border-gray-300 rounded p-2"
                        value={editingPost.category}
                        onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                        placeholder="マインドセット / ノウハウ / お知らせ"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1">アイキャッチ画像URL</label>
                    <input
                      className="w-full border border-gray-300 rounded p-2"
                      value={editingPost.image}
                      onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1">抜粋 (一覧用リード文)</label>
                    <textarea
                      className="w-full border border-gray-300 rounded p-2"
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1">本文 (Markdown)</label>
                    <textarea
                      className="w-full border border-gray-300 rounded p-2 h-80 font-mono text-sm"
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPost(null);
                        setEditingPostOriginalSlug(null);
                      }}
                      className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                      disabled={busy}
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded font-bold hover:bg-blue-600 disabled:opacity-60"
                      disabled={busy}
                    >
                      保存する
                    </button>
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

