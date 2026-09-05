import { useState } from 'react';
import { getProductImageUrl } from '../utils/imageHelper';

export default function ProductGallery({ images = [], productName = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ensure selected index is always valid for current images array
  const activeIndex = selectedIndex < images.length ? selectedIndex : 0;

  const imageUrls = images.map((img) => getProductImageUrl(img));
  const currentImage = imageUrls[activeIndex] || '/placeholder.svg';

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      {imageUrls.length > 1 && (
        <div className="hidden md:flex flex-col gap-3 order-1 md:order-none">
          {imageUrls.map((url, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`w-16 h-16 rounded-xl border-[1.5px] p-1 flex items-center justify-center transition-all duration-150 cursor-pointer ${
                activeIndex === i
                  ? 'border-[#6C28D9] shadow-sm ring-2 ring-[#6C28D9]/20 scale-105'
                  : 'border-gray-200 hover:border-gray-400 bg-white'
              }`}
            >
              <img
                src={url}
                alt={`${productName} thumbnail ${i + 1}`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/placeholder.svg';
                }}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center bg-white rounded-3xl p-4 md:p-8 min-h-[320px] md:min-h-[460px] border border-gray-100 shadow-sm relative overflow-hidden group">
        <img
          key={currentImage}
          src={currentImage}
          alt={productName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/placeholder.svg';
          }}
          className="max-w-full max-h-[420px] object-contain transition-all duration-300 transform group-hover:scale-105"
        />
      </div>

      {/* Mobile dot indicators */}
      {imageUrls.length > 1 && (
        <div className="flex md:hidden justify-center gap-2 mt-3">
          {imageUrls.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                activeIndex === i ? 'bg-[#6C28D9] w-6' : 'bg-gray-300 w-2'
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
