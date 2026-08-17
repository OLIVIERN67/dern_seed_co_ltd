import { useEffect, useMemo } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import Footer from '@/components/Footer';
import { applySeo } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { blogArticles, getBlogArticleBySlug } from '@/data/blogData';

export default function BlogDetail() {
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug;
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const article = useMemo(() => {
    if (!slug) return undefined;
    return getBlogArticleBySlug(slug);
  }, [slug]);

  useEffect(() => {
    if (article) {
      applySeo({
        title: t(article.titleKey) || 'Blog Article - DERN SEED',
        description: t(article.excerptKey) || '',
        keywords: ['DERN SEED', 'blog', 'agriculture', 'Rwanda'],
        ogImage: '/images/logo.png',
        canonical: `https://dernseed.com/blog/${slug}`,
      });
    }
  }, [article, t, slug]);

  if (!article) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('blog_not_found') || 'Article Not Found'}
          </h1>
          <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('blog_not_found_desc') || 'The article you are looking for does not exist.'}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('blog_back_to_blog') || 'Back to Blog'}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = t(article.titleKey);
  const author = t(article.authorKey);
  const excerpt = t(article.excerptKey);
  const content = t(article.contentKey);
  const category = t(article.categoryKey);

  const paragraphs = content.split('\n\n').filter((p: string) => p.trim());

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const locale = language === 'rw' ? 'rw-RW' : language === 'fr' ? 'fr-FR' : 'en-US';
      return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative min-h-72 flex items-center overflow-hidden py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/gallery/potatoes.jpeg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-900/60" />

        <div className="container relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('blog_back_to_blog') || 'Back to Blog'}
          </Link>

          <div className="max-w-3xl animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-4 py-1 text-xs font-bold rounded-full bg-green-800/50 text-green-200 border border-green-600/30">
                {category}
              </span>
              <span className="text-sm text-green-200">
                {formatDate(article.date)}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins text-white mb-6 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-green-200">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className={`h-64 md:h-80 flex items-center justify-center text-8xl rounded-2xl mb-10 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-green-100 to-green-50'
            }`}>
              {article.image}
            </div>

            {/* Excerpt */}
            <div className={`mb-10 p-6 rounded-xl border-l-4 border-green-600 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'
            }`}>
              <p className={`text-lg leading-relaxed italic ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {excerpt}
              </p>
            </div>

            {/* Article Body */}
            <div className={`prose prose-lg max-w-none ${
              theme === 'dark'
                ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300'
                : 'prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700'
            }`}>
              {paragraphs.map((paragraph: string, index: number) => {
                const trimmed = paragraph.trim();
                if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n').filter((l: string) => l.trim());
                  return (
                    <ul key={index} className={`my-4 space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {items.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>{item.replace(/^[•\-]\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (/^\d+\.\s/.test(trimmed)) {
                  const items = trimmed.split('\n').filter((l: string) => l.trim());
                  return (
                    <ol key={index} className={`my-4 space-y-2 list-decimal list-inside ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {items.map((item: string, i: number) => (
                        <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={index} className={`mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Article Footer */}
            <div className={`mt-12 pt-8 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Tag className="w-4 h-4" />
                    {category}
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.date)}
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    <User className="w-4 h-4" />
                    {author}
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('blog_back_to_blog') || 'Back to Blog'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
