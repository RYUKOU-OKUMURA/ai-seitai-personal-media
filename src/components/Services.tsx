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
          <h2 className="text-3xl md:text-4xl font-black text-[#111418] mb-4">現場主導のAI導入支援</h2>
          <p className="text-gray-600 text-lg">
            「何から始めればいいかわからない」を解決。<br className="hidden md:block" />
            現場のワークフローを理解した上で、最適なAIツールと運用を設計します。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors">school</span>
            </div>
            <h3 className="text-xl font-bold text-[#111418] mb-3">AI人材育成</h3>
            <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
              スタッフ一人ひとりがAIにアレルギーを持たず、日常業務で使いこなせるようになるための実践的研修プログラムを提供します。
            </p>
            <button 
              className="inline-flex items-center text-primary font-bold hover:underline text-left"
              onClick={() => onNavigate && onNavigate('ai-training')}
            >
              詳細を見る <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </button>
          </div>
          {/* Service 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors">extension</span>
            </div>
            <h3 className="text-xl font-bold text-[#111418] mb-3">ツール導入支援</h3>
            <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
              ChatGPT、Midjourney、Notion AIなど、数あるツールの中から貴院の課題解決に直結する最適なツールを選定・設定します。
            </p>
            <button 
              className="inline-flex items-center text-primary font-bold hover:underline text-left"
              onClick={() => onNavigate && onNavigate('ai-tools')}
            >
              詳細を見る <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </button>
          </div>
          {/* Service 3 */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col">
            <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors">ssid_chart</span>
            </div>
            <h3 className="text-xl font-bold text-[#111418] mb-3">DXコンサルティング</h3>
            <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
              予約管理から問診、アフターフォローまで。アナログな接点を残しつつ、バックオフィス業務の自動化・効率化をトータル設計。
            </p>
            <button 
              className="inline-flex items-center text-primary font-bold hover:underline text-left"
              onClick={() => onNavigate && onNavigate('dx-consulting')}
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