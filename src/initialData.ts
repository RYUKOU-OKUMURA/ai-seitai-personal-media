import type { EventItem, BlogPost, CaseStudy } from './types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "【無料ウェビナー】治療院のための生成AI入門講座",
    date: "2023.11.15 (水) 20:00~",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "募集中",
    link: "#"
  },
  {
    id: 2,
    title: "12月度 経営者限定グループコンサルティング",
    date: "2023.12.02 (土) 10:00~",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "残り3枠",
    link: "#"
  },
  {
    id: 3,
    title: "【アーカイブ配信】DX導入で失敗しない3つの鉄則",
    date: "視聴期限：11.30まで",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "動画",
    link: "#"
  },
  {
    id: 4,
    title: "Redcord × AI 施術効率化ワークショップ in 東京",
    date: "2024.01.20 (土) 13:00~",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "先行予約",
    link: "#"
  },
  {
    id: 5,
    title: "院内マニュアル作成 1Dayキャンプ",
    date: "2024.02.10 (土)",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "告知予定",
    link: "#"
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "「とりあえずAI」で失敗する院長、3つの共通点。",
    date: "2023.10.28",
    category: "マインドセット",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "流行りに乗ってChatGPTを契約したものの、結局Google検索と同じ使い方しかしていない…。そんな「ツール迷子」にならないための思考法について解説します。",
    content: "本文テキスト..."
  },
  {
    id: 2,
    title: "スタッフにAIを使わせるなら「禁止事項」より「推奨事例」を作れ",
    date: "2023.10.20",
    category: "チームビルディング",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "情報漏洩が怖いからといってガチガチに制限すると、誰も使わなくなります。安全を担保しつつ、現場が面白がって使うためのルールの作り方。",
    content: "本文テキスト..."
  },
  {
    id: 3,
    title: "問診票をAIに食わせたら、初診の成約率が15%上がった話",
    date: "2023.10.12",
    category: "実践ノウハウ",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    excerpt: "患者さんが書いた問診票の「行間」を読む。AIによる事前分析を取り入れることで、問診の質が劇的に変わります。具体的なプロンプトも公開。",
    content: "本文テキスト..."
  }
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    client: "A整骨院 様 (スタッフ5名)",
    title: "SNS運用とコンテンツ作成時間が80%削減",
    tags: ["コスト削減", "集客UP"],
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCDRJWZE5IChn_vNDYYPQmTgchqte39lAEBbKgLO6clEoPWRlVb2eTxoN1OgzvIEQFzBuLZUmNTb0p0883Me2GVcZcyDQ6gB6Ylzsd8R1M5QJKFDCYeSFi5WMEOf76Xslul5y6uKzIzqf8mpdjapUiYpRB_x_6yobYSR_lkaiB-s0FGLsTalZcPuJtyTIhspSwDCgVvIUly8zw0Tfu-FpollkFkThjFpHLuJN4QZxtifvE-fzgyAcVh5x0nNderdqpPF1-d3sIIkHo"],
    excerpt: "SNS運用とコンテンツ作成時間が80%削減。スタッフ主導で運用が回る仕組みを構築。",
    content: "詳細記事..."
  },
  {
    id: 2,
    client: "B鍼灸院 様 (個人経営)",
    title: "問い合わせ対応速度が3倍に。成約率も15%向上",
    tags: ["業務効率化", "顧客満足度"],
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAd0XYG_fv8FdMuluAtbyuOJofg2pWuhdOo1XJhjJlDVDA_403QQfWkpPPr-6bJXdrRiAWwiz8xYD39m3MSyog-UNHpwo3r4zej23KDKDBf7HXHAhsjArLTdiXr-LamjNaMhvRg7CZYESlgRnv-sxjcAp1qhOQBq_WyBpU9QwmDs2lChlMT_9NMdKfF7PyqODHLiWg3Ie9CGojaXedMQXo4we2mTn3LtXiwOK0fmDNNy3EXbEfWTffkBR-Mb-0JzQ5-wPwCFNeCn4Q"],
    excerpt: "LINE返信の自動化とテンプレート化により、問い合わせ対応速度が3倍に。",
    content: "詳細記事..."
  },
  {
    id: 3,
    date: "2026.01.31",
    client: "複数店舗運営 整体院グループ",
    title: "現場スタッフ全員が「使える」へ。音声文字起こしで情報共有を変革",
    tags: ["AI研修", "チームビルディング", "業務効率化"],
    // NOTE: Replace these URLs with the actual uploaded images
    images: [
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Seminar Room
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Presentation
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Group
    ],
    excerpt: "生成AIを「詳しい人だけのツール」ではなく、現場スタッフ全員が使える状態へ。音声文字起こしと議事録活用で、院長間の連携と現場の記録管理を一新。",
    content: `今回の研修では、生成AIを「詳しい人だけのツール」ではなく、**現場のスタッフ全員が“使えるイメージ”を持てる状態にすること**を目標にしました。最初は「AIって難しそう」「よく分からない」「自分たちの仕事に必要あるの？」といった距離感があるのは自然なことです。だからこそ、知識の説明よりも、実際に触って体感しながら、現場で役立つ使い方を一緒に確認していく形を大切にしました。

研修の中心は、Google AI Studioを使った**音声の文字起こし・議事録作成**の実演です。手作業で行っていた入力や整理が、設定と指示の出し方次第でスムーズになることを体験することで、「これは便利」「これなら使えそう」という反応が多く見られました。また、AIに指示を出す“プロンプト”も特別なものではなく、**相手に分かりやすく具体的に伝える技術**だと理解できたことで、未経験のスタッフでも一気にハードルが下がったのが印象的でした。

受講後は、研修で扱った文字起こし・議事録の仕組みを、院内の報連相や会議記録に実際に取り入れる動きが加速しました。これまで「メモが人によって違う」「伝言の途中で抜ける」「後から確認できない」といった小さなストレスが起きていた部分が、**記録の形が揃い、必要な情報が残る**ことで改善されていきました。特に、複数店舗を運営している整体院では、各院での取り組みや決定事項を議事録として共有できるようになったことで、姉妹院への情報伝達がスムーズになり、抜け漏れの不安が減ったという声も出ています。

さらに、各院の院長同士のコミュニケーションにも変化がありました。会議内容が整理された形で共有されることで、「前回どこまで決まったか」「次に何をするか」が共通認識になりやすく、確認のやり取りが減って**話が早く進む**ようになった。結果として、院長間のコミュニケーションが円滑になり、店舗全体として同じ方向を向きやすくなった——そんな実感が得られています。

受講後の感想では、「AIへの苦手意識が薄れた」「まずは毎日1回触ってみる」「文字起こしから習慣にしたい」といった声が多く、単なる知識ではなく**行動につながる変化**が生まれています。中には、AIを使うこと自体に懐疑的だったスタッフが「面白い」「もっと活用したい」と前向きになり、現場の改善アイデアを自分から探し始めたケースもありました。

私たちが目指しているのは、AIに仕事を奪わせることではありません。**人がやるべき仕事に集中できる環境を整えること**です。生成AIは、正しく使えば現場の“右腕”になります。まずはアレルギー反応をなくし、全員が同じスタートラインに立つ。そこから、小さく試して、必要な範囲で活用を広げていく——。今回の研修は、その最初の一歩を確実に踏み出すための時間になりました。`
  }
];