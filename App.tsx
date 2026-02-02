
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import EditorControls from './components/EditorControls';
import LoadingState from './components/LoadingState';
import ResultSection from './components/ResultSection';
import Gallery from './components/Gallery';
import { ProfessionalStyle, BackgroundType, TransformationConfig, GalleryItem } from './types';
import { transformImage } from './services/geminiService';
import { getGallery, saveToGallery, deleteFromGalleryDB } from './services/storageService';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const [config, setConfig] = useState<TransformationConfig>({
    style: ProfessionalStyle.CASUAL_BUSINESS,
    background: BackgroundType.OFFICE,
    enhanceLighting: true,
    cleanSkin: true,
    userPrompt: ''
  });

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const items = await getGallery();
        setGallery(items);
      } catch (e) {
        console.error("Erro ao carregar galeria da IndexedDB", e);
      }
    };
    loadGallery();
  }, []);

  const handleImageSelect = (file: File, url: string) => {
    setSelectedFile(file);
    setPreviewUrl(url);
    setProcessedUrl(null);
    setError(null);
  };

  const handleAddToGallery = async (url: string, style: string) => {
    try {
      const newItem: GalleryItem = {
        id: crypto.randomUUID(),
        url,
        style,
        timestamp: Date.now()
      };
      await saveToGallery(newItem);
      setGallery(prev => [newItem, ...prev]);
    } catch (e) {
      console.error("Falha ao salvar na galeria:", e);
    }
  };

  const deleteFromGallery = async (id: string) => {
    try {
      await deleteFromGalleryDB(id);
      setGallery(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error("Erro ao deletar:", e);
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `perfil-linkedin-pro-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTransform = async () => {
    if (!previewUrl || !selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const result = await transformImage(previewUrl, selectedFile.type, config);
      setProcessedUrl(result);
      await handleAddToGallery(result, config.style);
      
      // Auto-scroll to result on mobile
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          document.getElementById('resultado-container')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err: any) {
      console.error("Transform Error:", err);
      setError(err.message || "Ocorreu um erro inesperado. Tente uma foto menor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header />
      
      <main className="flex-1 py-6 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-block px-4 py-1.5 mb-4 bg-blue-50 text-[#0a66c2] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] rounded-full border border-blue-100">
              Transformação com IA Realista
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 tracking-tighter leading-none">
              Turbine seu <span className="text-[#0a66c2]">LinkedIn</span>
            </h1>
            <p className="text-sm md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              Troque o fundo, a roupa e a iluminação em segundos. Tenha a presença digital de um executivo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
            <div className="lg:col-span-4 space-y-6">
              <UploadSection 
                onImageSelect={handleImageSelect} 
                currentPreview={previewUrl} 
              />
              
              <EditorControls 
                config={config}
                setConfig={setConfig}
                onTransform={handleTransform}
                isLoading={loading}
                disabled={!previewUrl}
              />
            </div>

            <div id="resultado-container" className="lg:col-span-8 scroll-mt-24">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-900 p-4 rounded-2xl mb-6 animate-shake">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-circle-exclamation text-red-600"></i>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Problema detectado</p>
                      <p className="text-xs opacity-70">{error}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setError(null)}
                    className="mt-3 w-full bg-white/50 py-2 rounded-lg text-xs font-black uppercase tracking-widest text-red-900 border border-red-100"
                  >
                    Recomeçar
                  </button>
                </div>
              )}

              {loading ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[450px] md:min-h-[550px] flex items-center justify-center">
                  <LoadingState />
                </div>
              ) : processedUrl && previewUrl ? (
                <ResultSection 
                  originalUrl={previewUrl}
                  processedUrl={processedUrl}
                />
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 border-dashed min-h-[400px] md:min-h-[550px] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative">
                    <i className="fa-solid fa-wand-sparkles text-3xl text-gray-200"></i>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-4 border-white animate-pulse"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Aguardando Imagem</h3>
                  <p className="text-sm text-gray-400 max-w-xs mx-auto">
                    Faça o upload de uma selfie comum e veja como a IA projeta sua autoridade profissional.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <Gallery 
            items={gallery} 
            onDelete={deleteFromGallery} 
            onDownload={handleDownload} 
          />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <div className="bg-gray-800 text-white p-1 rounded-sm font-bold text-sm">in</div>
            <span className="font-bold text-gray-800">ProPhotoAI</span>
          </div>
          <p className="text-gray-400 text-xs text-center leading-loose max-w-sm">
            Nossa IA é treinada para respeitar sua etnia e traços faciais originais, alterando apenas vestimenta e contexto.
          </p>
          <div className="flex gap-4">
            {['github', 'linkedin', 'twitter'].map(social => (
              <a key={social} href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-[#0a66c2] transition-all">
                <i className={`fa-brands fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
