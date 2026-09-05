import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import VariantSelector from '../components/VariantSelector';
import EMIPlanList from '../components/EMIPlanList';
import ProceedButton from '../components/ProceedButton';
import { getProductBySlug } from '../api/products';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductBySlug(slug);
        setProduct(data);
        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
          // Auto-select recommended plan
          const recommended = data.variants[0].emiPlans?.find((p) => p.isRecommended);
          if (recommended) setSelectedPlan(recommended);
        }
      } catch (err) {
        setError('Product not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
            <div className="bg-gray-100 rounded-2xl h-96 animate-pulse" />
          </div>
          <div className="md:col-span-5 space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-100 rounded w-1/2 animate-pulse" />
            <div className="h-10 bg-gray-100 rounded w-1/3 animate-pulse" />
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
        <h2 className="text-xl font-semibold text-[#121212] mb-2">Product not found</h2>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-xl py-2.5 px-5 bg-[#6C28D9] text-white font-semibold text-sm hover:bg-[#8852e1] transition-all"
        >
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/shop" className="text-gray-500 hover:text-[#6C28D9] transition-colors">
            Shop
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-400">
            <path d="M9.25 6.25a.75.75 0 011.06 0l5.2 5.2a.75.75 0 010 1.1l-5.2 5.2a.75.75 0 01-1.06-1.06L13.94 12 9.25 7.31a.75.75 0 010-1.06z" />
          </svg>
          <Link to="/shop" className="text-gray-500 hover:text-[#6C28D9] transition-colors">
            {product.category}
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-400">
            <path d="M9.25 6.25a.75.75 0 011.06 0l5.2 5.2a.75.75 0 010 1.1l-5.2 5.2a.75.75 0 01-1.06-1.06L13.94 12 9.25 7.31a.75.75 0 010-1.06z" />
          </svg>
          <span className="text-[#121212] font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product layout */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {/* Left: Gallery */}
          <div className="md:col-span-7 relative">
            <div className="md:sticky md:top-24">
              <ProductGallery
                key={selectedVariant?.id || selectedVariant?.color}
                images={selectedVariant?.images || []}
                productName={product.name}
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="md:col-span-5">
            {/* Brand */}
            <span className="text-xs font-semibold text-[#6C28D9] uppercase tracking-wider">
              {product.brand}
            </span>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-semibold text-[#121212] mt-1 tracking-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-md">
                  <span className="text-sm font-semibold text-green-700">{product.rating}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-green-600">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Price */}
            {selectedVariant && (
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#121212]">
                  {formatPrice(selectedVariant.price)}
                </span>
                {selectedVariant.mrp > selectedVariant.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(selectedVariant.mrp)}
                    </span>
                    <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                      {selectedVariant.discount}% off
                    </span>
                  </>
                )}
              </div>
            )}

            {/* EMI teaser */}
            {selectedVariant && selectedVariant.emiPlans?.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Starting from{' '}
                <span className="font-semibold text-[#6C28D9]">
                  {formatPrice(Math.min(...selectedVariant.emiPlans.map((p) => p.monthlyPayment)))}/month
                </span>
                {' '}with 0% interest
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100 my-5" />

            {/* Variant Selector */}
            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />

            {/* Divider */}
            <div className="border-t border-gray-100 my-5" />

            {/* EMI Plans */}
            <EMIPlanList
              plans={selectedVariant?.emiPlans || []}
              selectedPlan={selectedPlan}
              onPlanSelect={setSelectedPlan}
            />

            {/* Proceed Button */}
            <ProceedButton selectedPlan={selectedPlan} />

            {/* Trust badges */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Secure Payment
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 7h6v6" />
                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                </svg>
                MF keeps growing
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
                Instant Approval
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-6 border-t border-gray-100 pt-5">
                <h3 className="text-sm font-semibold text-[#121212] mb-2">About this product</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
