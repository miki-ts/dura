import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Layers, Heart, User } from 'lucide-react';
import { useWishlist } from '../../contexts/WishlistContext';

export const BottomNavigation: React.FC = () => {
  const { wishlist } = useWishlist();
  const location = useLocation();

  // If inside the multi-step checkout review/status, we can still show or hide as appropriate,
  // but showing it provides seamless luxury browsing!
  const navItems = [
    { name: 'Home', path: '/', icon: Home, exact: true },
    { name: 'Shop', path: '/shop', icon: ShoppingBag, exact: false },
    { name: 'Collections', path: '/collections', icon: Layers, exact: false },
    { name: 'Wishlist', path: '/wishlist', icon: Heart, exact: false, badge: wishlist.length },
    { name: 'Account', path: '/account', icon: User, exact: false },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9F4]/95 backdrop-blur-md border-t border-[#E7D9CC] px-2 py-2 safe-area-bottom shadow-card"
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact 
            ? location.pathname === item.path 
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-1 transition-colors relative ${
                isActive ? 'text-[#B89A75]' : 'text-[#827166] hover:text-[#30251F]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-lg bg-[#B89A75] text-[#FFF9F4] text-[9px] font-bold flex items-center justify-center font-sans">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] mt-1 font-sans tracking-tight ${isActive ? 'font-medium text-[#B89A75]' : 'text-[#827166]'}`}>
                {item.name}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-lg bg-[#B89A75] mt-0.5" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
