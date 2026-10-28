import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  max = 99,
  size = 'md',
}) => {
  const isSm = size === 'sm';

  return (
    <div className={`inline-flex items-center justify-between bg-[#F1E4D8]/60 border border-[#E7D9CC] rounded-lg ${isSm ? 'px-2 py-1' : 'px-3 py-1.5'}`}>
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`text-[#30251F] hover:text-[#B89A75] disabled:opacity-40 disabled:hover:text-[#30251F] p-1 rounded-lg transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>

      <span className={`font-sans font-medium text-[#30251F] text-center select-none ${isSm ? 'w-6 text-xs' : 'w-8 text-sm'}`}>
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`text-[#30251F] hover:text-[#B89A75] disabled:opacity-40 disabled:hover:text-[#30251F] p-1 rounded-lg transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>
    </div>
  );
};
