import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/cart';
import { formatPrice } from '../../utils/currency';
import { QuantitySelector } from '../products/QuantitySelector';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-4 sm:p-5 flex items-center justify-between gap-4 shadow-soft">
      {/* Product Image and Details */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <Link
          to={`/shop/${product.slug}`}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[#F1E4D8] flex-shrink-0 border border-[#E7D9CC]/60"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </Link>

        <div className="min-w-0">
          <Link to={`/shop/${product.slug}`}>
            <h4 className="font-serif text-base sm:text-lg text-[#30251F] hover:text-[#B89A75] transition-colors truncate">
              {product.name}
            </h4>
          </Link>
          <p className="text-xs sm:text-sm font-sans font-medium text-[#827166] mt-0.5">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>

      {/* Quantity & Remove */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <QuantitySelector
          quantity={quantity}
          onDecrease={() => updateQuantity(product.id, quantity - 1)}
          onIncrease={() => updateQuantity(product.id, quantity + 1)}
          size="sm"
        />

        <button
          onClick={() => removeItem(product.id)}
          className="p-1.5 text-[#827166] hover:text-red-700 transition-colors rounded-lg"
          aria-label={`Remove ${product.name} from bag`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
