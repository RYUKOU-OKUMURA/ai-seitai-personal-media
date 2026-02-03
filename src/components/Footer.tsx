import React from 'react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#111921] text-white py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>
            <div className="size-8 text-white bg-white/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">neurology</span>
            </div>
            <span className="text-xl font-bold tracking-tight">BOSS Personal Media</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>サービス一覧</a>
            <a className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</a>
            <a className="hover:text-white transition-colors cursor-pointer">特定商取引法に基づく表記</a>
          </div>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
              </svg>
            </a>
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 flex justify-between text-sm text-gray-500">
          <span>© 2023 BOSS Personal Media. All rights reserved.</span>
          <a className="cursor-pointer hover:text-gray-300 opacity-50" href="/admin">
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
