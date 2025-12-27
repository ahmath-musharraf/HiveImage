
import React from 'react';
import { Product } from '../types';
import { BRAND } from '../constants';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart, onBuyNow }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        <div className="md:w-1/2 bg-slate-100 h-64 md:h-auto">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider mb-4">
              {product.category}
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">{product.name}</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-amber-400 gap-1 text-sm">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-20'}`}></i>
                ))}
              </div>
              <span className="text-slate-500 font-bold text-sm">{product.rating}</span>
            </div>

            <p className="text-2xl font-black text-blue-600 mb-6">£{product.price.toFixed(2)}</p>
            
            <p className="text-slate-600 leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                onBuyNow(product, 1);
                onClose();
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fas fa-bolt"></i>
              Buy Now
            </button>
            <button 
              onClick={() => {
                onAddToCart(product, 1);
                onClose();
              }}
              className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fas fa-shopping-basket"></i>
              Add to Basket
            </button>
          </div>
          
          <p className="text-center text-[10px] text-slate-400 mt-6 flex items-center justify-center gap-2">
            <i className="fas fa-shield-check text-green-500"></i>
            {BRAND.name} Verified Premium Appliance
          </p>
        </div>
      </div>
    </div>
  );
};
