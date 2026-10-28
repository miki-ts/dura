import React from 'react';
import { Check } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: 'delivery' | 'payment' | 'review';
  onStepClick?: (step: 'delivery' | 'payment' | 'review') => void;
}

export const CheckoutProgress: React.FC<CheckoutProgressProps> = ({
  currentStep,
  onStepClick,
}) => {
  const steps: { key: 'delivery' | 'payment' | 'review'; label: string }[] = [
    { key: 'delivery', label: 'Delivery' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ];

  const getStepStatus = (stepKey: 'delivery' | 'payment' | 'review') => {
    const order = ['delivery', 'payment', 'review'];
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 px-4">
      <div className="relative flex items-center justify-between">
        {/* Connecting Line */}
        <div className="absolute left-6 right-6 top-3.5 -translate-y-1/2 h-[2px] bg-[#E7D9CC] -z-0" />
        <div
          className="absolute left-6 top-3.5 -translate-y-1/2 h-[2px] bg-[#B89A75] transition-all duration-300 -z-0"
          style={{
            width:
              currentStep === 'delivery'
                ? '0%'
                : currentStep === 'payment'
                ? '50%'
                : '100%',
          }}
        />

        {steps.map((s) => {
          const status = getStepStatus(s.key);
          const isClickable = status === 'completed';

          return (
            <div
              key={s.key}
              onClick={() => isClickable && onStepClick && onStepClick(s.key)}
              className={`flex flex-col items-center relative z-10 ${
                isClickable ? 'cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                  status === 'completed'
                    ? 'bg-[#B89A75] text-[#FFF9F4]'
                    : status === 'current'
                    ? 'bg-[#B89A75] text-[#FFF9F4] ring-4 ring-[#B89A75]/20'
                    : 'bg-[#FFF9F4] border-2 border-[#E7D9CC] text-[#827166]'
                }`}
              >
                {status === 'completed' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <span className="w-2 h-2 rounded-lg bg-current" />
                )}
              </div>
              <span
                className={`text-[11px] font-sans mt-1.5 uppercase tracking-wider ${
                  status === 'current'
                    ? 'font-medium text-[#30251F]'
                    : 'text-[#827166]'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
