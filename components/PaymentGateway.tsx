
import React, { useState, useMemo } from 'react';

interface PaymentGatewayProps {
  subtotal: number;
  onSuccess: (finalTotal: number) => void;
  onCancel: () => void;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({ subtotal, onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'platinum'>('standard');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const standardCost = subtotal > 100 ? 0 : 4.99;
  const platinumCost = 8.99;
  const currentDeliveryCost = deliveryMethod === 'standard' ? standardCost : platinumCost;
  const finalTotal = subtotal + currentDeliveryCost;

  // Delivery estimation logic
  const deliveryDates = useMemo(() => {
    const now = new Date();
    const isBusinessDay = (date: Date) => {
      const day = date.getDay();
      return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
    };

    const addBusinessDays = (startDate: Date, days: number) => {
      let result = new Date(startDate);
      let added = 0;
      while (added < days) {
        result.setDate(result.getDate() + 1);
        if (isBusinessDay(result)) added++;
      }
      return result;
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-GB', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    };

    // Standard: 1-2 business days
    const stdStart = addBusinessDays(now, 1);
    const stdEnd = addBusinessDays(now, 2);

    // Platinum: 1 business day if before 4pm, else 2 business days
    const isAfterCutoff = now.getHours() >= 16;
    const platArrival = addBusinessDays(now, isAfterCutoff ? 2 : 1);

    return {
      standard: `${formatDate(stdStart)} - ${formatDate(stdEnd)}`,
      platinum: formatDate(platArrival),
      isAfterCutoff
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(finalTotal);
    }, 2500);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join(' ') || value;
    setFormData({ ...formData, cardNumber: value.substring(0, 19) });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-white">
          <div className="flex justify-between items-center mb-6">
            <button onClick={onCancel} className="text-white/80 hover:text-white transition-colors">
              <i className="fas fa-arrow-left mr-2"></i> Back to Basket
            </button>
            <div className="flex gap-2 text-2xl">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-apple-pay"></i>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Secure Checkout</h2>
          <p className="text-blue-100">Review your order and finalize payment.</p>
        </div>

        <div className="p-8">
          {/* Order Summary Summary */}
          <div className="flex justify-between items-end mb-10 pb-6 border-b border-slate-100">
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">Items Subtotal</p>
              <p className="text-xl font-bold text-slate-700">£{subtotal.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">Final Total</p>
              <p className="text-4xl font-black text-blue-600">£{finalTotal.toFixed(2)}</p>
            </div>
          </div>

          {/* Delivery Method Selection */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <i className="fas fa-truck text-blue-600"></i>
                Choose Delivery Method
              </h3>
              <div className="bg-slate-100 px-3 py-1 rounded-full text-[9px] font-black text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
                <i className="fas fa-clock"></i>
                Estimate Updated: Live
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDeliveryMethod('standard')}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  deliveryMethod === 'standard' 
                  ? 'border-blue-600 bg-blue-50/50' 
                  : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-slate-900">Standard Express</span>
                  <span className="font-black text-blue-600">
                    {standardCost === 0 ? 'FREE' : `£${standardCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Est. Arrival</p>
                  <p className="text-sm font-bold text-slate-700">{deliveryDates.standard}</p>
                  <p className="text-[10px] text-slate-400 italic">Across the UK Mainland</p>
                </div>
                {deliveryMethod === 'standard' && (
                  <div className="mt-3 text-[10px] font-black text-blue-600 flex items-center gap-1 uppercase tracking-widest">
                    <i className="fas fa-check-circle"></i> Selected
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('platinum')}
                className={`p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                  deliveryMethod === 'platinum' 
                  ? 'border-blue-600 bg-blue-50/50' 
                  : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                }`}
              >
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded-bl-lg uppercase tracking-widest">
                  Priority
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-slate-900">Platinum Next-Day</span>
                  <span className="font-black text-blue-600">£{platinumCost.toFixed(2)}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Est. Arrival</p>
                  <p className="text-sm font-bold text-slate-700">{deliveryDates.platinum}</p>
                  <p className={`text-[10px] font-bold ${deliveryDates.isAfterCutoff ? 'text-rose-500' : 'text-emerald-600'}`}>
                    {deliveryDates.isAfterCutoff ? 'Post-4PM Cutoff (Applied)' : 'Before 4PM Cutoff (Active)'}
                  </p>
                </div>
                {deliveryMethod === 'platinum' && (
                  <div className="mt-3 text-[10px] font-black text-blue-600 flex items-center gap-1 uppercase tracking-widest">
                    <i className="fas fa-check-circle"></i> Selected
                  </div>
                )}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="fas fa-credit-card text-blue-600"></i>
              Payment Details
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-tight">Name on Card</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                placeholder="e.g. John Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-tight">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all pl-12 font-mono"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                />
                <i className="fas fa-credit-card absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-tight">Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-center"
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-tight">CVV</label>
                <input
                  type="password"
                  required
                  maxLength={3}
                  placeholder="***"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-center"
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                disabled={isProcessing}
                type="submit"
                className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-3 ${
                  isProcessing 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] shadow-blue-500/25 active:scale-95'
                }`}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-circle-notch animate-spin"></i>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>
                    Securely Pay £{finalTotal.toFixed(2)}
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 pt-4 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
              <span className="flex items-center gap-1"><i className="fas fa-shield-check text-green-500"></i> PCI DSS Compliant</span>
              <span className="flex items-center gap-1"><i className="fas fa-lock text-blue-500"></i> SSL Encrypted</span>
              <span className="flex items-center gap-1"><i className="fas fa-landmark text-slate-500"></i> FCA Regulated Partner</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
