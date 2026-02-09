import React from 'react';

interface ServicesProps {
  onNavigate?: (page: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-background-light" id="services">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Services</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#111418] mb-4">整体院の「困った」を仕組みで解決</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            発信・共有・事務。現場でよくある3つの詰まりを、<br className="hidden md:block" />
            AIとテンプレートで「スタッフでも回せる形」に整えます。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 1: 発信の仕組み化 */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors">edit_note</span>
            </div>
            <h3 className="text-xl font-bold text-[#111418] mb-3">発信が止まらない仕組みをつくる</h3>
            <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
              ブログ・SNS・LINEが「書けない・続かない」を解消。ネタ出しから文章作成・確認・投稿まで、スタッフでも回せる"型"を設計します。
            </p>
            <p className="text-gray-500 text-sm mb-6">"書けない・続かない"が、"迷わず出せる"に変わります。</p>
            <button
              className="inline-flex items-center text-primary font-bold hover:underline text-left"
              onClick={() => onNavigate && onNavigate('hasshin')}
            >
              詳細を見る <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </button>
          </div>
          {/* Service 2: 院内共有の整備 */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors">folder_shared</span>
            </div>
            <h3 className="text-xl font-bold text-[#111418] mb-3">院内の情報共有を整える</h3>
            <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
              報連相・引き継ぎ・マニュアルの置き場所を統一。「聞かないとわからない」「人によって違う」をなくし、誰が見ても同じ情報にたどり着ける状態をつくります。
            </p>
            <p className="text-gray-500 text-sm mb-6">聞かなくても、見ればわかる状態をつくります。</p>
            <button
              className="inline-flex items-center text-primary font-bold hover:underline text-left"
              onClick={() => onNavigate && onNavigate('kyouyuu')}
            >
              詳細を見る <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </button>
          </div>
          {/* Service 3: 事務・運用改善 */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors">task_alt</span>
            </div>
            <h3 className="text-xl font-bold text-[#111418] mb-3">事務・運用のムダを減らす</h3>
            <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
              受付・予約・請求・事務連絡の手戻りを減らし、紙・LINE・ドライブの混在も整理。必要に応じてスモール開発（GAS等）で自動化も対応します。
            </p>
            <p className="text-gray-500 text-sm mb-6">浮いた時間を、施術や技術向上に回せます。</p>
            <button
              className="inline-flex items-center text-primary font-bold hover:underline text-left"
              onClick={() => onNavigate && onNavigate('jimu')}
            >
              詳細を見る <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
