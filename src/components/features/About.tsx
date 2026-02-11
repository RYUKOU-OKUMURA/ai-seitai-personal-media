import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-gray-100" id="about">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background-light rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
            <img
              src="/images/プロフィール写真.jpg"
              alt="Portrait of a confident asian male professional"
              className="absolute inset-0 w-full h-full object-cover bg-gray-300"
              loading="lazy"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-black text-[#111418] mb-2">奥村 龍晃（おくむら りゅうこう）</h2>
            <p className="text-primary font-bold text-sm mb-6 uppercase tracking-wider">Clinic Owner / AI Consultant</p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              12年間の治療院経営経験とChatGPTの登場で、「AIをスタッフとして雇う」経営方針に転換。
              個人の生産性を高めつつ、アナログな整体院経営のDX化を目指し、3年前からAI導入を開始。
              現在は自身の整体院経営ので生成AI活用を実践的に模索しつつ、「治療家が施術に集中できる院づくり」を目指し、AI導入支援を行っている。
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold text-gray-700 shadow-sm">治療院経営 12年</div>
              <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold text-gray-700 shadow-sm">Redcord Expert</div>
              <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-bold text-gray-700 shadow-sm">AI Tool Developer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
