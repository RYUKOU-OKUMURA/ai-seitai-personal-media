import React from 'react';

interface DxConsultingPageProps {
  onNavigate: (page: string) => void;
}

const DxConsultingPage: React.FC<DxConsultingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white animate-fade-in pb-20">
      {/* Hero Section */}
      <div className="bg-[#111921] text-white pt-24 pb-16 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-primary/20 border border-primary/50 text-primary-300 rounded-full text-sm font-bold mb-4">
            「手戻り・二度手間・探す時間」をなくす
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            事務・運用のムダを減らす
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed">
            受付・予約・請求・事務連絡。<br className="md:hidden" />毎日の"地味にしんどい"を、仕組みで軽くします。
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">

        {/* Intro */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 mb-16">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            整体院の事務作業は、一つひとつは小さいけれど、積み重なると院長の時間とエネルギーを大きく奪います。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            受付対応、予約確認、請求処理、事務連絡…これらの手戻りや二度手間を減らし、紙・LINE・ドライブ・口頭の混在も整理。必要に応じてスモール開発（GAS等）で自動化も対応します。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong className="text-xl">「やることを減らす → 流れを整える → 仕組みで回す」</strong><br />
            浮いた時間を、施術や技術向上に回せます。
          </p>
        </div>

        {/* Pain Points */}
        <div className="mb-20">
          <h2 className="text-center text-3xl font-bold text-[#111418] mb-10">こんな悩みありませんか？</h2>
          <div className="bg-background-light p-8 md:p-10 rounded-2xl">
            <ul className="space-y-5">
              {[
                "受付・予約・請求のたびに確認作業や手戻りが発生する",
                "紙・LINE・ドライブ・口頭の情報が混在し、何がどこにあるかわからない",
                "毎回同じ文章・同じ説明を一から作っている",
                "事務作業に追われて、施術や技術向上に集中できない",
                "スタッフに任せたいが、手順が整理されていないので任せられない",
                "ツールを入れたが現場に合わず、結局手作業に戻った"
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
              <div className="text-primary font-bold text-xl mb-3">1）手戻り・二度手間が減る</div>
              <p className="text-gray-600 text-base leading-relaxed">確認作業や転記ミスがなくなり、事務がスムーズに回ります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">2）情報の置き場所が統一される</div>
              <p className="text-gray-600 text-base leading-relaxed">紙・LINE・ドライブの混在が整理され、必要な情報にすぐたどり着けます。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">3）スタッフに任せられる</div>
              <p className="text-gray-600 text-base leading-relaxed">手順とテンプレートが整い、院長がつきっきりでなくても回る状態になります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">4）施術・技術向上に集中できる</div>
              <p className="text-gray-600 text-base leading-relaxed">事務に費やしていた時間とエネルギーを、本業に回せるようになります。</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-primary font-bold text-base uppercase tracking-wider">Features</span>
            <h2 className="text-3xl font-bold text-[#111418] mt-2">この支援の特徴（他と違うところ）</h2>
          </div>
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">1</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">まず「流れ」を整理してからツールを選ぶ</h3>
                <p className="text-gray-700 text-lg leading-relaxed">いきなりツール導入ではなく、<span className="font-bold underline decoration-primary/30">業務の流れを棚卸しして「何が手戻りの原因か」を特定</span>。本当に必要な改善だけを実行します。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">2</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">テンプレ化・ルール化で属人化を解消</h3>
                <p className="text-gray-700 text-lg leading-relaxed">毎回作り直していた文書や手順を型化。<span className="font-bold underline decoration-primary/30">「誰がやっても同じ結果」になる仕組み</span>を設計します。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">3</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">必要に応じてスモール開発（GAS等）で自動化</h3>
                <p className="text-gray-700 text-lg leading-relaxed">大きなシステム導入ではなく、スプレッドシート連携やGASなど、現場で扱いやすい技術で「すぐ使える」自動化を作ります。</p>
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
              <span className="text-lg">受付・予約・請求の手戻りに時間を取られている</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">紙・LINE・ドライブ・口頭が混在している</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">事務を減らして施術や技術向上に集中したい</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">スタッフに任せたいが手順が整理されていない</span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#111418] mb-4 text-center">支援の進め方</h2>
          <p className="text-base text-gray-500 text-center mb-12">※院の状況に合わせてカスタマイズします。以下は代表例です。</p>

          <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {[
              {
                step: "STEP 1",
                title: "現状把握",
                content: "業務の流れを棚卸しし、手戻り・二度手間の原因を特定します。「何に時間を取られているか」を可視化します。"
              },
              {
                step: "STEP 2",
                title: "改善設計",
                content: "手順の整理、テンプレ化、ツール選定を行い、改善の優先順位を決めます。「まずここから」を一緒に決めます。"
              },
              {
                step: "STEP 3",
                title: "仕組み構築",
                content: "テンプレ・ルール・必要に応じた自動化ツールを整備し、現場に導入します。"
              },
              {
                step: "STEP 4",
                title: "定着サポート",
                content: "週次の確認で運用のつまずきを解消し、改善を積み上げます。回るまで伴走します。"
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
          <h2 className="text-2xl font-bold text-[#111418] mb-8 text-center">導入の流れ</h2>
          <div className="flex flex-wrap justify-center gap-3 text-base font-medium text-gray-600">
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">ヒアリング</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">業務棚卸し</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">改善設計</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">テンプレ・ツール整備</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">現場導入</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">定着・改善</span>
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#111418] mb-8">納品物（手元に残るもの）</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              "業務フロー図（現状→改善後）",
              "事務テンプレート集（受付・連絡・請求等）",
              "運用ルール（誰が・いつ・何を）",
              "自動化ツール（GAS/スプレッドシート連携等 ※必要時）",
              "改善サイクルの型（週次15分の運用）"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">folder_zip</span>
                <span className="text-gray-800 font-medium text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Me */}
        <div className="mb-20 bg-blue-50 p-10 rounded-2xl border border-blue-100">
          <h2 className="text-2xl font-bold text-[#111418] mb-5">なぜ私が提供できるのか</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            「もっと施術に集中したいのに、事務に追われている」——私自身、整体院の現場でそのジレンマを見てきました。
            だからこそ、派手なシステム導入ではなく、<strong className="text-primary">現場の"地味にしんどい"を一つずつ仕組みで解消する</strong>アプローチを取っています。
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="bg-white text-blue-800 px-4 py-2 rounded-full text-base font-bold shadow-sm">現場を知っている</span>
            <span className="bg-white text-blue-800 px-4 py-2 rounded-full text-base font-bold shadow-sm">仕組みに落とせる</span>
            <span className="bg-white text-blue-800 px-4 py-2 rounded-full text-base font-bold shadow-sm">作れる</span>
            <span className="bg-white text-blue-800 px-4 py-2 rounded-full text-base font-bold shadow-sm">伝えられる</span>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-[#111418] mb-12 text-center">よくある質問 (FAQ)</h2>
          <div className="space-y-8">
            {[
              { q: "大きなシステム導入は必要ですか？", a: "必要ありません。まずは業務の流れを整理し、テンプレ化・ルール化から始めます。システムが必要な場合も、スモール開発で小さく作ります。" },
              { q: "事務スタッフがいない院でも対応できますか？", a: "対応できます。院長とスタッフが最小限の手順で回せる形に整えます。少人数だからこそ、仕組み化の効果が出やすいです。" },
              { q: "どのくらいで効果が出ますか？", a: "テンプレ化やルール整理は初月から効果が出ます。自動化を含む改善は、2〜3ヶ月かけて段階的に定着させます。" },
              { q: "今使っているツールを変える必要がありますか？", a: "基本的に既存のツールを活かす設計をします。無理に入れ替えず、今あるものの使い方を整理・最適化するところから始めます。" }
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
          <h2 className="text-3xl font-bold mb-6">まずは「事務の現状」を整理しませんか</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            受付・予約・請求・事務連絡。毎日の「地味にしんどい」を棚卸しして、<br />
            最初の一手を一緒に決めましょう。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="bg-primary hover:bg-blue-600 text-white font-bold py-5 px-10 rounded-lg shadow-lg shadow-blue-500/30 transition-all text-lg"
            >
              無料相談を予約する
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

export default DxConsultingPage;
