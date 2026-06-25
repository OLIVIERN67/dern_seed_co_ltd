import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const productCategories = [
  {
    name: 'Irish Potato Seed',
    icon: '🥔',
    description: 'High-altitude adapted, high-yielding varieties',
    varieties: ['Kirundo', 'Ndamira', 'Gikungu', 'Cyerekezo'],
  },
  {
    name: 'Bean Seed',
    icon: '🫘',
    description: 'High-yield, disease-tolerant grain varieties',
    varieties: ['RWR 3194', 'RWV 3316', 'MAC 44', 'Mwirasi', 'MBC23', 'Kigondo'],
  },
  {
    name: 'Maize Seed',
    icon: '🌽',
    description: 'Vigorous, high-germination cereal varieties',
    varieties: ['RHMH1520', 'PAN661', 'H628', 'H629'],
  },
  {
    name: 'Wheat Seed',
    icon: '🌾',
    description: 'Strong establishment, high grain quality',
    varieties: ['Nyaruka', 'Gihundo', 'Kibatsi', 'Majyambere'],
  },
  {
    name: 'Soybean Seed',
    icon: '🌿',
    description: 'Excellent germination, sustainable rotation crop',
    varieties: ['RWASOYA 20-8', 'RWASOYA 20-3', 'PEKA 6'],
  },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="DERN SEED" className="w-12 h-12 object-contain" />
          <div className="hidden sm:block">
            <div className="font-bold text-green-700 text-base font-poppins">DERN SEED</div>
            <div className="text-xs text-gray-500 font-inter">Certified Seeds</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors"
          >
            About
          </Link>

          {/* Products Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <button
              onClick={() => setMegaMenuOpen((v) => !v)}
              className="flex items-center gap-1 text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              aria-expanded={megaMenuOpen}
            >
              Products
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mega Menu Panel */}
            {megaMenuOpen && (
              <div
                className="fixed left-0 top-20 w-full bg-white border-t border-b border-gray-200 shadow-xl animate-fade-in-down"
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
              >
                <div className="container py-8">
                  <div className="grid grid-cols-5 gap-6">
                    {productCategories.map((cat) => (
                      <div key={cat.name} className="group">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{cat.icon}</span>
                          <h4 className="font-bold text-gray-900 font-poppins text-sm group-hover:text-green-700 transition-colors">
                            {cat.name}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{cat.description}</p>
                        <ul className="space-y-1.5">
                          {cat.varieties.map((variety) => (
                            <li key={variety}>
                              <Link
                                href="/products"
                                onClick={() => setMegaMenuOpen(false)}
                                className="text-xs text-gray-600 hover:text-green-700 transition-colors"
                              >
                                {variety}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Certified, quality-assured seeds for sustainable agriculture.
                    </p>
                    <Link
                      href="/products"
                      onClick={() => setMegaMenuOpen(false)}
                      className="inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
                    >
                      View All Products <ArrowRight className="ml-1.5 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/services"
            className="text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors"
          >
            Gallery
          </Link>
          <Link
            href="/blog"
            className="text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 border-2 border-green-700 text-green-700 font-semibold rounded-lg text-sm hover:bg-green-50 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg text-sm hover:bg-green-800 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            {/* Mobile Products Accordion */}
            <div>
              <button
                onClick={() => setMobileProductsOpen((v) => !v)}
                className="w-full flex items-center justify-between text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              >
                Products
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileProductsOpen && (
                <div className="pl-4 pb-2 space-y-4">
                  {productCategories.map((cat) => (
                    <div key={cat.name}>
                      <div className="flex items-center gap-2 mb-1">
                        <span>{cat.icon}</span>
                        <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pl-6">
                        {cat.varieties.map((variety) => (
                          <span key={variety} className="text-xs text-gray-500">{variety}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    href="/products"
                    onClick={() => { setIsOpen(false); setMobileProductsOpen(false); }}
                    className="inline-flex items-center text-sm font-semibold text-green-700 pl-1"
                  >
                    View All Products <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/services"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/gallery"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/blog"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 font-inter text-sm font-medium hover:text-green-700 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-3 border-t border-gray-200 space-y-2">
              <Link
                href="/login"
                className="block text-center px-4 py-2 border-2 border-green-700 text-green-700 font-semibold rounded-lg text-sm hover:bg-green-50 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block text-center px-4 py-2 bg-green-700 text-white font-semibold rounded-lg text-sm hover:bg-green-800 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
