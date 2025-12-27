
import React from 'react';
import { ViewMode } from '../types';
import { BRAND } from '../constants';

interface TermsConditionsProps {
  setView: (view: ViewMode) => void;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ setView }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <button 
        onClick={() => setView(ViewMode.Home)}
        className="mb-8 text-slate-500 hover:text-blue-600 flex items-center gap-2 font-bold transition-colors uppercase text-[10px] tracking-widest"
      >
        <i className="fas fa-arrow-left"></i> Back to Home
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 p-8 lg:p-12 text-white">
          <h1 className="text-3xl lg:text-5xl font-black mb-4">Terms & Conditions</h1>
          <p className="text-slate-400 text-lg">The legal framework for our premium electronics partnership.</p>
        </div>

        <div className="p-8 lg:p-12 space-y-12">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">1. General Terms</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              By accessing and placing an order with {BRAND.name}, you confirm that you are in agreement with and bound by the terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire website and any email or other type of communication between you and {BRAND.name}.
            </p>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
          <button 
            onClick={() => setView(ViewMode.Home)}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            Agree & Continue
          </button>
        </div>
      </div>
    </section>
  );
};
