import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="hidden lg:block bg-[#F1E4D8] border-t border-[#E7D9CC] pt-16 pb-16 text-[#30251F]">
      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
          {/* Brand Col */}
          <div className="text-center lg:text-left">
            <BrandLogo size="md" asLink={true} className="lg:items-start mb-4" />
            <p className="text-sm text-[#827166] leading-relaxed max-w-sm mx-auto lg:mx-0 mt-3 font-serif italic">
              "Where elegance meets intention. Handcrafted fine jewelry designed to celebrate quiet poise and enduring personal ceremony."
            </p>
            
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-8">
            <div>
              <h5 className="font-serif text-base font-medium uppercase tracking-wider text-[#30251F] mb-4">
                Collections
              </h5>
              <ul className="space-y-2.5 text-xs text-[#827166]">
                <li>
                  <Link to="/collections/bridal-radiance" className="hover:text-[#B89A75] transition-colors">
                    Bridal Radiance
                  </Link>
                </li>
                <li>
                  <Link to="/collections/timeless-pearls" className="hover:text-[#B89A75] transition-colors">
                    Timeless Pearls
                  </Link>
                </li>
                <li>
                  <Link to="/collections/golden-essentials" className="hover:text-[#B89A75] transition-colors">
                    Golden Essentials
                  </Link>
                </li>
                <li>
                  <Link to="/collections/modern-heirlooms" className="hover:text-[#B89A75] transition-colors">
                    Modern Heirlooms
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif text-base font-medium uppercase tracking-wider text-[#30251F] mb-4">
                Concierge
              </h5>
              <ul className="space-y-2.5 text-xs text-[#827166]">
                <li>
                  <Link to="/shop" className="hover:text-[#B89A75] transition-colors">
                    All Jewelry
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-[#B89A75] transition-colors">
                    Shopping Bag
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-[#B89A75] transition-colors">
                    Saved Pieces
                  </Link>
                </li>
                <li>
                  <Link to="/account" className="hover:text-[#B89A75] transition-colors">
                    Order Status & History
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information & Social Media */}
          <div>
            <h5 className="font-serif text-base font-medium uppercase tracking-wider text-[#30251F] mb-4">
              Contact Us
            </h5>
            <ul className="space-y-3 text-xs text-[#827166]">
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

            <h5 className="font-serif text-base font-medium uppercase tracking-wider text-[#30251F] mb-4 mt-6">
              Follow Us
            </h5>
            <div className="flex items-center gap-3">
              <a
                href="https://web.facebook.com/durabyliya/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#30251F] hover:text-[#B89A75] transition-colors rounded-lg hover:bg-[#FFF9F4]/50"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/dura_by_liya/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#30251F] hover:text-[#B89A75] transition-colors rounded-lg hover:bg-[#FFF9F4]/50"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a> 
            </div>
          </div>

          
        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-12 pt-8 border-t border-[#E7D9CC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#827166]">
          <p>© 2026 DURA by LIYA.All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#30251F] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[#30251F] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
