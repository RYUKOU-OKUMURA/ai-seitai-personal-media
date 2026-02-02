import React from 'react';

const ContentHub: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="content">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Content Hub</span>
          <h2 className="text-3xl font-black text-[#111418]">発信・メディア</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* YouTube Highlight */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-[#111418] flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600">play_circle</span> YouTube 最新動画
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <a className="group block cursor-pointer">
                <div className="aspect-video bg-gray-900 rounded-lg mb-3 overflow-hidden relative">
                  <img 
                    alt="Video thumbnail regarding AI tools for business" 
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWlIhS4_5Mk87fUsdQbSKLQM-0SxLglbr2c4Efg7pVW9klHhLnWGDj6-73BHdZ9VKmcIfa2ahdCbpEFGP-WxPUQypQGksm2EphKknumq0u03ifj-UkoCABD5VCbwQfpkmI42OykPy3Lsfj717VJrzDH-cTXtS3MvJyICA5Nb9oUwBnk-x1gW9-wpDnbG1ZZACBI_QzgxB2QtcJTag2qNxiNYHsQB5fFc5yeCz9DvHUAHn1M7hqljTCMpSyu18ud-R9b12WSUayk3c" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg opacity-80 group-hover:scale-110 transition-transform">play_arrow</span>
                  </div>
                </div>
                <h4 className="font-bold text-[#111418] leading-snug group-hover:text-primary transition-colors">【保存版】治療院経営で使えるChatGPTプロンプト10選</h4>
                <span className="text-sm text-gray-500 mt-1 block">2023.10.15 • 12K Views</span>
              </a>
              <a className="group block cursor-pointer">
                <div className="aspect-video bg-gray-900 rounded-lg mb-3 overflow-hidden relative">
                  <img 
                    alt="Video thumbnail abstract AI network visualization" 
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-MBdU3fHnJk8nlqpHsihLxtihjJHxKErj5V6NAaSn1nMTYDHQCP7tH92Qeb4rLGv4GjRZu_ZSqw7PoZgBIJfeKYdD7fM5lybo3GRrLlRkezHtxayZqshwTMTaXOn66Jn1pp7yd1gYCmAdtKjR3OkE_apsI7Scgd6pszNw-DgUYE8MgfA2p29NwkJqJOFWSRiwqscUUb5dfnRrBW4iV7iiwCFE9hrL8xEqZvkcazmbU2v_Ntv79WQpwYh4kf_pXXhhuVllLsiqIqI" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg opacity-80 group-hover:scale-110 transition-transform">play_arrow</span>
                  </div>
                </div>
                <h4 className="font-bold text-[#111418] leading-snug group-hover:text-primary transition-colors">小さなクリニックのDX、まずはここから始めよう。</h4>
                <span className="text-sm text-gray-500 mt-1 block">2023.10.08 • 8.5K Views</span>
              </a>
            </div>
          </div>
          {/* Note Articles */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 h-fit shadow-sm">
            <h3 className="text-xl font-bold text-[#111418] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600">edit_note</span> note 記事
            </h3>
            <div className="space-y-6">
              <a className="block group cursor-pointer">
                <div className="flex gap-4 items-start">
                  <div 
                    className="w-20 h-20 bg-gray-100 rounded-md shrink-0 bg-cover bg-center" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBORBNwMAfCfv91YIvhRTpcLmlyNE1931BQsfZ7hro8XM6o-CCWG62c2YpagSp3inYIuc5R6DCjRQvHqdDzy9fGN0nY9Ec1nS7O6FGOPjR3U6CTz6lLOgBZqK5MlJL2Z_hwBEYWimpdPJThi6B0687oI6QB4DUsLxQJLLOzrqov8OZcz5DsVvyV_STPSR55aCjBXe-qh3iCyCRjvTyCmY_HJofZQpZFWlFbWIwQ5HngE2137FRPqLTPi1lt2l7qo9poGM5JOepDNYA')" }}
                    role="img"
                    aria-label="Notebook and pen"
                  ></div>
                  <div>
                    <h4 className="font-bold text-[#111418] text-sm leading-snug mb-1 group-hover:text-primary transition-colors">個人院長がAIを学ぶべき本当の理由。技術革新の波に乗るために。</h4>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                </div>
              </a>
              <div className="border-t border-gray-100"></div>
              <a className="block group cursor-pointer">
                <div className="flex gap-4 items-start">
                  <div 
                    className="w-20 h-20 bg-gray-100 rounded-md shrink-0 bg-cover bg-center" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBO2sG91u3o3HaNBi3oP5nSeMhJrjnmS33G3V6Z0tMjoAM41CAG9vmUfQmSskmaXBDD4LvQ6ZkAV_7tRiakCgcGgt8dsCaIznI9hgumJ6CGNc8a1fDc3uryXWa_jn051pNqY05L6f1cZp6H2mNDJE_qGC-1CSXgZYM9umAh13kPGmBFV5E4qhntpFSAtMU5eQKMuEVaPRW2K2VLJWMSaQoQlnYwDQreoWeIUIXfGSN6JDCS9wLtWz-6v8jp4aaV6EPZsnvxO0pGePQ')" }}
                    role="img"
                    aria-label="Team brainstorming"
                  ></div>
                  <div>
                    <h4 className="font-bold text-[#111418] text-sm leading-snug mb-1 group-hover:text-primary transition-colors">スタッフ教育にAIを取り入れたら、離職率が下がった話。</h4>
                    <span className="text-xs text-gray-400">1 week ago</span>
                  </div>
                </div>
              </a>
              <div className="border-t border-gray-100"></div>
              <a className="block text-center text-sm font-bold text-primary mt-4 hover:underline cursor-pointer">もっと見る</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentHub;