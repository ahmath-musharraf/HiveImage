
import React, { useState } from 'react';
import { ViewMode } from '../types';

interface HelpCentreProps {
  setView: (view: ViewMode) => void;
}

const FAQS = [
  {
    q: "How can I track my order?",
    a: "Once your order is dispatched, you will receive a confirmation email with a tracking link from our carrier partners (Royal Mail or DPD). You can also view your status in your account dashboard."
  },
  {
    q: "Do you offer international shipping?",
    a: "Currently, CellHives specializes in premium service within the United Kingdom to ensure the best possible support and warranty coverage. We do not ship internationally at this time."
  },
  {
    q: "How do I change my delivery address?",
    a: "If your order hasn't been dispatched yet, please call our support team immediately at +44 7469 535612. Once dispatched, address changes are subject to the carrier's policies."
  }
];

export const HelpCentre: React.FC<HelpCentreProps> = ({ setView }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const waMessage = encodeURIComponent("Hi CellHives Support! I need some assistance with an order/product.");

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <button 
        onClick={() => setView(ViewMode.Home)}
        className="mb-8 text-slate-500 hover:text-blue-600 flex items-center gap-2 font-medium transition-colors"
      >
        <i className="fas fa-arrow-left"></i> Back to Home
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-blue-600 p-8 lg:p-12 text-white text-center">
          <h1 className="text-3xl lg:text-5xl font-black mb-4">Help Centre</h1>
          <p className="text-blue-100 text-lg">How can we assist you today at CellHives?</p>
        </div>

        <div className="p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800">{faq.q}</span>
                  <i className={`fas fa-chevron-down text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}></i>
                </button>
                {openIndex === idx && (
                  <div className="p-6 pt-0 text-slate-600 text-sm leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-slate-900 text-white">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-black mb-2">Still need help?</h3>
              <p className="text-slate-400">Our London-based team is available through multiple channels.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="tel:+447469535612" 
                className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <span className="font-bold">Call Us</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">+44 7469 535612</span>
              </a>

              <a 
                href={`https://wa.me/447469535612?text=${waMessage}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center group"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <span className="font-bold">WhatsApp</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Instant Support</span>
              </a>

              <button 
                className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center group"
              >
                <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                  <i className="fas fa-envelope"></i>
                </div>
                <span className="font-bold">Email</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">24h Response</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
