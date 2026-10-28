import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Sparkles, ChevronRight, Heart, ShoppingBag, User, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { COLLECTIONS } from '../../data/collections';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { totalItemsCount } = useCart();
  const { wishlist } = useWishlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#30251F]/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FFF9F4] border-r border-[#E7D9CC] shadow-modal z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-[#E7D9CC]/70 flex items-center justify-between">
            <BrandLogo size="sm" asLink={false} />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#827166] hover:text-[#30251F] hover:bg-[#F1E4D8]/60 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Primary Nav Links */}
          <div className="p-5 space-y-1 font-serif text-lg">
            <NavLink
              to="/collections/bridal-radiance"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-[#B89A75] font-semibold bg-[#F1E4D8]/40' : 'text-[#30251F] hover:text-[#B89A75]'
                }`
              }
            >
              <span>Bridal Radiance</span>
              <ChevronRight className="w-4 h-4 text-[#827166]/50" />
            </NavLink>

            <NavLink
              to="/collections/timeless-pearls"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-[#B89A75] font-semibold bg-[#F1E4D8]/40' : 'text-[#30251F] hover:text-[#B89A75]'
                }`
              }
            >
              <span>Timeless Pearls</span>
              <ChevronRight className="w-4 h-4 text-[#827166]/50" />
            </NavLink>

            <NavLink
              to="/collections/golden-essentials"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-[#B89A75] font-semibold bg-[#F1E4D8]/40' : 'text-[#30251F] hover:text-[#B89A75]'
                }`
              }
            >
              <span>Golden Essentials</span>
              <ChevronRight className="w-4 h-4 text-[#827166]/50" />
            </NavLink>
            <NavLink
              to="/collections/modern-heirlooms"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-[#B89A75] font-semibold bg-[#F1E4D8]/40' : 'text-[#30251F] hover:text-[#B89A75]'
                }`
              }
            >
              <span>Modern Heirlooms</span>
              <ChevronRight className="w-4 h-4 text-[#827166]/50" />
            </NavLink>

            <NavLink
              to="collections/everyday-elegance"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between py-2.5 px-3 rounded-lg transition-colors ${
                  isActive ? 'text-[#B89A75] font-semibold bg-[#F1E4D8]/40' : 'text-[#30251F] hover:text-[#B89A75]'
                }`
              }
            >
              <span>Everyday-Elegance</span>
              <ChevronRight className="w-4 h-4 text-[#827166]/50" />
            </NavLink>
          </div>

          {/* Contact Information */}
          <div className="p-5 border-t border-[#E7D9CC]/70">
            <h5 className="font-serif text-sm font-medium uppercase tracking-wider text-[#30251F] mb-3">
              Contact Us
            </h5>
            <ul className="space-y-2.5 text-xs text-[#827166]">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-[#B89A75] flex-shrink-0" />
                <a
                  href="mailto:info@durabyliya.com"
                  className="hover:text-[#B89A75] transition-colors"
                >
                  info@durabyliya.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-[#B89A75] flex-shrink-0" />
                <a
                  href="tel:+251952203333"
                  className="hover:text-[#B89A75] transition-colors"
                >
                  +251952203333 
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#B89A75] flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/syrbBDwR1rvWPxrF7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B89A75] transition-colors"
                >
                  Dembel City Center New Building, ground floor
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="p-5 border-t border-[#E7D9CC]/70">
            <h5 className="font-serif text-sm font-medium uppercase tracking-wider text-[#30251F] mb-3">
              Follow Us
            </h5>
            <div className="flex items-center gap-3">
              <a
                href="https://web.facebook.com/durabyliya/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#30251F] hover:text-[#B89A75] transition-colors rounded-lg hover:bg-[#F1E4D8]/50"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/dura_by_liya/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#30251F] hover:text-[#B89A75] transition-colors rounded-lg hover:bg-[#F1E4D8]/50"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="p-5 border-t border-[#E7D9CC]/70">
            <h5 className="font-serif text-sm font-medium uppercase tracking-wider text-[#30251F] mb-3">
              Legal
            </h5>
            <ul className="space-y-2 text-xs text-[#827166]">
              <li>
                <Link to="/privacy-policy" onClick={onClose} className="hover:text-[#B89A75] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" onClick={onClose} className="hover:text-[#B89A75] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
