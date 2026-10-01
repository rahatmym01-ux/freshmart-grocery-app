import React from 'react';
import { ShoppingBag, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { language, t } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                Fresh<span className="text-emerald-500">Mart</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'bn'
                ? 'ফ্রেশমার্ট হলো আপনার বিশ্বস্ত অনলাইন গ্রোসারি সুপারস্টোর। তাজা ফল, শাকসবজি, ডিম, মাংস ও নিত্যপ্রয়োজনীয় পণ্য সরবরাহ করি মাত্র ৩০ মিনিটে।'
                : 'Your trusted neighborhood online grocery store delivering farm-fresh vegetables, organic fruits, halal meats, and dairy in under 30 minutes.'}
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Quality & Hygiene Guaranteed</span>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              {language === 'bn' ? 'যোগাযোগ ও সাপোর্ট' : 'Customer Support'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+880 9612 000 999 / +1 (800) 555-FRESH</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>support@freshmart.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Gulshan-2, Dhaka 1212 & Brooklyn, NY 11201</span>
              </li>
            </ul>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              {language === 'bn' ? 'জনপ্রিয় বিভাগ' : 'Popular Aisles'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>{language === 'bn' ? '• অর্গানিক শাকসবজি ও ফল' : '• Organic Produce & Fruits'}</li>
              <li>{language === 'bn' ? '• তাজা মাছ ও হালাল মাংস' : '• Fresh Fish & Halal Meats'}</li>
              <li>{language === 'bn' ? '• দুগ্ধপণ্য ও তাজা ডিম' : '• Farm Dairy & Brown Eggs'}</li>
              <li>{language === 'bn' ? '• বেকারি ও ড্রাই ফ্রুটস' : '• Artisan Bakery & Healthy Nuts'}</li>
              <li>{language === 'bn' ? '• রান্নার তেল ও মসলা' : '• Cooking Oils & Spices'}</li>
            </ul>
          </div>

          {/* Payment Gateways accepted */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              {language === 'bn' ? 'নিরাপদ পেমেন্ট পদ্ধতি' : 'Accepted Payments'}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-pink-900/60 border border-pink-700/60 text-pink-200 px-2.5 py-1 rounded-md font-bold">
                bKash
              </span>
              <span className="bg-orange-900/60 border border-orange-700/60 text-orange-200 px-2.5 py-1 rounded-md font-bold">
                Nagad
              </span>
              <span className="bg-blue-900/60 border border-blue-700/60 text-blue-200 px-2.5 py-1 rounded-md font-bold">
                Visa / MasterCard
              </span>
              <span className="bg-sky-900/60 border border-sky-700/60 text-sky-200 px-2.5 py-1 rounded-md font-bold">
                PayPal
              </span>
              <span className="bg-emerald-900/60 border border-emerald-700/60 text-emerald-200 px-2.5 py-1 rounded-md font-bold">
                Cash on Delivery
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-3">
              256-bit bank-grade SSL secure encryption.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© 2026 FreshMart Grocery Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React 19, Vite & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
