
import React from 'react';
import { Product } from '../types';

interface FilterSidebarProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  onClear: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  onClear
}) => {
  return (
    <div className="space-y-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit sticky top-24">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <i className="fas fa-sliders text-blue-600"></i>
          Filters
        </h3>
        <button 
          onClick={onClear}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Category</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Price Range (£)</h4>
        <div className="space-y-4">
          <input 
            type="range" 
            min="0" 
            max="2000" 
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>£0</span>
            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md">Up to £{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => setMinRating(stars)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                minRating === stars 
                  ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < stars ? 'opacity-100' : 'opacity-20'}`}></i>
                ))}
              </div>
              <span>{stars}+ Stars</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* UK Stock Banner */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white">
        <p className="text-xs font-bold text-blue-400 mb-1">UK SERVICE</p>
        <p className="text-sm font-medium leading-relaxed">Local UK stock ready for next-day dispatch.</p>
      </div>
    </div>
  );
};
