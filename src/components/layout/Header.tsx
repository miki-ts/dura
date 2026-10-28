import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { MobileMenu } from './MobileMenu';
import { useSearch } from '../../contexts/SearchContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openSearch } = useSearch();
  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  // Highlight active path logic
  const isShopActive = location.pathname.startsWith('/shop');
  const isCollectionsActive = location.pathname.startsWith('/collections');

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F9F2EB]/95 backdrop-blur-md border-b border-[#E7D9CC]/60 transition-all">
        

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Mobile Menu Toggle / Desktop Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-[#30251F] hover:text-[#B89A75] transition-colors focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 font-serif text-base tracking-wide">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-colors relative py-1 ${
                    isActive ? 'text-[#B89A75] font-medium' : 'text-[#30251F] hover:text-[#B89A75]'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={() =>
                  `transition-colors relative py-1 ${
                    isShopActive ? 'text-[#B89A75] font-medium' : 'text-[#30251F] hover:text-[#B89A75]'
                  }`
                }
              >
                Shop
              </NavLink>
              <NavLink
                to="/collections"
                className={() =>
                  `transition-colors relative py-1 ${
                    isCollectionsActive ? 'text-[#B89A75] font-medium' : 'text-[#30251F] hover:text-[#B89A75]'
                  }`
                }
              >
                Collections
              </NavLink>
              
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <BrandLogo size="md" />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 text-[#30251F] hover:text-[#B89A75] transition-colors rounded-lg hover:bg-[#F1E4D8]/50"
              aria-label="Search jewelry catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link (Desktop Only) */}
            <Link
              to="/wishlist"
              className="hidden lg:flex relative p-2 text-[#30251F] hover:text-[#B89A75] transition-colors rounded-lg hover:bg-[#F1E4D8]/50"
              aria-label={`Wishlist (${wishlist.length} saved)`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-[10px] font-medium flex items-center justify-center font-sans">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account Link (Desktop Only) */}
            <Link
              to="/account"
              className="hidden lg:flex p-2 text-[#30251F] hover:text-[#B89A75] transition-colors rounded-lg hover:bg-[#F1E4D8]/50"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Shopping Bag Link */}
            <Link
              to="/cart"
              className="relative p-2 text-[#30251F] hover:text-[#B89A75] transition-colors rounded-lg hover:bg-[#F1E4D8]/50"
              aria-label={`Shopping Cart (${totalItemsCount} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-[10px] font-medium flex items-center justify-center font-sans">
                  {totalItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
