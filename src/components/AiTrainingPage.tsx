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
            院長が書かなくても、発信が回り続ける
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            発信が止まらない仕組みをつくる
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed">
            ブログ・SNS・LINEの「書けない・続かない」を解消し、<br className="md:hidden" />スタッフでも回せる"型"を設計します。
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">

        {/* Intro */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 mb-16">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            整体院にとって発信は集客の生命線。でも現実は「忙しくて書けない」「ネタが浮かばない」「院長しかできない」で止まりがちです。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            この支援では、ネタ出し→下書き→確認→投稿の流れを"型"にして、AIの力を借りながらスタッフでも回せる状態をつくります。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong className="text-xl">発信は"才能"ではなく"仕組み"。</strong><br />
            続く形をつくれば、止まらなくなります。
          </p>
        </div>

        {/* Pain Points */}
        <div className="mb-20">
          <h2 className="text-center text-3xl font-bold text-[#111418] mb-10">こんな悩みありませんか？</h2>
          <div className="bg-background-light p-8 md:p-10 rounded-2xl">
            <ul className="space-y-5">
              {[
                "ブログやSNSの更新が止まっている",
                "1本書くのに時間がかかりすぎる",
                "何を書けばいいかネタが浮かばない",
                "院長しか発信できない（属人化している）",
                "LINEやメールの返信文を毎回ゼロから書いている",
                "投稿のクオリティにバラつきがある"
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
              <div className="text-primary font-bold text-xl mb-3">1）発信が止まらなくなる</div>
              <p className="text-gray-600 text-base leading-relaxed">ネタ出し→下書きの流れが型になり、「何を書こう」で手が止まらなくなります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">2）スタッフだけで回せる</div>
              <p className="text-gray-600 text-base leading-relaxed">院長が張り付かなくても、一定品質の発信が続く状態をつくります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">3）1投稿にかかる時間が大幅に減る</div>
              <p className="text-gray-600 text-base leading-relaxed">AIで下書き→人が仕上げの2ステップで、従来の半分以下の時間に。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">4）品質が安定する</div>
              <p className="text-gray-600 text-base leading-relaxed">テンプレとチェックリストで、誰が書いてもブレない発信ができます。</p>
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
                <h3 className="text-xl font-bold text-[#111418] mb-3">「何を書くか」から設計する</h3>
                <p className="text-gray-700 text-lg leading-relaxed">ネタリスト・テーマ一覧を最初に作り、<span className="font-bold underline decoration-primary/30">「考える負担」をなくす</span>ところから始めます。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">2</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">下書き→確認→投稿の"型"をつくる</h3>
                <p className="text-gray-700 text-lg leading-relaxed"><span className="font-bold underline decoration-primary/30">AI下書き＋人の確認</span>で、品質と速度を両立します。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">3</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">小さく始めて習慣にする</h3>
                <p className="text-gray-700 text-lg leading-relaxed">週1本から。無理なく続くペースで定着させます。</p>
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
              <span className="text-lg">ブログ・SNSの更新が3ヶ月以上止まっている</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">発信したいけど、書く時間が取れない</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">スタッフに任せたいが、任せ方がわからない</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">LINEやメルマガの運用が属人的になっている</span>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#111418] mb-4 text-center">支援の進め方</h2>
          <p className="text-base text-gray-500 text-center mb-12">※院の状況に合わせてカスタマイズします。以下は代表例です。</p>

          <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {[
              {
                step: "STEP 1",
                title: "現状把握",
                content: "発信状況・課題・ターゲット患者像をヒアリング。どこで詰まっているかを明確にします。"
              },
              {
                step: "STEP 2",
                title: "ネタ設計",
                content: "テーマ×切り口の一覧表を作成。「何を書くか」を先に決めて、ネタ切れを防ぎます。"
              },
              {
                step: "STEP 3",
                title: "テンプレ＋運用ルール整備",
                content: "記事構成テンプレ・AI下書き用プロンプト・チェックリスト・運用フロー（誰が・いつ・何をするか）を作成します。"
              },
              {
                step: "STEP 4",
                title: "定着サポート",
                content: "週次で振り返り、テンプレの改善と習慣化を支援。回るまで伴走します。"
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
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">ネタ設計</span>
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
              "ネタリスト（テーマ×切り口の一覧表）",
              "記事構成テンプレート（ブログ・SNS別）",
              "AI下書き用プロンプト集",
              "投稿前チェックリスト",
              "運用フロー図（誰が・いつ・何をするか）"
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
            整体院の現場に立ちながら、発信の仕組み化をAIで検証してきました。
            「書ける人が書く」ではなく、<strong className="text-primary">テンプレとフローで"誰でも回せる形"に落とす設計</strong>が得意です。
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
              { q: "AIで書いた文章って不自然じゃないですか？", a: "AIは下書き担当です。人が確認・調整するので、自然な文章に仕上がります。" },
              { q: "どのくらいの頻度で発信できるようになりますか？", a: "週1本が目安です。院の状況に合わせてペースを調整します。" },
              { q: "SNSもブログも全部やらないといけませんか？", a: "いいえ。まず1媒体から始めて、余裕ができたら広げます。" },
              { q: "スタッフがAIを使えるか不安です。", a: "テンプレに沿って進めるだけなので難しくありません。使い方は一緒に整えます。" }
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
          <h2 className="text-3xl font-bold mb-6">まずは「発信の現状」を整理しませんか</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            止まっている発信を、仕組みで動かす。<br />
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

export default AiTrainingPage;
