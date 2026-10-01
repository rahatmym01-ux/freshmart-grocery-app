import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Truck 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    subtotalUSD,
    deliveryFeeUSD,
    discountUSD,
    totalUSD,
    formatPrice,
    isFreeDelivery,
    freeDeliveryThresholdUSD,
    promoCode,
    setPromoCode,
    promoApplied,
    applyPromo,
    setIsCheckoutOpen,
    language,
    t
  } = useStore();

  if (!isCartOpen) return null;

  const freeDeliveryDiff = Math.max(0, freeDeliveryThresholdUSD - subtotalUSD);
  const freeDeliveryProgress = Math.min(100, (subtotalUSD / freeDeliveryThresholdUSD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    applyPromo(promoCode);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t.cartTitle}
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                {cart.length} {language === 'bn' ? 'ধরনের পণ্য' : 'unique items'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded-md hover:bg-rose-50 transition-colors"
              >
                {language === 'bn' ? 'সব মুছুন' : 'Clear'}
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300/70 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Free Delivery Goal Bar */}
        <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              {isFreeDelivery
                ? t.freeDeliveryUnlocked
                : t.addMoreForFreeDelivery.replace('{amount}', formatPrice(freeDeliveryDiff))}
            </span>
            <span className="font-mono">{Math.round(freeDeliveryProgress)}%</span>
          </div>
          <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${freeDeliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-1">
                {t.emptyCartTitle}
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mb-4">
                {t.emptyCartSubtitle}
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors shadow-xs"
              >
                {t.continueShopping}
              </button>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center space-x-3 bg-white p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all"
              >
                <img
                  src={product.image}
                  alt={language === 'bn' ? product.nameBn : product.nameEn}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-50 border border-slate-100"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {language === 'bn' ? product.nameBn : product.nameEn}
                  </h4>
                  <span className="text-[11px] text-slate-400 block">
                    {language === 'bn' ? product.unitBn : product.unitEn}
                  </span>
                  <div className="text-xs font-extrabold text-emerald-700 font-mono mt-0.5">
                    {formatPrice(product.priceUSD * quantity)}
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity - 1)}
                    className="w-6 h-6 rounded bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono text-xs font-bold w-5 text-center text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity + 1)}
                    className="w-6 h-6 rounded bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center font-bold text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t.promoPlaceholder}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl uppercase tracking-wider font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
              >
                {t.applyPromo}
              </button>
            </form>

            {promoApplied && (
              <div className="text-[11px] text-emerald-700 bg-emerald-100/70 border border-emerald-300 rounded-lg px-2.5 py-1 flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Coupon FRESH20 Applied!
                </span>
                <span>-20%</span>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span className="font-mono font-semibold text-slate-800">{formatPrice(subtotalUSD)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.deliveryFee}</span>
                <span className="font-mono font-semibold">
                  {deliveryFeeUSD === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    formatPrice(deliveryFeeUSD)
                  )}
                </span>
              </div>
              {discountUSD > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>{t.discount}</span>
                  <span className="font-mono">-{formatPrice(discountUSD)}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm sm:text-base font-black text-slate-900">
                <span>{t.total}</span>
                <span className="text-emerald-700 font-mono text-lg">{formatPrice(totalUSD)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all text-sm"
            >
              <span>{t.proceedToCheckout}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
