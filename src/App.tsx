import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryBar } from './components/CategoryBar';
import { FlashSaleSection } from './components/FlashSaleSection';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminSuite } from './components/AdminSuite';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div>
        <Navbar />

        {currentView === 'store' ? (
          <main>
            <HeroBanner />
            <FlashSaleSection />
            <CategoryBar />
            <ProductGrid />
          </main>
        ) : (
          <main>
            <AdminSuite />
          </main>
        )}
      </div>

      <Footer />

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
};

export default App;
