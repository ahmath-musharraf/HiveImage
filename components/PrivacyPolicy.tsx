
import React from 'react';
import { ViewMode } from '../types';
import { BRAND } from '../constants';

interface PrivacyPolicyProps {
  setView: (view: ViewMode) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ setView }) => {
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
          <h1 className="text-3xl lg:text-5xl font-black mb-4">Privacy Policy</h1>
          <p className="text-slate-400 text-lg">Your data protection is our priority. Professional UK-compliant information management.</p>
        </div>

        <div className="p-8 lg:p-12 space-y-12">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Introduction</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {BRAND.name} UK Limited ("we", "our", or "us") is committed to protecting and respecting your privacy. This policy explains how we collect, use, and protect your personal data when you visit our website and purchase our premium electronics.
            </p>
            <p className="text-slate-600 leading-relaxed">
              For the purpose of the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, the data controller is {BRAND.name} UK Limited, {BRAND.address}.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Your Legal Rights</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, or restriction of your personal data. To exercise any of these rights, please contact our Data Officer at privacy@hiveimage.co.uk.
            </p>
          </div>
        </div>

        <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
          <button 
            onClick={() => setView(ViewMode.Home)}
            className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
          >
            I Accept, Back Home
          </button>
        </div>
      </div>
    </section>
  );
};
