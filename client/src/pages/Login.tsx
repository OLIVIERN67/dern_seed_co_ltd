import { useState } from 'react';
import { Link } from 'wouter';
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { login } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Login() {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await login(email, password);
      toast.success(t('login_welcome_back'));
      // Cookie-based session is set by the backend.
      window.location.href = '/';
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('login_sign_in_button'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-900">
      {/* Left Side - Image */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=85)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/60" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white p-12">
          <div className="max-w-md text-center animate-fade-in-up">
            <h1 className="text-5xl font-bold font-poppins mb-6">{t('login_welcome_back')}</h1>
            <p className="text-xl text-green-100 mb-8">{t('login_intro')}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-100">
                <span className="text-2xl">✓</span>
                <span>{t('login_feature_1')}</span>
              </div>
              <div className="flex items-center gap-3 text-green-100">
                <span className="text-2xl">✓</span>
                <span>{t('login_feature_2')}</span>
              </div>
              <div className="flex items-center gap-3 text-green-100">
                <span className="text-2xl">✓</span>
                <span>{t('login_feature_3')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white dark:bg-slate-800">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <img src="/images/logo.png" alt="DERN SEED" className="w-12 h-12 object-contain" />
            <div>
              <div className="font-bold text-green-700 font-poppins">DERN SEED</div>
              <div className="text-xs text-gray-500">Certified Seeds</div>
            </div>
          </Link>

          <h2 className="text-3xl font-bold font-poppins text-gray-900 dark:text-gray-100 mb-2">{t('login_title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t('login_enter_credentials')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase mb-2">{t('form_email_address')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                placeholder={t('login_placeholder_email')}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase mb-2">{t('signup_password_label')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                  placeholder={t('login_placeholder_password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Contact Support */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                {t('login_remember_me')}
              </label>
              <Link href="/contact" className="text-green-700 hover:text-green-800 font-semibold">
                {t('login_forgot_password')}
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              {loading ? t('login_signing_in') : t('login_sign_in_button')}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
            {t('login_signup_prompt')}{' '}
            <Link href="/signup" className="text-green-700 font-semibold hover:text-green-800">
              {t('login_signup')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
