import React from 'react';

const Checklist: React.FC = () => {
  const items = [
    'カルテや説明文を毎回ゼロから書いている',
    '院内共有（引き継ぎ・報連相）が人によってバラつく',
    'SNS/ブログが"やろうと思って止まる"',
    '院長がいないと判断が止まる／スタッフが動けない',
    '新人教育が属人化していて、教える人が固定',
    '多店舗で院長同士の情報共有が遅い／抜け漏れがある',
    '事務作業が増えて、施術・採用・改善に時間が割けない',
  ];

  const checkedItems = [0, 2, 6]; // チェック済みのインデックス

  return (
    <section className="py-20 bg-[#f6f7f8] relative overflow-hidden" id="checklist">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-50 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-gray-100 blur-3xl"></div>
      </div>

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Binder Clip Effect */}
        <div className="relative">
          {/* Top binder strip */}
          <div className="absolute -top-3 left-0 right-0 h-8 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-lg shadow-md">
            {/* Binder holes */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-gray-700 shadow-inner"></div>
              ))}
            </div>
          </div>

          {/* Paper content */}
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 mt-4 overflow-hidden relative">
            {/* Paper hole punches */}
            <div className="absolute top-4 left-4 flex flex-col gap-8 opacity-20">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-gray-400"></div>
              ))}
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 pl-16">
              {/* Title */}
              <div className="mb-8 pb-6 border-b-2 border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Self Check</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[#111418] leading-tight">
                  「チェックが3つ以上なら、<br />
                  <span className="text-primary">仕組み化で一気に楽になります</span>」
                </h2>
              </div>

              {/* Checklist Items */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">チェック項目</h3>
                <div className="space-y-3">
                  {items.map((item, index) => {
                    const isChecked = checkedItems.includes(index);
                    return (
                      <div key={index} className="flex items-start gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        {/* Custom Checkbox */}
                        <div className={`w-5 h-5 mt-0.5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                          isChecked 
                            ? 'border-green-500 bg-green-500' 
                            : 'border-gray-300 bg-white group-hover:border-primary'
                        }`}>
                          {isChecked && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {/* Item text */}
                        <span className={`text-base leading-relaxed ${
                          isChecked ? 'text-gray-700' : 'text-gray-700'
                        }`}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Closing message */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-primary">
                <p className="text-base md:text-lg font-bold text-[#111418] leading-relaxed">
                  まずは<span className="text-primary">"書く仕事・共有・発信"</span>のどれから始めるか決めましょう！
                </p>
              </div>
            </div>

            {/* Bottom paper shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-gray-100 to-transparent rounded-b-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checklist;
