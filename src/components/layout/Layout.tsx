import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNavigation } from './BottomNavigation';
import { SearchDialog } from '../navigation/SearchDialog';

export const Layout: React.FC = () => {
  const location = useLocation();

  // Scroll to top automatically when navigating between pages
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Certain checkout pages might prefer a more focused layout, but maintaining header & bottom nav keeps mobile app feel
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F2EB] text-[#30251F] relative">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNavigation />
      <SearchDialog />
    </div>
  );
};
