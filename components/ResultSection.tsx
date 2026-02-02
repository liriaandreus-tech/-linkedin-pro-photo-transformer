
import React, { useState } from 'react';

interface ResultSectionProps {
  originalUrl: string;
  processedUrl: string;
}

const ResultSection: React.FC<ResultSectionProps> = ({ originalUrl, processedUrl }) => {
  const [view, setView] = useState<'after' | 'before'>('after');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = `perfil-linkedin-pro-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
            <i className="fa-solid fa-circle-check text-green-500 text-sm"></i>
          </div>
          3. Resultado Final
        </h3>
        
        <div className="flex bg-gray-100/80 p-1.5 rounded-xl self-center sm:self-auto">
          <button 
            onClick={() => setView('before')}
            className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${view === 'before' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'}`}
          >
            ANTES
          </button>
          <button 
            onClick={() => setView('after')}
            className={`px-5 py-2 text-xs font-black rounded-lg transition-all ${view === 'after' ? 'bg-[#0a66c2] text-white shadow-sm' : 'text-gray-400'}`}
          >
            DEPOIS
          </button>
        </div>
      </div>

      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group">
        <img 
          src={view === 'after' ? processedUrl : originalUrl} 
          alt="Resultado" 
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {view === 'after' && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 sm:opacity-0 sm:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button 
              onClick={handleDownload}
              className="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl active:scale-95"
            >
              <i className="fa-solid fa-download"></i>
              Baixar PNG
            </button>
            <button 
              className="w-14 bg-white/95 backdrop-blur-sm text-[#0a66c2] font-bold rounded-xl flex items-center justify-center hover:bg-white transition-all shadow-xl active:scale-95"
              title="Ir para o LinkedIn"
              onClick={() => window.open('https://www.linkedin.com/', '_blank')}
            >
              <i className="fa-brands fa-linkedin-in text-xl"></i>
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-100/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <i className="fa-solid fa-sparkles text-[#0a66c2] text-[10px]"></i>
            </div>
            <h4 className="font-bold text-[#0a66c2] text-xs uppercase tracking-wider">Avaliação do Perfil</h4>
          </div>
          <p className="text-xs text-blue-900/70 leading-relaxed font-medium">
            Sua foto agora segue os padrões de contratantes de elite: fundo desfocado, iluminação tripla e enquadramento centralizado.
          </p>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="w-full text-center text-gray-400 font-bold text-xs hover:text-[#0a66c2] transition-colors py-2 uppercase tracking-widest"
        >
          Criar nova versão
        </button>
      </div>
    </div>
  );
};

export default ResultSection;
