
import React from 'react';
import { GalleryItem } from '../types';

interface GalleryProps {
  items: GalleryItem[];
  onDelete: (id: string) => void;
  onDownload: (url: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ items, onDelete, onDownload }) => {
  if (items.length === 0) return null;

  return (
    <section id="galeria" className="mt-20 scroll-mt-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sua Galeria Pro</h2>
          <p className="text-gray-500 text-sm">Acesse todas as suas transformações salvas localmente.</p>
        </div>
        <div className="bg-[#0a66c2]/10 text-[#0a66c2] px-3 py-1 rounded-full text-xs font-bold">
          {items.length} {items.length === 1 ? 'Foto' : 'Fotos'}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img 
                src={item.url} 
                alt={item.style} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => onDownload(item.url)}
                  className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
                  title="Baixar"
                >
                  <i className="fa-solid fa-download"></i>
                </button>
                <button 
                  onClick={() => onDelete(item.id)}
                  className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Excluir"
                >
                  <i className="fa-solid fa-trash-can text-sm"></i>
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-[10px] font-bold text-[#0a66c2] uppercase tracking-wider mb-1">
                {item.style}
              </p>
              <p className="text-[10px] text-gray-400">
                {new Date(item.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
