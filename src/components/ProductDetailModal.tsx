import React, { useState } from 'react';
import { X, Star, Plus, Minus, ShoppingBag, Sparkles, Flame, Check, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    language, 
    formatPrice, 
    addToCart, 
    t 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image Column */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square flex items-center justify-center border border-slate-200">
            <img
              src={product.image}
              alt={language === 'bn' ? product.nameBn : product.nameEn}
              className="w-full h-full object-cover"
            />
            {product.isOrganic && (
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {t.organicBadge}
              </span>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1">
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                  {language === 'bn' ? product.unitBn : product.unitEn}
                </span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">{t.inStock}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                {language === 'bn' ? product.nameBn : product.nameEn}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                <span className="text-xs text-slate-400">
                  ({product.reviewCount} {t.reviewsCount})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-2xl font-black text-emerald-700 font-mono">
                  {formatPrice(product.priceUSD)}
                </span>
                {product.originalPriceUSD && (
                  <span className="text-sm text-slate-400 line-through font-mono">
                    {formatPrice(product.originalPriceUSD)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {language === 'bn' ? product.descriptionBn : product.descriptionEn}
              </p>

              {/* Nutrition breakdown */}
              {product.nutrition && (
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 mb-4">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2.5">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span>{t.nutritionFacts}</span>
                  </h4>
                  <div className="grid grid-cols-5 gap-1 text-center">
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="block text-[10px] text-slate-400">{t.calories}</span>
                      <span className="font-bold text-xs text-slate-800">{product.nutrition.calories} kcal</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="block text-[10px] text-slate-400">{t.protein}</span>
                      <span className="font-bold text-xs text-slate-800">{product.nutrition.protein}g</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="block text-[10px] text-slate-400">{t.carbs}</span>
                      <span className="font-bold text-xs text-slate-800">{product.nutrition.carbs}g</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="block text-[10px] text-slate-400">{t.fat}</span>
                      <span className="font-bold text-xs text-slate-800">{product.nutrition.fat}g</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="block text-[10px] text-slate-400">{t.fiber}</span>
                      <span className="font-bold text-xs text-slate-800">{product.nutrition.fiber}g</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stepper and Add To Cart */}
            <div className="pt-2 border-t border-slate-100 flex items-center space-x-3">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-sm font-mono text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-teal-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.addedToCart}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.addToCart}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-slate-50 p-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
            <span>{t.customerReviews}</span>
            <span className="text-xs font-normal text-slate-500">
              {product.reviews.length} {language === 'bn' ? 'মতামত' : 'verified feedback'}
            </span>
          </h3>

          {product.reviews.length > 0 ? (
            <div className="space-y-2.5">
              {product.reviews.map((r) => (
                <div key={r.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">{r.userName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{r.date}</span>
                  </div>
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-slate-600">
                    {language === 'bn' ? r.commentBn : r.commentEn}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              {t.noReviewsYet}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
