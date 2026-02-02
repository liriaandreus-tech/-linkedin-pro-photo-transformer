
import React from 'react';
import { ProfessionalStyle, BackgroundType, TransformationConfig } from '../types';

interface EditorControlsProps {
  config: TransformationConfig;
  setConfig: (config: TransformationConfig) => void;
  onTransform: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const EditorControls: React.FC<EditorControlsProps> = ({ 
  config, 
  setConfig, 
  onTransform, 
  isLoading, 
  disabled 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 flex flex-col gap-6">
      <div>
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <i className="fa-solid fa-sliders text-[#0a66c2] text-sm"></i>
          </div>
          2. Personalize seu Look
        </h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Estilo Profissional</label>
            <select 
              value={config.style}
              onChange={(e) => setConfig({ ...config, style: e.target.value as ProfessionalStyle })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-[#0a66c2]/20 focus:border-[#0a66c2] outline-none bg-gray-50/50 appearance-none cursor-pointer"
              style={{ minHeight: '48px' }}
            >
              {Object.values(ProfessionalStyle).map(style => (
                <option key={style} value={style} className="text-gray-900">{style}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cenário de Fundo</label>
            <select 
              value={config.background}
              onChange={(e) => setConfig({ ...config, background: e.target.value as BackgroundType })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-[#0a66c2]/20 focus:border-[#0a66c2] outline-none bg-gray-50/50 appearance-none cursor-pointer"
              style={{ minHeight: '48px' }}
            >
              {Object.values(BackgroundType).map(bg => (
                <option key={bg} value={bg} className="text-gray-900">{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Instruções Extras</label>
            <textarea
              value={config.userPrompt}
              onChange={(e) => setConfig({ ...config, userPrompt: e.target.value })}
              placeholder="Ex: Terno escuro, cabelo alinhado..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-[#0a66c2]/20 focus:border-[#0a66c2] outline-none min-h-[100px] resize-none placeholder:text-gray-300 bg-gray-50/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button 
              type="button"
              onClick={() => setConfig({ ...config, enhanceLighting: !config.enhanceLighting })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-xs font-bold ${config.enhanceLighting ? 'bg-blue-50 border-[#0a66c2] text-[#0a66c2]' : 'bg-white border-gray-200 text-gray-400'}`}
            >
              <i className="fa-solid fa-sun"></i>
              Luz Estúdio
            </button>
            <button 
              type="button"
              onClick={() => setConfig({ ...config, cleanSkin: !config.cleanSkin })}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all text-xs font-bold ${config.cleanSkin ? 'bg-blue-50 border-[#0a66c2] text-[#0a66c2]' : 'bg-white border-gray-200 text-gray-400'}`}
            >
              <i className="fa-solid fa-face-smile"></i>
              Retoque Pele
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onTransform}
        disabled={disabled || isLoading}
        className={`
          w-full py-4 rounded-2xl font-bold text-base md:text-lg transition-all flex items-center justify-center gap-3
          ${disabled || isLoading 
            ? 'bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-100' 
            : 'bg-[#0a66c2] text-white hover:bg-[#004182] shadow-lg shadow-blue-200 active:scale-[0.98]'}
        `}
      >
        {isLoading ? (
          <>
            <i className="fa-solid fa-spinner fa-spin"></i>
            Criando Mágica...
          </>
        ) : (
          <>
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            Gerar Foto Pro
          </>
        )}
      </button>
      
      <p className="text-[10px] text-gray-300 text-center uppercase tracking-[0.2em] font-black">
        Gemini 2.5 Flash Engine
      </p>
    </div>
  );
};

export default EditorControls;
