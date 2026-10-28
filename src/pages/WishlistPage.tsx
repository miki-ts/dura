import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../components/ui/Toast';
import { formatPrice } from '../utils/currency';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddSingleToBag = (product: any) => {
    addItem(product, 1);
    removeFromWishlist(product.id);
    showToast('Added to Bag', product.name, 'success');
  };

  const handleAddAllToBag = () => {
    wishlist.forEach((prod) => {
      addItem(prod, 1);
    });
    clearWishlist();
    showToast('All Saved Pieces Added to Bag', `${wishlist.length} items`, 'success');
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-lg bg-[#FFF9F4] border border-[#E7D9CC] flex items-center justify-center text-[#B89A75] mx-auto mb-4">
          <Heart className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#827166] mt-2 max-w-sm mx-auto font-sans">
          Curate your personal collection of fine jewelry. Click the heart icon on any piece to save it for later contemplation.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-all shadow-card"
          >
            <span>Explore the Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E7D9CC] pb-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A75] font-semibold">
            Personal Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light mt-1">
            Saved Pieces ({wishlist.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddAllToBag}
            className="px-6 py-2.5 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-wider font-medium transition-colors shadow-soft flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add All to Bag</span>
          </button>
          <button
            onClick={clearWishlist}
            className="px-4 py-2.5 rounded-lg border border-[#E7D9CC] text-[#827166] hover:text-[#30251F] hover:bg-[#F1E4D8] text-xs uppercase tracking-wider font-medium transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Grid of Saved Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-3 sm:p-4 shadow-soft flex flex-col justify-between group hover:shadow-card transition-all"
          >
            <div>
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F1E4D8] mb-3">
                <Link to={`/shop/${product.slug}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-[#FFF9F4]/90 border border-[#E7D9CC] flex items-center justify-center text-[#827166] hover:text-red-700 transition-colors shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[9px] uppercase tracking-wider text-[#B89A75] font-medium">
                {product.category}
              </span>
              <Link to={`/shop/${product.slug}`}>
                <h3 className="font-serif text-base text-[#30251F] group-hover:text-[#B89A75] transition-colors truncate mt-0.5">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs font-sans font-medium text-[#827166] mt-1">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E7D9CC]/60">
              <button
                onClick={() => handleAddSingleToBag(product)}
                className="w-full py-2 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-[11px] uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
