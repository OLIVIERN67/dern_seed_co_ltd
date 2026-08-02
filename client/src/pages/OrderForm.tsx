import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { ShoppingBag, ArrowLeft, CheckCircle2, AlertCircle, Sparkles, PackageCheck, Truck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import Footer from '@/components/Footer';
import * as api from '@/lib/api';
import { toast } from 'sonner';

export default function OrderForm() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();

  const [seeds, setSeeds] = useState<api.Seed[]>([]);
  const [selectedSeedId, setSelectedSeedId] = useState<number | null>(null);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('kg');
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const [loadingSeeds, setLoadingSeeds] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<number | null>(null);

  // Parse URL query params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pName = searchParams.get('product') || searchParams.get('name') || '';
    const pId = searchParams.get('productId') || searchParams.get('id');
    const pPrice = searchParams.get('price');
    const pCategory = searchParams.get('category');

    if (pName) setProductName(pName);
    if (pCategory) setCategory(pCategory);
    if (pPrice) setUnitPrice(parseFloat(pPrice) || 0);
    if (pId) setSelectedSeedId(parseInt(pId, 10) || null);
  }, []);

  // Fetch available seeds from API
  useEffect(() => {
    setLoadingSeeds(true);
    api
      .listSeeds()
      .then((res) => {
        setSeeds(res.seeds || []);
        // Match seed if specified in search query or default to first
        const searchParams = new URLSearchParams(window.location.search);
        const queryName = searchParams.get('product') || searchParams.get('name');
        const queryId = searchParams.get('productId') || searchParams.get('id');

        if (queryId) {
          const match = res.seeds.find((p) => p.id === parseInt(queryId, 10));
          if (match) {
            setSelectedSeedId(match.id);
            setProductName(match.name);
            setCategory(match.crop_type || '');
            setUnit('kg');
            setUnitPrice(Number(match.price_per_kg) || 0);
          }
        } else if (queryName) {
          const match = res.seeds.find(
            (p) => p.name.toLowerCase().trim() === queryName.toLowerCase().trim()
          );
          if (match) {
            setSelectedSeedId(match.id);
            setProductName(match.name);
            setCategory(match.crop_type || '');
            setUnit('kg');
            setUnitPrice(Number(match.price_per_kg) || 0);
          }
        } else if (res.seeds.length > 0 && !productName) {
          const first = res.seeds[0];
          setSelectedSeedId(first.id);
          setProductName(first.name);
          setCategory(first.crop_type || '');
          setUnit('kg');
          setUnitPrice(Number(first.price_per_kg) || 0);
        }
      })
      .catch((err) => {
        console.error('Failed to load seeds:', err);
      })
      .finally(() => setLoadingSeeds(false));
  }, []);

  const handleSelectSeed = (seed: api.Seed) => {
    setSelectedSeedId(seed.id);
    setProductName(seed.name);
    setCategory(seed.crop_type || '');
    setUnit('kg');
    setUnitPrice(Number(seed.price_per_kg) || 0);
  };

  const totalAmount = quantity * unitPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please log in or sign up to place an order.');
      setLocation('/login?redirect=/order');
      return;
    }

    if (!productName.trim()) {
      toast.error('Please select or specify a product');
      return;
    }

    if (quantity <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createOrder({
        product_name: productName,
        quantity,
        total_amount: totalAmount,
        product_id: selectedSeedId,
        unit,
        unit_price: unitPrice,
        shipping_address: null,
      });

      setOrderSuccess(res.id);
      toast.success('Order submitted successfully!');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to submit order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-green-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 flex flex-col">
        {/* Header Hero Banner */}
        <section className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-950 text-white py-12 px-4 shadow-md">
          <div className="container mx-auto max-w-5xl">
            <Link
              href="/products"
              className="inline-flex items-center text-sm font-medium text-emerald-200 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Certified Quality Seeds
                </span>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-white">
                  Place Seed Order
                </h1>
                <p className="text-emerald-100 text-sm mt-1">
                  Complete your order details below to reserve certified seeds directly from DERN SEED.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <PackageCheck className="w-8 h-8 text-amber-400" />
                <div>
                  <div className="text-xs text-emerald-200">Guaranteed Germination</div>
                  <div className="text-sm font-semibold text-white">High Crop Yield</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto max-w-5xl px-4 py-10 flex-1">
          {orderSuccess ? (
            <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-green-200 dark:border-green-800/50 p-8 text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Order Received!
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
                Thank you for ordering with DERN SEED. Your order reference number is{' '}
                <span className="font-bold text-green-700 dark:text-green-400">#{orderSuccess}</span>.
                Our team is reviewing your order and will contact you for dispatch.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/dashboard/customer"
                  className="w-full sm:w-auto px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow-md transition-all text-sm text-center"
                >
                  View My Customer Dashboard
                </Link>
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all text-sm text-center"
                >
                  Browse More Products
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Form Column */}
              <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 space-y-6">
                  <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-green-600" /> Order Details
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Verify seed selection, quantity, and delivery parameters.
                    </p>
                  </div>

                  {/* Product Selection */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Selected Seed / Product <span className="text-red-500">*</span>
                    </label>

                    {seeds.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto p-1 border rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                        {seeds.map((seed) => {
                          const isSelected = selectedSeedId === seed.id || productName.toLowerCase() === seed.name.toLowerCase();
                          return (
                            <button
                              key={seed.id}
                              type="button"
                              onClick={() => handleSelectSeed(seed)}
                              className={`text-left p-3 rounded-lg border transition-all text-sm ${
                                isSelected
                                  ? 'border-green-500 bg-green-50/80 dark:bg-green-900/30 text-green-900 dark:text-green-300 font-medium shadow-xs'
                                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'
                              }`}
                            >
                              <div className="font-semibold text-slate-900 dark:text-slate-100">{seed.name}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between mt-1">
                                <span>{seed.crop_type || 'Seed'}</span>
                                <span className="font-mono text-green-700 dark:text-green-400 font-medium">
                                  RWF {seed.price_per_kg.toLocaleString()} / kg
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-green-500 text-sm"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Product Name (e.g. Certified Irish Potato Seed)"
                        required
                      />
                    )}
                  </div>

                  {/* Quantity and Dedicated Unit Display */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-green-500 font-mono text-sm"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Unit
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-sm font-medium"
                        value={unit}
                        readOnly
                        aria-readonly="true"
                        placeholder="kg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Unit Price (RWF)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="100"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-mono text-sm"
                        value={unitPrice}
                        readOnly
                        aria-readonly="true"
                      />
                    </div>
                  </div>

                  {!user && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3 text-xs text-amber-800 dark:text-amber-300">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        You are currently not logged in. Placed orders will require account registration to track status on your Customer Dashboard.{' '}
                        <Link href="/login" className="underline font-semibold">
                          Log in here
                        </Link>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-base disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Submitting Order...</span>
                    ) : (
                      <>
                        <span>Submit Order</span>
                        <PackageCheck className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Order Summary Sidebar */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sticky top-6">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                    Order Summary
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-1 text-slate-600 dark:text-slate-300">
                      <span>Product:</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-right">
                        {productName || 'Not Selected'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 text-slate-600 dark:text-slate-300">
                      <span>Quantity:</span>
                      <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
                        {quantity} {unit}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 text-slate-600 dark:text-slate-300">
                      <span>Unit Price:</span>
                      <span className="font-mono text-slate-900 dark:text-slate-100">
                        RWF {unitPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-700 pt-3 flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-white">Total Amount:</span>
                      <span className="text-xl font-bold font-mono text-green-700 dark:text-green-400">
                        RWF {totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
                      <Truck className="w-4 h-4 text-green-600" /> Fast Regional Logistics
                    </div>
                    <p>
                      Orders are processed directly at Ruhengeri seed facilities and dispatched via certified transport.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
