import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default function ProductGallery({ images = [], productName = '' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset selected thumbnail when images change (e.g., variant color switch)
  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const imageUrls = images.map((img) => `${API_BASE}${img}`);
  const currentImage = imageUrls[selectedIndex] || '/placeholder.png';

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      {imageUrls.length > 1 && (
        <div className="hidden md:flex flex-col gap-3 order-1 md:order-none">
          {imageUrls.map((url, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`w-16 h-16 rounded-xl border-[1.5px] p-1 flex items-center justify-center transition-all duration-150 ${
                selectedIndex === i
                  ? 'border-[#6C28D9] shadow-sm ring-2 ring-[#6C28D9]/20'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={url}
                alt={`${productName} thumbnail ${i + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center bg-white rounded-2xl p-4 md:p-8 min-h-[320px] md:min-h-[460px] border border-gray-100 shadow-sm relative overflow-hidden">
        <img
          key={currentImage}
          src={currentImage}
          alt={productName}
          className="max-w-full max-h-[420px] object-contain transition-all duration-300 transform hover:scale-105"
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
                selectedIndex === i ? 'bg-[#6C28D9] w-6' : 'bg-gray-300 w-2'
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
