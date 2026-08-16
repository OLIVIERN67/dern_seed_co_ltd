import React from 'react';
import { Link } from 'wouter';
import { CheckCircle2, ArrowRight, Eye, Sparkles } from 'lucide-react';
import type { SeedProduct } from '@/data/seedData';

interface ProductCardProps {
  product: SeedProduct;
  onViewDetails: (product: SeedProduct) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  className = '',
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 hover:-translate-y-2 flex flex-col group ${className}`}
    >
      {/* Product Image */}
      <div className="relative h-52 sm:h-56 bg-gray-100 dark:bg-slate-900 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges on Image */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 bg-green-700/90 backdrop-blur-xs text-white text-xs font-bold rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-gray-950 text-xs font-bold rounded-full shadow-sm">
            <Sparkles className="w-3 h-3" />
            Certified
          </span>
        </div>

        {/* Availability tag at bottom corner */}
        <div className="absolute bottom-3 left-3 text-xs text-white/90 font-medium">
          {product.harvestPeriod && (
            <span className="bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md">
              Maturity: {product.harvestPeriod}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-xl sm:text-2xl font-poppins text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Benefits Preview */}
        <div className="mb-6 space-y-1.5 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Key Highlights:
          </p>
          {product.benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons: View Details & Order */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            title={`View detailed information about ${product.name}`}
          >
            <Eye className="w-4 h-4 text-green-600 dark:text-green-400" />
            View Details
          </button>

          <Link
            href={`/order?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Order Seed
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
