import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  X,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  ArrowRight,
  Leaf,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { SeedProduct } from '@/data/seedData';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductDetailsModalProps {
  product: SeedProduct | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
}) => {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState<string>('');

  // Update active image whenever product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const gallery = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const currentImageIndex = gallery.indexOf(activeImage);

  const handlePrevImage = () => {
    const nextIndex = (currentImageIndex - 1 + gallery.length) % gallery.length;
    setActiveImage(gallery[nextIndex]);
  };

  const handleNextImage = () => {
    const nextIndex = (currentIndex: number) => (currentIndex + 1) % gallery.length;
    setActiveImage(gallery[nextIndex(currentImageIndex)]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 border border-gray-200 dark:border-slate-700 animate-scale-in"
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-950/70 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
              {product.category}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700/50 text-xs font-bold rounded-full">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {product.certification || 'Certified Seed'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t('product_modal_close')}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Grid: Image Gallery + Quick Overview */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Gallery Column */}
            <div className="space-y-3">
              {/* Big Main Image */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 h-64 sm:h-80 shadow-md group">
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Gallery Navigation Arrows (if multiple images) */}
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                       aria-label={t('product_modal_prev')}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all opacity-80 hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                       aria-label={t('product_modal_next')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all opacity-80 hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                  {product.availability}
                </div>
              </div>

              {/* Thumbnails Row */}
              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImage === img
                          ? 'border-green-600 ring-2 ring-green-600/30 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview & Seasonal Info Column */}
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <h2
                  id="modal-product-title"
                  className="text-2xl sm:text-3xl font-bold font-poppins text-gray-900 dark:text-white mb-3"
                >
                  {product.name}
                </h2>

                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Key Quick Facts Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700/70">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <Calendar className="w-4 h-4" />
                      {t('product_planting_season')}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.plantingSeason}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700/70">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <Clock className="w-4 h-4" />
                      {t('product_harvest_period')}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {product.harvestPeriod}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Call to Action in column */}
              <div className="pt-2">
                <Link
                  href={`/order?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-700 hover:bg-green-800 text-white font-bold text-base rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {t('product_order_now')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Key Benefits Section */}
          <div className="p-6 rounded-2xl bg-green-50/70 dark:bg-green-950/20 border border-green-200/70 dark:border-green-800/40">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-green-700 dark:text-green-400" />
              <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white">
                {t('product_benefits')}
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {product.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Characteristics & Quality Standards */}
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-green-700 dark:text-green-400" />
              <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white">
                {t('product_quality_standards')}
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {product.characteristics.map((trait, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-900/80 p-3 rounded-lg border border-gray-100 dark:border-slate-800"
                >
                  <Layers className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-950/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-semibold text-sm rounded-lg transition-colors"
          >
            {t('product_close_details')}
          </button>

          <Link
            href={`/order?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold text-sm rounded-lg transition-all hover:shadow-md"
          >
            {t('product_inquire_order')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
