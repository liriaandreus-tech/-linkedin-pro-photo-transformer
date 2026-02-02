
import React, { useRef } from 'react';

interface UploadSectionProps {
  onImageSelect: (file: File, previewUrl: string) => void;
  currentPreview: string | null;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelect, currentPreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <i className="fa-solid fa-cloud-arrow-up text-[#0a66c2] text-sm"></i>
          </div>
          1. Upload sua Foto
        </h3>
        
        <div 
          onClick={triggerUpload}
          className={`
            relative cursor-pointer group border-2 border-dashed rounded-xl transition-all duration-300
            ${currentPreview ? 'border-transparent' : 'border-gray-200 hover:border-[#0a66c2] bg-gray-50/50 hover:bg-blue-50/30'}
            flex flex-col items-center justify-center aspect-square overflow-hidden
          `}
        >
          {currentPreview ? (
            <>
              <img 
                src={currentPreview} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="bg-white/90 px-4 py-2 rounded-full flex items-center gap-2">
                  <i className="fa-solid fa-arrows-rotate text-[#0a66c2]"></i>
                  <p className="text-[#0a66c2] font-bold text-sm">Trocar imagem</p>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-camera text-2xl text-gray-300 group-hover:text-[#0a66c2]"></i>
              </div>
              <p className="text-gray-700 font-bold mb-1">Selecionar Foto</p>
              <p className="text-xs text-gray-400">Arraste ou clique para abrir a galeria</p>
            </div>
          )}
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        
        <div className="mt-4 flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl text-blue-900/70 text-[11px] md:text-xs leading-relaxed">
          <i className="fa-solid fa-lightbulb text-amber-400 mt-0.5"></i>
          <p><span className="font-bold text-blue-900">Dica:</span> Fotos de frente, com iluminação natural e sem óculos escuros geram resultados 90% melhores.</p>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
