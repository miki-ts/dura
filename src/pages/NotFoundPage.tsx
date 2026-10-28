import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
      <div className="w-16 h-16 rounded-lg bg-[#FFF9F4] border border-[#E7D9CC] flex items-center justify-center text-[#B89A75] mx-auto mb-2">
        <Compass className="w-8 h-8" />
      </div>
      <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A75] font-semibold">
        Page Not Found
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl text-[#30251F] font-light">
        A Lost Silhouette
      </h1>
      <p className="text-xs sm:text-sm text-[#827166] max-w-sm mx-auto font-sans leading-relaxed">
        The destination you are seeking has retired or moved. Please return to the boutique atelier.
      </p>
      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-all shadow-card"
        >
          <span>Return Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
