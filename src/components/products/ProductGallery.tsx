import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const mainImage = images[selectedIdx] || images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <div 
        className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F1E4D8] border border-[#E7D9CC] shadow-card cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={mainImage}
          alt={`${productName} view ${selectedIdx + 1}`}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isZoomed ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#FFF9F4]/90 backdrop-blur-sm text-[10px] text-[#827166] border border-[#E7D9CC]">
          {selectedIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIdx === idx
                  ? 'border-[#B89A75] ring-2 ring-[#B89A75]/30'
                  : 'border-[#E7D9CC] opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
