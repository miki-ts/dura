import { CartItem } from '../types/cart';

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateShipping(subtotal: number): number {
  if (subtotal === 0) return 0;
  // Complimentary insured shipping on luxury orders over $300, or $0 for demo
  return subtotal >= 300 ? 0 : 25;
}

export function calculateDiscount(subtotal: number, discountPercent = 0): number {
  if (discountPercent <= 0) return 0;
  return Math.round((subtotal * discountPercent) / 100);
}

export function calculateOrderTotals(items: CartItem[], discountPercent = 0) {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const discount = calculateDiscount(subtotal, discountPercent);
  const total = Math.max(0, subtotal - discount + shipping);

  return {
    subtotal,
    shipping,
    discount,
    total,
  };
}
