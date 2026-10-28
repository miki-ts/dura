import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/currency';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../ui/Toast';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'horizontal';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'grid' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const isSaved = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isSaved ? 'Removed from Wishlist' : 'Saved to Wishlist',
      product.name,
      'wishlist'
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    showToast('Added to Shopping Bag', `${product.name} (1 item)`, 'success');
  };

  if (variant === 'horizontal') {
    return (
      <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 transition-all hover:shadow-card group">
        <Link to={`/shop/${product.slug}`} className="w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-[#F1E4D8]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        <div className="flex-1 w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#B89A75] font-medium">
                {product.category}
              </span>
              <button
                onClick={handleWishlistClick}
                className="p-1.5 text-[#827166] hover:text-[#B89A75] transition-colors"
                aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#B89A75] text-[#B89A75]' : ''}`} />
              </button>
            </div>
            <Link to={`/shop/${product.slug}`}>
              <h3 className="font-serif text-lg text-[#30251F] group-hover:text-[#B89A75] transition-colors mt-0.5">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm font-sans font-medium text-[#827166] mt-1">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <button
              onClick={handleAddToCart}
              className="px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5"
            >
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col relative">
      {/* Product Image Box */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#F1E4D8] border border-[#E7D9CC]/60 shadow-sm">
        <Link to={`/shop/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#FFF9F4]/90 backdrop-blur-sm border border-[#E7D9CC]/80 flex items-center justify-center text-[#827166] hover:text-[#B89A75] transition-all duration-200 hover:scale-110 shadow-sm z-10"
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#B89A75] text-[#B89A75]' : ''}`} />
        </button>

        {/* Quick Add overlay button on hover (desktop) */}
        <div className="hidden sm:block absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleAddToCart}
            className=" w-full px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg bg-[#FFF9F4]/95 hover:bg-[#B89A75] hover:text-[#FFF9F4] text-[#30251F] text-xs uppercase tracking-wider font-medium shadow-card backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-1.5 "
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col">
        <Link to={`/shop/${product.slug}`} className="focus:outline-none">
          <h3 className="font-serif text-base sm:text-lg text-[#30251F] group-hover:text-[#B89A75] transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-sans font-medium text-[#827166] mt-0.5">
          {formatPrice(product.price)}
        </p>

        
      </div>
    </div>
  );
};
