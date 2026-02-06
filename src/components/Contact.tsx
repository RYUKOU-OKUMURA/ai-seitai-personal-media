import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-24 bg-background-light" id="contact">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#111418] mb-4">お問い合わせ・無料相談</h2>
          <p className="text-gray-700 leading-relaxed">まずは30分の無料Zoom相談で、貴院の課題をお聞かせください。</p>
        </div>
        <form className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111418]" htmlFor="name">お名前 <span className="text-red-500">*</span></label>
              <input 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                id="name" 
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
                placeholder="example@boss-media.jp" 
                type="email" 
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#111418]" htmlFor="category">ご相談内容 <span className="text-red-500">*</span></label>
            <select 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white" 
              id="category"
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
              placeholder="現在抱えている課題やご質問などをご自由にお書きください。" 
              rows={4}
            ></textarea>
          </div>
          <button 
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-200 transition-all text-lg" 
            type="submit"
          >
            送信する
          </button>
        </form>
        <p className="text-center text-xs text-gray-500 leading-relaxed mt-6">
          ※ 送信いただいた情報は、お問い合わせ対応以外の目的には使用いたしません。<br />
          通常、2営業日以内にご返信いたします。
        </p>
      </div>
    </section>
  );
};

export default Contact;
