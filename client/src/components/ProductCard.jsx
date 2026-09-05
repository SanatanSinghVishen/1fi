import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.API_URL || '';

export default function ProductCard({ product }) {
  const firstVariant = product.variants?.[0];
  if (!firstVariant) return null;

  const imageUrl = firstVariant.images?.[0]
    ? `${API_BASE}${firstVariant.images[0]}`
    : '/placeholder.png';

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  // Approximate 6-month 0% interest EMI for teaser
  const startingMonthlyEmi = Math.round(firstVariant.price / 6);

  // Extract unique color variants for preview dots
  const uniqueColors = [...new Map((product.variants || []).map((v) => [v.color, v])).values()];

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block"
    >
      <div className="bg-[#EFDAFF] border border-[#B3A3BF] border-b-[3px] rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-b-[#6C28D9] hover:scale-[1.02] flex flex-col h-full">
        {/* Top Badges */}
        <div className="p-4 pb-0 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#6C28D9] bg-white/90 border border-[#6C28D9]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {product.brand}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-full border border-gray-200 text-xs font-semibold text-green-700">
              <span>{product.rating}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-green-600">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Image Container */}
        <div className="flex items-center justify-center p-6 py-4 flex-1">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-44 h-52 object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Product Details */}
        <div className="p-5 pt-3 bg-white/70 backdrop-blur-sm border-t border-[#B3A3BF]/40 mt-auto">
          {/* Color swatch dots */}
          {uniqueColors.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2">
              {uniqueColors.map((c) => (
                <div
                  key={c.color}
                  title={c.color}
                  className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-xs"
                  style={{ backgroundColor: c.colorHex || '#999' }}
                />
              ))}
              <span className="text-[11px] text-gray-500 ml-1">
                {uniqueColors.length} colors
              </span>
            </div>
          )}

          <h3 className="text-base font-bold text-[#121212] truncate group-hover:text-[#6C28D9] transition-colors">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mt-1.5 flex-wrap">
            <span className="text-xl font-extrabold text-[#121212]">
              {formatPrice(firstVariant.price)}
            </span>
            {firstVariant.mrp > firstVariant.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(firstVariant.mrp)}
              </span>
            )}
            {firstVariant.discount > 0 && (
              <span className="text-[11px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">
                {firstVariant.discount}% off
              </span>
            )}
          </div>

          {/* EMI Highlight */}
          <div className="mt-3 p-2.5 rounded-xl bg-[#6C28D9]/5 border border-[#6C28D9]/15 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-gray-500 block">Mutual Fund EMI from</span>
              <span className="text-sm font-bold text-[#6C28D9]">
                {formatPrice(startingMonthlyEmi)}/mo
              </span>
            </div>
            <span className="text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
              0% Interest
            </span>
          </div>

          {/* View Plans CTA */}
          <div className="mt-3 pt-2 flex items-center justify-between text-xs font-semibold text-[#6C28D9]">
            <span>View Variants &amp; Plans</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
