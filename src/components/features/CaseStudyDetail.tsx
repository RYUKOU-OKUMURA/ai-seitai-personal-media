import React from 'react';
import type { CaseStudy } from '../../types/core';

interface CaseStudyDetailProps {
  id: number;
  cases: CaseStudy[];
  onNavigate: (page: string) => void;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ id, cases, onNavigate }) => {
  const study = cases.find(c => c.id === id);

  if (!study) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center flex-col gap-4">
        <p>実績が見つかりませんでした。</p>
        <button onClick={() => onNavigate('home')} className="text-primary hover:underline">ホームに戻る</button>
      </div>
    );
  }

  return (
    <div className="bg-white animate-fade-in pb-20">
      <div className="bg-[#111921] text-white pt-24 pb-24 px-4 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto relative z-10">
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-1 text-gray-400 hover:text-white mb-8 text-sm font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            ホームに戻る
          </button>

          <div className="flex flex-wrap gap-2 mb-6">
            {study.tags.map((tag, i) => (
              <span key={i} className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight">
            {study.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
             {study.date && <span>{study.date}</span>}
             <span>|</span>
             <span>{study.client}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <div className="aspect-video md:aspect-auto md:row-span-2 rounded-xl overflow-hidden shadow-lg border-4 border-white">
            <img src={study.images[0]} alt="Main visual" className="w-full h-full object-cover" />
          </div>
          {study.images[1] && (
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <img src={study.images[1]} alt="Sub visual 1" className="w-full h-full object-cover" />
            </div>
          )}
          {study.images[2] && (
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-white">
              <img src={study.images[2]} alt="Sub visual 2" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="max-w-[800px] mx-auto">
          <article className="prose prose-lg max-w-none text-gray-700 leading-loose">
            <div className="whitespace-pre-wrap font-medium">
              {study.content.split('**').map((chunk, i) => 
                i % 2 === 1 ? <span key={i} className="text-[#111418] bg-yellow-100 px-1 font-bold">{chunk}</span> : chunk
              )}
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-16 pt-16 border-t border-gray-100 flex justify-between">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2 text-gray-500 hover:text-primary font-bold transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              実績一覧に戻る
            </button>
            <button 
              onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-200 transition-all"
            >
              この事例について聞く
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;