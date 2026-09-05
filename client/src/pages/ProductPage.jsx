import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import VariantSelector from '../components/VariantSelector';
import EMIPlanList from '../components/EMIPlanList';
import ProceedButton from '../components/ProceedButton';
import CheckoutModal from '../components/CheckoutModal';
import { getProductBySlug } from '../api/products';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchProduct() {
      try {
        const data = await getProductBySlug(slug);
        if (!ignore) {
          setProduct(data);
          setError(null);
          if (data.variants?.length > 0) {
            setSelectedVariant(data.variants[0]);
            // Auto-select recommended plan
            const recommended = data.variants[0].emiPlans?.find((p) => p.isRecommended);
            if (recommended) setSelectedPlan(recommended);
          }
        }
      } catch (err) {
        if (!ignore) {
          setError('Product not found');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [slug]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedPlan(null);
    // Auto-select recommended plan for new variant
    const recommended = variant.emiPlans?.find((p) => p.isRecommended);
    if (recommended) setSelectedPlan(recommended);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <div className="bg-gray-100 rounded-3xl h-96 animate-pulse" />
          </div>
          <div className="md:col-span-5 space-y-4">
            <div className="h-8 bg-gray-100 rounded-xl w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-100 rounded-xl w-1/2 animate-pulse" />
            <div className="h-10 bg-gray-100 rounded-xl w-1/3 animate-pulse" />
            <div className="space-y-3 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">😕</span>
        </div>
        <h2 className="text-xl font-bold text-[#121212] mb-2">Product not found</h2>
        <p className="text-gray-500 mb-6">The product you are looking for does not exist.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-xl py-2.5 px-5 bg-[#6C28D9] text-white font-semibold text-sm hover:bg-[#8852e1] transition-all"
        >
          &larr; Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pb-12">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/shop" className="text-gray-500 hover:text-[#6C28D9] transition-colors">
            Shop
          </Link>
          <span className="text-gray-300">/</span>
          <Link to="/shop" className="text-gray-500 hover:text-[#6C28D9] transition-colors">
            {product.category || 'Smartphones'}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#121212] font-semibold truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product layout */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left: Gallery */}
          <div className="md:col-span-7 relative">
            <div className="md:sticky md:top-24">
              <ProductGallery
                key={selectedVariant?.id || selectedVariant?.color}
                images={selectedVariant?.images || []}
                productName={product.name}
              />

              {/* LAMF Benefit Box under gallery on desktop */}
              <div className="hidden md:grid grid-cols-3 gap-3 mt-6 p-4 rounded-2xl bg-[#EFDAFF]/30 border border-[#B3A3BF]/30">
                <div className="text-center p-2">
                  <div className="text-xl mb-1">📈</div>
                  <div className="text-xs font-bold text-[#121212]">Keep Earning</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Folio stays invested</div>
                </div>
                <div className="text-center p-2 border-x border-[#B3A3BF]/30">
                  <div className="text-xl mb-1">⚡</div>
                  <div className="text-xs font-bold text-[#121212]">0% Interest</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">Flexible tenures</div>
                </div>
                <div className="text-center p-2">
                  <div className="text-xl mb-1">🛡️</div>
                  <div className="text-xs font-bold text-[#121212]">Zero Preclosure</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">No hidden charges</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="md:col-span-5 space-y-6">
            <div>
              {/* Brand */}
              <span className="text-xs font-bold text-[#6C28D9] uppercase tracking-wider bg-[#EFDAFF] px-2.5 py-0.5 rounded-full">
                {product.brand}
              </span>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#121212] mt-2 tracking-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
                    <span className="text-xs font-bold text-green-800">{product.rating}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-green-600">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">&bull; Verified Flagship</span>
                </div>
              )}

              {/* Price */}
              {selectedVariant && (
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-[#121212]">
                    {formatPrice(selectedVariant.price)}
                  </span>
                  {selectedVariant.mrp > selectedVariant.price && (
                    <>
                      <span className="text-base text-gray-400 line-through">
                        {formatPrice(selectedVariant.mrp)}
                      </span>
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                        {selectedVariant.discount}% off
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* EMI teaser */}
              {selectedVariant && selectedVariant.emiPlans?.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  From{' '}
                  <span className="font-bold text-[#6C28D9]">
                    {formatPrice(Math.min(...selectedVariant.emiPlans.map((p) => p.monthlyPayment)))}/month
                  </span>
                  {' '}with 0% interest on mutual funds
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 pt-5">
              {/* Variant Selector */}
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantChange={handleVariantChange}
              />
            </div>

            <div className="border-t border-gray-100 pt-5">
              {/* EMI Plans */}
              <EMIPlanList
                plans={selectedVariant?.emiPlans || []}
                selectedPlan={selectedPlan}
                onPlanSelect={setSelectedPlan}
              />
            </div>

            {/* Proceed Button */}
            <ProceedButton
              selectedPlan={selectedPlan}
              onProceed={() => setIsCheckoutOpen(true)}
            />

            {/* Trust badges */}
            <div className="pt-2 flex items-center justify-between gap-2 text-xs text-gray-500 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <span>🛡️</span>
                <span>AMFI Regulated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>⚡</span>
                <span>Zero Down Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>📦</span>
                <span>Express Delivery</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="border-t border-gray-100 pt-5">
                <h3 className="text-sm font-bold text-[#121212] mb-2">Product Overview</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
        variant={selectedVariant}
        plan={selectedPlan}
      />
    </div>
  );
}
