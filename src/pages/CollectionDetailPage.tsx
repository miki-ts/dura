import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { COLLECTIONS } from '../data/collections';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../components/ui/Toast';

export const CollectionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const collection = COLLECTIONS.find((c) => c.slug === slug);
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);

  if (!collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl text-[#30251F]">Collection Not Found</h2>
        <p className="text-sm text-[#827166] mt-2">The selected collection does not exist.</p>
        <Link
          to="/collections"
          className="mt-6 inline-block px-8 py-3 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-xs uppercase tracking-wider"
        >
          View All Collections
        </Link>
      </div>
    );
  }

  // Products belonging to collection
  const collectionProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.collectionSlug === collection.slug);
    // If fewer than 2 items, complement with related items so user has rich catalog
    if (list.length < 3) {
      const extra = PRODUCTS.filter((p) => p.collectionSlug !== collection.slug).slice(0, 3 - list.length);
      list = [...list, ...extra];
    }

    if (sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }, [collection.slug, sort]);

  // "Shop the Look" bundle handler (matches Figma image 2 screen 3 button "Shop the Look")
  const handleShopTheLook = () => {
    const bundleItems = collectionProducts.slice(0, 2);
    bundleItems.forEach((item) => {
      addItem(item, 1);
    });
    showToast(
      'Curated Look Added to Bag',
      `${bundleItems.length} pieces from ${collection.name}`,
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/collections')}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#827166] hover:text-[#30251F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Collections</span>
        </button>
      </div>

      {/* Hero Banner matching Figma image 2 screen 3 */}
      <div className="relative rounded-lg sm:rounded-lg overflow-hidden aspect-[4/3] sm:aspect-[21/9] w-full bg-[#F1E4D8] border border-[#E7D9CC] shadow-card">
        <img
          src={collection.heroImage}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#30251F]/80 via-[#30251F]/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 text-[#FFF9F4]">
          
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FFF9F4] font-light tracking-wide">
            {collection.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#F9F2EB]/90 mt-2 max-w-xl font-sans">
            {collection.subtitle}
          </p>
        </div>
      </div>

      
      {/* Collection Catalog Grid with Sort Control */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E7D9CC] pb-4">
          <h2 className="font-serif text-xl sm:text-2xl text-[#30251F]">
            Pieces in this Collection ({collectionProducts.length})
          </h2>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="px-4 py-2 rounded-lg border border-[#E7D9CC] bg-[#FFF9F4] text-xs font-sans text-[#30251F] flex items-center gap-2 hover:border-[#B89A75] transition-colors"
            >
              <span>Sort: {sort === 'price-asc' ? 'Price: Low' : sort === 'price-desc' ? 'Price: High' : 'Featured'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#827166]" />
            </button>

            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setIsSortOpen(false)} />
                <div className="absolute right-0 mt-2 w-44 bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg shadow-modal py-2 z-30">
                  {[
                    { label: 'Featured', value: 'featured' },
                    { label: 'Price: Low to High', value: 'price-asc' },
                    { label: 'Price: High to Low', value: 'price-desc' },
                  ].map((s) => (
                    <button
                      key={s.value}
                      onClick={() => {
                        setSort(s.value as any);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F1E4D8]/60 transition-colors text-[#30251F]"
                    >
                      <span className={sort === s.value ? 'font-semibold text-[#B89A75]' : ''}>
                        {s.label}
                      </span>
                      {sort === s.value && <Check className="w-3.5 h-3.5 text-[#B89A75]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <ProductGrid products={collectionProducts} />
      </div>
    </div>
  );
};
