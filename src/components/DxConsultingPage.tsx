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
            現場の“本当に困っている”を、小さく作って解決する
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            DXコンサルティング
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed">
            患者接点は“残す”。<br className="md:hidden" />現場の負担を“減らす”。
          </p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Intro */}
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 mb-16">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            DXは、患者さんとの接点を無理に自動化することではありません。<br />
            整体院・整骨院の価値は、目の前の患者さんとの対話や、施術の質、空気感に宿ります。<br />
            だから私は、予約や問診などの“フロント”を過剰に仕組み化するよりも、<span className="font-bold text-[#111418] bg-yellow-100 px-1">現場の負担になっている課題を見つけて、最小のツールを作って解決する</span>ことに重点を置きます。
          </p>
          <p className="text-gray-700 text-xl leading-relaxed font-bold text-center border-t border-b border-gray-100 py-8 my-8">
            「困りごとを見つける → 小さく作る → 現場で回す → 改善する」
          </p>
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            この繰り返しで、派手なシステム導入なしに、<strong className="text-primary text-xl">ちゃんと効くDX</strong>を実現します。
          </p>
        </div>

        {/* Pain Points */}
        <div className="mb-20">
          <h2 className="text-center text-3xl font-bold text-[#111418] mb-10">こんな悩みありませんか？</h2>
          <div className="bg-background-light p-8 md:p-10 rounded-2xl">
            <ul className="space-y-5">
              {[
                "“地味に面倒”な作業が多く、院長が雑務に飲まれている",
                "紙・LINE・メモ・Excel・予約システムが散らばっていて、情報が分断している",
                "毎回同じ文章・同じ説明をしているのに、テンプレ化できていない",
                "スタッフ教育や共有が属人化して、院長がずっと教え続けている",
                "「ツールを入れたけど現場に合わず」使われなくなった",
                "大きなシステムを入れるほどではないが、確実に解決したい課題がある",
                "外注すると高い／伝言ゲームになる／納期が遅い… 小回りが利かない"
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
          <h2 className="text-center text-3xl font-bold text-[#111418] mb-10">このDXコンサルで得られる成果</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">1）本業（施術・技術研鑽）に集中できる時間が増える</div>
              <p className="text-gray-600 text-base leading-relaxed">院長が抱えがちな“周辺業務”を軽くし、エネルギーを本質に戻します。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">2）現場の運用が整い、ストレスと抜け漏れが減る</div>
              <p className="text-gray-600 text-base leading-relaxed">「どこに何があるか」「何をやればいいか」が整理され、現場が回りやすくなります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">3）小さな改善が積み上がり、院が強くなる</div>
              <p className="text-gray-600 text-base leading-relaxed">一発の大改革ではなく、“効く改善”を繰り返す組織になります。</p>
            </div>
            <div className="border border-gray-200 p-8 rounded-xl bg-white shadow-sm">
              <div className="text-primary font-bold text-xl mb-3">4）外注しなくても、院内でDXが回るようになる</div>
              <p className="text-gray-600 text-base leading-relaxed">GASなどを使った小規模開発で、内製の土台ができ、改善スピードが上がります。</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-primary font-bold text-base uppercase tracking-wider">Features</span>
            <h2 className="text-3xl font-bold text-[#111418] mt-2">私のDXコンサルの特徴（大規模導入しないDX）</h2>
          </div>
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">1</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">患者接点は“残す”。現場の負担を“減らす”。</h3>
                <p className="text-gray-700 text-lg mb-3">
                  患者さんとの対話や信頼形成は、整体院の価値そのもの。そこを過剰に自動化するのではなく、
                </p>
                <div className="flex flex-wrap gap-2.5 mb-2">
                  {["バックオフィス", "情報整理", "文書・テンプレ", "教育・共有", "記録の整形", "発信の下準備"].map(tag =>(
                    <span key={tag} className="text-sm bg-gray-100 text-gray-800 px-3 py-1.5 rounded border border-gray-200">{tag}</span>
                  ))}
                </div>
                <p className="text-gray-700 text-lg mt-3">といった <span className="font-bold underline decoration-primary/30">“現場がしんどい部分”</span>にこそDXを当てます。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">2</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">「導入」ではなく「開発・運用」で解決する</h3>
                <p className="text-gray-700 text-lg leading-relaxed">既製ツールの導入だけでは解けないニッチな課題は多いです。だからこそ、現場にフィットする小さなツールを作るという選択肢を持ちます。</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="size-14 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-primary font-bold text-2xl">3</div>
              <div>
                <h3 className="text-xl font-bold text-[#111418] mb-3">小規模開発（GAS）で、最短で現場に効かせる</h3>
                <p className="text-gray-700 text-lg leading-relaxed">Google Apps Script（GAS）やスプレッドシート連携など、現場で扱いやすい技術で “すぐ使える” を作ります。</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scope of Support */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#111418] mb-10 text-center">具体的に何をやるのか（支援範囲）</h2>
          <div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {[
              {
                title: "① 課題発見（本当に解くべき問題を特定）",
                content: "業務棚卸し（院長/スタッフが時間を取られている作業）／“しんどい原因”を分解／改善優先度の決定"
              },
              {
                title: "② 仕組み設計（ツールを作る前に、流れを整える）",
                content: "入力→処理→出力の設計／テンプレ化（文章・手順・チェックリスト）／運用ルール（誰が、いつ、何を）"
              },
              {
                title: "③ 小規模ツール開発・内製支援（GAS中心）",
                content: "GASでの自動化（転記・集計・通知・生成）／スプレッドシート運用設計／LINE・メール定型文補助／簡易UI作成"
              },
              {
                title: "④ 定着・改善（週次15分の改善会で回す）",
                content: "使われない原因の除去／改善の優先順位付け／小さな改修を積み上げる運用"
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

        {/* Examples */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#111418] mb-8 text-center">ありがちな“整体院のニッチ課題”と、小規模開発の例</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                problem: "情報が散らばる",
                solution: "シートをハブにして、入力・検索・共有の導線を統一"
              },
              {
                problem: "同じ文章を毎回作る（説明、注意事項、セルフケア）",
                solution: "テンプレ＋フォーム入力で自動生成（院の言葉に統一）"
              },
              {
                problem: "スタッフ教育が属人化",
                solution: "チェックリスト・ロープレ台本・ケース共有フォームの整備"
              },
              {
                problem: "記録が“未来に活きない”",
                solution: "重要項目だけ拾って要約し、検索しやすい形に整形"
              },
              {
                problem: "やり忘れが出る（フォロー、物販、次回提案）",
                solution: "ルール化＋簡易通知（必要最小限）"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col justify-center shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <span className="material-symbols-outlined text-gray-400 mt-0.5 text-2xl">help</span>
                  <p className="font-bold text-gray-800 text-lg">{item.problem}</p>
                </div>
                <div className="ml-9 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-base font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Me */}
        <div className="mb-20 bg-background-light p-10 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-[#111418] mb-5">なぜ私が提供できるのか</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            私は、整体院の現場に立ちながら、実務の「困った」を起点に改善を積み上げてきました。<br />
            そして、既製ツールだけでは埋まらない部分を、小規模開発（特にGAS）や仕組み設計で埋めるというアプローチを実践してきました。
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-full text-base font-bold shadow-sm">現場を知っている</span>
            <span className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-full text-base font-bold shadow-sm">仕組みに落とせる</span>
            <span className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-full text-base font-bold shadow-sm">作れる</span>
            <span className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-full text-base font-bold shadow-sm">伝えられる</span>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#111418] mb-8 text-center">進め方（小さく・早く・確実に）</h2>
          <div className="flex flex-wrap justify-center gap-3 text-base font-medium text-gray-600">
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">ヒアリング</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">課題発見</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">最小ツール設計</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">プロトタイプ作成</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">現場運用・改善</span>
            <span className="material-symbols-outlined text-gray-400 pt-3">arrow_right_alt</span>
            <span className="bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm">拡張</span>
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#111418] mb-8">納品物（手元に残るもの）</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              "課題マップ（困りごと→原因→解決案）",
              "運用設計（導線図・ルール・チェックリスト）",
              "小規模ツール（GAS/スプレッドシート連携 等）",
              "テンプレ群（説明・返信・院内文書・教育）",
              "改善サイクルの型（週次15分の運用）"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">folder_zip</span>
                <span className="text-gray-800 font-medium text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-[#111418] mb-12 text-center">よくある質問 (FAQ)</h2>
          <div className="space-y-8">
            {[
              { q: "大きなシステム導入は必要ですか？", a: "必要ありません。まずは“小さく作って効かせる”が基本です。大規模導入は、必要になってからで十分です。" },
              { q: "患者さん向けの自動化はやりませんか？", a: "過剰な自動化はおすすめしません。整体院の価値である「対話・信頼」を守りつつ、裏側の負担を減らす設計を優先します。" },
              { q: "開発は外注ではなく、院内で回せますか？", a: "回せます。GASやスプレッドシート中心で、院内運用できる形に落とし込みます。必要に応じて、内製できるようにレクチャーも行います。" },
              { q: "どのくらいで成果が出ますか？", a: "早いケースでは初月から体感できます。重要なのは、最小の改善を確実に定着させることです。" }
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
          <h2 className="text-3xl font-bold mb-6">まずは「現場の困りごと」を1つだけ教えてください</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            DXは、派手な導入ではなく、現場のストレスを一つずつ消していくことから始まります。<br />
            貴院に合った“最小ツール”を設計し、現場で回る形に落とし込みます。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="bg-primary hover:bg-blue-600 text-white font-bold py-5 px-10 rounded-lg shadow-lg shadow-blue-500/30 transition-all text-lg"
            >
              無料相談を予約する
            </button>
            <button className="bg-transparent border border-gray-500 hover:border-white hover:text-white text-gray-300 font-bold py-5 px-10 rounded-lg transition-all text-lg">
              課題整理シートDL
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