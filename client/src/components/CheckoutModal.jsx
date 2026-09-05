import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.API_URL || '';

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
  variant,
  plan,
}) {
  const [step, setStep] = useState('review'); // 'review' | 'otp' | 'success'
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [orderId] = useState(() => `1FI-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!isOpen || !product || !variant || !plan) return null;

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);

  const imageUrl = variant.images?.[0]
    ? `${API_BASE}${variant.images[0]}`
    : '/placeholder.png';

  // 2x safe portfolio margin required for lien
  const requiredLienPortfolio = Math.round(variant.price * 2);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');
    }, 800);
  };

  const handleReset = () => {
    setStep('review');
    setOtp('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-gray-100 overflow-hidden my-8">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#FAF8FC]">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="1Fi" className="w-6 h-6" />
            <span className="font-bold text-[#121212] text-sm">
              1Fi Mutual Fund Checkout
            </span>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* STEP 1: REVIEW PLAN */}
          {step === 'review' && (
            <div className="space-y-5">
              {/* Product Preview Card */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-[#EFDAFF]/30 border border-[#B3A3BF]/40">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-1 flex-shrink-0 border border-gray-100 shadow-xs">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm text-[#121212] truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                        style={{ backgroundColor: variant.colorHex || '#ccc' }}
                      />
                      {variant.color}
                    </span>
                    <span>&bull;</span>
                    <span>{variant.storage}</span>
                  </div>
                  <div className="text-sm font-bold text-[#121212] mt-1">
                    {formatPrice(variant.price)}
                  </div>
                </div>
              </div>

              {/* Selected Plan Details */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Selected Tenure</span>
                  <span className="font-semibold text-gray-900">{plan.tenure} Months</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Monthly Installment</span>
                  <span className="font-bold text-base text-[#6C28D9]">
                    {formatPrice(plan.monthlyPayment)}/mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Interest Rate</span>
                  <span className="font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                    {plan.interestRate === 0 ? '0% Zero Interest' : `${plan.interestRate}% p.a.`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Down Payment</span>
                  <span className="font-semibold text-gray-900">₹0 (Nil)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Processing Fee</span>
                  <span className="font-semibold text-gray-900">₹0 Free</span>
                </div>
                {plan.cashback > 0 && (
                  <div className="flex items-center justify-between text-xs text-[#6C28D9] pt-1 border-t border-gray-200">
                    <span className="font-medium">Special Cashback</span>
                    <span className="font-bold">🎁 {plan.cashbackLabel || `₹${plan.cashback}`}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200 font-bold text-gray-900">
                  <span>Total Payable</span>
                  <span>{formatPrice(plan.totalAmount)}</span>
                </div>
              </div>

              {/* LAMF Trust Banner */}
              <div className="p-3.5 rounded-2xl bg-[#6C28D9]/5 border border-[#6C28D9]/15 flex items-start gap-3">
                <div className="text-xl">📈</div>
                <div className="text-xs text-gray-600 leading-relaxed">
                  <span className="font-bold text-[#6C28D9] block mb-0.5">
                    Mutual Funds Continue Compounding
                  </span>
                  Lien of {formatPrice(requiredLienPortfolio)} portfolio units will be created. Units remain in your name and keep earning market returns.
                </div>
              </div>

              {/* Proceed to verification CTA */}
              <form onSubmit={handleSendOtp}>
                <div className="space-y-2 mb-4">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Registered Mobile (linked to KFin / CAMS)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm text-gray-500 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      pattern="[0-9]{10}"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6C28D9] focus:ring-2 focus:ring-[#6C28D9]/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 bg-[#6C28D9] text-white font-semibold text-sm hover:bg-[#8852e1] active:bg-[#5c22a5] hover:border-b-[3px] hover:border-b-[#5300d9]/90 transition-all cursor-pointer"
                >
                  Verify Mutual Fund Portfolio &rarr;
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 'otp' && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#EFDAFF] text-[#6C28D9] flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  🔐
                </div>
                <h3 className="font-bold text-lg text-[#121212]">
                  Authorize Mutual Fund Lien
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Enter the 4-digit verification code sent to +91 {phone} to link your mutual fund folio.
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <input
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 1234"
                    autoFocus
                    required
                    className="w-full tracking-widest text-center text-2xl font-bold py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#6C28D9] focus:ring-2 focus:ring-[#6C28D9]/20"
                  />
                  <p className="text-[11px] text-gray-400 text-center mt-1.5">
                    Demo Mode: Enter any 4 digits (e.g. 1234)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isVerifying || otp.length < 4}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-white font-semibold text-sm transition-all ${
                    isVerifying || otp.length < 4
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#6C28D9] hover:bg-[#8852e1] active:bg-[#5c22a5] cursor-pointer'
                  }`}
                >
                  {isVerifying ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Confirming Lien Marking...
                    </span>
                  ) : (
                    'Confirm & Pledge Mutual Funds'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('review')}
                  className="w-full text-xs text-gray-500 hover:text-gray-800 text-center py-1"
                >
                  &larr; Back to Order Details
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 'success' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto text-3xl animate-bounce">
                ✓
              </div>

              <div>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Order &amp; Lien Confirmed!
                </span>
                <h3 className="text-xl font-bold text-[#121212] mt-2">
                  Congratulations!
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Your 1Fi EMI plan has been approved with zero down payment. Your order is now being prepared for priority dispatch.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Reference</span>
                  <span className="font-mono font-bold text-gray-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Product</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[180px]">
                    {product.name} ({variant.storage})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Monthly EMI</span>
                  <span className="font-bold text-[#6C28D9]">
                    {formatPrice(plan.monthlyPayment)} &times; {plan.tenure} mos
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lien Status</span>
                  <span className="font-semibold text-green-700">Active (Earning Returns)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Delivery</span>
                  <span className="font-semibold text-gray-900">2-3 Business Days</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full rounded-xl py-3 px-4 bg-[#6C28D9] text-white font-semibold text-sm hover:bg-[#8852e1] transition-all cursor-pointer"
              >
                Back to Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
