import React from 'react';

const Philosophy: React.FC = () => {
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
          <h2 className="text-3xl md:text-4xl font-black text-[#111418] leading-tight mb-6">
            「腕が主役、<br className="md:hidden" />AI/DXは加速装置」
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Updated typography classes for better readability */}
        <div className="mx-auto text-gray-700 text-lg md:text-xl leading-loose md:leading-loose space-y-8 text-justify md:text-left tracking-wide font-medium">
          <p>
            整体院や整骨院の仕事は、結局のところ「良くなる」という結果で評価される世界だと思っています。技術が上がれば、患者さんの満足度が上がり、紹介やリピートが増える。だから私は、何よりも施術という“個人技”を磨くことに集中してきました。実際、12年間現場に立ちながら、レッドコードのような専門的なアプローチも取り入れ、「目の前の人に効果を出す」ことを最優先に積み上げてきました。
          </p>
          <p>
            一方で、時代は確実に変わっています。日本全体の人口が減れば、患者さんの総数は減っていく。これまでのように「決まったパターンの施術を回していれば成立する」時代は、少しずつ終わっていくはずです。これからは、ちゃんと治してくれる、変化を出してくれる、本質的な満足度を提供できるところに人が集まる。つまり“腕”が正当に評価される時代が来る。その流れは、私にとっては追い風でもあります。
          </p>
          <p>
            ただし、腕だけでは届かない壁もあります。施術の価値は、伝わらなければ選ばれない。説明が難しい、来院の理由が腹落ちしない、セルフケアが続かない——そんな「伝達のズレ」だけで、良い技術が損をしてしまうこともある。さらに、今は誰もが情報発信できる時代で、患者さん側もAIで調べ、比較し、納得して選ぶようになりました。だからこそ、現場はより本質に向かう一方で、“伝わる設計”と“継続できる仕組み”が必須になります。
          </p>
          <p>
            そこで私は、生成AIやDXを「技術を置き換えるもの」ではなく、「技術に全集中するための加速装置」として使います。事務作業、文章作成、発信、予約導線、説明の整理。こうした周辺業務を軽くし、臨床の振り返りを積み上げ、患者さんに分かる言葉へ翻訳する。その結果、施術の精度を上げる時間が増え、成果が伝わり、満足度が高まり、選ばれる理由が強くなる。私が目指しているのは、マーケティングだけで売上を作る経営ではなく、技術を育て、成果で評価される経営です。
          </p>
          
          <div className="bg-background-light p-8 md:p-10 rounded-2xl border-l-4 border-primary mt-12 shadow-sm">
            <p className="font-bold text-[#111418] text-xl md:text-2xl leading-relaxed">
              腕を磨く。成果を出す。<br className="md:hidden" />AI/DXで、それを続けられる院にする。<br />
              <span className="text-primary mt-4 block text-lg md:text-xl font-bold">私はその実験を、自分の現場で続けています。</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;