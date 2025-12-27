
import React from 'react';
import { ViewMode } from '../types';

interface CategorySectionProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  productCounts: Record<string, number>;
}

const CATEGORY_META: Record<string, { icon: string; description: string; color: string; image: string }> = {
  'Smartphones': {
    icon: 'fa-mobile-screen-button',
    description: 'Latest flagship devices and accessories.',
    color: 'bg-blue-500',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400'
  },
  'Laptops': {
    icon: 'fa-laptop-code',
    description: 'Powerful machines for work and play.',
    color: 'bg-purple-500',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=400'
  },
  'Smart Home': {
    icon: 'fa-house-signal',
    description: 'Intelligence for every corner of your home.',
    color: 'bg-green-500',
    image: 'https://images.unsplash.com/photo-1558002038-103792e197ed?auto=format&fit=crop&q=80&w=400'
  },
  'Kitchen': {
    icon: 'fa-utensils',
    description: 'Advanced appliances for the modern chef.',
    color: 'bg-orange-500',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400'
  },
  'Audio': {
    icon: 'fa-headphones-simple',
    description: 'Crystal clear sound and noise cancellation.',
    color: 'bg-pink-500',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'
  },
  'All': {
    icon: 'fa-border-all',
    description: 'Browse our entire premium collection.',
    color: 'bg-slate-700',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400'
  }
};

export const CategorySection: React.FC<CategorySectionProps> = ({ categories, onSelectCategory, productCounts }) => {
  // Exclude 'All' from the main grid if we want it separate or handled as a 'View All' button
  const displayCategories = categories.filter(c => c !== 'All');

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">Browse by Category</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Explore our high-performance electronics and appliances tailored for your lifestyle.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {displayCategories.map((category) => {
            const meta = CATEGORY_META[category] || CATEGORY_META['All'];
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className="group relative h-80 rounded-3xl overflow-hidden text-left transition-all hover:shadow-2xl hover:-translate-y-2 active:scale-95 border border-slate-200"
              >
                {/* Background Image */}
                <img 
                  src={meta.image} 
                  alt={category} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start">
                  <div className={`w-10 h-10 rounded-xl ${meta.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    <i className={`fas ${meta.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-1">{category}</h3>
                  <p className="text-slate-300 text-xs mb-4 opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                    {meta.description}
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                      {productCounts[category] || 0} Products
                    </span>
                    <i className="fas fa-arrow-right text-white opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0"></i>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => onSelectCategory('All')}
            className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
          >
            Explore All Categories
          </button>
        </div>
      </div>
    </section>
  );
};
