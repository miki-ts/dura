import React, { createContext, useContext, useState, useEffect } from 'react';
import { DeliveryInfo, PaymentMethodType, Order } from '../types/checkout';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface CheckoutContextType {
  delivery: DeliveryInfo;
  setDelivery: React.Dispatch<React.SetStateAction<DeliveryInfo>>;
  updateDeliveryField: (field: keyof DeliveryInfo, value: string) => void;
  errors: Partial<Record<keyof DeliveryInfo, string>>;
  validateDelivery: () => boolean;
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
  hasSentPayment: boolean;
  setHasSentPayment: (v: boolean) => void;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
  clearCheckout: () => void;
}

const DEFAULT_DELIVERY: DeliveryInfo = {
  firstName: 'Amina',
  lastName: 'Tesfaye',
  email: 'amina.tesfaye@example.com',
  phone: '+1 212 123 4567',
  country: 'United States',
  city: 'New York',
  state: 'NY',
  streetAddress: '123 Madison Ave',
  apartment: 'Apt 5A',
  postalCode: '10016',
};

const DELIVERY_STORAGE_KEY = 'dura_checkout_delivery';
const LAST_ORDER_KEY = 'dura_last_order';

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [delivery, setDelivery] = useState<DeliveryInfo>(() => {
    return getStorageItem<DeliveryInfo>(DELIVERY_STORAGE_KEY, DEFAULT_DELIVERY);
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('stripe');
  const [hasSentPayment, setHasSentPayment] = useState<boolean>(true);
  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryInfo, string>>>({});
  const [lastOrder, setLastOrderState] = useState<Order | null>(() => {
    return getStorageItem<Order | null>(LAST_ORDER_KEY, null);
  });

  useEffect(() => {
    setStorageItem(DELIVERY_STORAGE_KEY, delivery);
  }, [delivery]);

  const setLastOrder = (order: Order | null) => {
    setLastOrderState(order);
    if (order) {
      setStorageItem(LAST_ORDER_KEY, order);
    }
  };

  const updateDeliveryField = (field: keyof DeliveryInfo, value: string) => {
    setDelivery((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateDelivery = (): boolean => {
    const newErrors: Partial<Record<keyof DeliveryInfo, string>> = {};

    if (!delivery.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!delivery.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!delivery.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(delivery.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!delivery.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!delivery.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!delivery.city.trim()) newErrors.city = 'City is required';
    if (!delivery.state.trim()) newErrors.state = 'Region / State is required';
    if (!delivery.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearCheckout = () => {
    setDelivery(DEFAULT_DELIVERY);
    setErrors({});
  };

  return (
    <CheckoutContext.Provider
      value={{
        delivery,
        setDelivery,
        updateDeliveryField,
        errors,
        validateDelivery,
        paymentMethod,
        setPaymentMethod,
        hasSentPayment,
        setHasSentPayment,
        lastOrder,
        setLastOrder,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
