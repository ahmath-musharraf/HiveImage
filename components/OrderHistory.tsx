
import React from 'react';
import { Order, ViewMode } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  setView: (view: ViewMode) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, setView }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 lg:py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Order History</h1>
          <p className="text-slate-500">View and track your previous technology upgrades.</p>
        </div>
        <button 
          onClick={() => setView(ViewMode.Shop)}
          className="bg-white border border-slate-200 px-6 py-2 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all"
        >
          Browse More
        </button>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.slice().reverse().map((order) => (
            <div key={order.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date Placed</p>
                    <p className="text-sm font-bold text-slate-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Ref</p>
                    <p className="text-sm font-bold text-slate-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-sm font-black text-blue-600">£{order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                  <button className="text-slate-400 hover:text-blue-600 transition-colors">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex-shrink-0 flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-xl object-cover border border-slate-100"
                      />
                      <div className="hidden sm:block">
                        <p className="text-xs font-bold text-slate-900 line-clamp-1 w-32">{item.name}</p>
                        <p className="text-[10px] text-slate-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-20 text-center border border-slate-200">
          <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            <i className="fas fa-history"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No orders found</h3>
          <p className="text-slate-500 mb-8">You haven't made any purchases yet.</p>
          <button 
            onClick={() => setView(ViewMode.Shop)}
            className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      )}
    </section>
  );
};
