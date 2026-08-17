import { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Footer from '@/components/Footer';
import { applySeo } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { seedData, type SeedProduct } from '@/data/seedData';
import ProductCard from '@/components/Products/ProductCard';
import ProductDetailsModal from '@/components/ProductDetails/ProductDetailsModal';

export default function Products() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SeedProduct | null>(null);

  useEffect(() => {
    applySeo({
      title: 'DERN SEED Seeds - Certified Planting Material | Quality Seed Varieties',
      description:
        'Browse DERN SEED certified seeds including Irish potato, beans, maize, wheat, and soybeans. Quality-tested planting materials for higher yields and climate resilience.',
      keywords: [
        'certified seeds Rwanda',
        'Irish potato seed',
        'certified bean seed',
        'hybrid maize seed',
        'wheat seed',
        'soybean seed',
        'seed catalog',
        'agricultural seeds',
      ],
      ogImage: '/images/logo.png',
      canonical: 'https://dernseedcoltd.rw/products',
    });
  }, []);

  const categories = [
    { id: 'all', label: t('products_all') },
    { id: 'root-crops', label: t('products_root_crops') },
    { id: 'legumes', label: t('products_legumes') },
    { id: 'cereals', label: t('products_cereals') },
  ];

  // Filter and search logic
  const filteredProducts = seedData.filter((product) => {
    const categoryKey = product.category.toLowerCase().replace(/\s+/g, '-');
    const matchesCategory = activeFilter === 'all' || categoryKey === activeFilter;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.benefits.some((b) => b.toLowerCase().includes(query)) ||
      product.characteristics.some((c) => c.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Hero Section */}
        <section className="relative min-h-80 flex items-center overflow-hidden py-20">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/gallery/potatoes 1.jpeg)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/95 via-green-900/85 to-green-950/70" />

          <div className="container relative z-10">
            <div className="max-w-2xl animate-fade-in-up">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                {t('products_certified_quality')}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-white mb-4">
                {t('products_hero_heading') || 'Our Certified Seeds'}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                {t('products_hero_description') ||
                  'High-yielding, climate-resilient, and disease-resistant certified seeds inspected and tested for optimal agricultural performance.'}
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container">
            {/* Search & Category Filter Controls */}
            <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder={t('products_search_placeholder')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:outline-none shadow-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Pills (Desktop) */}
              <div className="hidden lg:flex items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      activeFilter === cat.id
                        ? 'bg-green-700 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Category Dropdown (Mobile / Tablet) */}
              <div className="relative inline-block w-full md:w-64 lg:hidden">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-green-500 text-sm"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {categories.find((f) => f.id === activeFilter)?.label || t('products_select_category')}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    } text-gray-500 dark:text-gray-400`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 border rounded-xl shadow-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm overflow-hidden animate-fade-in-up">
                    {categories.map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => {
                          setActiveFilter(filter.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 transition-colors duration-200 ${
                          activeFilter === filter.id
                            ? 'bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 font-semibold'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid generated via .map() */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                  {t('products_empty_state') || 'No seeds found matching your search or filter'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  {t('products_reset_filters')}
                </button>
              </div>
            )}
          </div>
        </section>

        <Footer />

        {/* Reusable Product Details Modal */}
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </div>
  );
}
