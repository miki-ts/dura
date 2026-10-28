import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, User, MapPin, CreditCard, Lock, Sparkles } from 'lucide-react';
import { useCheckout } from '../contexts/CheckoutContext';
import { useCart } from '../contexts/CartContext';
import { CheckoutProgress } from '../components/checkout/CheckoutProgress';
import { DeliveryForm } from '../components/checkout/DeliveryForm';
import { PaymentSelection } from '../components/checkout/PaymentSelection';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { formatPrice } from '../utils/currency';
import { Order } from '../types/checkout';

export const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState<'delivery' | 'payment' | 'review'>('delivery');
  const { delivery, paymentMethod, setLastOrder } = useCheckout();
  const { items, subtotal, shipping, discount, total, clearCart } = useCart();
  const navigate = useNavigate();

  // If cart is empty, prompt user to add items
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl text-[#30251F]">Your Bag is Empty</h2>
        <p className="text-sm text-[#827166] mt-2">Please select fine jewelry pieces before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block px-8 py-3.5 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-xs uppercase tracking-widest font-medium"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    // Generate order matching Figma sample IR153720
    const newOrder: Order = {
      orderNumber: 'IR153720',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: items.map((i) => ({
        productName: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        image: i.product.images[0],
      })),
      delivery,
      paymentMethod:
        paymentMethod === 'stripe'
          ? 'Stripe Checkout (Visa 4242)'
          : paymentMethod === 'card'
          ? 'Visa •••• 4242'
          : paymentMethod === 'bank_transfer'
          ? 'Manual Bank Transfer'
          : 'DURA Gift Credit',
      subtotal,
      shipping,
      discount,
      total,
      status: 'Preparing',
    };

    setLastOrder(newOrder);
    clearCart();
    navigate('/checkout/success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Title */}
      <div className="text-center max-w-md mx-auto mb-2">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A75] font-semibold">
          Luxury Fine Jewelry
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light mt-0.5">
          Checkout
        </h1>
      </div>

      {/* 3-Step Progress Stepper */}
      <CheckoutProgress currentStep={step} onStepClick={(s) => setStep(s)} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        {/* Step Content */}
        <div className="lg:col-span-7">
          {step === 'delivery' && (
            <DeliveryForm onNext={() => setStep('payment')} />
          )}

          {step === 'payment' && (
            <PaymentSelection
              onBack={() => setStep('delivery')}
              onNext={() => setStep('review')}
            />
          )}

          {step === 'review' && (
            <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-5 sm:p-8 shadow-soft space-y-6">
              <div className="border-b border-[#E7D9CC]/70 pb-4">
                <h2 className="font-serif text-2xl text-[#30251F]">Review & Confirmation</h2>
                <p className="text-xs text-[#827166] mt-0.5">
                  Please confirm your delivery address and payment authorization before placing your reservation.
                </p>
              </div>

              {/* Delivery Address Card matching Figma image 2 screen 1 & 4 */}
              <div className="p-4 sm:p-5 rounded-lg bg-[#F9F2EB] border border-[#E7D9CC] flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#F1E4D8] text-[#B89A75] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs leading-relaxed">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#827166]">
                      Delivery Destination
                    </span>
                    <h4 className="font-serif text-base text-[#30251F] font-medium mt-0.5">
                      {delivery.firstName} {delivery.lastName}
                    </h4>
                    <p className="text-[#827166]">{delivery.phone}</p>
                    <p className="text-[#30251F] font-medium mt-1">
                      {delivery.streetAddress} {delivery.apartment ? `, ${delivery.apartment}` : ''}
                    </p>
                    <p className="text-[#827166]">{delivery.city}, {delivery.state} {delivery.postalCode}</p>
                    <p className="text-[#827166]">{delivery.country}</p>
                  </div>
                </div>

                <button
                  onClick={() => setStep('delivery')}
                  className="text-xs text-[#B89A75] hover:underline uppercase tracking-wider font-medium flex-shrink-0"
                >
                  Edit
                </button>
              </div>

              {/* Payment Method Card matching Figma image 2 screen 1 & 4 */}
              <div className="p-4 sm:p-5 rounded-lg bg-[#F9F2EB] border border-[#E7D9CC] flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#F1E4D8] text-[#B89A75] flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="text-xs leading-relaxed">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#827166]">
                      Selected Payment
                    </span>
                    <h4 className="font-serif text-base text-[#30251F] font-medium mt-0.5">
                      {paymentMethod === 'stripe'
                        ? 'Stripe Checkout (Visa 4242)'
                        : paymentMethod === 'card'
                        ? 'Visa •••• 4242 (International)'
                        : paymentMethod === 'bank_transfer'
                        ? 'Manual Bank Wire'
                        : 'DURA Gift Credit'}
                    </h4>
                    <p className="text-[#827166] mt-0.5 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#B89A75]" />
                      <span>256-bit Encrypted Demonstration Flow</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="text-xs text-[#B89A75] hover:underline uppercase tracking-wider font-medium flex-shrink-0"
                >
                  Edit
                </button>
              </div>

              

              {/* Navigation Actions */}
              <div className="pt-4 border-t border-[#E7D9CC] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="px-6 py-3 rounded-lg border border-[#E7D9CC] text-xs uppercase tracking-wider font-medium text-[#827166] hover:text-[#30251F] hover:bg-[#F1E4D8] transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-all shadow-card flex items-center gap-2"
                >
                  <span>Confirm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
