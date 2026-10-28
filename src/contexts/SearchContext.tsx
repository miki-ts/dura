import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';

interface SearchContextType {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  query: string;
  setQuery: (q: string) => void;
  results: Product[];
  recentSearches: string[];
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Pearl Earrings',
    'Gold Hoops',
    'Bridal',
    'Diamond Necklace',
  ]);

  const openSearch = () => setIsOpen(true);
  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
  };

  const clearRecentSearches = () => setRecentSearches([]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((product) => {
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.collection.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.material.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        openSearch,
        closeSearch,
        query,
        setQuery,
        results,
        recentSearches,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
