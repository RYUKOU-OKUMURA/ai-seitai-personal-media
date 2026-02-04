import React from 'react';

const Hero: React.FC = () => {
  // 共通のテキストコンテンツコンポーネント
  const TextContent = ({ className = '' }: { className?: string }) => (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full w-fit backdrop-blur-sm bg-opacity-90">
        <span className="material-symbols-outlined text-primary text-sm">verified</span>
        <span className="text-xs font-bold text-primary tracking-wide">現役院長による実践的DX支援</span>
      </div>
      <div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111418] leading-[1.15] tracking-tight drop-shadow-sm">
          院長の手を空ける。
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#111418] leading-relaxed mt-3 drop-shadow-sm">
          整体院の事務・共有・発信をAIで仕組み化
        </p>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-[1.15] tracking-tight mt-3 drop-shadow-sm">
          AI運用が、次の標準。
        </p>
      </div>
      <p className="text-lg text-gray-700 leading-relaxed drop-shadow-sm">
        カルテ文・院内共有・投稿をテンプレ化。<br />
        スタッフでも回る運用に落とし込みます。
      </p>
      <div className="flex flex-wrap gap-4 pt-4">
        <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white text-base font-bold h-12 px-8 rounded-lg shadow-lg shadow-blue-200 transition-all">
          <span>無料相談を予約</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary hover:text-primary text-[#111418] text-base font-bold h-12 px-8 rounded-lg transition-all shadow-md">
          <span>チェックリストDL</span>
          <span className="material-symbols-outlined text-sm">download</span>
        </button>
      </div>
    </div>
  );

  return (
    <header className="relative bg-white pt-16 pb-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout - Text Above Image */}
        <div className="lg:hidden flex flex-col gap-8">
          <TextContent />
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <div 
              className="absolute inset-0 bg-gray-100 bg-cover bg-center" 
              style={{ backgroundImage: "url('/images/Clean_up_the_bottom_right_corner_area_by_removing_-1770191603164.png')" }}
              role="img"
              aria-label="Professional meeting in a modern bright office discussing business strategy on a tablet"
            />
          </div>
        </div>

        {/* Desktop Layout - Overlay */}
        <div className="hidden lg:block relative">
          <div className="relative flex justify-end">
            <div className="relative w-[80%] xl:w-[75%] h-[600px] xl:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-gray-100 bg-cover bg-center" 
                style={{ 
                  backgroundImage: "url('/images/Clean_up_the_bottom_right_corner_area_by_removing_-1770191603164.png')"
                }}
                role="img"
                aria-label="Professional meeting in a modern bright office discussing business strategy on a tablet"
              />
            </div>
          </div>
          {/* Text Content Overlay - Left Side */}
          <div className="absolute inset-0 flex items-center pointer-events-none">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg xl:max-w-xl flex flex-col gap-6 z-10 relative pointer-events-auto">
                <TextContent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;