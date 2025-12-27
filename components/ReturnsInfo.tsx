
import React from 'react';
import { ViewMode } from '../types';

interface ReturnsInfoProps {
  setView: (view: ViewMode) => void;
}

export const ReturnsInfo: React.FC<ReturnsInfoProps> = ({ setView }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <button 
        onClick={() => setView(ViewMode.Home)}
        className="mb-8 text-slate-500 hover:text-blue-600 flex items-center gap-2 font-medium transition-colors"
      >
        <i className="fas fa-arrow-left"></i> Back to Home
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-rose-600 p-8 lg:p-12 text-white">
          <h1 className="text-3xl lg:text-5xl font-black mb-4">Returns & Refunds</h1>
          <p className="text-rose-100 text-lg">Shop with confidence at CellHives. Hassle-free 30-day return policy.</p>
        </div>

        <div className="p-8 lg:p-12 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">How to Return</h2>
            <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative">
                <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-slate-900 mb-1">Initiate Return</h4>
                <p className="text-slate-500 text-sm">Login to your account or email returns@cellhives.co.uk to request a prepaid return label.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
          <button 
            onClick={() => setView(ViewMode.Home)}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            Return to Store
          </button>
        </div>
      </div>
    </section>
  );
};
