import React, { useState } from 'react';

interface NavbarProps {
  onNavigate?: (page: string, id?: number) => void;
  currentRoute?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentRoute = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (onNavigate) {
      if (currentRoute !== 'home') {
        onNavigate('home');
        // Delay to allow Home component to mount before scrolling
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
       // Fallback for standard behavior if onNavigate isn't provided
       const element = document.querySelector(hash);
       if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const goHome = () => {
    if (onNavigate) onNavigate('home');
    setIsOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#f0f2f4]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={goHome}>
            <div className="size-8 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">neurology</span>
            </div>
            <span className="text-[#111418] text-lg font-bold tracking-tight">整体院のAI仕組み化支援</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, '#services')} href="#services">サービス</a>
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, '#events')} href="#events">イベント</a>
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, '#blog')} href="#blog">コラム</a>
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, '#content')} href="#content">メディア</a>
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, '#about')} href="#about">プロフィール</a>
            <button 
              onClick={(e) => handleLinkClick(e as any, '#contact')}
              className="bg-primary hover:bg-blue-600 text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-all shadow-sm shadow-blue-200"
            >
              無料相談を予約
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-500 hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute left-0 right-0 shadow-lg px-4 py-4 flex flex-col gap-4">
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="#services" onClick={(e) => handleLinkClick(e, '#services')}>サービス</a>
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="#events" onClick={(e) => handleLinkClick(e, '#events')}>イベント</a>
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="#blog" onClick={(e) => handleLinkClick(e, '#blog')}>コラム</a>
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="#content" onClick={(e) => handleLinkClick(e, '#content')}>メディア</a>
            <a className="text-sm font-medium text-gray-600 hover:text-primary transition-colors" href="#about" onClick={(e) => handleLinkClick(e, '#about')}>プロフィール</a>
             <button 
              onClick={(e) => handleLinkClick(e as any, '#contact')}
              className="bg-primary hover:bg-blue-600 text-white text-sm font-bold py-3 px-5 rounded-lg transition-all w-full text-center"
            >
              無料相談を予約
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;