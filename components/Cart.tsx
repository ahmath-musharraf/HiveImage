
import React from 'react';
import { CartItem, ViewMode } from '../types';

interface CartProps {
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  setView: (view: ViewMode) => void;
}

export const Cart: React.FC<CartProps> = ({ items, updateQuantity, removeItem, setView }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryThreshold = 100;
  const delivery = subtotal >= deliveryThreshold ? 0 : 4.99;
  const total = subtotal + delivery;
  const progress = Math.min((subtotal / deliveryThreshold) * 100, 100);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-slate-300 text-4xl">
          <i className="fas fa-shopping-basket"></i>
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Your basket is empty</h2>
        <p className="text-slate-500 mb-12 font-medium">Sounds like it's time for some precision-engineered tech upgrades.</p>
        <button 
          onClick={() => setView(ViewMode.Shop)}
          className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-12 tracking-tight">Shopping Basket</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-8">
          {/* Delivery Progress */}
          <div className="bg-white p-6 rounded-[2rem] border border-blue-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <i className="fas fa-truck-fast text-blue-600"></i>
                {subtotal >= deliveryThreshold 
                  ? "Congratulations! You've earned FREE Express UK Delivery." 
                  : `Add £${(deliveryThreshold - subtotal).toFixed(2)} more for FREE Express UK Delivery.`}
              </p>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-8 group hover:shadow-lg transition-all">
                <div className="w-28 h-28 shrink-0 overflow-hidden rounded-2xl bg-slate-50 border border-slate-50">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category}</span>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                    >
                      <i className="fas fa-trash-alt text-sm"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-xl border border-slate-100">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all">
                        <i className="fas fa-minus text-[10px]"></i>
                      </button>
                      <span className="font-black text-slate-900 w-10 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all">
                        <i className="fas fa-plus text-[10px]"></i>
                      </button>
                    </div>
                    {/* Animated Item Price */}
                    <span 
                      key={item.price * item.quantity}
                      className="text-xl font-black text-slate-900 tracking-tighter inline-block animate-price-jump"
                    >
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-900/5 sticky top-24">
            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Order Summary</h3>
            <div className="space-y-5 mb-8 border-b border-slate-100 pb-8">
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Items Subtotal</span>
                <span key={subtotal} className="text-slate-900 font-bold inline-block animate-price-jump">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>Express Delivery</span>
                <span className={delivery === 0 ? "text-emerald-500 font-black uppercase text-xs" : "text-slate-900 font-bold"}>
                  {delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 font-medium">
                <span>VAT (20% Inc.)</span>
                <span className="text-slate-900 font-bold">£{(total * 0.2).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-3xl font-black text-slate-900 mb-10 tracking-tighter">
              <span>Total</span>
              {/* Animated Total Price */}
              <span 
                key={total}
                className="inline-block animate-price-jump"
              >
                £{total.toFixed(2)}
              </span>
            </div>
            <button 
              onClick={() => setView(ViewMode.Checkout)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <i className="fas fa-shield-check"></i>
              Proceed to Secure Payment
            </button>
            <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale">
              <i className="fab fa-cc-visa text-2xl"></i>
              <i className="fab fa-cc-mastercard text-2xl"></i>
              <i className="fab fa-cc-apple-pay text-2xl"></i>
              <i className="fab fa-cc-paypal text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
