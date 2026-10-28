import React from 'react';
import { useCheckout } from '../../contexts/CheckoutContext';
import { ArrowRight, Lock } from 'lucide-react';

interface DeliveryFormProps {
  onNext: () => void;
}

export const DeliveryForm: React.FC<DeliveryFormProps> = ({ onNext }) => {
  const { delivery, updateDeliveryField, errors, validateDelivery } = useCheckout();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDelivery()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-5 sm:p-8 shadow-soft space-y-6">
      <div className="border-b border-[#E7D9CC]/70 pb-4 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#30251F]">Delivery Details</h2>
          <p className="text-xs text-[#827166] mt-0.5">
            Please enter your residential delivery destination for insured transit.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#827166]">
          <Lock className="w-3.5 h-3.5 text-[#B89A75]" />
          <span>Encrypted</span>
        </div>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
            First Name *
          </label>
          <input
            type="text"
            value={delivery.firstName}
            onChange={(e) => updateDeliveryField('firstName', e.target.value)}
            placeholder="Amina"
            className={`w-full bg-[#F9F2EB] border ${
              errors.firstName ? 'border-red-400' : 'border-[#E7D9CC]'
            } rounded-lg px-4 py-3 text-sm text-[#30251F] placeholder:text-[#827166]/50 focus:outline-none focus:border-[#B89A75] transition-colors`}
          />
          {errors.firstName && (
            <p className="text-[11px] text-red-600 mt-1 pl-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
            Last Name *
          </label>
          <input
            type="text"
            value={delivery.lastName}
            onChange={(e) => updateDeliveryField('lastName', e.target.value)}
            placeholder="Tesfaye"
            className={`w-full bg-[#F9F2EB] border ${
              errors.lastName ? 'border-red-400' : 'border-[#E7D9CC]'
            } rounded-lg px-4 py-3 text-sm text-[#30251F] placeholder:text-[#827166]/50 focus:outline-none focus:border-[#B89A75] transition-colors`}
          />
          {errors.lastName && (
            <p className="text-[11px] text-red-600 mt-1 pl-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            value={delivery.email}
            onChange={(e) => updateDeliveryField('email', e.target.value)}
            placeholder="amina.tesfaye@example.com"
            className={`w-full bg-[#F9F2EB] border ${
              errors.email ? 'border-red-400' : 'border-[#E7D9CC]'
            } rounded-lg px-4 py-3 text-sm text-[#30251F] placeholder:text-[#827166]/50 focus:outline-none focus:border-[#B89A75] transition-colors`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-600 mt-1 pl-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            value={delivery.phone}
            onChange={(e) => updateDeliveryField('phone', e.target.value)}
            placeholder="+1 212 123 4567"
            className={`w-full bg-[#F9F2EB] border ${
              errors.phone ? 'border-red-400' : 'border-[#E7D9CC]'
            } rounded-lg px-4 py-3 text-sm text-[#30251F] placeholder:text-[#827166]/50 focus:outline-none focus:border-[#B89A75] transition-colors`}
          />
          {errors.phone && (
            <p className="text-[11px] text-red-600 mt-1 pl-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Street Address */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
          Street Address *
        </label>
        <input
          type="text"
          value={delivery.streetAddress}
          onChange={(e) => updateDeliveryField('streetAddress', e.target.value)}
          placeholder="123 Madison Ave"
          className={`w-full bg-[#F9F2EB] border ${
            errors.streetAddress ? 'border-red-400' : 'border-[#E7D9CC]'
          } rounded-lg px-4 py-3 text-sm text-[#30251F] placeholder:text-[#827166]/50 focus:outline-none focus:border-[#B89A75] transition-colors`}
        />
        {errors.streetAddress && (
          <p className="text-[11px] text-red-600 mt-1 pl-1">{errors.streetAddress}</p>
        )}
      </div>

      {/* Apartment / Suite */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
          Apartment, Suite, Unit (Optional)
        </label>
        <input
          type="text"
          value={delivery.apartment || ''}
          onChange={(e) => updateDeliveryField('apartment', e.target.value)}
          placeholder="Apt 5A"
          className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg px-4 py-3 text-sm text-[#30251F] placeholder:text-[#827166]/50 focus:outline-none focus:border-[#B89A75] transition-colors"
        />
      </div>

      {/* City, State, Postal Code, Country */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
            City *
          </label>
          <input
            type="text"
            value={delivery.city}
            onChange={(e) => updateDeliveryField('city', e.target.value)}
            placeholder="New York"
            className={`w-full bg-[#F9F2EB] border ${
              errors.city ? 'border-red-400' : 'border-[#E7D9CC]'
            } rounded-lg px-4 py-3 text-sm text-[#30251F] placeholder:text-[#827166]/50 focus:outline-none focus:border-[#B89A75] transition-colors`}
          />
          {errors.city && (
            <p className="text-[11px] text-red-600 mt-1 pl-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
            State / Region *
          </label>
          <input
            type="text"
            value={delivery.state}
            onChange={(e) => updateDeliveryField('state', e.target.value)}
            placeholder="NY"
            className={`w-full bg-[#F9F2EB] border ${
              errors.state ? 'border-red-400' : 'border-[#E7D9CC]'
            } rounded-lg px-4 py-3 text-sm text-[#30251F] placeholder:text-[#827166]/50 focus:outline-none focus:border-[#B89A75] transition-colors`}
          />
          {errors.state && (
            <p className="text-[11px] text-red-600 mt-1 pl-1">{errors.state}</p>
          )}
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
            Postal Code *
          </label>
          <input
            type="text"
            value={delivery.postalCode}
            onChange={(e) => updateDeliveryField('postalCode', e.target.value)}
            placeholder="10016"
            className={`w-full bg-[#F9F2EB] border ${
              errors.postalCode ? 'border-red-400' : 'border-[#E7D9CC]'
            } rounded-lg px-4 py-3 text-sm text-[#30251F] placeholder:text-[#827166]/50 focus:outline-none focus:border-[#B89A75] transition-colors`}
          />
          {errors.postalCode && (
            <p className="text-[11px] text-red-600 mt-1 pl-1">{errors.postalCode}</p>
          )}
        </div>
      </div>

      {/* Country Select */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-medium text-[#827166] mb-1.5">
          Country
        </label>
        <select
          value={delivery.country}
          onChange={(e) => updateDeliveryField('country', e.target.value)}
          className="w-full bg-[#F9F2EB] border border-[#E7D9CC] rounded-lg px-4 py-3 text-sm text-[#30251F] focus:outline-none focus:border-[#B89A75]"
        >
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="France">France</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-all shadow-card flex items-center justify-center gap-2"
        >
          <span>Continue to Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
