import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useSearch } from '../../contexts/SearchContext';
import { formatPrice } from '../../utils/currency';

export const SearchDialog: React.FC = () => {
  const { isOpen, closeSearch, query, setQuery, results, recentSearches } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectProduct = (slug: string) => {
    closeSearch();
    navigate(`/shop/${slug}`);
  };

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#30251F]/40 backdrop-blur-sm transition-opacity" 
        onClick={closeSearch}
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 pt-12 sm:pt-20">
        <div 
          className="relative w-full max-w-2xl bg-[#FFF9F4] rounded-lg border border-[#E7D9CC] shadow-modal overflow-hidden z-10 transition-all animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header Input */}
          <div className="p-4 sm:p-6 border-b border-[#E7D9CC]/70 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#B89A75] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jewelry, pearls, rings, collections..."
              className="w-full bg-transparent text-[#30251F] text-base sm:text-lg placeholder:text-[#827166]/60 focus:outline-none font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-lg text-[#827166] hover:text-[#30251F] transition-colors"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={closeSearch}
              className="ml-2 text-xs uppercase tracking-wider font-medium text-[#827166] hover:text-[#30251F] px-2 py-1"
            >
              Close
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
            {!query.trim() ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#827166] font-medium mb-3 flex items-center gap-1.5">

                    Trending Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectTag(term)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-sans bg-[#F1E4D8] text-[#30251F] hover:bg-[#E7D9CC] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#827166] font-medium mb-3">
                    Popular Collections
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      { name: 'Bridal Radiance', slug: 'bridal-radiance' },
                      { name: 'Timeless Pearls', slug: 'timeless-pearls' },
                      { name: 'Golden Essentials', slug: 'golden-essentials' },
                      { name: 'Signature Gifts', slug: 'signature-gifts' },
                    ].map((col) => (
                      <button
                        key={col.slug}
                        onClick={() => {
                          closeSearch();
                          navigate(`/collections/${col.slug}`);
                        }}
                        className="text-left p-3 rounded-lg bg-[#F9F2EB] hover:bg-[#F1E4D8] text-[#30251F] font-serif transition-colors flex items-center justify-between"
                      >
                        <span>{col.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B89A75]" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div>
                <p className="text-xs text-[#827166] mb-4">
                  Found {results.length} piece{results.length > 1 ? 's' : ''} matching "{query}"
                </p>
                <div className="space-y-3">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="group flex items-center gap-4 p-2.5 rounded-lg hover:bg-[#F9F2EB] cursor-pointer transition-colors border border-transparent hover:border-[#E7D9CC]"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg bg-[#F1E4D8]"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#B89A75] font-medium">
                          {product.category}
                        </span>
                        <h5 className="font-serif text-base text-[#30251F] truncate group-hover:text-[#B89A75] transition-colors">
                          {product.name}
                        </h5>
                        <p className="text-xs text-[#827166]">{formatPrice(product.price)}</p>
                      </div>
                      <div className="text-xs text-[#B89A75] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform pr-2">
                        View
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="font-serif text-lg text-[#30251F]">No pieces found for "{query}"</p>
                <p className="text-xs text-[#827166] mt-1 max-w-xs mx-auto">
                  Try searching for pearl, earrings, gold, or explore our full collection in the shop.
                </p>
                <button
                  onClick={() => {
                    closeSearch();
                    navigate('/shop');
                  }}
                  className="mt-4 px-5 py-2 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-xs uppercase tracking-wider font-medium hover:bg-[#96764F] transition-colors"
                >
                  Browse All Jewelry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
