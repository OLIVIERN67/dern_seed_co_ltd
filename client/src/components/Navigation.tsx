import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { cropImages } from '@/lib/cropImages';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const productCategories = [
  {
    name: 'Irish Potato Seed',
    icon: cropImages.potato.primary,
    description: 'High-altitude adapted, high-yielding varieties',
    varieties: ['Kirundo', 'Ndamira', 'Gikungu', 'Cyerekezo'],
  },
  {
    name: 'Bean Seed',
    icon: cropImages.bean.primary,
    description: 'High-yield, disease-tolerant grain varieties',
    varieties: ['RWR 3194', 'RWV 3316', 'MAC 44', 'Mwirasi', 'MBC23', 'Kigondo'],
  },
  {
    name: 'Maize Seed',
    icon: cropImages.maize.primary,
    description: 'Vigorous, high-germination cereal varieties',
    varieties: ['RHMH1520', 'PAN661', 'H628', 'H629'],
  }
];

const aboutMenuItems = [
  { name: 'Mission', href: '/about#mission' },
  { name: 'Vision', href: '/about#vision' },
  { name: 'Values', href: '/about#values' },
  { name: 'Goals', href: '/about#goals' },
  { name: 'What We Do', href: '/about#what-we-do' },
  { name: 'Staff Administration', href: '/about#staff-administration' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<'products' | 'about' | null>(null);

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaMenuOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaMenuOpen(false), 150);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md dark:bg-gray-900/95 dark:border-gray-800'
          : 'bg-white border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800'
      }`}
    >
      <div className="container flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="DERN SEED" className="w-12 h-12 object-contain" />
          <div className="hidden sm:block">
            <div className="font-bold text-green-700 text-base font-poppins">DERN SEED</div>
            <div className="text-xs text-gray-500 font-inter">Certified Seeds</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Language + Theme switchers (desktop) */}
          <div className="flex items-center gap-2 ml-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm font-inter text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label={t('language_label')}
            >
              <option value="en">{t('language_en')}</option>
              <option value="rw">{t('language_rw')}</option>
              <option value="fr">{t('language_fr')}</option>
            </select>

            {toggleTheme && (
              <button
                type="button"
                onClick={() => toggleTheme()}
                className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm font-semibold font-inter text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-gray-800 transition-colors"
                aria-label={t('theme_toggle_aria')}
              >
                {theme === 'dark' ? t('theme_dark') : t('theme_light')}
              </button>
            )}
          </div>

          <Link
            href="/"
            className="text-gray-600 font-inter text-sm font-medium px-3 py-2 rounded-lg hover:text-green-700 hover:bg-green-50 transition-all duration-300"
          >
            {t('nav_home')}
          </Link>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutMenuOpen(true)}
            onMouseLeave={() => setAboutMenuOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-gray-600 font-inter text-sm font-medium px-3 py-2 rounded-lg hover:text-green-700 hover:bg-green-50 transition-all duration-300"
              aria-expanded={aboutMenuOpen}
            >
              {t('nav_about')}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${aboutMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {aboutMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in-down z-50">
                <div className="py-2">
                  {aboutMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      onClick={() => setAboutMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Products Dropdown — EXACTLY LIKE About dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMegaMenuOpen((v) => !v)}
              className="flex items-center gap-1 text-gray-600 font-inter text-sm font-medium px-3 py-2 rounded-lg hover:text-green-700 hover:bg-green-50 transition-all duration-300"
              aria-expanded={megaMenuOpen}
            >
              {t('nav_products')}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {megaMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in-down z-50">
                <div className="py-2">
                  {productCategories.map((cat) => (
                    <div key={cat.name}>
                      <div className="px-4 py-2 text-sm font-bold text-gray-900 font-poppins">{cat.name}</div>
                      <ul className="space-y-1.5 px-2 pb-2">
                        {cat.varieties.map((variety) => (
                          <li key={variety}>
                            <Link
                              href="/products"
                              onClick={() => setMegaMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                            >
                              {variety}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/services"
            className="text-gray-600 font-inter text-sm font-medium px-3 py-2 rounded-lg hover:text-green-700 hover:bg-green-50 transition-all duration-300"
          >
            {t('nav_services')}
          </Link>
          <Link
            href="/gallery"
            className="text-gray-600 font-inter text-sm font-medium px-3 py-2 rounded-lg hover:text-green-700 hover:bg-green-50 transition-all duration-300"
          >
            {t('nav_gallery')}
          </Link>
          <Link
            href="/blog"
            className="text-gray-600 font-inter text-sm font-medium px-3 py-2 rounded-lg hover:text-green-700 hover:bg-green-50 transition-all duration-300"
          >
            {t('nav_blog')}
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 font-inter text-sm font-medium px-3 py-2 rounded-lg hover:text-green-700 hover:bg-green-50 transition-all duration-300"
          >
            {t('nav_contact')}
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-2 border-2 border-green-700 text-green-700 font-semibold rounded-lg text-sm hover:bg-green-50 transition-all duration-300 hover:-translate-y-0.5"
          >
            {t('nav_login')}
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg text-sm hover:bg-green-800 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            {t('nav_signup')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label={t('menu_toggle_aria')}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 animate-fade-in-down max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="container py-4 space-y-1">
            <Link
              href="/"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav_home')}
            </Link>

            {/* About Dropdown (Mobile) */}
            <div>
              <button
                type="button"
                onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                className="w-full flex items-center justify-between text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              >
                {t('nav_about')}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${aboutMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {aboutMenuOpen && (
                <div className="pl-4 space-y-1">
                  {aboutMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-gray-600 font-inter text-sm hover:text-green-700 transition-colors py-2"
                      onClick={() => {
                        setAboutMenuOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Products (no dropdown) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  setMobileProductsOpen(false);
                  setIsOpen(false);
                  window.location.href = '/products';
                }}
                className="w-full flex items-center justify-between text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              >
                {t('nav_products')}
                <ChevronDown className="w-4 h-4 opacity-0" />
              </button>
            </div>

            <Link
              href="/services"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav_services')}
            </Link>
            <Link
              href="/gallery"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav_gallery')}
            </Link>
            <Link
              href="/blog"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav_blog')}
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('nav_contact')}
            </Link>

            <div className="pt-3 border-t border-gray-200 space-y-2">
              <Link
                href="/login"
                className="block text-center px-4 py-2 border-2 border-green-700 text-green-700 font-semibold rounded-lg text-sm hover:bg-green-50 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {t('nav_login')}
              </Link>
              <Link
                href="/signup"
                className="block text-center px-4 py-2 bg-green-700 text-white font-semibold rounded-lg text-sm hover:bg-green-800 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {t('nav_signup')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

