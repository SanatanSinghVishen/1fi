export default function ShopTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'top-brands', label: 'Top Brands', icon: '🏷️' },
    { id: 'nearby-stores', label: 'Nearby Stores', icon: '📍' },
    { id: '1fi-marketplace', label: '1Fi Marketplace', icon: '🛒' },
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'text-[#6C28D9]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {/* Active underline indicator */}
              <span
                className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-sm transition-opacity duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#6C28D9] opacity-100'
                    : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
