import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, Currency, Language } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';

export const USD_TO_BDT_RATE = 117;

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  formatPrice: (usdAmount: number) => string;
  t: (typeof TRANSLATIONS)['en'];
  
  // Products
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  addProduct: (prod: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, delta: number) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotalUSD: number;
  deliveryFeeUSD: number;
  discountUSD: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoApplied: boolean;
  applyPromo: (code: string) => boolean;
  totalUSD: number;
  isFreeDelivery: boolean;
  freeDeliveryThresholdUSD: number;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
  // Auth
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Modals & Views
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  currentView: 'store' | 'admin';
  setCurrentView: (view: 'store' | 'admin') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn');
  const [currency, setCurrency] = useState<Currency>('BDT');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  
  // Default logged in user
  const [user, setUser] = useState<User | null>({
    id: 'usr-1',
    name: 'Faizan Ahmed',
    email: 'user@freshmart.com',
    role: 'customer'
  });

  // Pre-populated orders for realistic dashboard
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-9821',
      customerName: 'Ayesha Rahman',
      email: 'ayesha.r@gmail.com',
      phone: '+880 1711 002233',
      country: 'BD',
      address: 'House 14, Road 7, Dhanmondi, Dhaka',
      city: 'Dhaka',
      deliverySlot: 'Express Delivery (30-45 Mins)',
      paymentMethod: 'bKash',
      items: [
        { product: INITIAL_PRODUCTS[0], quantity: 2 },
        { product: INITIAL_PRODUCTS[6], quantity: 1 }
      ],
      subtotalUSD: 12.87,
      deliveryFeeUSD: 0,
      discountUSD: 2.0,
      totalUSD: 10.87,
      currency: 'BDT',
      exchangeRate: USD_TO_BDT_RATE,
      status: 'Processing',
      date: '2026-10-01 11:30 AM'
    },
    {
      id: 'ORD-9820',
      customerName: 'Johnathan Hayes',
      email: 'j.hayes@outlook.com',
      phone: '+1 212 555 0192',
      country: 'USA',
      address: '450 Lexington Ave, Apt 12B',
      city: 'New York',
      deliverySlot: 'Evening Slot (6:00 PM - 9:00 PM)',
      paymentMethod: 'Stripe',
      items: [
        { product: INITIAL_PRODUCTS[10], quantity: 2 },
        { product: INITIAL_PRODUCTS[11], quantity: 1 }
      ],
      subtotalUSD: 41.97,
      deliveryFeeUSD: 0,
      discountUSD: 5.0,
      totalUSD: 36.97,
      currency: 'USD',
      exchangeRate: USD_TO_BDT_RATE,
      status: 'Delivered',
      date: '2026-09-30 04:15 PM'
    }
  ]);

  const t = TRANSLATIONS[language];

  const formatPrice = (usdAmount: number): string => {
    if (currency === 'BDT') {
      const bdt = Math.round(usdAmount * USD_TO_BDT_RATE);
      return `৳${bdt.toLocaleString('en-IN')}`;
    }
    return `$${usdAmount.toFixed(2)}`;
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoApplied(false);
    setPromoCode('');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const freeDeliveryThresholdUSD = 35;
  const subtotalUSD = cart.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0
  );
  const isFreeDelivery = subtotalUSD >= freeDeliveryThresholdUSD || cart.length === 0;
  const deliveryFeeUSD = isFreeDelivery ? 0 : 2.99;
  const discountUSD = promoApplied ? subtotalUSD * 0.2 : 0;
  const totalUSD = Math.max(0, subtotalUSD + deliveryFeeUSD - discountUSD);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FRESH20' || clean === 'DISCOUNT20') {
      setPromoApplied(true);
      return true;
    }
    return false;
  };

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admin' && pass === '102030') {
      setUser({
        id: 'adm-1',
        name: 'Master Admin',
        email: 'admin@freshmart.com',
        role: 'admin'
      });
      setIsAuthOpen(false);
      return true;
    }
    if ((cleanEmail === 'user@freshmart.com' || cleanEmail.includes('@')) && pass === 'user123') {
      setUser({
        id: 'usr-1',
        name: 'Faizan Ahmed',
        email: 'user@freshmart.com',
        role: 'customer'
      });
      setIsAuthOpen(false);
      return true;
    }
    // Generic fallback login
    if (cleanEmail && pass.length >= 4) {
      setUser({
        id: `usr-${Date.now()}`,
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        role: cleanEmail.includes('admin') ? 'admin' : 'customer'
      });
      setIsAuthOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentView('store');
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
      status: 'Pending'
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      reviews: []
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        formatPrice,
        t,
        products,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        addProduct,
        deleteProduct,
        updateStock,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotalUSD,
        deliveryFeeUSD,
        discountUSD,
        promoCode,
        setPromoCode,
        promoApplied,
        applyPromo,
        totalUSD,
        isFreeDelivery,
        freeDeliveryThresholdUSD,
        wishlist,
        toggleWishlist,
        user,
        login,
        logout,
        orders,
        createOrder,
        updateOrderStatus,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthOpen,
        setIsAuthOpen,
        currentView,
        setCurrentView
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
