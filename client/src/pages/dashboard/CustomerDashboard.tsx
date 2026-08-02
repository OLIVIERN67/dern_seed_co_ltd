import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import {
  ShoppingBag,
  Package,
  Sprout,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  RefreshCw,
  UserCheck,
  Calendar,
  Tag,
  ArrowRight,
  LogOut,
  MapPin,
  Phone,
  Mail,
  Truck,
  PackageCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import Footer from '@/components/Footer';
import * as api from '@/lib/api';
import { toast } from 'sonner';

export default function CustomerDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<'orders' | 'purchased' | 'seeds' | 'messages' | 'deliveries'>('orders');

  // Data states
  const [orders, setOrders] = useState<api.Order[]>([]);
  const [products, setProducts] = useState<api.Product[]>([]);
  const [messages, setMessages] = useState<api.CustomerMessage[]>([]);
  const [deliveries, setDeliveries] = useState<api.Delivery[]>([]);
  const [customerProfile, setCustomerProfile] = useState<api.Customer | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  const [seedSearch, setSeedSearch] = useState('');
  const [seedCategoryFilter, setSeedCategoryFilter] = useState('all');

  const [messageSearch, setMessageSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes, messagesRes, profileRes, deliveriesRes] = await Promise.allSettled([
        api.listOrders(),
        api.listProducts(),
        api.fetchMyMessages(),
        api.fetchMyCustomerProfile(),
        api.listMyDeliveries(),
      ]);

      if (ordersRes.status === 'fulfilled') setOrders(ordersRes.value.orders || []);
      if (productsRes.status === 'fulfilled') setProducts(productsRes.value.products || []);
      if (messagesRes.status === 'fulfilled') setMessages(messagesRes.value.messages || []);
      if (profileRes.status === 'fulfilled') setCustomerProfile(profileRes.value.customer || null);
      if (deliveriesRes.status === 'fulfilled') setDeliveries(deliveriesRes.value.deliveries || []);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setLocation('/login?redirect=/dashboard/customer');
      return;
    }
    loadData();
  }, [user]);

  // Computed data
  const approvedOrders = orders.filter((o) =>
    ['approved', 'paid', 'fulfilled'].includes(o.status.toLowerCase())
  );

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.product_name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      String(o.id).includes(orderSearch);
    const matchesStatus =
      orderStatusFilter === 'all' || o.status.toLowerCase() === orderStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(seedSearch.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(seedSearch.toLowerCase()));
    const matchesCategory =
      seedCategoryFilter === 'all' ||
      (p.category && p.category.toLowerCase() === seedCategoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const filteredMessages = messages.filter((m) => {
    const text = `${m.subject || ''} ${m.product_name || ''} ${m.message}`.toLowerCase();
    return text.includes(messageSearch.toLowerCase());
  });

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean) as string[])
  );

  const renderStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'approved' || s === 'fulfilled' || s === 'paid') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
          <CheckCircle2 className="w-3.5 h-3.5" /> {status}
        </span>
      );
    }
    if (s === 'rejected' || s === 'cancelled') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
          <XCircle className="w-3.5 h-3.5" /> {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
        <Clock className="w-3.5 h-3.5" /> {status}
      </span>
    );
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col">
        {/* Top Header Banner */}
        <header className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-950 text-white py-8 px-4 shadow-md">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-2xl text-amber-400">
                  {user?.name?.charAt(0).toUpperCase() || 'C'}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold font-poppins text-white">
                    Welcome back, {user?.name}!
                  </h1>
                  <p className="text-emerald-100 text-xs md:text-sm mt-0.5 flex items-center gap-3">
                    <span>{user?.email}</span>
                    {customerProfile?.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {customerProfile.phone}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/order"
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Place New Order
                </Link>
                <button
                  onClick={loadData}
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                  title="Refresh Data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Quick Stats overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <div className="text-xs text-emerald-200">Total Orders</div>
                <div className="text-xl font-bold text-white font-mono mt-0.5">{orders.length}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <div className="text-xs text-emerald-200">Purchased Seeds</div>
                <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
                  {approvedOrders.length}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <div className="text-xs text-emerald-200">Available Seeds</div>
                <div className="text-xl font-bold text-white font-mono mt-0.5">
                  {products.length}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <div className="text-xs text-emerald-200">Sent Messages</div>
                <div className="text-xl font-bold text-white font-mono mt-0.5">{messages.length}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Navigation Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 sticky top-0 z-10 shadow-xs">
          <div className="container mx-auto max-w-6xl px-4 flex space-x-1 sm:space-x-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-green-600 text-green-700 dark:text-green-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> My Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('purchased')}
              className={`py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'purchased'
                  ? 'border-green-600 text-green-700 dark:text-green-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <Package className="w-4 h-4" /> Purchased Products ({approvedOrders.length})
            </button>

            <button
              onClick={() => setActiveTab('seeds')}
              className={`py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'seeds'
                  ? 'border-green-600 text-green-700 dark:text-green-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <Sprout className="w-4 h-4" /> Order Available Seeds
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'messages'
                  ? 'border-green-600 text-green-700 dark:text-green-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Sent Messages ({messages.length})
            </button>

            <button
              onClick={() => setActiveTab('deliveries')}
              className={`py-4 px-3 sm:px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'deliveries'
                  ? 'border-green-600 text-green-700 dark:text-green-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              <Truck className="w-4 h-4" /> Deliveries ({deliveries.length})
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <main className="container mx-auto max-w-6xl px-4 py-8 flex-1">
          {/* TAB 1: SUBMITTED ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Search & Filter Bar */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search orders by product or ID..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    className="w-full sm:w-48 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-medium"
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs">
                {filteredOrders.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 dark:text-slate-400 space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
                    <p className="text-base font-medium">No orders found.</p>
                    <Link
                      href="/order"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 dark:text-green-400 hover:underline"
                    >
                      <Plus className="w-4 h-4" /> Place your first seed order
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-5 py-3.5">Order ID</th>
                          <th className="px-5 py-3.5">Product Name</th>
                          <th className="px-5 py-3.5">
                            <div className="flex items-center gap-1">
                              Qty/Unit
                              <EyeOff className="w-3 h-3 text-slate-400" />
                            </div>
                          </th>
                          <th className="px-5 py-3.5">
                            <div className="flex items-center gap-1">
                              Unit Price
                              <EyeOff className="w-3 h-3 text-slate-400" />
                            </div>
                          </th>
                          <th className="px-5 py-3.5">Total Amount</th>
                          <th className="px-5 py-3.5">Status</th>
                          <th className="px-5 py-3.5">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {filteredOrders.map((ord) => (
                          <tr
                            key={ord.id}
                            className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors"
                          >
                            <td className="px-5 py-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                              #{ord.id}
                            </td>
                            <td className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-100">
                              {ord.product_name}
                            </td>
                            <td className="px-5 py-4 font-mono">
                              {ord.quantity} {ord.unit || 'kg'}
                            </td>
                            <td className="px-5 py-4 font-mono text-slate-600 dark:text-slate-400">
                              RWF {(ord.unit_price || 0).toLocaleString()}
                            </td>
                            <td className="px-5 py-4 font-mono font-bold text-green-700 dark:text-green-400">
                              RWF {ord.total_amount.toLocaleString()}
                            </td>
                            <td className="px-5 py-4">{renderStatusBadge(ord.status)}</td>
                            <td className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400">
                              {ord.created_at ? new Date(ord.created_at).toLocaleDateString() : 'Recent'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PURCHASED PRODUCTS */}
          {activeTab === 'purchased' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Seeds & Products Purchased
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Confirmed and approved seed orders ready for planting or dispatch.
                </p>
              </div>

              {approvedOrders.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center text-slate-500">
                  <Package className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-base font-medium">No approved purchases yet.</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Once your submitted orders are approved, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {approvedOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white dark:bg-slate-800 border border-green-200 dark:border-green-800/50 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400">
                            Order #{ord.id}
                          </span>
                          {renderStatusBadge(ord.status)}
                        </div>

                        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                          {ord.product_name}
                        </h3>

                        <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          <div className="flex justify-between">
                            <span>Quantity Purchased:</span>
                            <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                              {ord.quantity} {ord.unit || 'kg'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Price:</span>
                            <span className="font-bold font-mono text-green-700 dark:text-green-400">
                              RWF {ord.total_amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />{' '}
                          {ord.created_at ? new Date(ord.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                        <Link
                          href={`/order?product=${encodeURIComponent(ord.product_name)}`}
                          className="font-semibold text-green-700 dark:text-green-400 hover:underline"
                        >
                          Re-order Seed
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: AVAILABLE SEED PRODUCTS */}
          {activeTab === 'seeds' && (
            <div className="space-y-6">
              {/* Search & Category Filter */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search certified seeds..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500"
                    value={seedSearch}
                    onChange={(e) => setSeedSearch(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    className="w-full sm:w-48 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-medium"
                    value={seedCategoryFilter}
                    onChange={(e) => setSeedCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seed Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                          {product.category || 'General Seed'}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            product.stock_quantity > 0
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                          }`}
                        >
                          {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                        {product.description || 'Certified quality planting seed material.'}
                      </p>

                      {/* Dedicated Unit Column/Display */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 text-xs mb-4">
                        <div>
                          <span className="text-slate-400 block font-medium">Unit Price</span>
                          <span className="font-bold font-mono text-green-700 dark:text-green-400 text-sm">
                            RWF {product.price.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Dedicated Unit</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {product.unit || 'kg'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-700">
                      <Link
                        href={`/order?productId=${product.id}&product=${encodeURIComponent(product.name)}&price=${product.price}&unit=${encodeURIComponent(product.unit || 'kg')}&category=${encodeURIComponent(product.category || '')}`}
                        className="w-full py-2.5 px-4 bg-green-700 hover:bg-green-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                      >
                        Order Now <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SENT MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search sent messages..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-2 focus:ring-green-500"
                    value={messageSearch}
                    onChange={(e) => setMessageSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredMessages.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center text-slate-500">
                    <MessageSquare className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                    <p className="text-base font-medium">No messages found.</p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 dark:text-green-400 hover:underline mt-2"
                    >
                      Contact DERN SEED Support
                    </Link>
                  </div>
                ) : (
                  filteredMessages.map((msg) => (
                    <div
                      key={`${msg.type}-${msg.id}`}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            msg.type === 'inquiry'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                          }`}
                        >
                          {msg.type === 'inquiry' ? 'Product Inquiry' : 'Contact Submission'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {msg.subject || msg.product_name || 'General Inquiry'}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                        "{msg.message}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {/* TAB 5: DELIVERIES */}
          {activeTab === 'deliveries' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-600" /> Delivery Tracking
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track the delivery status of your approved orders. Updates are provided by our team.
                </p>
              </div>

              {deliveries.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center text-slate-500">
                  <Truck className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                  <p className="text-base font-medium">No delivery records yet.</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Once your orders are processed and dispatched, delivery tracking will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-5">
                  {deliveries.map((d) => {
                    const statusColors: Record<string, string> = {
                      pending: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
                      in_transit: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800',
                      delivered: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
                      cancelled: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
                    };
                    const statusIcons: Record<string, any> = {
                      pending: Clock,
                      in_transit: Truck,
                      delivered: CheckCircle2,
                      cancelled: XCircle,
                    };
                    const StatusIcon = statusIcons[d.delivery_status] || Clock;

                    return (
                      <div
                        key={d.id}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            Delivery #{d.id}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                              statusColors[d.delivery_status] || statusColors.pending
                            }`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />{' '}
                            {d.delivery_status === 'in_transit' ? 'In Transit' : d.delivery_status.charAt(0).toUpperCase() + d.delivery_status.slice(1)}
                          </span>
                        </div>

                        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
                          {d.order_product_name || `Order #${d.order_id}`}
                        </h3>

                        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                            <span>{d.delivery_address || 'Address not specified'}</span>
                          </div>
                          {d.phone_number && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                              <span>{d.phone_number}</span>
                            </div>
                          )}
                          {d.tracking_number && (
                            <div className="flex items-center gap-2">
                              <Package className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                              <span>Tracking: <strong>{d.tracking_number}</strong></span>
                            </div>
                          )}
                          {d.delivered_by && (
                            <div className="flex items-center gap-2">
                              <UserCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                              <span>Delivered by: <strong>{d.delivered_by}</strong></span>
                            </div>
                          )}
                          {d.delivery_date && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                              <span>Delivery date: {new Date(d.delivery_date).toLocaleDateString()}</span>
                            </div>
                          )}
                          {d.notes && (
                            <div className="mt-2 p-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-lg border border-slate-100 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 italic">
                              "{d.notes}"
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
