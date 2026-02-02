
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    }
  };

  const scrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('galeria');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#0a66c2] text-white p-1.5 rounded-sm font-bold text-lg md:text-xl leading-none">
            in
          </div>
          <span className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
            ProPhoto<span className="text-[#0a66c2]">AI</span>
          </span>
        </div>
        
        <nav className="flex items-center gap-2 md:gap-4">
          {deferredPrompt && (
            <button 
              onClick={handleInstall}
              className="bg-green-600 text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase flex items-center gap-1 shadow-md shadow-green-100 animate-bounce-slow"
            >
              <i className="fa-solid fa-mobile-screen-button"></i>
              Instalar App
            </button>
          )}

          <button 
            onClick={scrollToGallery}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0a66c2] transition-colors p-2 rounded-lg hover:bg-gray-50"
            title="Minha Galeria"
          >
            <i className="fa-solid fa-images text-lg"></i>
            <span className="hidden sm:inline text-sm font-medium">Galeria</span>
          </button>
          
          <a 
            href="#" 
            className="bg-[#0a66c2] text-white px-3 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold hover:bg-[#004182] transition-all shadow-md shadow-blue-100 active:scale-95"
          >
            Pro
          </a>
        </nav>
      </div>
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
      `}</style>
    </header>
  );
};

export default Header;
