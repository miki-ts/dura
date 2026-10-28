import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { PRODUCTS, getProductBySlug } from '../data/products';
import { formatPrice } from '../utils/currency';
import { ProductGallery } from '../components/products/ProductGallery';
import { QuantitySelector } from '../components/products/QuantitySelector';
import { Accordion } from '../components/ui/Accordion';
import { ProductGrid } from '../components/products/ProductGrid';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useToast } from '../components/ui/Toast';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl text-[#30251F]">Jewelry Piece Not Found</h2>
        <p className="text-sm text-[#827166] mt-2">The requested piece may have retired or moved.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block px-8 py-3 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-xs uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    showToast(
      'Added to Shopping Bag',
      `${quantity} × ${product.name}`,
      'success'
    );
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(
      isSaved ? 'Removed from Wishlist' : 'Saved to Wishlist',
      product.name,
      'wishlist'
    );
  };

  // Related products from same collection or category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collectionSlug === product.collectionSlug)
  ).slice(0, 4);

  const accordionItems = [
    {
      id: 'details',
      title: 'Details',
      content: (
        <ul className="list-disc pl-4 space-y-1.5">
          {product.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
          <li>Material: {product.material}</li>
        </ul>
      ),
    },
    {
      id: 'care',
      title: 'Jewelry Care',
      content: (
        <ul className="list-disc pl-4 space-y-1.5">
          {product.care.map((c, idx) => (
            <li key={idx}>{c}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'delivery',
      title: 'Delivery & Returns',
      content: (
        <p className="leading-relaxed">
          {product.deliveryReturns}
        </p>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Back button and breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#827166] hover:text-[#30251F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <nav className="text-xs text-[#827166] space-x-1 font-serif">
          <Link to="/" className="hover:text-[#B89A75]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#B89A75]">Shop</Link>
          <span>/</span>
          <span className="text-[#30251F] font-medium">{product.category}</span>
        </nav>
      </div>

      {/* Main Product Layout matching Figma screen 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery (Figma large box image) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Product Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89A75] font-semibold">
              {product.collection}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light mt-1">
              {product.name}
            </h1>
            <p className="font-sans text-xl sm:text-2xl font-medium text-[#30251F] mt-2">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-sm text-[#827166] leading-relaxed font-sans italic border-l-2 border-[#B89A75] pl-4 py-1">
            "{product.description}"
          </p>

          {/* Quantity & Actions matching Figma */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider font-medium text-[#827166]">
                Quantity
              </span>
              <QuantitySelector
                quantity={quantity}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                onIncrease={() => setQuantity((q) => q + 1)}
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs sm:text-sm uppercase tracking-widest font-medium transition-all shadow-card flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                className={`p-4 rounded-lg border transition-all ${
                  isSaved
                    ? 'border-[#B89A75] bg-[#F1E4D8] text-[#B89A75]'
                    : 'border-[#E7D9CC] bg-[#FFF9F4] text-[#827166] hover:text-[#B89A75]'
                }`}
                aria-label={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#B89A75]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Luxury Highlights */}
          <div className="grid grid-cols-2 gap-3 py-4 border-y border-[#E7D9CC]/70 text-xs text-[#827166]">
            <div className="flex items-center gap-2">
              
              <span>Signature Gift Box Included</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Complimentary Insured Transit</span>
            </div>
          </div>

          {/* Accordions matching Figma screen 3 (Details, Care, Delivery & Returns) */}
          <div className="pt-2">
            <Accordion items={accordionItems} defaultOpenId="details" />
          </div>
        </div>
      </div>

      {/* Related Pieces */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E7D9CC]">
          <div className="text-center max-w-md mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89A75] font-semibold">
              Harmonious Complements
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#30251F] font-light mt-1">
              You May Also Adore
            </h2>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};
