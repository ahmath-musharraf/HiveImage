
import React from 'react';
import { ViewMode } from '../types';

interface WarrantyPolicyProps {
  setView: (view: ViewMode) => void;
}

export const WarrantyPolicy: React.FC<WarrantyPolicyProps> = ({ setView }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <button 
        onClick={() => setView(ViewMode.Home)}
        className="mb-8 text-slate-500 hover:text-blue-600 flex items-center gap-2 font-medium transition-colors"
      >
        <i className="fas fa-arrow-left"></i> Back to Home
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-900 p-8 lg:p-12 text-white">
          <h1 className="text-3xl lg:text-5xl font-black mb-4">Warranty Policy</h1>
          <p className="text-slate-400 text-lg">Your peace of mind is our priority. Professional UK-based coverage for every purchase.</p>
        </div>

        <div className="p-8 lg:p-12 space-y-12">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment</h2>
            <p className="text-slate-600 leading-relaxed">
              At CellHives, we pride ourselves on the quality and reliability of the electronics and home appliances we supply. Every product sold on our platform is sourced from authorised distributors and comes with a comprehensive manufacturer's warranty designed to protect your investment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Standard Coverage Periods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Consumer Electronics</p>
                <p className="text-lg font-bold text-slate-900">Smartphones & Tablets</p>
                <p className="text-slate-500 text-sm">2-Year Limited Manufacturer Warranty</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Computing</p>
                <p className="text-lg font-bold text-slate-900">Laptops & Accessories</p>
                <p className="text-slate-500 text-sm">3-Year Premium UK Support</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Major Appliances</p>
                <p className="text-lg font-bold text-slate-900">Kitchen & White Goods</p>
                <p className="text-slate-500 text-sm">2-Year Parts & Labour (10-Year Motor on select units)</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Automation</p>
                <p className="text-lg font-bold text-slate-900">Smart Home Devices</p>
                <p className="text-slate-500 text-sm">1-Year Full Replacement Guarantee</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">How to Make a Claim</h3>
            <p className="text-slate-600 mb-6">If your product develops a fault, our UK support team is here to help:</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">+44 7469 535612</p>
                  <p className="text-xs text-slate-500">Free from all UK landlines & mobiles</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">claims@cellhives.co.uk</p>
                  <p className="text-xs text-slate-500">Include your order number</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm mb-6 italic">This policy does not affect your statutory rights under the Consumer Rights Act 2015.</p>
          <button 
            onClick={() => setView(ViewMode.Home)}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            I Understand, Back Home
          </button>
        </div>
      </div>
    </section>
  );
};
