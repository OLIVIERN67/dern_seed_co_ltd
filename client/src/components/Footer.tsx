import { Link } from 'wouter';
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-100 dark:bg-slate-900 dark:text-gray-100">
      {/* Newsletter Section */}
      <div className="bg-green-700 py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold font-poppins text-white mb-2">{t('newsletter_stay_updated')}</h3>
            <p className="text-green-100 mb-6">{t('newsletter_description')}</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <input
                type="email"
                placeholder={t('newsletter_email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="min-w-0 flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-600 transition-colors"
              >
                {t('newsletter_subscribe')}
              </button>
            </form>
            {subscribed && (
              <p className="text-green-100 mt-3 animate-fade-in-up">{t('newsletter_thanks')}</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="DERN SEED" className="w-12 h-12 object-contain" />
              <div>
                <h4 className="font-bold text-white font-poppins">{t('brand_company')}</h4>
                <p className="text-xs text-gray-400">{t('brand_certified_seeds')}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">{t('footer_company_description')}</p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/dernseedcompanyLtd/?locale=cy_GB"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="DERN SEED on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white font-poppins mb-4">{t('footer_quick_links')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-green-500 transition-colors">
                  {t('footer_link_home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-green-500 transition-colors">
                  {t('footer_link_about')}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-green-500 transition-colors">
                  {t('footer_link_products')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-green-500 transition-colors">
                  {t('footer_link_contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white font-poppins mb-4">{t('footer_products')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  {t('footer_product_maize')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  {t('footer_product_irish_potato')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  {t('footer_product_wheat')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                  {t('footer_product_soybean')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white font-poppins mb-4">{t('footer_contact')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">P.O. BOX 45, Musanze, Rwanda</span>
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                <a href="tel:+250782724840" className="text-gray-400 hover:text-green-500 transition-colors">
                  +250 782 724 840
                </a>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:dernseedcompanyltd2020@gmail.com" className="text-gray-400 hover:text-green-500 transition-colors">
                  dernseedcompanyltd2020@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>{t('footer_copyright')}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-green-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-500 transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
