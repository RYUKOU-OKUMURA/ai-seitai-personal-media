import React from 'react';

interface AiTrainingPageProps {
  onNavigate: (page: string) => void;
}

const AiTrainingPage: React.FC<AiTrainingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white animate-fade-in pb-20">
      {/* Hero Section */}
      <div className="bg-[#111921] text-white pt-24 pb-16 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-primary/20 border border-primary/50 text-primary-300 rounded-full text-sm font-bold mb-4">
            現場で“使える”まで伴走
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            AI人材育成プログラム
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed">
            「AIを学ぶ」のではなく、<br className="md:hidden" />「現場の成果が出る使い方」に落とし込みます。
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Intro */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 mb-16">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            整体院・整骨院・小規模事業の現場では、時間も人手も限られています。だからこそ、生成AIは“導入したら勝ち”ではなく、<span className="font-bold text-[#111418] bg-yellow-100 px-1">現場の業務に定着して初めて価値が出るもの</span>です。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            私は、整体院の現場で検証してきた運用ノウハウをベースに、スタッフ一人ひとりが日常業務で自然にAIを使える状態まで、設計と実装をセットで支援します。<br /><br />
            <strong className="text-xl">主役は本業（施術・現場品質）。AIはその加速装置。</strong><br />
            院長やスタッフが、技術・患者対応・改善に集中できる環境をつくります。
          </p>
        </div>

        {/* Pain Points */}
        <div className="mb-20">
          <h2 className="text-center text-3xl font-bold text-[#111418] mb-10">こんな悩みありませんか？</h2>
          <div className="bg-background-light p-8 md:p-10 rounded-2xl">
            <ul className="space-y-5">
              {[
                "AIに興味はあるが、何から始めたらいいかわからない",
                "導入してみたが、結局使わなくなった",
                "スタッフに任せたいが、使い方がバラバラで不安",
                "文章や説明、返信などが属人化していて、品質が安定しない",
                "患者対応以外の仕事が多く、本業に集中できない",
                "情報漏洩や誤回答が怖くて、ルールを決められない"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-red-500 text-2xl shrink-0 mt-0.5">check_circle</span>
                  <span className="text-gray-800 font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h2 className="text-center text-3xl font-bold text-[#111418] mb-10">この支援で得られる成果</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">1）「使える人」ではなく「成果が出る現場」になる</div>
              <p className="text-gray-600 text-base leading-relaxed">AIが業務の中に組み込まれ、使う/使わないの判断が迷いなくなります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">2）文章・説明・対応の品質が揃う</div>
              <p className="text-gray-600 text-base leading-relaxed">患者向け説明、LINE返信、院内文書などの“型”が整い、ブレが減って満足度が安定します。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">3）院長の負担が減り、本業に集中できる</div>
              <p className="text-gray-600 text-base leading-relaxed">「教える」「直す」「確認する」の負担が軽くなり、研鑽・施術・運営改善の時間が増えます。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">4）安全に使える（ルールとガードレールがある）</div>
              <p className="text-gray-600 text-base leading-relaxed">患者情報の扱い、判断の責任範囲、禁止事項が明確になり、安心して運用できます。</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-primary font-bold text-base uppercase tracking-wider">Features</span>
            <h2 className="text-3xl font-bold text-[#111418] mt-2">AI人材育成の特徴（他と違うところ）</h2>
          </div>
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">1</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">現場の業務から逆算します</h3>
                <p className="text-gray-700 text-lg leading-relaxed">ツールや流行から入るのではなく、<span className="font-bold underline decoration-primary/30">「どの業務のどこが詰まっているか」</span>を起点に設計します。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">2</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">テンプレ・チェックリスト・運用ルールまでセット</h3>
                <p className="text-gray-700 text-lg leading-relaxed">研修だけで終わらせず、現場で回る形にするために<span className="font-bold underline decoration-primary/30">“型（テンプレ）”と“運用（ルール）”</span>を一緒に作ります。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">3</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">小さく始めて、確実に定着させます</h3>
                <p className="text-gray-700 text-lg leading-relaxed">最初から大改革はしません。週1で回る最小運用から始めて、成果が出る範囲を広げます。</p>
              </div>
            </div>
          </div>
        </div>

        {/* Target */}
        <div className="bg-[#111921] text-white p-10 rounded-2xl mb-20 shadow-lg">
          <h3 className="text-2xl font-bold mb-8 text-center">こんな方におすすめです</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">整体院・整骨院・治療院の院長／スタッフ</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">少人数で運営していて、業務が院長に寄っている</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">AI初心者〜初級者（むしろ歓迎）</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">「患者満足の向上」と「本業に集中する時間」を作りたい</span>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#111418] mb-4 text-center">カリキュラム（現場向け・実務直結）</h2>
          <p className="text-base text-gray-500 text-center mb-12">※院の状況に合わせてカスタマイズします。以下は代表例です。</p>
          
          <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {[
              {
                step: "STEP 1",
                title: "AIの基本と“現場での使いどころ”を理解",
                content: "生成AIで「できること／できないこと」／院での活用領域（文章・説明・教育・業務整理）／誤回答リスクの扱い方"
              },
              {
                step: "STEP 2",
                title: "すぐ使える「型」を作る（ここが本体）",
                content: "患者説明テンプレ（症状別）／LINE・メール返信テンプレ／院内文書テンプレ／スタッフ用プロンプトの型"
              },
              {
                step: "STEP 3",
                title: "現場運用ルールを作る（安全と継続）",
                content: "入力して良い情報・ダメな情報／使用する場面・禁止する場面／出力のチェック手順／品質基準"
              },
              {
                step: "STEP 4",
                title: "定着（週次15分で回る仕組み）",
                content: "使えた事例共有（短く）／テンプレの改善（差分だけ）／困った時の相談ルール"
              }
            ].map((item, index) => (
              <div key={index} className="relative pl-14">
                <div className="absolute left-0 top-1 size-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm z-10">
                  {index + 1}
                </div>
                <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-primary font-bold text-sm mb-2 block tracking-wider">{item.step}</span>
                  <h3 className="text-xl font-bold text-[#111418] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-20 bg-background-light p-10 rounded-2xl">
          <h2 className="text-2xl font-bold text-[#111418] mb-8 text-center">導入の流れ（最短で成果まで）</h2>
          <div className="flex flex-wrap justify-center gap-3 text-base font-medium text-gray-600">
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">ヒアリング</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">業務棚卸し</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">テンプレ設計</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">研修実施</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">運用ルール整備</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">定着サポート</span>
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#111418] mb-8">納品物（手元に残るもの）</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              "院専用：業務別プロンプト集（テンプレ）",
              "患者向け文書テンプレ（説明・注意・フォロー）",
              "返信テンプレ（LINE/メール）",
              "運用ルール（禁止事項／確認手順／品質基準）",
              "定着用：週次チェックリスト（15分で回る）"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">folder</span>
                <span className="text-gray-800 font-medium text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Me */}
        <div className="mb-20 bg-blue-50 p-10 rounded-2xl border border-blue-100">
          <h2 className="text-2xl font-bold text-[#111418] mb-5">なぜ私が提供できるのか</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            私は、整体院の現場に立ちながら、生成AIを「使って終わり」にせず、
            <strong className="text-primary">業務の中で継続できる形（テンプレと運用）</strong>に落として検証してきました。
            さらに、初心者にも伝わる言葉に翻訳して、行動に落とす設計が得意です。
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="bg-white text-blue-800 px-4 py-2 rounded-full text-base font-bold shadow-sm">現場を知っている</span>
            <span className="bg-white text-blue-800 px-4 py-2 rounded-full text-base font-bold shadow-sm">仕組み化できる</span>
            <span className="bg-white text-blue-800 px-4 py-2 rounded-full text-base font-bold shadow-sm">伝えられる</span>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-[#111418] mb-12 text-center">よくある質問 (FAQ)</h2>
          <div className="space-y-8">
            {[
              { q: "AI初心者でも大丈夫ですか？", a: "大丈夫です。むしろ初心者の方が、院の業務に合わせた“型”を最初から作れるので定着が早いです。" },
              { q: "スタッフが抵抗感を持ちそうで不安です。", a: "抵抗が出にくい順番（小さく・現場で便利を実感）で進めます。まずは「文章・返信」など効果が見えやすいところから始めます。" },
              { q: "患者情報の扱いが心配です。", a: "入力ルール・禁止事項・確認手順を最初に整えます。安全運用を前提に設計します。" },
              { q: "どれくらいで成果が出ますか？", a: "早い院は初月から「文章・返信・説明の負担が減る」変化が出ます。重要なのは、現場の運用に馴染ませることです。" }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm">
                <h3 className="font-bold text-[#111418] text-lg mb-3 flex items-start gap-3">
                  <span className="text-primary text-xl">Q.</span> {item.q}
                </h3>
                <p className="text-gray-700 pl-8 text-base leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#111921] text-white p-12 rounded-2xl text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">まずは「現場の困りごと」から整理しませんか</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            AIは、導入よりも「定着」がすべてです。<br />
            貴院の業務を前提に、最小の一手から成果が出る形を設計します。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="bg-primary hover:bg-blue-600 text-white font-bold py-5 px-10 rounded-lg shadow-lg shadow-blue-500/30 transition-all text-lg"
            >
              無料相談を予約する
            </button>
            <button className="bg-transparent border border-gray-500 hover:border-white hover:text-white text-gray-300 font-bold py-5 px-10 rounded-lg transition-all text-lg">
              チェックリストDL
            </button>
          </div>
          <div className="mt-10 pt-10 border-t border-gray-800">
            <button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white text-base flex items-center justify-center gap-2 mx-auto transition-colors">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              トップページに戻る
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AiTrainingPage;