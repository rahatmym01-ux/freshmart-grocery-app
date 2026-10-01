import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  ShoppingBag,
  Loader2
} from 'lucide-react';
import { useStore, USD_TO_BDT_RATE } from '../context/StoreContext';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotalUSD,
    deliveryFeeUSD,
    discountUSD,
    totalUSD,
    formatPrice,
    currency,
    createOrder,
    user,
    language,
    t
  } = useStore();

  const [country, setCountry] = useState<'BD' | 'USA'>('BD');
  const [name, setName] = useState(user?.name || 'Faizan Ahmed');
  const [email, setEmail] = useState(user?.email || 'user@freshmart.com');
  const [phone, setPhone] = useState('+880 1712 345678');
  const [address, setAddress] = useState('House 24, Road 5, Block B, Banani');
  const [city, setCity] = useState('Dhaka');
  const [deliverySlot, setDeliverySlot] = useState<string>('Express Delivery (30-45 Mins)');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Stripe' | 'PayPal' | 'COD'>('bKash');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        customerName: name,
        email,
        phone,
        country,
        address,
        city,
        deliverySlot,
        paymentMethod,
        items: cart,
        subtotalUSD,
        deliveryFeeUSD,
        discountUSD,
        totalUSD,
        currency,
        exchangeRate: USD_TO_BDT_RATE
      });
      setIsProcessing(false);
      setPlacedOrder(order);
    }, 1500);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setPlacedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {placedOrder ? t.step4Success : t.checkoutTitle}
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                {formatPrice(totalUSD)} • {cart.length} {language === 'bn' ? 'ধরনের আইটেম' : 'unique items'}
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {placedOrder ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">
                {language === 'bn' ? 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে!' : 'Order Placed Successfully!'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {t.orderSuccessMsg}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">{t.orderId}</span>
                <span className="font-mono font-bold text-emerald-800">{placedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'bn' ? 'গ্রাহক' : 'Customer'}</span>
                <span className="font-semibold text-slate-800">{placedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Payment'}</span>
                <span className="font-semibold text-slate-800">{placedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{language === 'bn' ? 'ডেলিভারি স্লট' : 'Slot'}</span>
                <span className="font-semibold text-slate-800">{placedOrder.deliverySlot}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm">
                <span>{t.total}</span>
                <span className="text-emerald-700 font-mono">{formatPrice(placedOrder.totalUSD)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full max-w-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow-md transition-colors text-xs sm:text-sm"
            >
              {t.continueShopping}
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
            {/* Step 1: Address Details */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.step1Address}</span>
                </h4>
                {/* Country Toggle */}
                <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setCountry('BD');
                      setCity('Dhaka');
                    }}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      country === 'BD' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    🇧🇩 Bangladesh
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCountry('USA');
                      setCity('New York');
                    }}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      country === 'USA' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    🇺🇸 USA
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">{t.fullName}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">{t.phone}</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">{t.streetAddress}</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">{t.city}</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Slot */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.step2Slot}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {[
                  { id: 'Express Delivery (30-45 Mins)', label: t.slotExpress, icon: '⚡' },
                  { id: 'Evening Slot (6:00 PM - 9:00 PM)', label: t.slotEvening, icon: '🌙' },
                  { id: 'Tomorrow Morning (8:00 AM - 11:00 AM)', label: t.slotTomorrow, icon: '☀️' }
                ].map((slot) => (
                  <label
                    key={slot.id}
                    className={`cursor-pointer p-3 rounded-2xl border flex flex-col justify-between transition-all ${
                      deliverySlot === slot.id
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliverySlot"
                      value={slot.id}
                      checked={deliverySlot === slot.id}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="hidden"
                    />
                    <span className="text-lg mb-1">{slot.icon}</span>
                    <span className="font-semibold text-slate-800 leading-snug">{slot.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.step3Payment}</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'bKash', label: t.paybKash, badge: 'Instant ৳' },
                  { id: 'Nagad', label: t.payNagad, badge: 'Instant ৳' },
                  { id: 'Stripe', label: t.payStripe, badge: 'Visa/MC' },
                  { id: 'PayPal', label: t.payPayPal, badge: 'Global $' },
                  { id: 'COD', label: t.payCOD, badge: 'Pay at Door' },
                ].map((p) => (
                  <label
                    key={p.id}
                    className={`cursor-pointer p-3 rounded-xl border flex flex-col justify-between transition-all ${
                      paymentMethod === p.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={p.id}
                      checked={paymentMethod === p.id}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="hidden"
                    />
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold">{p.id}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1 rounded font-mono">{p.badge}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 line-clamp-1">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pay Button */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">{t.total}</span>
                <span className="text-xl font-black text-emerald-700 font-mono">
                  {formatPrice(totalUSD)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:bg-slate-300 text-white font-bold py-3 px-6 rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all text-xs sm:text-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Sandbox Payment...</span>
                  </>
                ) : (
                  <>
                    <span>{t.payNow}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
