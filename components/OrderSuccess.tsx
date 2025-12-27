
import React from 'react';
import { ViewMode } from '../types';

interface OrderSuccessProps {
  setView: (view: ViewMode) => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ setView }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
        <i className="fas fa-check text-4xl"></i>
      </div>
      <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Payment Successful!</h2>
      <p className="text-slate-500 text-lg mb-10">
        Your order has been received and is being prepared by our warehouse team in London. 
        You'll receive an email confirmation shortly.
      </p>
      
      <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-10 text-left shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <i className="fas fa-truck text-blue-600"></i>
          Estimated Delivery
        </h3>
        <p className="text-slate-600 mb-1">Standard UK Express</p>
        <p className="text-slate-900 font-bold">Arriving Thursday, 23 Oct</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={() => setView(ViewMode.Home)}
          className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
        >
          Return to Home
        </button>
        <button 
          onClick={() => setView(ViewMode.Shop)}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
