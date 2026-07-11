import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import Footer from '@/components/Footer';
import { applySeo } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Products() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    applySeo({
      title: 'DERN SEED Products - Certified Seeds for Maize, Beans, Potatoes, Wheat & Soybeans',
      description: 'Browse DERN SEED certified seeds: Irish potato, bean, maize, wheat, and soybean varieties. Quality-assured seeds produced under national standards for optimal crop yield.',
      keywords: ['certified seeds Rwanda', 'maize seeds', 'bean seeds', 'potato seeds', 'wheat seeds', 'soybean seeds', 'seed varieties', 'agricultural seeds', 'crop seeds', 'quality seeds'],
      ogImage: '/images/logo.png',
      canonical: 'https://dernseedcoltd.rw/products',
    });

    // Add Product Schema
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'DERN SEED Certified Seeds',
      description: 'Quality-certified seeds for maize, beans, potatoes, wheat, and soybeans',
      itemListElement: products.map((product, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: {
          '@type': 'Brand',
          name: 'DERN SEED Company Ltd'
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(productSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const products = [
    {
      id: 1,
      name: 'Certified Irish Potato Seed',
      category: 'Root Crops',
      description: "Improved varieties offering high productivity, good processing quality, and excellent adaptability to Rwanda's highland farming systems.",
      varieties: ['Kirundo', 'Ndamira', 'Gikungu', 'Cyerekezo'],
      benefits: ['High germination rate', 'Disease-free planting material', 'Uniform tuber size', 'Excellent field performance'],
    },
    {
      id: 2,
      name: 'Certified Bean Seed',
      category: 'Legumes',
      description: 'Selected for high yield potential, nutritional value, and adaptability to different agro-ecological conditions.',
      varieties: ['RWR 3194', 'RWV 3316', 'MAC 44', 'Mwirasi', 'MBC23', 'Kigondo', 'RWV1129', 'RWV2350-2B'],
      benefits: ['High-yield potential', 'Good disease tolerance', 'Excellent grain quality', 'Suitable for seed multiplication'],
    },
    {
      id: 3,
      name: 'Certified Maize Seed',
      category: 'Cereals',
      description: 'Improved maize varieties that provide reliable performance and high productivity across different ecological regions.',
      varieties: ['RHMH1520', 'PAN661', 'H628', 'H629'],
      benefits: ['High germination percentage', 'Vigorous plant growth', 'High yield potential', 'Excellent adaptability'],
    },
    {
      id: 4,
      name: 'Certified Wheat Seed',
      category: 'Cereals',
      description: "Produced under strict quality control to ensure strong crop establishment and high grain quality, adapted to Rwanda's wheat-growing areas.",
      varieties: ['Nyaruka', 'Gihundo', 'Kibatsi', 'Majyambere', 'Mizero', 'Reberaho'],
      benefits: ['High productivity', 'Good grain quality', 'Adapted to local conditions', 'Reliable field performance'],
    },
    {
      id: 5,
      name: 'Certified Soybean Seed',
      category: 'Legumes',
      description: 'Quality soybean seed suitable for grain production, processing industries, and sustainable crop rotation systems.',
      varieties: ['RWASOYA 20-8', 'RWASOYA 20-3', 'PEKA 6'],
      benefits: ['Excellent germination', 'High-yield potential', 'Good adaptability', 'Quality grain production'],
    },
  ];

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'cereals', label: 'Cereals' },
    { id: 'root-crops', label: 'Root Crops' },
    { id: 'legumes', label: 'Legumes' },
  ];

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => {
        const category = p.category.toLowerCase().replace(' ', '-');
        return category === activeFilter;
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
                {t('products_hero_heading') || 'Our Products'}
              </h1>
              <p className="text-xl text-gray-200">
                {t('products_hero_description') || 'Quality-certified seeds for sustainable agriculture'}
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container">
            {/* Filters - Professional Dropdown */}
            <div className="mb-12 animate-fade-in-up">
              <div className="relative inline-block w-full md:w-64">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-green-500"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {filters.find(f => f.id === activeFilter)?.label || 'Select Category'}
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} text-gray-500 dark:text-gray-400`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 border rounded-lg shadow-lg animate-fade-in-up bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => {
                          setActiveFilter(filter.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
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
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        {product.category}
                      </div>
                      <div className="bg-amber-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        Certified
                      </div>
                    </div>
                    <h3 className="font-bold text-xl font-poppins mb-2 text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                      {product.description}
                    </p>

                    {/* Varieties */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        {t('products_available_varieties') || 'Available Varieties'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.varieties.map((variety, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                            {variety}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
                        {t('products_key_benefits') || 'Key Benefits'}
                      </p>
                      <ul className="space-y-1.5">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      className="inline-flex items-center w-full justify-center px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 mt-auto"
                    >
                      {t('products_inquire_now') || 'Inquire Now'} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t('products_empty_state') || 'No products found in this category'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl font-bold font-poppins mb-4 text-gray-900 dark:text-white">
                Quality Assurance
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                Every seed produced by Dern Seed Company Ltd undergoes rigorous quality assurance processes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                'Seed cleaning and grading',
                'Quality inspection and testing',
                'Seed treatment',
                'Proper packaging and labeling',
                'Safe storage and handling',
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex items-center gap-3 transition-all duration-300 hover:border-green-400 hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-green-700 flex-shrink-0" />
                  <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Our Seeds Stand Out */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl font-bold font-poppins mb-4 text-gray-900 dark:text-white">
                Why Choose Dern Seed Company Ltd?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Certified & Quality-Assured',
                  description: 'All seeds meet national certification standards for purity and viability.',
                  icon: '✓',
                },
                {
                  title: 'High Germination & Genetic Purity',
                  description: 'Improved and climate-resilient varieties with consistent field performance.',
                  icon: '🌱',
                },
                {
                  title: 'Professional Technical Support',
                  description: 'Reliable supply, timely delivery, and a commitment to sustainable agriculture.',
                  icon: '👨‍🌾',
                },
              ].map((spec, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{spec.icon}</div>
                  <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900 dark:text-white">
                    {spec.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=75)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-800/85" />

          <div className="container relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4 animate-fade-in-up">
              Ready to Order?
            </h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Contact us today to place your order or get more information about our products.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
            >
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
