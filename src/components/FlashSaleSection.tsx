import React, { useState, useEffect } from 'react';
import { Zap, Flame, Clock, Plus, Eye, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const FlashSaleSection: React.FC = () => {
  const { products, language, formatPrice, addToCart, setQuickViewProduct, t } = useStore();
  
  // Flash sale countdown timer (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 5,
    minutes: 42,
    seconds: 19
  });

  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashSale);

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-emerald-500/10 border border-amber-300/60 rounded-3xl p-5 sm:p-7 shadow-xs">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-amber-200/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 animate-bounce">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t.flashSaleTitle}
                </h2>
                <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  HOT
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {t.flashSaleSubtitle}
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center space-x-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs self-start sm:self-auto">
            <Clock className="w-4 h-4 text-rose-500" />
            <span className="text-xs font-bold text-slate-700">{t.endsIn}</span>
            <div className="flex items-center space-x-1 font-mono font-bold text-sm text-slate-900">
              <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md min-w-[28px] text-center">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md min-w-[28px] text-center">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md min-w-[28px] text-center">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 pt-5">
          {flashProducts.slice(0, 6).map((product) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-lg hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setQuickViewProduct(product)}>
                  <img
                    src={product.image}
                    alt={language === 'bn' ? product.nameBn : product.nameEn}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.discountPercent && (
                    <div className="absolute top-2 left-2 bg-rose-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                      -{product.discountPercent}%
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-slate-700 p-1.5 rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    title={t.viewDetails}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-medium text-slate-500 block truncate">
                      {language === 'bn' ? product.unitBn : product.unitEn}
                    </span>
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer mt-0.5 leading-snug"
                    >
                      {language === 'bn' ? product.nameBn : product.nameEn}
                    </h3>
                  </div>

                  <div className="mt-2.5">
                    {/* Price */}
                    <div className="flex items-baseline space-x-1.5 mb-2">
                      <span className="font-extrabold text-sm text-emerald-700 font-mono">
                        {formatPrice(product.priceUSD)}
                      </span>
                      {product.originalPriceUSD && (
                        <span className="text-[11px] text-slate-400 line-through font-mono">
                          {formatPrice(product.originalPriceUSD)}
                        </span>
                      )}
                    </div>

                    {/* Stock status indicator */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-2">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '74%' }} />
                    </div>

                    {/* Add to Cart button */}
                    <button
                      onClick={() => handleAdd(product)}
                      className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                        isAdded
                          ? 'bg-teal-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>{t.addedToCart}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.addToCart}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
