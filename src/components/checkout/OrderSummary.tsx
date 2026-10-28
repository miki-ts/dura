import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useCheckout } from '../../contexts/CheckoutContext';
import { formatPrice } from '../../utils/currency';
import { Gift, ShieldCheck } from 'lucide-react';

export const OrderSummary: React.FC = () => {
  const { items, subtotal, shipping, discount, total, promoDiscountPercent, giftNote } = useCart();
  const { delivery } = useCheckout();

  return (
    <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-5 sm:p-6 shadow-soft space-y-6">
      <div className="border-b border-[#E7D9CC]/70 pb-3 flex items-center justify-between">
        <h3 className="font-serif text-xl text-[#30251F]">Order Summary</h3>
        <span className="text-xs text-[#827166]">{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Item List */}
      <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-3">
            <div className="relative w-14 h-14 px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg overflow-hidden bg-[#F1E4D8] flex-shrink-0 border border-[#E7D9CC]/60">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-[10px] font-bold flex items-center justify-center font-sans">
                {quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-serif text-sm text-[#30251F] truncate font-medium">
                {product.name}
              </h5>
              <p className="text-xs text-[#827166] mt-0.5">
                Qty {quantity} × {formatPrice(product.price)}
              </p>
            </div>
            <div className="text-right text-xs font-serif font-medium text-[#30251F]">
              {formatPrice(product.price * quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Gift note indicator if present */}
      {giftNote && (
        <div className="p-3 rounded-lg bg-[#F9F2EB] border border-[#E7D9CC] flex items-start gap-2.5 text-xs text-[#30251F]">
          <Gift className="w-4 h-4 text-[#B89A75] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-medium">Gift Note Attached:</span>
            <p className="text-[#827166] italic mt-0.5 font-serif text-xs line-clamp-2">"{giftNote}"</p>
          </div>
        </div>
      )}

      {/* Breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-[#E7D9CC] text-xs">
        <div className="flex justify-between text-[#827166]">
          <span>Subtotal</span>
          <span className="font-serif text-sm text-[#30251F]">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-[#B89A75]">
            <span>Privilege Discount ({promoDiscountPercent}%)</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-[#827166]">
          <span>Insured Packaging & Delivery</span>
          <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
        </div>

        <div className="pt-3 border-t border-[#E7D9CC] flex justify-between items-center text-base font-serif font-semibold text-[#30251F]">
          <span>Total</span>
          <span className="text-xl text-[#30251F]">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Delivery preview if firstName provided */}
      {delivery.firstName && (
        <div className="pt-2 text-[11px] text-[#827166] border-t border-[#E7D9CC]/50">
          <p className="font-medium text-[#30251F]">Delivering to:</p>
          <p className="truncate">{delivery.firstName} {delivery.lastName}</p>
          <p className="truncate">{delivery.streetAddress}, {delivery.city}</p>
        </div>
      )}

      {/* Packaging assurance */}
      <div className="text-[11px] text-[#827166] flex items-center justify-center gap-1.5 pt-2 border-t border-[#E7D9CC]/40">
        
        <span>Dura Signature Box Included</span>
      </div>
    </div>
  );
};
