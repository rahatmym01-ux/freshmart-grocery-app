import React from 'react';
import { 
  Sparkles, 
  Apple, 
  Milk, 
  Fish, 
  Cookie, 
  Coffee, 
  Flame, 
  HeartPulse, 
  Sparkle, 
  Baby, 
  Leaf 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Apple: <Apple className="w-4 h-4" />,
  Milk: <Milk className="w-4 h-4" />,
  Fish: <Fish className="w-4 h-4" />,
  Cookie: <Cookie className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  HeartPulse: <HeartPulse className="w-4 h-4" />,
  Sparkle: <Sparkle className="w-4 h-4" />,
  Baby: <Baby className="w-4 h-4" />,
  Leaf: <Leaf className="w-4 h-4" />,
};

export const CategoryBar: React.FC = () => {
  const { language, selectedCategory, setSelectedCategory } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2">
      <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all select-none ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-102'
                  : 'bg-white text-slate-700 hover:bg-slate-100/90 border border-slate-200/80'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-emerald-600'}>
                {ICON_MAP[cat.icon] || <Sparkles className="w-4 h-4" />}
              </span>
              <span>{language === 'bn' ? cat.nameBn : cat.nameEn}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {cat.itemCount}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
