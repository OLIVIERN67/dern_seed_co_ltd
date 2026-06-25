import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');

  const galleryItems = [
    { id: 1, category: 'production', title: 'Seed Production', emoji: '🌱', description: 'Our modern seed production facilities' },
    { id: 2, category: 'farm', title: 'Farm Visits', emoji: '🚜', description: 'Regular visits to farmer fields' },
    { id: 3, category: 'harvest', title: 'Harvest', emoji: '🌾', description: 'Successful harvests with our seeds' },
    { id: 4, category: 'farmers', title: 'Farmers', emoji: '👨‍🌾', description: 'Our farming community' },
    { id: 5, category: 'training', title: 'Training', emoji: '📚', description: 'Farmer training sessions' },
    { id: 6, category: 'events', title: 'Company Events', emoji: '🎉', description: 'Community events and celebrations' },
    { id: 7, category: 'production', title: 'Quality Control', emoji: '✓', description: 'Rigorous quality testing' },
    { id: 8, category: 'farm', title: 'Field Preparation', emoji: '🌍', description: 'Preparing fields for planting' },
    { id: 9, category: 'harvest', title: 'Post-Harvest', emoji: '📦', description: 'Harvest handling and storage' },
  ];

  const categories = [
    { id: 'all', label: 'All Images' },
    { id: 'production', label: 'Seed Production' },
    { id: 'farm', label: 'Farm Visits' },
    { id: 'harvest', label: 'Harvest' },
    { id: 'farmers', label: 'Farmers' },
    { id: 'training', label: 'Training' },
    { id: 'events', label: 'Company Events' },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

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
            <h1 className="text-5xl md:text-6xl font-bold font-poppins text-white mb-6">Our Gallery</h1>
            <p className="text-xl text-gray-200">
              Explore our farming operations, training sessions, and community impact.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container">
          {/* Category Filter */}
          <div className="mb-12 animate-fade-in-up">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-green-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer group animate-fade-in-up hover:scale-105 transition-transform duration-300 shadow-lg"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Background */}
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-7xl">
                  {item.emoji}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-6">
                  <h3 className="text-white font-bold text-xl font-poppins mb-1">{item.title}</h3>
                  <p className="text-gray-200 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold font-poppins mb-4">Our Visual Story</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These images showcase our commitment to quality, farmer support, and sustainable agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Seed Production',
                count: '3',
                description: 'Images showcasing our production facilities and quality control processes',
              },
              {
                title: 'Farm Operations',
                count: '2',
                description: 'Field visits and farm preparation activities with our farming partners',
              },
              {
                title: 'Harvest & Training',
                count: '4',
                description: 'Successful harvests and farmer training sessions in the field',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 text-center transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl font-bold font-poppins text-green-700 mb-3">{stat.count}</div>
                <h3 className="font-bold text-lg font-poppins mb-2 text-gray-900">{stat.title}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Highlights */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold font-poppins mb-4">Featured Highlights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Key moments that define our mission and impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Community Impact',
                description: 'Our seeds have helped thousands of farmers improve their livelihoods and achieve food security.',
                emoji: '👥',
              },
              {
                title: 'Quality Standards',
                description: 'Every batch of seeds undergoes rigorous testing to ensure it meets our high quality standards.',
                emoji: '✓',
              },
              {
                title: 'Farmer Support',
                description: 'We provide comprehensive support from seed selection through harvest and beyond.',
                emoji: '🤝',
              },
              {
                title: 'Sustainable Practices',
                description: 'Our farming practices promote environmental sustainability and long-term soil health.',
                emoji: '🌱',
              },
            ].map((highlight, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up flex gap-6"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl flex-shrink-0">{highlight.emoji}</div>
                <div>
                  <h3 className="font-bold text-xl font-poppins mb-2 text-gray-900">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
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
            Join Our Growing Community
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Be part of the agricultural revolution in Rwanda with DERN SEED.
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
  );
}
