
import React, { useState, useEffect } from 'react';

const messages = [
  "Iniciando a transformação mágica...",
  "Analisando traços faciais para manter a naturalidade...",
  "Selecionando o melhor tecido para seu traje executivo...",
  "Montando o cenário profissional ideal...",
  "Ajustando iluminação volumétrica...",
  "Aplicando acabamento de alta resolução...",
  "Quase pronto! Finalizando os últimos detalhes..."
];

const LoadingState: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="w-24 h-24 border-4 border-blue-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-t-[#0a66c2] rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <i className="fa-solid fa-user-tie text-3xl text-[#0a66c2]"></i>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">Sua nova carreira começa aqui</h3>
      <p className="text-gray-500 max-w-xs mx-auto animate-pulse transition-all duration-500">
        {messages[msgIndex]}
      </p>

      <div className="mt-8 w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#0a66c2] animate-progress"></div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 20s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
