export type Currency = 'USD' | 'BDT';
export type Language = 'en' | 'bn';

export interface Nutrition {
  calories: number; // kcal
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  commentEn: string;
  commentBn: string;
  date: string;
}

export interface Product {
  id: string;
  nameEn: string;
  nameBn: string;
  category: string;
  priceUSD: number;
  originalPriceUSD?: number;
  discountPercent?: number;
  unitEn: string;
  unitBn: string;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  descriptionEn: string;
  descriptionBn: string;
  isFlashSale?: boolean;
  isOrganic?: boolean;
  nutrition: Nutrition;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  country: 'BD' | 'USA';
  address: string;
  city: string;
  deliverySlot: string;
  paymentMethod: 'bKash' | 'Nagad' | 'Stripe' | 'PayPal' | 'COD';
  items: CartItem[];
  subtotalUSD: number;
  deliveryFeeUSD: number;
  discountUSD: number;
  totalUSD: number;
  currency: Currency;
  exchangeRate: number;
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
  date: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameBn: string;
  icon: string;
  itemCount: number;
  color: string;
}
