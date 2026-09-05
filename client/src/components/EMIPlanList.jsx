import EMIPlanCard from './EMIPlanCard';

export default function EMIPlanList({ plans = [], selectedPlan, onPlanSelect }) {
  if (!plans.length) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-[#121212] mb-3">
        Choose your EMI plan
      </h3>
      <div className="space-y-3">
        {plans.map((plan) => (
          <EMIPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan?.id === plan.id}
            onSelect={onPlanSelect}
          />
        ))}
      </div>
    </div>
  );
}
