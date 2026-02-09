import React from 'react';

interface AiToolsPageProps {
  onNavigate: (page: string) => void;
}

const AiToolsPage: React.FC<AiToolsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white animate-fade-in pb-20">
      {/* Hero Section */}
      <div className="bg-[#111921] text-white pt-24 pb-16 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-primary/20 border border-primary/50 text-primary-300 rounded-full text-sm font-bold mb-4">
            「聞かないとわからない」をなくす
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            院内の情報共有を整える
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed">
            報連相・引き継ぎ・マニュアルの置き場所を統一し、<br className="md:hidden" />誰が見ても同じ情報にたどり着ける状態をつくります。
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">

        {/* Intro */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 mb-16">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            院内の情報がLINE・紙・Googleドライブ・口頭にバラバラ。「あの件どこだっけ？」「誰に聞けばいい？」が毎日起きていませんか。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            この支援では、情報の置き場所と書き方を統一し、院長に聞かなくてもスタッフが自分で答えにたどり着ける状態をつくります。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong className="text-xl">共有は"意識"ではなく"仕組み"。</strong><br />
            置き場所が決まれば、自然に回り始めます。
          </p>
        </div>

        {/* Pain Points */}
        <div className="mb-20">
          <h2 className="text-center text-3xl font-bold text-[#111418] mb-10">こんな悩みありませんか？</h2>
          <div className="bg-background-light p-8 md:p-10 rounded-2xl">
            <ul className="space-y-5">
              {[
                "情報がLINE・紙・ドライブ・口頭に散らばっている",
                "「あの件どこに書いてあったっけ？」が日常的に起きる",
                "引き継ぎのたびに同じことを一から説明している",
                "マニュアルが存在しない、または古くて使えない",
                "院長に聞かないとわからないことが多すぎる",
                "複数店舗で情報管理がバラバラになっている"
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
              <div className="text-primary font-bold text-xl mb-3">1）「どこを見ればいいか」が一目でわかる</div>
              <p className="text-gray-600 text-base leading-relaxed">情報の置き場所が統一され、探す時間がなくなります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">2）引き継ぎがスムーズになる</div>
              <p className="text-gray-600 text-base leading-relaxed">テンプレ化されているので、属人的な伝え方に頼らなくなります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">3）新人教育のコストが下がる</div>
              <p className="text-gray-600 text-base leading-relaxed">マニュアルと手順書が整い、誰が教えても同じ水準になります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">4）院長への問い合わせが減る</div>
              <p className="text-gray-600 text-base leading-relaxed">スタッフが自分で答えを見つけられる状態をつくります。</p>
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
                <h3 className="text-xl font-bold text-[#111418] mb-3">「情報の置き場所」から設計する</h3>
                <p className="text-gray-700 text-lg leading-relaxed">ツールを増やすのではなく、<span className="font-bold underline decoration-primary/30">今あるもので"置き場所のルール"を決める</span>ところから始めます。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">2</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">テンプレートで"書き方"も統一する</h3>
                <p className="text-gray-700 text-lg leading-relaxed"><span className="font-bold underline decoration-primary/30">報告・引き継ぎ・マニュアルの書式</span>を揃え、品質を安定させます。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">3</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">小さく始めて、使いながら育てる</h3>
                <p className="text-gray-700 text-lg leading-relaxed">最初から完璧なマニュアルは作りません。最小限で始めて運用しながら改善します。</p>
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
              <span className="text-lg">スタッフからの「あれどこですか？」が多い</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">引き継ぎや報連相でミスが起きている</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">マニュアルを作りたいが手が回らない</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">複数店舗で情報管理がバラバラになっている</span>
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
                content: "今の情報の流れ（何を・どこに・誰が管理しているか）を棚卸し。どこで詰まっているかを明確にします。"
              },
              {
                step: "STEP 2",
                title: "構成設計",
                content: "情報の置き場所・フォルダ構成・アクセス権限を決めます。「どこを見ればいいか」が迷わない状態を設計します。"
              },
              {
                step: "STEP 3",
                title: "テンプレ＋運用ルール整備",
                content: "報告・引き継ぎ・マニュアルのテンプレートと、更新ルール（誰が・いつ・どう更新するか）を作成します。"
              },
              {
                step: "STEP 4",
                title: "定着サポート",
                content: "週次で振り返り、運用の改善と習慣化を支援。回るまで伴走します。"
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
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">情報棚卸し</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">構成設計</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">テンプレ作成</span>
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
              "情報管理マップ（何が・どこにあるかの一覧）",
              "フォルダ構成＋命名ルール",
              "報告・引き継ぎテンプレート",
              "マニュアルテンプレート（作成ガイド付き）",
              "運用ルール（更新頻度・担当・確認手順）"
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
            整体院の現場に立ちながら、情報の散らばりをAIとテンプレで整理する運用を検証してきました。
            「ツールを入れる」のではなく、<strong className="text-primary">今あるものの中で"誰でも迷わない導線"を設計する</strong>のが得意です。
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
              { q: "新しいツールを入れないといけませんか？", a: "基本は今お使いのツール（LINE・Drive等）の中で整理します。必要な場合のみ提案します。" },
              { q: "マニュアル作成まで含まれますか？", a: "テンプレと書き方ガイドを提供します。中身は院のスタッフで書ける形に設計します。" },
              { q: "複数店舗でも対応できますか？", a: "はい。店舗間の情報連携も含めて設計します。" },
              { q: "スタッフが使ってくれるか不安です。", a: "シンプルな構成と導線にすることが最優先。自然に使われる状態を目指します。" }
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
          <h2 className="text-3xl font-bold mb-6">まずは「情報の現状」を整理しませんか</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            散らばった情報を、仕組みで整える。<br />
            貴院の状況に合わせて、最小の一手から設計します。
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

export default AiToolsPage;
