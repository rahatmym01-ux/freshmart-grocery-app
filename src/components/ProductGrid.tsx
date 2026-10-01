import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ShoppingBasket, RefreshCcw } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, selectedCategory, searchQuery, setSelectedCategory, setSearchQuery, language, t } = useStore();

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameBn.includes(searchQuery) ||
      p.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.descriptionBn.includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t.popularItems}</span>
            <span className="text-xs font-normal text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              {filteredProducts.length} {language === 'bn' ? 'টি পণ্য পাওয়া গেছে' : 'items found'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'bn'
              ? 'প্রতিদিনের তাজা শাকসবজি, ফল, মাছ-মাংস ও নিত্যপ্রয়োজনীয় সামগ্রী'
              : 'Directly sourced daily groceries, pristine greens, meats, and pantry essentials'}
          </p>
        </div>

        {(selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Clear Filters'}</span>
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <ShoppingBasket className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {language === 'bn' ? 'কোনো পণ্য খুঁজে পাওয়া যায়নি' : 'No items match your query'}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {language === 'bn'
              ? 'বানান পরীক্ষা করুন অথবা অন্য কোনো ক্যাটাগরি অনুসন্ধান করুন।'
              : 'Try checking your search keywords or clear current category filters.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
          >
            {language === 'bn' ? 'সকল পণ্য দেখুন' : 'Show All Groceries'}
          </button>
        </div>
      )}
    </div>
  );
};
