import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  Truck,
  TrendingUp,
  Tag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { Order } from '../types';

export const AdminSuite: React.FC = () => {
  const { 
    orders, 
    products, 
    updateOrderStatus, 
    deleteProduct, 
    updateStock, 
    addProduct, 
    formatPrice, 
    setCurrentView,
    language,
    t 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form state
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [category, setCategory] = useState('fruits-veg');
  const [priceUSD, setPriceUSD] = useState('3.50');
  const [unitEn, setUnitEn] = useState('1 kg');
  const [unitBn, setUnitBn] = useState('১ কেজি');
  const [stock, setStock] = useState('50');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80');

  // KPI metrics
  const totalRevenueUSD = orders.reduce((sum, o) => sum + o.totalUSD, 0);
  const lowStockCount = products.filter((p) => p.stock < 25).length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      nameEn,
      nameBn,
      category,
      priceUSD: parseFloat(priceUSD) || 1.99,
      unitEn,
      unitBn,
      stock: parseInt(stock) || 30,
      image,
      descriptionEn: 'Farm-fresh grocery item added via Admin Portal.',
      descriptionBn: 'অ্যাডমিন প্যানেল থেকে যুক্ত করা তাজা পণ্য।',
      nutrition: { calories: 50, protein: 1, carbs: 10, fat: 0.2, fiber: 1.5 }
    });
    setShowAddModal(false);
    setNameEn('');
    setNameBn('');
  };

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'All') return true;
    return o.status === orderStatusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={() => setCurrentView('store')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.viewStore}</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.adminDashboard}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'bn' 
              ? 'অর্ডার ট্র্যাকিং, ইনভেন্টরি স্টক নিয়ন্ত্রণ ও রিয়েলটাইম সেলস অ্যানালিটিক্স' 
              : 'Live inventory control, order dispatch fulfillment, and real-time revenue analytics'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'orders' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.ordersTab} ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'inventory' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.productsTab} ({products.length})
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">{t.totalRevenue}</span>
            <span className="text-xl font-black text-slate-900 font-mono">
              {formatPrice(totalRevenueUSD)}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">{t.totalOrders}</span>
            <span className="text-xl font-black text-slate-900 font-mono">
              {orders.length}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">{t.totalProducts}</span>
            <span className="text-xl font-black text-slate-900 font-mono">
              {products.length}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">{t.lowStockItems}</span>
            <span className="text-xl font-black text-rose-600 font-mono">
              {lowStockCount}
            </span>
          </div>
        </div>
      </div>

      {/* Tab 1: Orders Dispatch */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {t.ordersTab}
            </h3>

            {/* Filter buttons */}
            <div className="flex space-x-1.5 text-xs font-semibold">
              {['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    orderStatusFilter === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-medium uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {order.id}
                      <span className="block text-[10px] text-slate-400 font-normal">{order.date}</span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{order.customerName}</div>
                      <div className="text-[11px] text-slate-400">{order.phone}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-xs">{order.address}, {order.city}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-700">
                        {order.items.reduce((s, i) => s + i.quantity, 0)} items
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-emerald-700">
                      {formatPrice(order.totalUSD)}
                    </td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded-md font-semibold text-[11px]">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Processing'
                            ? 'bg-sky-100 text-sky-800'
                            : order.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                      {order.status !== 'Delivered' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Delivered')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-md text-[11px] transition-colors"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Processing')}
                          className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-2.5 py-1 rounded-md text-[11px] transition-colors"
                        >
                          Process
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {t.productsTab}
            </h3>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addNewProduct}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-medium uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Item</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Current Stock</th>
                  <th className="p-3.5">Adjust Stock</th>
                  <th className="p-3.5 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 flex items-center space-x-3">
                      <img src={p.image} alt={p.nameEn} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <div className="font-bold text-slate-900">{p.nameEn}</div>
                        <div className="text-[11px] text-slate-400">{p.nameBn}</div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium text-[11px]">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      {formatPrice(p.priceUSD)}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`font-mono font-bold text-xs ${
                          p.stock < 20 ? 'text-rose-600' : 'text-slate-800'
                        }`}
                      >
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3.5 space-x-1.5">
                      <button
                        onClick={() => updateStock(p.id, -5)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono px-2 py-1 rounded text-xs"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => updateStock(p.id, 10)}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-mono font-bold px-2 py-1 rounded text-xs"
                      >
                        +10
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{t.addNewProduct}</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Product Name (English)</label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Crisp Washington Apples"
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Product Name (বাংলা)</label>
                <input
                  type="text"
                  required
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="যেমন: মিষ্টি দেশি আম"
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.nameEn}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={priceUSD}
                    onChange={(e) => setPriceUSD(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Unit (EN)</label>
                  <input
                    type="text"
                    value={unitEn}
                    onChange={(e) => setUnitEn(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Stock</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
