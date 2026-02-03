import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-gray-100" id="about">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background-light rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
            <div 
              className="absolute inset-0 bg-gray-300 bg-cover bg-center" 
              style={{ backgroundImage: "url('/images/profile.jpg')" }}
              role="img"
              aria-label="Portrait of a confident asian male professional"
            ></div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-black text-[#111418] mb-2">奥村 龍晃（おくむら りゅうこう）</h2>
            <p className="text-primary font-bold text-sm mb-6 uppercase tracking-wider">Clinic Owner / AI Consultant</p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              12年間の治療院経営の中で、慢性的な人手不足と業務過多を経験。
              「現場を楽にしたい」という一心で3年前からAI導入を開始。
              現在は自身のクリニック経営の傍ら、Redcordを活用した施術指導と、小規模クリニック向けのDXコンサルティングを行っている。
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold text-gray-600 shadow-sm">治療院経営 12年</div>
              <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold text-gray-600 shadow-sm">Redcord Expert</div>
              <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold text-gray-600 shadow-sm">AI Tool Developer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;