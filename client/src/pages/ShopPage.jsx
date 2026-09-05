import { useState, useEffect, useMemo } from 'react';
import ShopTabs from '../components/ShopTabs';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/products';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('1fi-marketplace');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Unable to load products. Check server connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await getAllProducts();
        if (!ignore) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError('Unable to load products. Check server connection.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  // Filter products by brand and search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesBrand = selectedBrand === 'All' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesBrand && matchesSearch;
    });
  }, [products, selectedBrand, searchQuery]);

  const brands = ['All', 'Apple', 'Samsung', 'OnePlus'];

  const renderBlankSection = (title, icon, description) => (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#EFDAFF] border border-[#B3A3BF]/50 flex items-center justify-center mx-auto mb-5 text-3xl shadow-sm">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-[#121212] mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed mb-6">
        {description}
      </p>
      <div className="inline-flex items-center gap-2">
        <button
          onClick={() => setActiveTab('1fi-marketplace')}
          className="rounded-xl py-2.5 px-5 bg-[#6C28D9] text-white font-semibold text-sm hover:bg-[#8852e1] transition-all"
        >
          Explore 1Fi Marketplace →
        </button>
      </div>
    </div>
  );

  const renderMarketplace = () => {
    if (loading) {
      return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#EFDAFF]/30 rounded-2xl h-96 animate-pulse border border-[#B3A3BF]/30" />
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4 text-2xl">
            ⚠️
          </div>
          <h3 className="text-lg font-bold text-[#121212] mb-1">Connecting to Server</h3>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button
            onClick={loadProducts}
            className="rounded-xl py-2 px-5 bg-[#6C28D9] text-white font-semibold text-sm hover:bg-[#8852e1] transition-all"
          >
            Retry Connection
          </button>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Hero banner */}
        <div className="mb-8 rounded-3xl bg-gradient-to-br from-[#FAF5FF] via-[#F5EDFD] to-[#EFDAFF]/50 border border-[#6C28D9]/20 p-6 md:p-8 relative overflow-hidden shadow-xs">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <img src="/favicon.svg" alt="1Fi" className="w-9 h-9" />
              <div>
                <h2 className="text-2xl font-extrabold text-[#121212] tracking-tight">
                  1Fi Marketplace
                </h2>
                <p className="text-sm text-gray-600">
                  Shop smartphones using your mutual funds &bull; 0% Interest EMI &bull; Keep earning returns
                </p>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex items-center gap-2.5 flex-wrap mt-5">
              <span className="text-xs font-semibold text-[#6C28D9] bg-white border border-[#6C28D9]/20 px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                ⚡ Instant Zero-Paperwork Approval
              </span>
              <span className="text-xs font-semibold text-[#6C28D9] bg-white border border-[#6C28D9]/20 px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                📈 Mutual Fund Stays Invested &amp; Compounding
              </span>
              <span className="text-xs font-semibold text-[#6C28D9] bg-white border border-[#6C28D9]/20 px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                🎁 Up to ₹2,000 Cashback
              </span>
              <span className="text-xs font-semibold text-[#6C28D9] bg-white border border-[#6C28D9]/20 px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                🔒 RBI / SEBI Regulated Lien Marking
              </span>
            </div>
          </div>
        </div>

        {/* Search & Brand Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Brand Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                  selectedBrand === brand
                    ? 'bg-[#6C28D9] text-white shadow-sm shadow-[#6C28D9]/25 border border-[#6C28D9]'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {brand === 'All' ? 'All Phones' : brand}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phones (e.g. iPhone, S24)..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#6C28D9] focus:ring-2 focus:ring-[#6C28D9]/15 transition-all bg-white"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-base font-semibold text-gray-700">No phones match your filter</p>
            <p className="text-sm text-gray-400 mt-1">Try clearing your search query or selecting a different brand.</p>
            <button
              onClick={() => {
                setSelectedBrand('All');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold text-[#6C28D9] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-20 pt-10 border-t border-gray-100 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#6C28D9] uppercase tracking-wider bg-[#EFDAFF] px-3 py-1 rounded-full">
              LAMF Process
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#121212] mt-3">
              How 1Fi Mutual Fund EMI Works
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Instead of liquidating your investments or paying hefty 16% credit card charges, leverage your portfolio to buy flagships at 0% interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 relative hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#6C28D9]/10 text-[#6C28D9] font-bold flex items-center justify-center text-base mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-[#121212] mb-1.5">Choose Phone &amp; Plan</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Select your favorite smartphone variant and choose an EMI tenure ranging from 3 to 12 months with exclusive cashbacks.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 relative hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#6C28D9]/10 text-[#6C28D9] font-bold flex items-center justify-center text-base mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-[#121212] mb-1.5">Lien Mark via OTP</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Pledge mutual funds digitally in 2 minutes. Your units remain in your folio and continue earning market returns uninterrupted.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 relative hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#6C28D9]/10 text-[#6C28D9] font-bold flex items-center justify-center text-base mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-[#121212] mb-1.5">Instant Order Dispatch</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your smartphone ships immediately with verified manufacturer warranty. Pay affordable monthly installments seamlessly.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div>
      <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'top-brands' &&
        renderBlankSection(
          'Top Brands',
          '🏷️',
          'Explore flagship brand catalogs with direct brand warranties and special 1Fi financing rates.'
        )}
      {activeTab === 'nearby-stores' &&
        renderBlankSection(
          'Nearby Stores',
          '📍',
          'Locate partner retail electronics outlets near you offering instant 1Fi mutual fund checkout.'
        )}
      {activeTab === '1fi-marketplace' && renderMarketplace()}
    </div>
  );
}
