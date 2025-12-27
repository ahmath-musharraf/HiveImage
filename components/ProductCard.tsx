
import React, { useState } from 'react';
import { Product } from '../types';
import { BRAND } from '../constants';

interface ProductCardProps {
  product?: Product; // Made optional for skeleton state
  loading?: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isComparing?: boolean;
  isInWishlist?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  loading,
  onAddToCart, 
  onBuyNow,
  onViewDetails, 
  onToggleCompare, 
  onQuickView,
  onToggleWishlist,
  isComparing = false,
  isInWishlist = false
}) => {
  const [localQty, setLocalQty] = useState(1);

  if (loading || !product) {
    return (
      <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden flex flex-col h-full animate-pulse">
        <div className="relative h-64 skeleton m-4 rounded-2xl"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 w-1/3 skeleton rounded"></div>
          <div className="h-6 w-full skeleton rounded"></div>
          <div className="h-10 w-full skeleton rounded"></div>
          <div className="pt-6 border-t border-slate-50 flex justify-between gap-4">
            <div className="h-10 w-24 skeleton rounded"></div>
            <div className="h-10 w-24 skeleton rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleBuyNowClick = () => {
    onBuyNow(product, localQty);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, localQty);
  };

  const isOnSale = product.price < 100;
  const isLimited = product.stock < 10;
  const isNew = product.featured;

  return (
    <article className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden bg-[#f1f5f9] p-4">
        <img 
          src={product.image} 
          alt={`Buy ${product.name} - ${BRAND.name} UK`} 
          loading="lazy"
          className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          {isNew && (
            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black shadow-lg shadow-blue-500/20 uppercase tracking-widest">
              NEW
            </span>
          )}
          {isOnSale && (
            <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black shadow-lg shadow-emerald-500/20 uppercase tracking-widest">
              SALE
            </span>
          )}
          {isLimited && (
            <span className="bg-rose-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black shadow-lg shadow-rose-500/20 uppercase tracking-widest">
              LIMITED
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 items-end translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-xl transform active:scale-90 ${
              isInWishlist ? 'bg-rose-500 text-white' : 'bg-white text-slate-400 hover:text-rose-500'
            }`}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <i className={`${isInWishlist ? 'fas' : 'far'} fa-heart`} aria-hidden="true"></i>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleCompare(product); }}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-xl transform active:scale-90 ${
              isComparing ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 hover:text-blue-600'
            }`}
            aria-label={isComparing ? "Remove from comparison" : "Add to comparison"}
          >
            <i className={`fas ${isComparing ? 'fa-check' : 'fa-columns'}`} aria-hidden="true"></i>
          </button>
        </div>
        
        <div className="absolute inset-x-0 bottom-6 flex justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 px-6">
          <button 
            onClick={() => onQuickView(product)}
            className="w-full bg-slate-900/90 backdrop-blur text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
          >
            <i className="fas fa-search-plus text-[10px]" aria-hidden="true"></i>
            Quick View
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1.5" aria-label={`Rating: ${product.rating} stars`}>
            <div className="flex text-amber-400 text-[10px] gap-0.5" aria-hidden="true">
              {[1,2,3,4,5].map(s => <i key={s} className={`fas fa-star ${s > Math.floor(product.rating) ? 'opacity-20' : ''}`}></i>)}
            </div>
            <span className="text-[11px] font-black text-slate-900 leading-none">{product.rating}</span>
            <span className="text-[11px] font-bold text-slate-400 leading-none">({product.reviews.length})</span>
          </div>
        </div>
        
        <h3 
          onClick={() => onViewDetails(product)}
          className="text-lg font-black text-slate-900 mb-2 line-clamp-1 cursor-pointer hover:text-blue-600 transition-colors tracking-tight"
        >
          {product.name}
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem] font-medium">
          {product.description}
        </p>

        <div className="mt-auto pt-6 border-t border-slate-50 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className={`text-2xl font-black tracking-tighter ${isOnSale ? 'text-emerald-600' : 'text-slate-900'}`}>
                £{product.price.toFixed(2)}
              </span>
              {isOnSale && (
                <span className="text-xs font-bold text-slate-400 line-through">
                  £{(product.price * 1.25).toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <button onClick={() => setLocalQty(Math.max(1, localQty - 1))} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all" aria-label="Decrease quantity">
                <i className="fas fa-minus text-[10px]" aria-hidden="true"></i>
              </button>
              <span className="w-8 text-center text-sm font-black text-slate-900" aria-label={`Quantity: ${localQty}`}>{localQty}</span>
              <button onClick={() => setLocalQty(localQty + 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all" aria-label="Increase quantity">
                <i className="fas fa-plus text-[10px]" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleBuyNowClick}
              className="py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fas fa-bolt text-[10px]" aria-hidden="true"></i>
              Buy Now
            </button>
            <button 
              onClick={handleAddToCartClick}
              className="py-4 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-blue-100 active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fas fa-shopping-basket text-[10px]" aria-hidden="true"></i>
              Basket
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
