import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCheckout } from '../contexts/CheckoutContext';
import { formatPrice } from '../utils/currency';

export const OrderSuccessPage: React.FC = () => {
  const { lastOrder, delivery } = useCheckout();

  // If user navigated directly, provide sample data matching the exact Figma screen 6:
  // Order #IR153720, Total $440, Amina
  const customerName = lastOrder?.delivery.firstName || delivery.firstName || 'Amina';
  const orderNumber = lastOrder?.orderNumber || 'IR153720';
  const totalAmount = lastOrder?.total || 440;
  const itemsCount = lastOrder?.items.length || 2;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* 1. Hero Gift Packaging Image matching Figma image 2 screen 6 */}
      <div className="relative rounded-lg overflow-hidden aspect-[16/10] sm:aspect-[16/9] w-full bg-[#F1E4D8] border border-[#E7D9CC] shadow-card">
        <img
          src="/assets/package.jpg"
          alt="Dura signature gift boxes with ribbons"
          className="w-full h-full object-cover"
        />
        
      </div>

      {/* 2. Main Confirmation Message matching Figma */}
      <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-6 sm:p-8 shadow-card text-center space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light">
          Thank you, {customerName}.
        </h1>
        <p className="text-xs sm:text-sm text-[#827166] max-w-md mx-auto leading-relaxed font-sans">
          Your order has been placed and is being prepared with care.
        </p>

        {/* Order Details Breakdown matching Figma screen 6 */}
        <div className="mt-6 pt-6 border-t border-[#E7D9CC] space-y-3 text-left">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#827166]">Total</span>
            <span className="font-serif text-base font-semibold text-[#30251F]">
              {formatPrice(totalAmount)}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-[#827166]">Order Details</span>
            <span className="font-sans text-xs text-[#827166]">
              {formatPrice(totalAmount)}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-[#827166]">Order Number</span>
            <span className="font-mono text-xs font-semibold text-[#30251F]">
              #{orderNumber}
            </span>
          </div>
        </div>

        
      </div>

      

      {/* 5. CTA Button */}
      <div className="pt-2 text-center">
        <Link
          to="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-all shadow-card hover:scale-105"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
