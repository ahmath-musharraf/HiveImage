
import React from 'react';
import { ViewMode } from '../types';

interface DeliveryInfoProps {
  setView: (view: ViewMode) => void;
}

export const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ setView }) => {
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
          <h1 className="text-3xl lg:text-5xl font-black mb-4">Delivery Information</h1>
          <p className="text-slate-400 text-lg">Fast, reliable shipping across the entire United Kingdom.</p>
        </div>

        <div className="p-8 lg:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl border border-blue-100 bg-blue-50/30">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg shadow-blue-500/20">
                <i className="fas fa-truck-fast"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Standard Express</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">1-2 Working Days</p>
              <p className="text-2xl font-black text-slate-900">£4.99</p>
              <p className="text-blue-600 text-xs font-bold mt-1 uppercase tracking-widest">FREE on orders over £100</p>
            </div>

            <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50">
              <div className="w-12 h-12 bg-slate-800 text-white rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Next Day Platinum</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">Guaranteed Next Day</p>
              <p className="text-2xl font-black text-slate-900">£8.99</p>
              <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Order by 4 PM GMT</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Important Delivery Notes</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Cut-off Times</h4>
                  <p className="text-slate-500 text-xs">Orders placed before 4:00 PM Monday to Friday are dispatched the same day from our London warehouse.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Tracking Information</h4>
                  <p className="text-slate-500 text-xs">As soon as your order leaves us, we'll send you a tracking number via email and SMS.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Signatures Required</h4>
                  <p className="text-slate-500 text-xs">For security, all electronic appliances over £200 require a signature upon delivery.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900 text-white flex items-center gap-6">
            <div className="hidden sm:flex w-16 h-16 rounded-full bg-blue-600 items-center justify-center text-2xl shadow-xl shadow-blue-500/40">
              <i className="fas fa-location-dot"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Highlands & Islands</h3>
              <p className="text-slate-400 text-sm">Delivery to Northern Ireland, Scottish Highlands, and Isle of Man may take an additional 24-48 hours. No extra charge applies.</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
          <button 
            onClick={() => setView(ViewMode.Home)}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    </section>
  );
};
