import React from 'react';
import { COLLECTIONS } from '../data/collections';
import { CollectionCard } from '../components/collections/CollectionCard';

export const CollectionsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-14">
      {/* Editorial Header matching Figma screen 5 */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#B89A75] font-semibold">
          Curated Atmospheres
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#30251F] font-light mt-1">
          Collections
        </h1>
      </div>

      {/* Featured First Collection (Bridal Radiance) */}
      <CollectionCard collection={COLLECTIONS[0]} featured={true} />

      {/* Grid of Other Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {COLLECTIONS.slice(1).map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};
