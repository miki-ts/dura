import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift, ChevronRight, Tag, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/currency';

export const CartSummary: React.FC = () => {
  const {
    subtotal,
    shipping,
    discount,
    total,
    giftNote,
    setGiftNote,
    promoCode,
    promoDiscountPercent,
    promoError,
    applyPromoCode,
    removePromoCode,
    items,
  } = useCart();

  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);
  const [tempNote, setTempNote] = useState(giftNote);
  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();

  const handleSaveNote = () => {
    setGiftNote(tempNote);
    setIsGiftNoteOpen(false);
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  return (
    <div className="bg-[#FFF9F4] border border-[#E7D9CC] px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg p-5 sm:p-6 shadow-soft space-y-6">
      {/* Gift Note Accordion / Toggle matching Figma "Add a gift note >" */}
      <div className="border-b border-[#E7D9CC]/70 pb-5">
        <button
          onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#30251F] group-hover:text-[#B89A75] transition-colors">
            <Gift className="w-4 h-4 text-[#B89A75]" />
            <span className="font-serif text-base">
              {giftNote ? 'Gift Note Added' : 'Add a gift note'}
            </span>
          </div>
          <ChevronRight
            className={`w-4 h-4 text-[#827166] transition-transform ${
              isGiftNoteOpen ? 'rotate-90 text-[#B89A75]' : ''
            }`}
          />
        </button>

        {isGiftNoteOpen && (
          <div className="mt-3 space-y-2 animate-in fade-in duration-200">
            <p className="text-xs text-[#827166]">
              Your handwritten note will be inscribed on our heavy cream cotton stationery.
            </p>
            <textarea
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              placeholder="Write your personal message here..."
              rows={3}
              maxLength={250}
              className="w-full bg-[#F9F2EB] border border-[#E7D9CC] px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg p-3 text-xs text-[#30251F] placeholder:text-[#827166]/60 focus:outline-none focus:border-[#B89A75]"
            />
            <div className="flex justify-between items-center text-[10px] text-[#827166]">
              <span>{250 - tempNote.length} characters left</span>
              <button
                onClick={handleSaveNote}
                className="px-4 py-1.5 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-xs font-medium hover:bg-[#96764F] transition-colors"
              >
                SAVE NOTE
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Promo Code Input */}
      <div className="border-b border-[#E7D9CC]/70 pb-5">
        {promoCode ? (
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#F1E4D8]/60 border border-[#B89A75]/30">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B89A75]" />
              <span className="text-xs font-medium text-[#30251F]">
                Code <strong className="font-mono">{promoCode}</strong> applied ({promoDiscountPercent}% off)
              </span>
            </div>
            <button
              onClick={removePromoCode}
              className="p-1 text-[#827166] hover:text-[#30251F]"
              aria-label="Remove promo code"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <form onSubmit={handlePromoSubmit} className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#827166] absolute left-3 top-3" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (try DURA10)"
                  className="w-full bg-[#F9F2EB] border border-[#E7D9CC]  rounded-lg pl-9 pr-3 py-2 text-xs text-[#30251F] uppercase placeholder:normal-case placeholder:text-[#827166]/60 focus:outline-none focus:border-[#B89A75]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg border border-[#B89A75] text-[#B89A75] hover:bg-[#B89A75] hover:text-[#FFF9F4] text-xs font-medium uppercase tracking-wider transition-colors"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-[11px] text-red-600 pl-1">{promoError}</p>
            )}
          </form>
        )}
      </div>

      {/* Totals Breakdown matching Figma */}
      <div className="space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between text-[#30251F]">
          <span>Order Summary</span>
          <span className="font-serif text-base">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-[#B89A75]">
            <span>Privilege Discount ({promoDiscountPercent}%)</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-[#827166]">
          <span>Insured Shipping</span>
          <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
        </div>

        <div className="pt-3 border-t border-[#E7D9CC] flex justify-between items-center text-base sm:text-lg font-serif font-medium text-[#30251F]">
          <span>Total</span>
          <span className="text-xl sm:text-2xl text-[#30251F]">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Primary Checkout Button */}
      <button
        onClick={() => navigate('/checkout')}
        disabled={items.length === 0}
        className="w-full py-3.5 sm:py-4 rounded-lg bg-[#B89A75] hover:bg-[#96764F] disabled:opacity-50 text-[#FFF9F4] text-sm uppercase tracking-widest font-medium transition-all shadow-card flex items-center justify-center gap-2"
      >
        <span>Checkout</span>
      </button>
    </div>
  );
};
