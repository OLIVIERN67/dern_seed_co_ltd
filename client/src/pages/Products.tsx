import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ChevronDown, Search, Filter } from 'lucide-react';
import Footer from '@/components/Footer';
import { applySeo } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as api from '@/lib/api';

export default function Products() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [seeds, setSeeds] = useState<api.Seed[]>([]);

  useEffect(() => {
    applySeo({
      title: 'DERN SEED Seeds - Certified Planting Material',
      description: 'Browse DERN SEED certified seeds directly from the database.',
      keywords: ['certified seeds Rwanda', 'seed catalog', 'agricultural seeds', 'crop seeds', 'quality seeds'],
      ogImage: '/images/logo.png',
      canonical: 'https://dernseedcoltd.rw/products',
    });

    api.listSeeds()
      .then((res) => {
        setSeeds(res.seeds || []);
      })
      .catch(() => {});
  }, []);

  const filters = [
    { id: 'all', label: 'All Seeds' },
    ...Array.from(new Set(seeds.map((seed) => seed.crop_type).filter(Boolean))).map((category) => ({
      id: String(category).toLowerCase().replace(/\s+/g, '-'),
      label: String(category),
    })),
  ];

  const filteredSeeds = seeds.filter((seed) => {
    const category = String(seed.crop_type || 'general').toLowerCase().replace(/\s+/g, '-');
    const matchesCategory = activeFilter === 'all' || category === activeFilter;
    const matchesSearch =
      seed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (seed.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (seed.variety || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (seed.origin || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (seed.certification || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative min-h-80 flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/60" />

          <div className="container relative z-10">
            <div className="max-w-2xl animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6">
                {t('products_hero_heading') || 'Our Seeds'}
              </h1>
              <p className="text-xl text-gray-200">
                {t('products_hero_description') || 'Quality-certified seeds directly from the database'}
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container">
            {/* Search & Filters */}
            <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search seeds, varieties, or crop type..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative inline-block w-full md:w-64">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-green-500 text-sm"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {filters.find(f => f.id === activeFilter)?.label || 'Select Category'}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} text-gray-500 dark:text-gray-400`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 border rounded-lg shadow-lg animate-fade-in-up bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => {
                          setActiveFilter(filter.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 transition-colors duration-200 ${
                          activeFilter === filter.id
                            ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold'
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

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSeeds.map((seed, index) => (
                <div
                  key={seed.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-44 bg-gray-100 dark:bg-gray-900 overflow-hidden">
                    <img
                      src={seed.image_url || '/images/crops/potato-field.jpg'}
                      alt={seed.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                  {/* Seed Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        {seed.crop_type || 'General Seed'}
                      </div>
                      <div className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        Certified
                      </div>
                    </div>
                    <h3 className="font-bold text-xl font-poppins mb-2 text-gray-900 dark:text-white">
                      {seed.name}
                    </h3>

                    {/* Unit & Price info */}
                    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/60 px-3 py-2 rounded-lg text-xs mb-3 border border-gray-100 dark:border-gray-700/60">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">
                        Unit: <strong className="text-gray-800 dark:text-gray-200">kg</strong>
                      </span>
                      <span className="font-bold text-green-700 dark:text-green-400 font-mono">
                        RWF {Number(seed.price_per_kg).toLocaleString()} / kg
                      </span>
                    </div>

                    <p className="text-sm mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                      {seed.description || 'Certified quality planting seed material.'}
                    </p>

                    <div className="mb-4 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                      <div>
                        <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Available Varieties</div>
                        <div className="flex flex-wrap gap-2">
                          {(seed.varieties?.length ? seed.varieties : seed.variety ? [seed.variety] : []).map((variety, varietyIndex) => (
                            <span key={varietyIndex} className="text-xs px-2 py-1 rounded-full font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                              {variety}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Key Benefits</div>
                        <ul className="space-y-1.5">
                          {(seed.benefits || []).map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <ArrowRight className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between gap-4 pt-1">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">Certification</span>
                        <span className="text-right">{seed.certification || 'Certified'}</span>
                      </div>
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <div className="rounded-lg bg-gray-50 dark:bg-gray-900/60 p-2 border border-gray-100 dark:border-gray-700/60">
                        <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Planting Season</div>
                        <div>{seed.planting_season || '—'}</div>
                      </div>
                      <div className="rounded-lg bg-gray-50 dark:bg-gray-900/60 p-2 border border-gray-100 dark:border-gray-700/60">
                        <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Harvest Period</div>
                        <div>{seed.harvest_period || '—'}</div>
                      </div>
                    </div>

                    <Link
                      href={`/order?productId=${seed.id}&product=${encodeURIComponent(seed.name)}&price=${seed.price_per_kg}&category=${encodeURIComponent(seed.crop_type || '')}`}
                      className="inline-flex items-center w-full justify-center px-4 py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 mt-auto text-sm"
                    >
                      {t('products_inquire_now') || 'Order Now'} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredSeeds.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t('products_empty_state') || 'No seeds found matching your search or filter'}
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
