import React from 'react';
import { Star, Plus, Minus, Heart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    language, 
    formatPrice, 
    addToCart, 
    cart, 
    updateCartQuantity, 
    wishlist, 
    toggleWishlist, 
    setQuickViewProduct,
    t 
  } = useStore();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-emerald-400 transition-all flex flex-col justify-between relative">
      {/* Top action row */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        <img
          src={product.image}
          alt={language === 'bn' ? product.nameBn : product.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isOrganic && (
            <span className="bg-emerald-600/95 backdrop-blur-xs text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              {t.organicBadge}
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist and Quickview */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 hover:bg-white text-slate-600 hover:text-rose-500'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-emerald-600 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            title={t.viewDetails}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span>{language === 'bn' ? product.unitBn : product.unitEn}</span>
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-current mr-0.5" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal ml-0.5">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer leading-tight mb-1.5"
          >
            {language === 'bn' ? product.nameBn : product.nameEn}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-1 mb-2">
            {language === 'bn' ? product.descriptionBn : product.descriptionEn}
          </p>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline space-x-2 mb-3">
            <span className="font-extrabold text-base sm:text-lg text-emerald-700 font-mono">
              {formatPrice(product.priceUSD)}
            </span>
            {product.originalPriceUSD && (
              <span className="text-xs text-slate-400 line-through font-mono">
                {formatPrice(product.originalPriceUSD)}
              </span>
            )}
          </div>

          {/* Cart Buttons */}
          {cartItem ? (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl px-2 py-1">
              <button
                onClick={() => updateCartQuantity(product.id, cartItem.quantity - 1)}
                className="w-7 h-7 rounded-lg bg-white text-emerald-700 hover:bg-emerald-600 hover:text-white flex items-center justify-center font-bold shadow-xs transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-emerald-900 text-sm font-mono px-2">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => updateCartQuantity(product.id, cartItem.quantity + 1)}
                className="w-7 h-7 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center font-bold shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addToCart}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
