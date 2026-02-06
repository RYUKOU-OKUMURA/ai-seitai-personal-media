import React from 'react';
import { INITIAL_CASE_STUDIES } from '../initialData';

interface CaseStudiesProps {
  onNavigate?: (page: string, id?: number) => void;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-background-light" id="cases">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Case Studies</span>
            <h2 className="text-3xl font-black text-[#111418]">導入効果・実績</h2>
          </div>
          <button 
            className="text-gray-500 font-medium hover:text-primary flex items-center gap-1" 
            onClick={() => onNavigate && onNavigate('contact')}
          >
            実績について問い合わせる <span className="material-symbols-outlined">arrow_right_alt</span>
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_CASE_STUDIES.map((study) => (
            <div 
              key={study.id} 
              className="bg-white rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-all border border-gray-100 group cursor-pointer h-full"
              onClick={() => onNavigate && onNavigate('case-detail', study.id)}
            >
              <div 
                className="w-full h-48 bg-gray-200 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                style={{ backgroundImage: `url('${study.images[0]}')` }}
                role="img"
                aria-label={study.title}
              ></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                  {study.date && <span className="font-bold">{study.date}</span>}
                  <span>{study.client}</span>
                </div>
                <h3 className="text-lg font-bold text-[#111418] mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow line-clamp-3">
                  {study.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {study.tags.map((tag, i) => (
                    <span key={i} className={`text-xs font-bold px-2 py-1 rounded ${i === 0 ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
