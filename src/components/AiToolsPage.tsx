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
            最短で“現場の成果”に直結
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            ツール導入支援プログラム
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed">
            迷わず選び、<br className="md:hidden" />「何を入れないか」を見極める。
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Intro */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 mb-16">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            ツールは増やすほど成果が出るわけではありません。むしろ、選択肢が多い今の時代は「何を入れるか」よりも <span className="font-bold text-[#111418] bg-yellow-100 px-1">“何を入れないか”</span> が重要です。
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            整体院・整骨院・小規模事業の現場で起きがちなのが、「とりあえずChatGPT」「便利そうなツールを追加」→結局使われない、という流れ。<br />
            私はこの“ツール迷子”を終わらせ、貴院の業務と目的に合わせて <strong className="text-primary text-xl">最小構成（1〜3個）</strong> に絞り込み、導入〜初期設定〜テンプレ作成〜運用定着まで一気に支援します。<br /><br />
            <strong className="text-xl">主役は本業（施術・患者満足）。ツールは加速装置。</strong><br />
            「技術に集中できる環境」を最短で整えます。
          </p>
        </div>

        {/* Pain Points */}
        <div className="mb-20">
          <h2 className="text-center text-3xl font-bold text-[#111418] mb-10">こんな悩みありませんか？</h2>
          <div className="bg-background-light p-8 md:p-10 rounded-2xl">
            <ul className="space-y-5">
              {[
                "ツールが多すぎて、結局どれが正解かわからない",
                "触ってはみたが、現場に合わず使わなくなった",
                "設定や連携が面倒で、導入が止まっている",
                "スタッフごとに使い方が違い、院として統一できない",
                "予約・問診・返信・発信・記録などがバラバラで、仕事が増えている",
                "導入後の運用ルールがなく、品質や安全が不安"
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
              <div className="text-primary font-bold text-xl mb-3">1）ツール迷子が終わり、「使うもの」が決まる</div>
              <p className="text-gray-600 text-base leading-relaxed">必要なツールが絞り込まれ、現場が迷わなくなります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">2）導入直後から“業務が軽くなる”</div>
              <p className="text-gray-600 text-base leading-relaxed">初期設定やテンプレを整えた状態でスタートするので、「入れたけど何も変わらない」を防げます。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">3）院としての“型”ができ、品質が揃う</div>
              <p className="text-gray-600 text-base leading-relaxed">プロンプト、文章テンプレ、チェックリストが整い、誰がやっても同じ品質で回せるようになります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">4）院長の負担が減り、本業に集中できる</div>
              <p className="text-gray-600 text-base leading-relaxed">導入のつまずき（設定・運用・教育）をまとめて解消し、院長の「抱え込み」を減らします。</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-primary font-bold text-base uppercase tracking-wider">Features</span>
            <h2 className="text-3xl font-bold text-[#111418] mt-2">ツール導入支援の特徴（他と違うところ）</h2>
          </div>
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">1</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">目的→業務→ツールの順で設計します</h3>
                <p className="text-gray-700 text-lg leading-relaxed">ツールの良し悪しではなく、<span className="font-bold underline decoration-primary/30">“貴院の目的に直結するか”</span>で選びます。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">2</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">最小構成で勝ちます（1〜3個に絞る）</h3>
                <p className="text-gray-700 text-lg leading-relaxed">現場で継続しやすいのは、最小構成です。増やすのは、成果が出てからでOK。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">3</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">テンプレと運用までセットで納品します</h3>
                <p className="text-gray-700 text-lg leading-relaxed">導入はスタート地点。院専用のテンプレ・運用ルールまで整えて初めて、成果になります。</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scope of Support */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#111418] mb-10 text-center">何を支援するのか（範囲）</h2>
          <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {[
              {
                title: "①課題整理（ツール導入の前にやるべきこと）",
                content: "業務棚卸し（どこに時間が取られているか）／目的の明確化（何を改善したいか）／“効果が出る順”の優先順位付け"
              },
              {
                title: "②ツール選定（貴院に刺さる1〜3個に絞る）",
                content: "用途別に比較（文章/返信/予約/記録/共有/自動化 など）／既存の運用との相性確認／コストと継続性の判断"
              },
              {
                title: "③初期設定・環境構築（ここで止まる院が多い）",
                content: "アカウント・権限・基本設定／テンプレの配置（誰がどこから使うか）／使い方の統一（院としての“標準”）"
              },
              {
                title: "④テンプレ作成（成果が出る“型”を作る）",
                content: "返信テンプレ／説明テンプレ（初回説明・注意事項・セルフケア）／院内文書テンプレ／プロンプトテンプレ"
              },
              {
                title: "⑤運用ルール・定着支援（続く院だけが勝つ）",
                content: "入力して良い情報／NG情報／出力チェックの手順／週次15分の改善運用（使いっぱなし防止）"
              }
            ].map((item, index) => (
              <div key={index} className="relative pl-14">
                <div className="absolute left-0 top-1 size-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm z-10">
                  {index + 1}
                </div>
                <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-[#111418] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patterns */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#111418] mb-8 text-center">よくある導入パターン（整体院・整骨院向け）</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 flex flex-col shadow-sm">
              <div className="bg-white w-fit px-4 py-1.5 rounded-full text-sm font-bold text-primary mb-4 shadow-sm">パターンA</div>
              <h3 className="font-bold text-[#111418] text-lg mb-3">文章・説明・返信から整える</h3>
              <p className="text-sm text-gray-500 mb-5 font-bold">★ 最短で効く</p>
              <ul className="text-base text-gray-700 space-y-3 list-disc list-inside mb-6 flex-grow">
                <li>予約後の案内／当日注意事項</li>
                <li>症状説明のテンプレ化</li>
                <li>LINE返信の速度と品質UP</li>
              </ul>
              <div className="pt-5 border-t border-blue-200/50 text-sm font-bold text-blue-800">
                → 満足度と継続率に直結
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 flex flex-col shadow-sm">
              <div className="bg-white w-fit px-4 py-1.5 rounded-full text-sm font-bold text-primary mb-4 shadow-sm">パターンB</div>
              <h3 className="font-bold text-[#111418] text-lg mb-3">院内共有と教育を整える</h3>
              <p className="text-sm text-gray-500 mb-5 font-bold">★ スタッフがいる院向け</p>
              <ul className="text-base text-gray-700 space-y-3 list-disc list-inside mb-6 flex-grow">
                <li>新人教育の台本・リスト</li>
                <li>ケース共有のフォーマット</li>
                <li>院内文書の統一</li>
              </ul>
              <div className="pt-5 border-t border-blue-200/50 text-sm font-bold text-blue-800">
                → 教育コスト減、品質統一
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 flex flex-col shadow-sm">
              <div className="bg-white w-fit px-4 py-1.5 rounded-full text-sm font-bold text-primary mb-4 shadow-sm">パターンC</div>
              <h3 className="font-bold text-[#111418] text-lg mb-3">自動化を段階的に入れる</h3>
              <p className="text-sm text-gray-500 mb-5 font-bold">★ 予約〜フォロー</p>
              <ul className="text-base text-gray-700 space-y-3 list-disc list-inside mb-6 flex-grow">
                <li>リマインド自動化</li>
                <li>フォロー自動化</li>
                <li>問診の一部自動化</li>
              </ul>
              <div className="pt-5 border-t border-blue-200/50 text-sm font-bold text-blue-800">
                → 接点は残しつつ運用軽減
              </div>
            </div>
          </div>
        </div>

        {/* Why Me */}
        <div className="mb-20 bg-background-light p-10 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-[#111418] mb-5">なぜ私が提供できるのか</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            私は、整体院の現場に立ちながら、AIやツールを「試す」だけで終わらせず、
            <strong className="text-primary">業務の中で継続できる形（テンプレと運用）</strong>に落として検証してきました。<br/>
            さらに、複数ツールや仕組みの設計・改善を、個人開発・運用の両面から行ってきたため、「機能」ではなく「現場で続く最適解」を提案できます。
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-full text-base font-bold shadow-sm">現場を理解している</span>
            <span className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-full text-base font-bold shadow-sm">仕組みに落とせる</span>
            <span className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-full text-base font-bold shadow-sm">ツールの癖を見抜ける</span>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#111418] mb-8 text-center">導入の流れ（最短で成果まで）</h2>
          <div className="flex flex-wrap justify-center gap-3 text-base font-medium text-gray-600">
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">ヒアリング</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">業務棚卸し</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">ツール選定</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">初期設定・テンプレ</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">ルール整備</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">定着サポート</span>
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#111418] mb-8">納品物（手元に残るもの）</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              "ツール構成図（何を何のために使うか）",
              "初期設定一式（アカウント/権限/基本設定）",
              "院専用テンプレ（説明・返信・院内文書・プロンプト）",
              "運用ルール（安全・品質・確認手順）",
              "定着チェックリスト（週次15分）"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">folder_zip</span>
                <span className="text-gray-800 font-medium text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Target */}
        <div className="bg-[#111921] text-white p-10 rounded-2xl mb-20 shadow-lg">
          <h3 className="text-2xl font-bold mb-8 text-center">こんな方におすすめです</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">整体院・整骨院・治療院の院長／現場責任者</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">AI/DXに興味はあるが、何を選べばいいかわからない</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">導入しても定着せず、成果に結びつかなかった経験がある</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-2xl">check</span>
              <span className="text-lg">少人数で回していて、業務が院長に寄っている</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-[#111418] mb-12 text-center">よくある質問 (FAQ)</h2>
          <div className="space-y-8">
            {[
              { q: "すでにツールをいくつか導入していますが、相談できますか？", a: "もちろん可能です。今の構成を整理して「残す/捨てる/統合する」を決め、最小構成に再設計します。" },
              { q: "どれくらいで効果が出ますか？", a: "文章・返信などから入る場合、早い院は初月から体感できます。重要なのは“続く運用”を先に作ることです。" },
              { q: "スタッフが使えるか不安です。", a: "使い方を院として統一し、テンプレ化するので、個人差が出にくくなります。必要なら簡易研修もセットで組みます。" },
              { q: "患者情報の扱いが心配です。", a: "入力ルールと禁止事項、出力の確認手順を最初に整えます。安全を前提に設計します。" }
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
          <h2 className="text-3xl font-bold mb-6">まずは「今のツール状況」と「困りごと」を教えてください</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            ツールは、正しく選べば現場の負担を減らし、技術に集中する時間を増やします。<br />
            貴院に刺さる最小構成で、最短で成果に繋げます。
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

export default AiToolsPage;