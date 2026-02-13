import React, { useState } from 'react';

const Philosophy: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="philosophy">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gray-50 blur-3xl"></div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider text-sm uppercase mb-4 block">Philosophy</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#111418] leading-tight mb-4">
            院長は施術に集中していい。
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] leading-tight">
            事務業務・共有・発信は、<br className="md:hidden" />私が回る仕組みにします。
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-8"></div>
        </div>

        {/* 三原則セクション */}
        <div className="grid md:grid-cols-1 gap-6 md:gap-8 mb-12 max-w-[600px] mx-auto">
          {/* 原則1 */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-xl border border-blue-100 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex items-center gap-3 mb-4 min-w-0">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-primary text-white font-bold text-sm rounded-full">1</span>
              <h3 className="text-lg md:text-xl font-bold text-[#111418] leading-snug md:whitespace-nowrap break-words">
                腕が主役 (施術と判断に集中)
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              AIは施術を置き換えるものではなく、<span className="font-semibold text-[#111418]">院長の時間を増やすため</span>に使います。
            </p>
          </div>

          {/* 原則2 */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-xl border border-blue-100 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex items-center gap-3 mb-4 min-w-0">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-primary text-white font-bold text-sm rounded-full">2</span>
              <h3 className="text-lg md:text-xl font-bold text-[#111418] leading-snug md:whitespace-nowrap break-words">
                運用が先、ツールは後 (テンプレ×フロー)
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              ツール導入より先に、<span className="font-semibold text-[#111418]">院内で回る型</span>（テンプレ＋運用フロー）を作ります。
            </p>
          </div>

          {/* 原則3 */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-xl border border-blue-100 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex items-center gap-3 mb-4 min-w-0">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-primary text-white font-bold text-sm rounded-full">3</span>
              <h3 className="text-lg md:text-xl font-bold text-[#111418] leading-snug md:whitespace-nowrap break-words">
                患者情報は扱わない (安心が前提)
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              患者さんの個人情報を入力しない設計で、<span className="font-semibold text-[#111418]">安全に運用できる範囲</span>から始めます。
            </p>
          </div>
        </div>

        {/* 続きを読むボタンと折りたたみ本文 */}
        <div className="text-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/90 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <>
                <span>閉じる</span>
                <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>続きを読む</span>
                <svg className="w-4 h-4 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>

          {isOpen && (
            <div className="mt-8 text-left bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200">
              <div className="prose prose-gray max-w-none text-gray-700 leading-loose md:leading-loose space-y-4">
                <p>
                  整体院の院長先生は、施術や技術の追求が好きな人が多い一方で、事務・院内共有・発信は後回しになりがちです。気づけばカルテ文や説明文、引き継ぎ、投稿作業に時間が取られ、院長が現場の"ボトルネック"になります。
                </p>
                <p>
                  私がやるのは、ツールを入れて終わりではありません。まず「書く仕事・共有・発信」をテンプレ化し、誰がやっても同じ品質で回る運用フロー（役割、手順、チェックポイント）まで作ります。結果として、院長は施術と判断に集中でき、スタッフも迷わず動ける状態になります。
                </p>
                <p>
                  また、患者さんの個人情報を入力しない設計で進めます。院内で安全に扱える情報だけで効果が出る領域から着手し、無理のない形で定着させます。
                </p>
                <p>
                  初回は状況を整理し、「最短の一手」だけ決めましょう。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
