
import React from 'react';
import { Product, ViewMode } from '../types';

interface ComparisonProps {
  products: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  setView: (view: ViewMode) => void;
}

export const Comparison: React.FC<ComparisonProps> = ({ products, onRemove, onAddToCart, setView }) => {
  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 text-4xl">
          <i className="fas fa-columns"></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Comparison list is empty</h2>
        <p className="text-slate-500 mb-8">Add at least two products to compare their features.</p>
        <button 
          onClick={() => setView(ViewMode.Shop)}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          Browse Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">Compare Products</h1>
        <button 
          onClick={() => setView(ViewMode.Shop)}
          className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
        >
          + Add More Products
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-3xl overflow-hidden border border-slate-200">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="p-8 text-left text-slate-400 font-bold uppercase tracking-wider text-xs w-1/4">Feature</th>
              {products.map(p => (
                <th key={p.id} className="p-8 w-1/4 min-w-[250px] relative group">
                  <button 
                    onClick={() => onRemove(p.id)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <i className="fas fa-times-circle text-xl"></i>
                  </button>
                  <img src={p.image} alt={p.name} className="w-32 h-32 object-cover rounded-2xl mx-auto mb-4 shadow-sm" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{p.name}</h3>
                  <p className="text-blue-600 font-black text-xl mb-4">£{p.price.toFixed(2)}</p>
                  <button 
                    onClick={() => onAddToCart(p, 1)}
                    className="w-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 py-2 rounded-xl font-bold text-sm transition-all"
                  >
                    Add to Basket
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-8 font-bold text-slate-900 bg-slate-50/50">Category</td>
              {products.map(p => (
                <td key={p.id} className="p-8 text-slate-600 font-medium">{p.category}</td>
              ))}
            </tr>
            <tr>
              <td className="p-8 font-bold text-slate-900 bg-slate-50/50">Rating</td>
              {products.map(p => (
                <td key={p.id} className="p-8">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <i className="fas fa-star text-xs"></i>
                    {p.rating}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-8 font-bold text-slate-900 bg-slate-50/50">Dimensions</td>
              {products.map(p => (
                <td key={p.id} className="p-8 text-slate-600">{p.specs.dimensions}</td>
              ))}
            </tr>
            <tr>
              <td className="p-8 font-bold text-slate-900 bg-slate-50/50">Weight</td>
              {products.map(p => (
                <td key={p.id} className="p-8 text-slate-600">{p.specs.weight}</td>
              ))}
            </tr>
            <tr>
              <td className="p-8 font-bold text-slate-900 bg-slate-50/50">Power Consumption</td>
              {products.map(p => (
                <td key={p.id} className="p-8 text-slate-600">{p.specs.powerConsumption}</td>
              ))}
            </tr>
            <tr>
              <td className="p-8 font-bold text-slate-900 bg-slate-50/50">Warranty</td>
              {products.map(p => (
                <td key={p.id} className="p-8 text-slate-600">{p.specs.warranty}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
