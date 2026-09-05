export default function ProceedButton({ selectedPlan, onProceed, disabled = false }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const handleClick = () => {
    if (!selectedPlan) return;
    if (onProceed) {
      onProceed(selectedPlan);
    }
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 -mx-4 md:-mx-0 md:border-0 md:bg-transparent md:p-0 md:mt-6">
      <button
        onClick={handleClick}
        disabled={disabled || !selectedPlan}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-[14px] px-6 font-semibold text-base transition-all duration-100 ease-in-out ${
          disabled || !selectedPlan
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-[#6C28D9] text-white hover:bg-[#8852e1] hover:border-b-[4px] hover:border-b-[#5300d9]/90 active:bg-[#5c22a5]'
        }`}
      >
        {selectedPlan ? (
          <>
            Proceed with {formatPrice(selectedPlan.monthlyPayment)}/mo plan
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </>
        ) : (
          'Select an EMI plan to proceed'
        )}
      </button>
    </div>
  );
}
