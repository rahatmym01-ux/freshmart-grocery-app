import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, login, setCurrentView, t, language } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      setError(language === 'bn' ? 'ভুল ইমেইল বা পাসওয়ার্ড' : 'Invalid email or password');
    } else {
      setError('');
      if (email.trim().toLowerCase() === 'admin') {
        setCurrentView('admin');
      }
    }
  };

  const handleDemoAdmin = () => {
    setEmail('admin');
    setPassword('102030');
    login('admin', '102030');
    setCurrentView('admin');
  };

  const handleDemoCustomer = () => {
    setEmail('user@freshmart.com');
    setPassword('user123');
    login('user@freshmart.com', 'user123');
    setCurrentView('store');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900">{t.login}</h3>
          <p className="text-xs text-slate-500 mt-1">
            FreshMart Grocery Store Authentication
          </p>
        </div>

        {/* Demo Fast Logins */}
        <div className="space-y-2 mb-4">
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>{t.demoAdminLogin}</span>
            </span>
            <span className="text-[10px] bg-purple-200/80 px-1.5 py-0.5 rounded font-mono">1-Click</span>
          </button>

          <button
            type="button"
            onClick={handleDemoCustomer}
            className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.demoCustomerLogin}</span>
            </span>
            <span className="text-[10px] bg-emerald-200/80 px-1.5 py-0.5 rounded font-mono">1-Click</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-2 text-slate-400 text-[10px] uppercase">Or type credentials</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {error && (
          <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200 mb-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1">Email or Username</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin or user@freshmart.com"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors mt-2"
          >
            {t.login}
          </button>
        </form>
      </div>
    </div>
  );
};
