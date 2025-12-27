
import React from 'react';
import { ViewMode } from '../types';
import { BRAND } from '../constants';

interface HeroProps {
  setView: (view: ViewMode) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <section className="relative overflow-hidden bg-[#020617] py-20 lg:py-32">
      <div className="absolute top-0 right-0 -mr-48 -mt-48 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-[120px]"></div>
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-3/5 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8 animate-slide-up">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              UK's Flagship Electronics Outlet
            </div>
            <h1 className="text-5xl lg:text-[5rem] font-black text-white leading-[1.1] mb-8 tracking-tighter animate-slide-up [animation-delay:100ms]">
              Innovation in every <span className="text-gradient">Hive.</span>
            </h1>
            <p className="text-slate-400 text-lg lg:text-xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium animate-slide-up [animation-delay:200ms]">
              Discover our precision-curated collection of elite consumer technology and intelligent home appliances, backed by world-class UK support at {BRAND.name}.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 animate-slide-up [animation-delay:300ms]">
              <button 
                onClick={() => setView(ViewMode.Shop)}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/30 flex items-center gap-3"
              >
                Shop Collection
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
              <button 
                onClick={() => setView(ViewMode.Shop)}
                className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl border border-white/10 backdrop-blur-sm transition-all transform hover:scale-105 active:scale-95"
              >
                Today's Deals
              </button>
            </div>
            
            <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-x-12 gap-y-6 animate-slide-up [animation-delay:400ms]">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex text-amber-400 text-[10px] mb-0.5">
                    {[1,2,3,4,5].map(s => <i key={s} className="fas fa-star"></i>)}
                  </div>
                  <p className="text-white text-xs font-bold">4.9/5 TrustScore</p>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight">24h</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Next Day Delivery</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight">100%</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">UK Authentic</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/5 relative animate-in zoom-in duration-1000">
            <div className="relative z-10 animate-float">
              <div className="absolute inset-0 bg-blue-600/20 rounded-[3rem] blur-2xl -z-10 transform rotate-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1000" 
                alt="High-end Technology" 
                className="rounded-[3rem] shadow-2xl border border-white/10 grayscale-[20%] hover:grayscale-0 transition-all duration-700 w-full aspect-[4/5] object-cover"
              />
              
              <div className="absolute -bottom-10 -left-10 glass border border-white/20 p-6 rounded-[2rem] shadow-2xl hidden sm:block max-w-[200px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white">
                    <i className="fas fa-shield-check"></i>
                  </div>
                  <span className="text-xs font-black text-slate-900 leading-tight">Secure UK Warranty</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Included as standard on all {BRAND.name} orders this month.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
