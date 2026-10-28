import React, { useState } from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';
import { CreditCard, ShieldCheck, ArrowLeft, ArrowRight, Lock } from 'lucide-react';

interface PaymentSelectionProps {
  onBack: () => void;
  onNext: () => void;
}

export const PaymentSelection: React.FC<PaymentSelectionProps> = ({ onBack, onNext }) => {
  const { paymentMethod, setPaymentMethod } = useCheckout();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvc: '',
  });

  const handleContinue = () => {
    if (cardDetails.cardNumber && cardDetails.cardholderName && cardDetails.expiryDate && cardDetails.cvc) {
      onNext();
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-5 sm:p-8 shadow-soft space-y-6">
      <div className="border-b border-[#E7D9CC]/70 pb-4">
        <h2 className="font-serif text-2xl text-[#30251F]">Payment Details</h2>
        <p className="text-xs text-[#827166] mt-0.5">
          Secure payment powered by Stripe. Your card information is encrypted and secure.
        </p>
      </div>

      {/* Card Details Form */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F1E4D8]/60 border border-[#E7D9CC]">
          <CreditCard className="w-5 h-5 text-[#B89A75]" />
          <ShieldCheck className="w-5 h-5 text-[#B89A75]" />
          <span className="text-xs text-[#30251F]">SSL 256-bit Encrypted Payment</span>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#827166] mb-1.5">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: formatCardNumber(e.target.value) })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-sm text-[#30251F] focus:outline-none focus:border-[#B89A75] pr-12"
            />
            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#827166]" />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-[#827166] mb-1.5">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardDetails.cardholderName}
            onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
            placeholder="John Doe"
            className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-sm text-[#30251F] focus:outline-none focus:border-[#B89A75]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#827166] mb-1.5">
              Expiry Date
            </label>
            <input
              type="text"
              value={cardDetails.expiryDate}
              onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: formatExpiryDate(e.target.value) })}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-sm text-[#30251F] focus:outline-none focus:border-[#B89A75]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#827166] mb-1.5">
              CVC
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardDetails.cvc}
                onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/[^0-9]/g, '') })}
                placeholder="123"
                maxLength={4}
                className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg p-3 text-sm text-[#30251F] focus:outline-none focus:border-[#B89A75] pr-12"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#827166]" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="pt-4 border-t border-[#E7D9CC] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-[#E7D9CC] text-xs uppercase tracking-wider font-medium text-[#827166] hover:text-[#30251F] hover:bg-[#F1E4D8] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!cardDetails.cardNumber || !cardDetails.cardholderName || !cardDetails.expiryDate || !cardDetails.cvc}
          className="px-8 py-3.5 rounded-lg bg-[#B89A75] hover:bg-[#96764F] disabled:bg-[#827166] disabled:cursor-not-allowed text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-all shadow-card flex items-center gap-2"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
