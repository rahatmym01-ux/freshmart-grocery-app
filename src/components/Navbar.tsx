import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Heart, 
  User as UserIcon, 
  Globe, 
  DollarSign, 
  ShieldCheck, 
  Store,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useStore, USD_TO_BDT_RATE } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    formatPrice,
    t,
    cartCount,
    subtotalUSD,
    setIsCartOpen,
    wishlist,
    user,
    logout,
    setIsAuthOpen,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery
  } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-bar */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
              {language === 'bn' 
                ? '⚡ ৩০ মিনিটে সুপার ফাস্ট ডেলিভারি নিশ্চিত!' 
                : '⚡ Super-fast 30 minute delivery guaranteed!'}
            </span>
            <span className="hidden md:inline text-emerald-300/60">|</span>
            <span className="hidden md:inline font-mono text-emerald-200">
              Exchange Rate: 1 USD = ৳{USD_TO_BDT_RATE} BDT
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Currency switcher */}
            <div className="flex items-center bg-emerald-900/60 rounded-md px-1.5 py-0.5 border border-emerald-700/50">
              <DollarSign className="w-3 h-3 text-emerald-300 mr-0.5" />
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${
                  currency === 'USD' ? 'bg-emerald-500 text-white font-bold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button 
                onClick={() => setCurrency('BDT')}
                className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${
                  currency === 'BDT' ? 'bg-emerald-500 text-white font-bold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                BDT (৳)
              </button>
            </div>

            {/* Language switcher */}
            <div className="flex items-center bg-emerald-900/60 rounded-md px-1.5 py-0.5 border border-emerald-700/50">
              <Globe className="w-3 h-3 text-emerald-300 mr-1" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${
                  language === 'en' ? 'bg-emerald-500 text-white font-bold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-1.5 py-0.5 text-[11px] rounded transition-colors ${
                  language === 'bn' ? 'bg-emerald-500 text-white font-bold' : 'text-emerald-200 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => setCurrentView('store')}
          className="flex items-center space-x-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Fresh<span className="text-emerald-600">Mart</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-300">
                24/7
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              {t.brandTagline}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-2 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/90 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-800"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs bg-slate-200 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Admin Switcher */}
          {user?.role === 'admin' ? (
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentView === 'admin'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100'
              }`}
            >
              {currentView === 'admin' ? (
                <>
                  <Store className="w-3.5 h-3.5" />
                  <span>{t.viewStore}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.adminSuite}</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1.5 rounded-md border border-slate-200 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Demo</span>
            </button>
          )}

          {/* User Account */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 text-xs font-medium border border-transparent hover:border-slate-200">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:inline max-w-[90px] truncate">{user.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 border-b border-slate-100 text-xs">
                  <p className="font-semibold text-slate-800">{user.name}</p>
                  <p className="text-slate-400 text-[11px] truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono uppercase">
                    {user.role}
                  </span>
                </div>
                {user.role === 'admin' && (
                  <button 
                    onClick={() => setCurrentView('admin')}
                    className="w-full text-left px-3 py-1.5 text-xs text-purple-700 hover:bg-purple-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.adminDashboard}
                  </button>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                >
                  {t.logout}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>{t.login}</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-900 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-mono">
              {formatPrice(subtotalUSD)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
