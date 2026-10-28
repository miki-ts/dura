import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { calculateOrderTotals } from '../utils/currency';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  giftNote: string;
  setGiftNote: (note: string) => void;
  promoCode: string;
  promoDiscountPercent: number;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'dura_luxury_cart';
const GIFT_KEY = 'dura_luxury_gift_note';

// Initial default matching the exact Figma cart screenshot (Total $440)
const DEFAULT_INITIAL_CART: CartItem[] = [
  {
    product: PRODUCTS[0], // Pearl Drop Earrings $150
    quantity: 1,
  },
  {
    product: PRODUCTS[4], // Timeless Pearl Necklace $290
    quantity: 1,
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    return getStorageItem<CartItem[]>(STORAGE_KEY, DEFAULT_INITIAL_CART);
  });

  const [giftNote, setGiftNoteState] = useState<string>(() => {
    return getStorageItem<string>(GIFT_KEY, '');
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    setStorageItem(STORAGE_KEY, items);
  }, [items]);

  useEffect(() => {
    setStorageItem(GIFT_KEY, giftNote);
  }, [giftNote]);

  const setGiftNote = (note: string) => {
    setGiftNoteState(note);
  };

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setGiftNoteState('');
    setPromoCode('');
    setPromoDiscountPercent(0);
  };

  const applyPromoCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setPromoError('Please enter a promo code');
      return false;
    }
    if (trimmed === 'DURA10' || trimmed === 'LIYA10') {
      setPromoCode(trimmed);
      setPromoDiscountPercent(10);
      setPromoError(null);
      return true;
    } else if (trimmed === 'VIP20') {
      setPromoCode(trimmed);
      setPromoDiscountPercent(20);
      setPromoError(null);
      return true;
    } else {
      setPromoError('Invalid promotion code. Try DURA10 or VIP20');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscountPercent(0);
    setPromoError(null);
  };

  const { subtotal, shipping, discount, total } = calculateOrderTotals(items, promoDiscountPercent);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        giftNote,
        setGiftNote,
        promoCode,
        promoDiscountPercent,
        promoError,
        applyPromoCode,
        removePromoCode,
        subtotal,
        shipping,
        discount,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
