
import React from 'react';
import { ViewMode } from '../types';

interface CookiesPolicyProps {
  setView: (view: ViewMode) => void;
}

export const CookiesPolicy: React.FC<CookiesPolicyProps> = ({ setView }) => {
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
          <h1 className="text-3xl lg:text-5xl font-black mb-4">Cookies Policy</h1>
          <p className="text-slate-400 text-lg">Transparency regarding your browsing experience at CellHives.</p>
        </div>

        <div className="p-8 lg:p-12 space-y-12">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">What are Cookies?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">How We Use Cookies</h2>
            <div className="space-y-4">
              {[
                { title: 'Necessary Cookies', desc: 'Required for the operation of our website, such as your shopping basket and checkout session.', icon: 'fa-lock' },
                { title: 'Analytical Cookies', desc: 'Allow us to recognise and count the number of visitors and see how they move around our site.', icon: 'fa-chart-line' },
                { title: 'Functional Cookies', desc: 'Used to recognise you when you return to our website to provide personalised greetings.', icon: 'fa-user-check' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 items-start">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Managing Your Cookies</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org" target="_blank" className="text-blue-600 font-bold hover:underline">www.aboutcookies.org</a>.
            </p>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
          <button 
            onClick={() => setView(ViewMode.Home)}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            I Understand
          </button>
        </div>
      </div>
    </section>
  );
};
