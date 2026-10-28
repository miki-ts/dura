import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';

export const CartPage: React.FC = () => {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-lg bg-[#FFF9F4] border border-[#E7D9CC] flex items-center justify-center text-[#B89A75] mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#827166] mt-2 max-w-sm mx-auto font-sans">
          Discover our luminous freshwater pearls and warm 18k gold collections.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-all shadow-card"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Title matching Figma screen 6 */}
      <div className="flex items-center justify-between border-b border-[#E7D9CC] pb-4 mb-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A75] font-semibold">
            Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light mt-1">
            Shopping Bag ({items.length})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#827166] hover:text-[#30251F] hover:underline uppercase tracking-wider"
        >
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}

          <div className="pt-4 flex justify-between items-center text-xs text-[#827166]">
            <Link to="/shop" className="hover:text-[#30251F] flex items-center gap-1">
              <span>← Continue Shopping</span>
            </Link>
            <span>Complimentary insured shipping applies</span>
          </div>
        </div>

        {/* Cart Summary Card */}
        <div className="lg:col-span-5">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};
