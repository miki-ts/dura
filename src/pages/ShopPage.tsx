import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, Search, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory, Product } from '../types/product';
import { ProductGrid } from '../components/products/ProductGrid';
import { FilterPanel } from '../components/products/FilterPanel';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state sync
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'All';
  const initialCollection = searchParams.get('collection') || 'all';

  const [category, setCategory] = useState<ProductCategory>(initialCategory);
  const [collection, setCollection] = useState<string>(initialCollection);
  const [sort, setSort] = useState<string>('featured');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'horizontal'>('grid');

  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory;
    if (cat) setCategory(cat);
    const col = searchParams.get('collection');
    if (col) setCollection(col);
  }, [searchParams]);

  const handleSelectCategory = (newCat: ProductCategory) => {
    setCategory(newCat);
    if (newCat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newCat);
    }
    setSearchParams(searchParams);
  };

  const handleSelectCollection = (newCol: string) => {
    setCollection(newCol);
    if (newCol === 'all') {
      searchParams.delete('collection');
    } else {
      searchParams.set('collection', newCol);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    let list: Product[] = [...PRODUCTS];

    // Filter by Category
    if (category !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by Collection
    if (collection !== 'all') {
      list = list.filter((p) => p.collectionSlug === collection);
    }

    // Filter by inline search text
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else {
      // featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [category, collection, sort, searchFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Shop Banner matching Figma screen 2 */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A75] font-semibold">
          Fine Jewelry Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#30251F] font-light mt-1">
          Shop
        </h1>
        

        {/* Inline Search Bar */}
        <div className="mt-6 relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#827166] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by keyword, stone, metal..."
            className="w-full bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#30251F] placeholder:text-[#827166]/60 focus:outline-none focus:border-[#B89A75] shadow-soft transition-colors"
          />
        </div>
      </div>

      {/* Filter Bar with Filter v, Collections v, Sort v & View Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="w-full sm:w-auto">
          <FilterPanel
            selectedCategory={category}
            onSelectCategory={handleSelectCategory}
            selectedCollection={collection}
            onSelectCollection={handleSelectCollection}
            selectedSort={sort}
            onSelectSort={setSort}
            productCount={filteredProducts.length}
          />
        </div>

        {/* View Toggle (Grid vs Look View matching Figma image 2 screen 2) */}
        <div className="hidden sm:flex items-center gap-1 bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-1 -mt-8">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-[#B89A75] text-[#FFF9F4]'
                : 'text-[#827166] hover:text-[#30251F]'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('horizontal')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'horizontal'
                ? 'bg-[#B89A75] text-[#FFF9F4]'
                : 'text-[#827166] hover:text-[#30251F]'
            }`}
            aria-label="Look list view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product List/Grid */}
      <ProductGrid products={filteredProducts} variant={viewMode} />
    </div>
  );
};
