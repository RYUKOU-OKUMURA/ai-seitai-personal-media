import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative bg-white pt-16 pb-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full w-fit">
              <span className="material-symbols-outlined text-primary text-sm">verified</span>
              <span className="text-xs font-bold text-primary tracking-wide">現役院長による実践的DX支援</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111418] leading-[1.15] tracking-tight">
              AIと歩む、<br />
              <span className="text-primary">次世代の治療院経営。</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              理論だけでは現場は動きません。<br />
              12年のクリニック経営と最新AI技術を融合させた、<br />
              小規模ビジネスのための「使える」DX導入支援。
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white text-base font-bold h-12 px-8 rounded-lg shadow-lg shadow-blue-200 transition-all">
                <span>無料相談を予約</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary hover:text-primary text-[#111418] text-base font-bold h-12 px-8 rounded-lg transition-all">
                <span>チェックリストDL</span>
                <span className="material-symbols-outlined text-sm">download</span>
              </button>
            </div>
          </div>
          {/* Hero Image */}
          <div className="relative lg:h-[540px] w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-white rounded-2xl -z-10 transform rotate-3 scale-95"></div>
            <div 
              className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtFvTHUEEW7FrWNeJRf9dNzT3lPOYtfflv1nSoT7Nb0qo3IUtmJDyzn0l5X2lnx4KTiMrFHhfbIaBkN5lB0RvuNFJSnqgB7BP2-o6k2Hm1kdMZYMfaYHIdOr-JifQrzEaCOOLrmNONziHCssA6qiPcLXFo-iaR_V4xHWoMMLxEAP3fi6tWIyg0vguHb59RG6v1cUVp5BsTZaQvuWbXcYp36z7twdy5m2kcDkZyZyuLacZErze47jI7DmKnJ6Co9P0anXCYFFtYERM')" }}
              role="img"
              aria-label="Professional meeting in a modern bright office discussing business strategy on a tablet"
            >
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <p className="text-white font-bold text-lg">現場で検証済みのノウハウのみを提供</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;