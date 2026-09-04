import { useState, useEffect } from 'react';
import ShopTabs from '../components/ShopTabs';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/products';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('1fi-marketplace');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Make sure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderComingSoon = (title) => (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-[32px] bg-[#f3f3f3] flex items-center justify-center mb-6">
          <span className="text-3xl">{title === 'Top Brands' ? '🏷️' : '📍'}</span>
        </div>
        <h2 className="text-2xl font-semibold text-[#121212] mb-2">{title}</h2>
        <p className="text-gray-500 max-w-md">
          This section is coming soon. Stay tuned for updates!
        </p>
        <div className="mt-6 inline-flex items-center px-4 py-1.5 rounded-full border border-gray-300 bg-gray-50">
          <span className="text-sm font-medium text-gray-500">Coming Soon</span>
        </div>
      </div>
    </div>
  );

  const renderMarketplace = () => {
    if (loading) {
      return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#EFDAFF]/40 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-gray-400 text-sm mt-2">
            Run <code className="bg-gray-100 px-2 py-0.5 rounded">npm run dev</code> in the server directory
          </p>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#6C28D9]/10 via-[#d8b4fe]/10 to-[#f3e8ff]/10 border border-[#6C28D9]/10 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#712CDC] to-[#5c22a5] flex items-center justify-center">
              <span className="text-white font-bold text-sm">1F</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#121212]">1Fi Marketplace</h2>
              <p className="text-sm text-gray-500">Shop using your mutual funds — 0% interest EMI</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-4">
            <span className="text-xs font-medium text-[#6C28D9] bg-white border border-[#6C28D9]/20 px-3 py-1 rounded-full">
              ⚡ Instant Approvals
            </span>
            <span className="text-xs font-medium text-[#6C28D9] bg-white border border-[#6C28D9]/20 px-3 py-1 rounded-full">
              📈 Keep Earning Returns
            </span>
            <span className="text-xs font-medium text-[#6C28D9] bg-white border border-[#6C28D9]/20 px-3 py-1 rounded-full">
              🎁 Cashback Available
            </span>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'top-brands' && renderComingSoon('Top Brands')}
      {activeTab === 'nearby-stores' && renderComingSoon('Nearby Stores')}
      {activeTab === '1fi-marketplace' && renderMarketplace()}
    </div>
  );
}
