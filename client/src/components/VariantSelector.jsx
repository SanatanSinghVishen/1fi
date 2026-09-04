export default function VariantSelector({
  variants = [],
  selectedVariant,
  onVariantChange,
}) {
  // Extract unique colors (one entry per color)
  const colors = [...new Map(variants.map((v) => [v.color, v])).values()];

  // Storages available for the currently selected color
  const storages = [
    ...new Set(variants.filter((v) => v.color === selectedVariant?.color).map((v) => v.storage)),
  ];

  const handleColorChange = (color) => {
    // Try to find variant with same storage and new color, else pick first with that color
    const matchSameStorage = variants.find(
      (v) => v.color === color && v.storage === selectedVariant?.storage
    );
    const targetVariant = matchSameStorage || variants.find((v) => v.color === color);
    if (targetVariant) {
      onVariantChange(targetVariant);
    }
  };

  const handleStorageChange = (storage) => {
    const targetVariant = variants.find(
      (v) => v.color === selectedVariant?.color && v.storage === storage
    );
    if (targetVariant) {
      onVariantChange(targetVariant);
    }
  };

  return (
    <div className="space-y-5">
      {/* Color Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[#121212]">Color</span>
          <span className="text-sm font-medium text-[#6C28D9] bg-[#6C28D9]/10 px-2.5 py-0.5 rounded-full">
            {selectedVariant?.color}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {colors.map((v) => (
            <button
              key={v.color}
              onClick={() => handleColorChange(v.color)}
              title={v.color}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                selectedVariant?.color === v.color
                  ? 'border-[#6C28D9] ring-4 ring-[#6C28D9]/25 scale-110 shadow-md'
                  : 'border-gray-200 hover:border-gray-400 hover:scale-105'
              }`}
            >
              <div
                className="w-7 h-7 rounded-full shadow-inner"
                style={{ backgroundColor: v.colorHex || '#ccc' }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Storage Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[#121212]">Storage</span>
          <span className="text-sm text-gray-500">{selectedVariant?.storage}</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {storages.map((storage) => (
            <button
              key={storage}
              onClick={() => handleStorageChange(storage)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 cursor-pointer ${
                selectedVariant?.storage === storage
                  ? 'border-[#6C28D9] bg-[#6C28D9]/10 text-[#6C28D9] shadow-sm'
                  : 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
