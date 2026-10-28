import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  variant?: 'grid' | 'horizontal';
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  variant = 'grid',
  emptyMessage = 'No jewelry pieces match your current criteria.',
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-8">
        <p className="font-serif text-xl text-[#30251F]">{emptyMessage}</p>
        <p className="text-xs text-[#827166] mt-2">
          Try adjusting your filters or search keywords.
        </p>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="horizontal" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} variant="grid" />
      ))}
    </div>
  );
};
