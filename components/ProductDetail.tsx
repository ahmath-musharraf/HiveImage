
import React from 'react';
import { Product, ViewMode } from '../types';
import { PRODUCTS } from '../constants';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onCompare: (product: Product) => void;
  isComparing: boolean;
  setView: (view: ViewMode) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onAddToCart, 
  onBuyNow,
  onCompare, 
  isComparing,
  setView 
}) => {
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => setView(ViewMode.Shop)}
        className="mb-8 text-slate-500 hover:text-blue-600 flex items-center gap-2 font-bold transition-colors uppercase text-[10px] tracking-widest"
      >
        <i className="fas fa-arrow-left"></i> Back to Collection
      </button>

      <div className="flex flex-col lg:flex-row gap-16 mb-24">
        <div className="lg:w-1/2">
          <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm aspect-square relative group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {product.featured && (
              <div className="absolute top-8 left-8 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-2xl">
                Premium Flagship
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100">
              {product.category}
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">{product.name}</h1>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400 gap-1 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-20'}`}></i>
                  ))}
                </div>
                <span className="text-slate-900 font-black text-sm">{product.rating}</span>
              </div>
              <span className="h-4 w-px bg-slate-200"></span>
              <span className="text-green-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                In Stock UK
              </span>
            </div>

            <p className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">£{product.price.toFixed(2)}</p>
            <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => onBuyNow(product, 1)}
                className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3"
              >
                <i className="fas fa-bolt"></i>
                Buy Now
              </button>
              <button 
                onClick={() => onAddToCart(product, 1)}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3"
              >
                <i className="fas fa-shopping-basket"></i>
                Basket
              </button>
            </div>
            
            {/* Trust Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
              {[
                { icon: 'fa-truck', label: 'UK Tracked', sub: 'Next Day' },
                { icon: 'fa-shield-halved', label: '2 Year', sub: 'UK Warranty' },
                { icon: 'fa-plug', label: 'UK 3-Pin', sub: 'Standard' },
                { icon: 'fa-rotate-left', label: '30 Day', sub: 'Free Returns' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <i className={`fas ${item.icon} text-blue-600 mb-2`}></i>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter">{item.label}</p>
                  <p className="text-[9px] font-bold text-slate-400">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
        <div className="lg:col-span-2 space-y-12">
          {/* Reviews */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 lg:p-12 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight flex items-center justify-between">
              Customer Reviews
              <button className="text-xs font-black text-blue-600 uppercase tracking-widest">Write a Review</button>
            </h2>
            <div className="space-y-8">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="pb-8 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-black text-slate-900">{review.user}</p>
                      <div className="flex text-amber-400 text-[10px] mt-1 gap-1">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'opacity-20'}`}></i>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.date}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 tracking-tight">Technical Specs</h3>
            <dl className="space-y-6">
              {[
                { label: 'Dimensions', value: product.specs.dimensions },
                { label: 'Weight', value: product.specs.weight },
                { label: 'Power', value: product.specs.powerConsumption },
                { label: 'Warranty', value: product.specs.warranty }
              ].map((spec, idx) => (
                <div key={idx} className="flex flex-col">
                  <dt className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</dt>
                  <dd className="text-sm font-bold text-slate-700">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(rp => (
              <div 
                key={rp.id}
                onClick={() => setView(ViewMode.ProductDetail)} // Simulated navigation
                className="bg-white rounded-3xl border border-slate-100 p-6 flex items-center gap-4 hover:shadow-xl transition-all cursor-pointer group"
              >
                <img src={rp.image} className="w-20 h-20 rounded-2xl object-cover transition-transform group-hover:scale-110" alt="" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{rp.name}</h4>
                  <p className="text-blue-600 font-black">£{rp.price.toFixed(2)}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">View Details</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
