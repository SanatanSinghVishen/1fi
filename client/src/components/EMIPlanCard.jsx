export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <button
      onClick={() => onSelect(plan)}
      className={`w-full text-left p-4 rounded-2xl border-[1.5px] transition-all duration-200 relative ${
        isSelected
          ? 'border-[#6C28D9] bg-[#6C28D9]/5 shadow-sm'
          : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      {/* Recommended badge */}
      {plan.isRecommended && (
        <div className="absolute -top-2.5 left-4">
          <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#6C28D9] to-[#a203d5] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Recommended
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        {/* Radio indicator */}
        <div className="mt-0.5 flex-shrink-0">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected ? 'border-[#6C28D9]' : 'border-gray-300'
            }`}
          >
            {isSelected && (
              <div className="w-2.5 h-2.5 rounded-full bg-[#6C28D9]" />
            )}
          </div>
        </div>

        {/* Plan details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold text-[#121212]">
              {formatPrice(plan.monthlyPayment)}
            </span>
            <span className="text-sm text-gray-500">/month</span>
          </div>

          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
              {plan.tenure} months
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                plan.interestRate === 0
                  ? 'text-green-700 bg-green-100'
                  : 'text-orange-700 bg-orange-100'
              }`}
            >
              {plan.interestRate === 0
                ? '0% interest'
                : `${plan.interestRate}% p.a.`}
            </span>
            {plan.provider && (
              <span className="text-xs text-gray-400">
                via {plan.provider}
              </span>
            )}
          </div>

          {/* Cashback badge */}
          {plan.cashback > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#6C28D9] bg-[#EFDAFF] px-2 py-0.5 rounded-full">
                🎁 {plan.cashbackLabel || `₹${plan.cashback.toLocaleString('en-IN')} cashback`}
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="text-right flex-shrink-0">
          <span className="text-xs text-gray-400 block">Total</span>
          <span className="text-sm font-semibold text-[#121212]">
            {formatPrice(plan.totalAmount)}
          </span>
        </div>
      </div>
    </button>
  );
}
