import { useState, useMemo } from 'react';
import { useEffect } from 'react';
import { ArrowRight, Search, Calendar, User, Tag } from 'lucide-react';
import { Link } from 'wouter';
import Footer from '@/components/Footer';
import { applySeo } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { blogArticles } from '@/data/blogData';

const categoryKeys = [
  'blog_cat_all',
  'blog_cat_seed_quality',
  'blog_cat_finance',
  'blog_cat_projects',
  'blog_cat_opportunities',
];

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

  const { t } = useLanguage();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('blog_cat_all');

  const articlesWithTranslations = useMemo(() => {
    return blogArticles.map((article) => ({
      ...article,
      title: t(article.titleKey),
      author: t(article.authorKey),
      excerpt: t(article.excerptKey),
      category: t(article.categoryKey),
    }));
  }, [t]);

  const filteredArticles = useMemo(() => {
    return articlesWithTranslations.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === 'blog_cat_all' || article.categoryKey === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articlesWithTranslations, searchTerm, activeCategory]);

  const featuredArticle = articlesWithTranslations[0];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative min-h-80 flex items-center overflow-hidden py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/gallery/potatoes.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-900/60" />

        <div className="container relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-white mb-6 leading-tight">
              {t('blog_hero_heading') || 'Our Blog'}
            </h1>
            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
              {t('blog_hero_description') || 'Farming tips, guides & agricultural resources'}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className={`py-12 border-b ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="container">
          <div className="mb-8 animate-fade-in-up">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder={t('blog_search_placeholder') || 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          <div className="animate-fade-in-up">
            <p className={`text-sm font-semibold mb-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t('blog_filter_by_category') || 'Filter by Category'}
            </p>
            <div className="flex flex-wrap gap-2">
              {categoryKeys.map((catKey) => (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm ${
                    activeCategory === catKey
                      ? 'bg-green-700 text-white shadow-lg'
                      : theme === 'dark'
                      ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-green-700'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-green-700'
                  }`}
                >
                  {t(catKey)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <div
                  key={article.id}
                  className={`${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } border rounded-xl overflow-hidden transition-all duration-300 hover:border-green-400 hover:shadow-lg hover:-translate-y-2 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`h-40 flex items-center justify-center text-5xl ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gradient-to-br from-green-100 to-green-50'
                  }`}>
                    {article.image}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className={`w-4 h-4 ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        theme === 'dark'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {article.category}
                      </span>
                    </div>

                    <h3 className={`font-bold text-lg font-poppins mb-2 line-clamp-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {article.title}
                    </h3>

                    <p className={`text-sm mb-4 line-clamp-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {article.excerpt}
                    </p>

                    <div className={`flex items-center gap-4 text-xs mb-4 pt-4 border-t ${
                      theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'
                    }`}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                    </div>

                    <Link
                      href={`/blog/${article.slug}`}
                      className={`font-semibold text-sm transition-colors inline-flex items-center gap-1 ${
                        theme === 'dark' ? 'text-green-400 hover:text-green-300' : 'text-green-700 hover:text-green-800'
                      }`}
                    >
                      {t('common_read_more')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('blog_no_articles') || 'No articles found'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className={`text-4xl font-bold font-poppins mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {t('blog_featured_article') || 'Featured Article'}
              </h2>
            </div>

            <div className={`${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            } border rounded-2xl overflow-hidden shadow-lg animate-fade-in-up`}>
              <div className="grid lg:grid-cols-2 gap-0">
                <div className={`h-96 lg:h-auto flex items-center justify-center text-8xl ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gradient-to-br from-green-100 to-green-50'
                }`}>
                  {featuredArticle.image}
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className={`inline-block px-4 py-2 text-xs font-bold rounded-full mb-4 w-fit ${
                    theme === 'dark'
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {featuredArticle.category}
                  </div>
                  <h3 className={`text-3xl font-bold font-poppins mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {featuredArticle.title}
                  </h3>
                  <p className={`mb-6 leading-relaxed line-clamp-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {featuredArticle.excerpt}
                  </p>
                  <div className={`flex items-center gap-6 mb-6 pb-6 border-b ${
                    theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div>
                      <p className={`text-xs uppercase ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {t('blog_published')}
                      </p>
                      <p className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {featuredArticle.date}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs uppercase ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {t('blog_by')}
                      </p>
                      <p className={`font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {featuredArticle.author}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${featuredArticle.slug}`}
                    className="inline-flex items-center px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 w-fit"
                  >
                    {t('blog_read_full')} <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/gallery/soya.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-800/85" />

        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-4 animate-fade-in-up">
            {t('blog_newsletter_heading') || 'Subscribe to Our Newsletter'}
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            {t('blog_newsletter_description') || 'Get the latest farming tips and updates delivered to your inbox'}
          </p>
          <form className="max-w-md mx-auto flex gap-2 animate-fade-in-up">
            <input
              type="email"
              placeholder={t('newsletter_email_placeholder') || 'Enter your email'}
              className={`flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              }`}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 text-gray-900 font-bold rounded-lg hover:bg-amber-600 transition-all duration-300 hover:-translate-y-1"
            >
              {t('blog_newsletter_subscribe') || 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
