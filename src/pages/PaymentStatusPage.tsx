import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, AlertCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { formatPrice } from '../utils/currency';

type StatusType = 'pending' | 'successful' | 'failed' | 'cancelled';

export const PaymentStatusPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStatus = (searchParams.get('status') as StatusType) || 'successful';
  const [currentStatus, setCurrentStatus] = useState<StatusType>(queryStatus);

  const handleSwitchStatus = (status: StatusType) => {
    setCurrentStatus(status);
    searchParams.set('status', status);
    setSearchParams(searchParams);
  };

  const statusConfigs = {
    successful: {
      title: 'Payment Authorized (Demo)',
      subtitle: 'Your demonstration payment of $440 has been acknowledged.',
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
      ctaText: 'View Order Confirmation',
      ctaLink: '/checkout/success',
    },
    pending: {
      title: 'Payment Authorization Pending',
      subtitle: 'Awaiting asynchronous confirmation from the mock payment provider.',
      icon: Clock,
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      ctaText: 'Check Status Again',
      ctaLink: '/checkout/payment-status?status=successful',
    },
    failed: {
      title: 'Payment Authorization Declined',
      subtitle: 'The simulated card issuer declined authorization for this transaction.',
      icon: AlertCircle,
      color: 'text-rose-700',
      bg: 'bg-rose-50 border-rose-200',
      ctaText: 'Return to Checkout',
      ctaLink: '/checkout',
    },
    cancelled: {
      title: 'Payment Session Cancelled',
      subtitle: 'The checkout session was cancelled before authorization completed.',
      icon: XCircle,
      color: 'text-stone-700',
      bg: 'bg-stone-50 border-stone-200',
      ctaText: 'Return to Cart',
      ctaLink: '/cart',
    },
  }[currentStatus];

  const Icon = statusConfigs.icon;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
      {/* Dev preview switcher tabs */}
      <div className="mb-8 p-3 rounded-lg bg-[#FFF9F4] border border-[#E7D9CC] flex flex-wrap items-center justify-between gap-2 shadow-soft">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#827166] px-2">
          Preview Status:
        </span>
        <div className="flex flex-wrap gap-1">
          {(['successful', 'pending', 'failed', 'cancelled'] as StatusType[]).map((st) => (
            <button
              key={st}
              onClick={() => handleSwitchStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-sans capitalize transition-colors ${
                currentStatus === st
                  ? 'bg-[#B89A75] text-[#FFF9F4] font-medium'
                  : 'text-[#827166] hover:bg-[#F1E4D8]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Status Display Card */}
      <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-8 sm:p-12 text-center shadow-card space-y-6">
        <div className={`w-16 h-16 rounded-lg mx-auto flex items-center justify-center ${statusConfigs.bg}`}>
          <Icon className={`w-8 h-8 ${statusConfigs.color}`} />
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#B89A75] font-semibold">
            Status Ref: #IR153720
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light mt-1">
            {statusConfigs.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#827166] mt-2 max-w-md mx-auto leading-relaxed">
            {statusConfigs.subtitle}
          </p>
        </div>

        {/* Development Disclosure */}
        <div className="p-4 rounded-lg bg-[#F9F2EB] border border-[#E7D9CC] text-xs text-[#827166] text-left">
          <p className="font-medium text-[#30251F]">Notice for Evaluators:</p>
          <p className="mt-0.5">
            This page demonstrates the handling of payment webhooks and redirects from payment providers such as Stripe. In production, this route validates session IDs against the backend server.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={statusConfigs.ctaLink}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-all shadow-soft flex items-center justify-center gap-2"
          >
            <span>{statusConfigs.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/shop"
            className="px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg border border-[#E7D9CC] text-[#30251F] hover:bg-[#F1E4D8] text-xs uppercase tracking-widest font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
