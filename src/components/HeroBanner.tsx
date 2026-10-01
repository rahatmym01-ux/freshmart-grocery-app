import React from 'react';
import { Sparkles, Clock, ShieldCheck, Truck, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const { language, setPromoCode, setIsCartOpen, applyPromo } = useStore();

  const handleCopyCoupon = () => {
    setPromoCode('FRESH20');
    applyPromo('FRESH20');
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white shadow-xl">
        {/* Decorative blur rings */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-12 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {language === 'bn' 
                  ? 'তাজা শাকসবজি ও অর্গানিক গ্রোসারি সুপারস্টোর' 
                  : '100% Farm-Fresh & Certified Organic Produce'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {language === 'bn' ? (
                <>
                  তাজা খাদ্যদ্রব্য, সরাসরি কৃষকের খামার থেকে <span className="text-amber-300 underline decoration-emerald-400 decoration-wavy decoration-2">আপনার ঘরে</span>
                </>
              ) : (
                <>
                  Pure Organic Groceries, Delivered to Your Door in <span className="text-amber-300 underline decoration-emerald-400 decoration-wavy decoration-2">30 Minutes</span>
                </>
              )}
            </h1>

            <p className="text-emerald-100/90 text-sm sm:text-base max-w-xl font-normal">
              {language === 'bn'
                ? 'আমদানি করা ফল, তাজা শাকসবজি, খাটি দুগ্ধপণ্য ও সামুদ্রিক মাছের বিশাল সমাহার। ঝামেলামুক্ত ক্যাশ অন ডেলিভারি ও দ্রুততম বিকাশ-নগদ পেমেন্ট।'
                : 'Over 28+ handpicked categories. Premium salmon, grass-fed dairy, crisp greens, and pantry staples backed by contactless 30-min express fulfillment.'}
            </p>

            {/* Coupon tag */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div 
                onClick={handleCopyCoupon}
                className="cursor-pointer group flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-md active:scale-95"
              >
                <Tag className="w-4 h-4 text-slate-900" />
                <span>
                  {language === 'bn' ? 'কুপন FRESH20 (২০% ছাড় পান)' : 'Apply Promo: FRESH20 (20% OFF)'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-xs text-emerald-200">
                {language === 'bn' ? '*প্রথম অর্ডারে ফ্রি এক্সপ্রেস ডেলিভারি' : '*Free delivery on orders over $35 / ৳4000'}
              </span>
            </div>
          </div>

          {/* Right Hero Visual Cards */}
          <div className="lg:col-span-5 hidden sm:grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col justify-between hover:bg-white/15 transition-all">
              <Truck className="w-8 h-8 text-amber-300 mb-2" />
              <div>
                <h4 className="font-bold text-sm text-white">
                  {language === 'bn' ? '৩০ মিনিটে ডেলিভারি' : '30-Min Delivery'}
                </h4>
                <p className="text-xs text-emerald-200 mt-1">
                  {language === 'bn' ? 'দ্রুততম রাইডার নেটওয়ার্ক' : 'Guaranteed doorstep service'}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col justify-between hover:bg-white/15 transition-all">
              <ShieldCheck className="w-8 h-8 text-emerald-300 mb-2" />
              <div>
                <h4 className="font-bold text-sm text-white">
                  {language === 'bn' ? '১০০% খাটি ও অর্গানিক' : '100% Farm Fresh'}
                </h4>
                <p className="text-xs text-emerald-200 mt-1">
                  {language === 'bn' ? 'গুণগত মানে আপসহীন' : 'Directly from farm gates'}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col justify-between hover:bg-white/15 transition-all">
              <Clock className="w-8 h-8 text-teal-300 mb-2" />
              <div>
                <h4 className="font-bold text-sm text-white">
                  {language === 'bn' ? '২৪/৭ সহায়তা' : '24/7 Dedicated Care'}
                </h4>
                <p className="text-xs text-emerald-200 mt-1">
                  {language === 'bn' ? 'লাইভ চ্যাট ও ফোন সাপোর্ট' : 'Real-time order tracking'}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col justify-between hover:bg-white/15 transition-all">
              <Sparkles className="w-8 h-8 text-yellow-300 mb-2" />
              <div>
                <h4 className="font-bold text-sm text-white">
                  {language === 'bn' ? 'ডুয়াল কারেন্সি' : 'USD & BDT Support'}
                </h4>
                <p className="text-xs text-emerald-200 mt-1">
                  {language === 'bn' ? 'সহজেই মুদ্রা পরিবর্তন' : 'Real-time conversion 117 BDT'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
