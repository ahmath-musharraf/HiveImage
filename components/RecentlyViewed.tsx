
import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface RecentlyViewedProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  compareList: Product[];
  wishlist: Product[];
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  products,
  onAddToCart,
  onBuyNow,
  onViewDetails,
  onToggleCompare,
  onQuickView,
  onToggleWishlist,
  compareList,
  wishlist
}) => {
  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Recently Viewed</h2>
          <p className="text-slate-500 text-sm">Products you've explored recently.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map(product => (
          <div key={product.id} className="scale-95 hover:scale-100 transition-transform origin-bottom">
             <ProductCard 
              product={product} 
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onViewDetails={onViewDetails}
              onToggleCompare={onToggleCompare}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isComparing={compareList.some(p => p.id === product.id)}
              isInWishlist={wishlist.some(p => p.id === product.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
