
import React from 'react';
import { Product, ViewMode } from '../types';

interface ComparisonBarProps {
  products: Product[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  onClear: () => void;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({ products, onRemove, onCompare, onClear }) => {
  if (products.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="glass bg-white/90 border border-blue-200 rounded-3xl shadow-2xl p-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 flex-1 overflow-x-auto no-scrollbar">
          <div className="shrink-0 flex flex-col items-center justify-center px-4 border-r border-slate-200">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">Compare</span>
            <span className="text-xl font-black text-slate-900">{products.length}<span className="text-slate-400 text-sm">/3</span></span>
          </div>
          
          <div className="flex gap-3">
            {products.map((p) => (
              <div key={p.id} className="relative group shrink-0">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm"
                />
                <button 
                  onClick={() => onRemove(p.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
            {[...Array(3 - products.length)].map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                <i className="fas fa-plus text-xs"></i>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onClear}
            className="hidden sm:block text-xs font-bold text-slate-500 hover:text-red-500 transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={onCompare}
            disabled={products.length < 2}
            className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg ${
              products.length >= 2 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25 active:scale-95' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {products.length < 2 ? 'Add 1 more' : 'Compare Now'}
            <i className="fas fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
