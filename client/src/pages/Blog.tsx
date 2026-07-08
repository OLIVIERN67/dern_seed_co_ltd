import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Search, Calendar, User, Tag } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { applySeo } from '@/lib/seo';

export default function Blog() {
  useEffect(() => {
    applySeo({
      title: 'DERN SEED Blog - Farming Tips, Guides & Agricultural Resources',
      description: 'Learn farming best practices, seed selection guides, pest management, soil preparation, and water management tips from DERN SEED agricultural experts.',
      keywords: ['farming tips', 'agricultural guide', 'seed selection', 'pest management', 'soil preparation', 'water management', 'crop protection', 'Rwanda agriculture'],
      ogImage: '/images/logo.png',
      canonical: 'https://dernseed.com/blog',
    });
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const articles = [
    {
      id: 1,
      title: 'Best Time to Plant Maize in Rwanda',
      category: 'Seasonal Guide',
      date: 'June 2026',
      author: 'Agricultural Team',
      excerpt: 'Learn the optimal planting times for maize in different regions to maximize your harvest. Discover seasonal patterns and climate considerations.',
      content: 'Maize planting times vary depending on rainfall patterns and altitude. In Rwanda, the best planting times are typically March-April and September-October. Proper timing ensures optimal moisture availability for germination and growth. Consider your local climate zone and soil conditions.',
      image: '🌽',
    },
    {
      id: 2,
      title: 'How to Choose Certified Seeds for Your Farm',
      category: 'Buying Guide',
      date: 'June 2026',
      author: 'Seed Specialist',
      excerpt: 'A comprehensive guide to selecting the right certified seeds for your farming needs. Learn quality indicators and supplier selection.',
      content: 'When selecting seeds, consider factors such as your local climate, soil type, market demand, and farming experience. Always choose certified seeds from reputable suppliers to ensure quality and germination rates. DERN SEED provides certified varieties for all major crops.',
      image: '🌱',
    },
    {
      id: 3,
      title: 'Integrated Pest Management for African Crops',
      category: 'Crop Protection',
      date: 'May 2026',
      author: 'Technical Team',
      excerpt: 'Effective strategies for managing common pests and protecting your crops naturally. Learn IPM techniques for sustainable farming.',
      content: 'Integrated Pest Management (IPM) combines cultural, biological, and chemical methods. Start with preventive measures like crop rotation, use resistant varieties, and monitor crops regularly for early pest detection. Disease-resistant certified seeds are your first line of defense.',
      image: '🐛',
    },
    {
      id: 4,
      title: 'Soil Preparation Guide',
      category: 'Farming Tips',
      date: 'May 2026',
      author: 'Agronomist',
      excerpt: 'Essential steps for preparing your soil for optimal seed germination and plant growth.',
      content: 'Good soil preparation is crucial for successful farming. Test your soil, add organic matter, ensure proper drainage, and maintain appropriate pH levels. These steps will create an ideal environment for seed germination.',
      image: '🌍',
    },
    {
      id: 5,
      title: 'Water Management in Agriculture',
      category: 'Farming Tips',
      date: 'April 2026',
      author: 'Water Expert',
      excerpt: 'Efficient irrigation and water conservation techniques for sustainable farming.',
      content: 'Water is essential for crop growth. Implement efficient irrigation systems, mulching, and rainwater harvesting. Monitor soil moisture regularly and adjust watering based on crop needs and weather conditions.',
      image: '💧',
    },
    {
      id: 6,
      title: 'Post-Harvest Handling',
      category: 'Seasonal Guide',
      date: 'April 2026',
      author: 'Storage Specialist',
      excerpt: 'Best practices for harvesting, drying, and storing your crops to maintain quality.',
      content: 'Proper post-harvest handling prevents crop losses and maintains quality. Harvest at the right maturity stage, dry properly, store in clean containers, and maintain appropriate temperature and humidity levels.',
      image: '📦',
    },
  ];

  const categories = ['all', 'Seasonal Guide', 'Buying Guide', 'Crop Protection', 'Farming Tips'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-80 flex items-center overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-900/60" />

        <div className="container relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-white mb-6 leading-tight">Blog & Resources</h1>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              Educational content and farming tips to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container">
          {/* Search Bar */}
          <div className="mb-8 animate-fade-in-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="animate-fade-in-up">
            <p className="text-sm font-semibold text-gray-700 mb-3">Filter by Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                    activeCategory === category
                      ? 'bg-green-700 text-white shadow-lg'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-green-700'
                  }`}
                >
                  {category === 'all' ? 'All Articles' : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Article Image */}
                  <div className="h-40 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-5xl">
                    {article.image}
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-green-600" />
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                        {article.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-t border-gray-200 pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                    </div>

                    {/* Read More */}
                    <a
                      href="#"
                      className="text-green-700 font-semibold text-sm hover:text-green-800 transition-colors inline-flex items-center gap-1"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold font-poppins mb-4">Featured Article</h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="h-96 lg:h-auto bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-8xl">
                🌱
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-4 w-fit">
                  Seasonal Guide
                </div>
                <h3 className="text-3xl font-bold font-poppins mb-4 text-gray-900">
                  Best Time to Plant Maize
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn the optimal planting times for maize in different regions to maximize your harvest. Maize planting times vary depending on rainfall patterns and altitude. In Rwanda, the best planting times are typically March-April and September-October. Proper timing ensures optimal moisture availability for germination and growth.
                </p>
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Published</p>
                    <p className="font-semibold text-gray-900">June 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">By</p>
                    <p className="font-semibold text-gray-900">Agricultural Team</p>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 w-fit"
                >
                  Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
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
            Stay Updated with Our Latest Articles
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Subscribe to our newsletter to receive farming tips and agricultural insights directly in your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-2 animate-fade-in-up">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 hover:-translate-y-1"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
