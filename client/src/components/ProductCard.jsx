import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function ProductCard({ product }) {
  const firstVariant = product.variants?.[0];
  if (!firstVariant) return null;

  const imageUrl = firstVariant.images?.[0]
    ? `${API_BASE}${firstVariant.images[0]}`
    : '/placeholder.png';

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block"
    >
      <div className="bg-[#EFDAFF] border border-[#B3A3BF] border-b-[3px] rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
        {/* Image */}
        <div className="flex items-center justify-center p-6 pb-0">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-40 h-48 object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-4 pt-3">
          <h3 className="text-base font-semibold text-[#121212] truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-[#121212]">
              {formatPrice(firstVariant.price)}
            </span>
            {firstVariant.discount > 0 && (
              <span className="text-xs font-medium text-green-700 bg-green-100 px-1.5 py-0.5 rounded">
                {firstVariant.discount}% off
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-xs text-gray-500">0% interest</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">EMI available</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-medium text-[#6C28D9] bg-[#6C28D9]/10 px-2 py-1 rounded-full">
              Mutual Fund EMI
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
