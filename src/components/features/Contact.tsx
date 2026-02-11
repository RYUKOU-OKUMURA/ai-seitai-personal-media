import React, { useState } from 'react';

const createIdempotencyKey = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
};

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedAt, setSubmittedAt] = useState(() => Date.now().toString());
  const [idempotencyKey, setIdempotencyKey] = useState(() => createIdempotencyKey());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      organization: formData.get('organization') as string,
      category: formData.get('category') as string,
      message: formData.get('message') as string,
      website: formData.get('website') as string,
      submittedAt: formData.get('submittedAt') as string,
      idempotencyKey: formData.get('idempotencyKey') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setSubmittedAt(Date.now().toString());
        setIdempotencyKey(createIdempotencyKey());
      } else {
        const result = (await res.json()) as { error?: string };
        setErrorMessage(result.error || '送信に失敗しました。');
        setStatus('error');
        setIdempotencyKey(createIdempotencyKey());
      }
    } catch {
      setErrorMessage('ネットワークエラーが発生しました。');
      setStatus('error');
    }
  };

  return (
    <section className="py-24 bg-background-light" id="contact">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#111418] mb-4">お問い合わせ・無料相談</h2>
          <p className="text-gray-700 leading-relaxed">まずは30分の無料オンライン相談で、貴院の課題をお聞かせください。</p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <p className="text-green-800 font-bold text-lg mb-2">送信が完了しました</p>
            <p className="text-green-700">お問い合わせありがとうございます。2営業日以内にご返信いたします。</p>
            <button
              className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              onClick={() => {
                setStatus('idle');
                setSubmittedAt(Date.now().toString());
              }}
              type="button"
            >
              新しいお問い合わせ
            </button>
          </div>
        ) : (
	          <form className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 space-y-6" onSubmit={handleSubmit}>
	            <input type="hidden" name="submittedAt" value={submittedAt} readOnly />
	            <input type="hidden" name="idempotencyKey" value={idempotencyKey} readOnly />
	            <div className="hidden" aria-hidden="true">
	              <label htmlFor="website">Website</label>
	              <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
	            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#111418]" htmlFor="name">お名前 <span className="text-red-500">*</span></label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  id="name"
                  name="name"
                  placeholder="山田 太郎"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#111418]" htmlFor="email">メールアドレス <span className="text-red-500">*</span></label>
                <input
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  id="email"
                  name="email"
                  placeholder="example@boss-media.jp"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111418]" htmlFor="organization">院名・会社名 <span className="text-red-500">*</span></label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                id="organization"
                name="organization"
                placeholder="○○整骨院 / 株式会社○○"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111418]" htmlFor="category">ご相談内容 <span className="text-red-500">*</span></label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                id="category"
                name="category"
                defaultValue=""
                required
              >
                <option value="" disabled>選択してください</option>
                <option value="consultation">AI導入の無料相談</option>
                <option value="training">研修・セミナー依頼</option>
                <option value="media">取材・メディア出演</option>
                <option value="other">その他</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111418]" htmlFor="message">詳細メッセージ</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                id="message"
                name="message"
                placeholder="現在抱えている課題やご質問などをご自由にお書きください。"
                rows={4}
              ></textarea>
            </div>

	            {status === 'error' && (
	              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
	                {errorMessage}
	              </div>
	            )}

	            <button
	              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-200 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
	              type="submit"
	              disabled={status === 'sending'}
	            >
	              {status === 'sending' ? '送信中...' : '送信する'}
	            </button>
	          </form>
        )}
        <p className="text-center text-xs text-gray-500 leading-relaxed mt-6">
          ※ 送信いただいた情報は、お問い合わせ対応以外の目的には使用いたしません。<br />
          通常、2営業日以内にご返信いたします。
        </p>
      </div>
    </section>
  );
};

export default Contact;
