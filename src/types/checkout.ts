export interface DeliveryInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  state: string;
  streetAddress: string;
  apartment?: string;
  postalCode: string;
}

export type PaymentMethodType = 'stripe' | 'card' | 'bank_transfer' | 'dura_credit';

export interface CheckoutState {
  step: 'delivery' | 'payment' | 'review';
  delivery: DeliveryInfo;
  paymentMethod: PaymentMethodType;
  stripeConfirmed: boolean;
  notes?: string;
}

export interface Order {
  orderNumber: string;
  date: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  delivery: DeliveryInfo;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Order Placed' | 'Preparing' | 'Delivered';
}
