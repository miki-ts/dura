import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import { ProductCategory } from '../../types/product';
import { COLLECTIONS } from '../../data/collections';

interface FilterPanelProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedCollection: string;
  onSelectCollection: (col: string) => void;
  selectedSort: string;
  onSelectSort: (sort: string) => void;
  productCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedCollection,
  onSelectCollection,
  selectedSort,
  onSelectSort,
  productCount,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<'filter' | 'collections' | 'sort' | null>(null);

  const categories: ProductCategory[] = [
    'All',
    'Earrings',
    'Necklaces',
    'Bracelets',
    'Rings',
    'Bridal',
    'Gifts',
  ];

  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Newest', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
  ];

  const toggleDropdown = (name: 'filter' | 'collections' | 'sort') => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div className="relative mb-8">
      {/* Filter Row matching Figma */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7D9CC]">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Category Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('filter')}
              className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wide border transition-all flex items-center gap-2 ${
                selectedCategory !== 'All' || activeDropdown === 'filter'
                  ? 'bg-[#B89A75] text-[#FFF9F4] border-[#B89A75]'
                  : 'bg-[#FFF9F4] text-[#30251F] border-[#E7D9CC] hover:border-[#B89A75]'
              }`}
            >
              <span>{selectedCategory === 'All' ? 'Filter' : selectedCategory}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'filter' && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
                <div className="absolute left-0 mt-2 w-48 bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg shadow-modal py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#827166] font-medium border-b border-[#E7D9CC]/50">
                    Category
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onSelectCategory(cat);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F1E4D8]/60 transition-colors text-[#30251F]"
                    >
                      <span className={selectedCategory === cat ? 'font-semibold text-[#B89A75]' : ''}>
                        {cat}
                      </span>
                      {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#B89A75]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Collections Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('collections')}
              className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wide border transition-all flex items-center gap-2 ${
                selectedCollection !== 'all' || activeDropdown === 'collections'
                  ? 'bg-[#B89A75] text-[#FFF9F4] border-[#B89A75]'
                  : 'bg-[#FFF9F4] text-[#30251F] border-[#E7D9CC] hover:border-[#B89A75]'
              }`}
            >
              <span>
                {selectedCollection === 'all'
                  ? 'Collections'
                  : COLLECTIONS.find((c) => c.slug === selectedCollection)?.name || 'Collections'}
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'collections' && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
                <div className="absolute left-0 mt-2 w-56 bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg shadow-modal py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#827166] font-medium border-b border-[#E7D9CC]/50">
                    Collection
                  </div>
                  <button
                    onClick={() => {
                      onSelectCollection('all');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F1E4D8]/60 transition-colors text-[#30251F]"
                  >
                    <span className={selectedCollection === 'all' ? 'font-semibold text-[#B89A75]' : ''}>
                      All Collections
                    </span>
                    {selectedCollection === 'all' && <Check className="w-3.5 h-3.5 text-[#B89A75]" />}
                  </button>
                  {COLLECTIONS.map((col) => (
                    <button
                      key={col.slug}
                      onClick={() => {
                        onSelectCollection(col.slug);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F1E4D8]/60 transition-colors text-[#30251F]"
                    >
                      <span className={selectedCollection === col.slug ? 'font-semibold text-[#B89A75]' : ''}>
                        {col.name}
                      </span>
                      {selectedCollection === col.slug && <Check className="w-3.5 h-3.5 text-[#B89A75]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sort Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('sort')}
              className={`px-4 py-2 rounded-lg text-xs font-sans tracking-wide border transition-all flex items-center gap-2 ${
                activeDropdown === 'sort'
                  ? 'bg-[#B89A75] text-[#FFF9F4] border-[#B89A75]'
                  : 'bg-[#FFF9F4] text-[#30251F] border-[#E7D9CC] hover:border-[#B89A75]'
              }`}
            >
              <span>
                {sortOptions.find((s) => s.value === selectedSort)?.label || 'Featured'}
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'sort' && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setActiveDropdown(null)} />
                <div className="absolute right-0 sm:left-0 mt-2 w-48 bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg shadow-modal py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#827166] font-medium border-b border-[#E7D9CC]/50">
                    Sort By
                  </div>
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onSelectSort(opt.value);
                        setActiveDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F1E4D8]/60 transition-colors text-[#30251F]"
                    >
                      <span className={selectedSort === opt.value ? 'font-semibold text-[#B89A75]' : ''}>
                        {opt.label}
                      </span>
                      {selectedSort === opt.value && <Check className="w-3.5 h-3.5 text-[#B89A75]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Piece count indicator */}
        <div className="text-xs text-[#827166] font-sans">
          <span>{productCount} piece{productCount !== 1 ? 's' : ''}</span>
          {(selectedCategory !== 'All' || selectedCollection !== 'all') && (
            <button
              onClick={() => {
                onSelectCategory('All');
                onSelectCollection('all');
              }}
              className="ml-3 text-[#B89A75] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
