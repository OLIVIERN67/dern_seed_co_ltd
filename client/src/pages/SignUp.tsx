import { useState } from 'react';
import { Link } from 'wouter';
import { Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { register } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SignUp() {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      toast.error('You must agree to the terms');
      return;
    }

    setLoading(true);
    try {
      await register(formData.fullName, formData.email, formData.password);
      toast.success('Account created successfully! Welcome to DERN SEED.');
      // After register, backend sets the session cookie.
      window.location.href = '/';
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <Link href="/" className="flex items-center gap-2 justify-center mb-6">
            <img src="/images/logo.png" alt="DERN SEED" className="w-14 h-14 object-contain" />
            <div>
              <div className="font-bold text-green-700 font-poppins">DERN SEED</div>
              <div className="text-xs text-gray-500">Certified Seeds</div>
            </div>
          </Link>

          <h1 className="text-3xl font-bold font-poppins text-gray-900 dark:text-gray-100 mb-2">{t('signup_title')}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t('signup_subtitle')}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up space-y-4 dark:bg-slate-800">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase mb-2">{t('form_full_name')}</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              placeholder={t('signup_placeholder_name')}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase mb-2">{t('form_email_address')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              placeholder={t('signup_placeholder_email')}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase mb-2">{t('form_phone_number')}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              placeholder={t('signup_placeholder_phone')}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase mb-2">{t('signup_password_label')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                placeholder={t('signup_placeholder_password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('signup_password_hint')}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 uppercase mb-2">{t('signup_confirm_password_label')}</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                placeholder={t('signup_placeholder_password')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              className="w-5 h-5 rounded border-gray-300 text-green-700 mt-0.5"
            />
            <label className="text-sm text-gray-600 dark:text-gray-300">{t('signup_terms_prefix')}{' '}
              <Link href="/contact" className="text-green-700 font-semibold hover:text-green-800">{t('signup_terms_link')}</Link>
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
            {loading ? t('signup_creating') : t('signup_create_account')}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6 animate-fade-in-up">{t('signup_already_have_account')}{' '}
          <Link href="/login" className="text-green-700 font-semibold hover:text-green-800">{t('signup_sign_in')}</Link>
        </p>
      </div>
    </div>
  );
}
