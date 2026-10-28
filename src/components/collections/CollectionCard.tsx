import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Collection } from '../../types/product';

interface CollectionCardProps {
  collection: Collection;
  featured?: boolean;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  featured = false,
}) => {
  if (featured) {
    return (
      <div className="relative rounded-lg overflow-hidden border border-[#E7D9CC] shadow-card bg-[#FFF9F4] group">
        <div className="aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden relative">
          <img
            src={collection.heroImage}
            alt={collection.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#30251F]/70 via-[#30251F]/20 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F1E4D8] font-sans font-medium mb-1">
              Curated Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-[#FFF9F4]">
              {collection.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#F9F2EB]/90 mt-2 max-w-lg font-sans line-clamp-2">
              {collection.description}
            </p>
            <div className="mt-5">
              <Link
                to={`/collections/${collection.slug}`}
                className="inline-flex items-center gap-2 px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-wider font-medium transition-colors shadow-soft"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg overflow-hidden shadow-soft group hover:shadow-card transition-all duration-300">
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#F1E4D8] relative">
        <img
          src={collection.heroImage}
          alt={collection.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#30251F]/15 group-hover:bg-transparent transition-colors" />
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#B89A75] font-medium">
            Edition
          </span>
          <h3 className="font-serif text-2xl text-[#30251F] mt-1 group-hover:text-[#B89A75] transition-colors">
            {collection.name}
          </h3>
          <p className="text-xs text-[#827166] mt-2 line-clamp-2 leading-relaxed">
            {collection.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E7D9CC]/60 flex items-center justify-between">
          <Link
            to={`/collections/${collection.slug}`}
            className="text-xs uppercase tracking-wider font-medium text-[#30251F] group-hover:text-[#B89A75] transition-colors flex items-center gap-1.5"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B89A75]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
