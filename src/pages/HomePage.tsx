import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Gem, ShieldCheck, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { ProductCard } from '../components/products/ProductCard';
import { formatPrice } from '../utils/currency';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const bestselling = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const bridalCollection = COLLECTIONS.find((c) => c.slug === 'bridal-radiance') || COLLECTIONS[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. Hero Campaign Section matching Figma screen 1 */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-2 sm:pt-4">
        <div className="relative rounded-lg sm:rounded-lg overflow-hidden aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] w-full bg-[#F1E4D8] border border-[#E7D9CC] shadow-card">
          <img
            src="/public/assets/hero.jpg"
            alt="DURA by LIYA campaign model surrounded by luxury jewelry boxes"
            className="w-full h-full object-cover object-center sm:object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#30251F]/75 via-[#30251F]/30 to-transparent" />

          {/* Hero Typography & CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-end sm:justify-center text-center p-6 sm:p-12 text-[#FFF9F4]">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#F1E4D8] font-sans font-medium mb-2">
              Luxury Fine Jewelry
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide max-w-2xl text-[#FFF9F4] leading-tight">
              Where elegance meets intention
            </h1>
            
            <div className="mt-6 sm:mt-8">
              <Link
                to="/shop"
                className="px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs sm:text-sm uppercase tracking-widest font-medium transition-all duration-300 shadow-modal inline-flex items-center gap-2 hover:scale-105"
              >
                <span>Shop the Drop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        
      </section>

      {/* 2. Featured Jewelry Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-lg mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B89A75] font-semibold">
            Categorical Refinement
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#30251F] mt-1 font-light">
            Curated by Form
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 ">
          {[
            {
              name: 'Earrings',
              cat: 'Earrings',
              img: '/public/assets/earrings.jpg',
              desc: 'Pearls & sculptural hoops',
            },
            {
              name: 'Necklaces',
              cat: 'Necklaces',
              img: '/public/assets/necklaces.jpg',
              desc: 'Baroque strands & diamonds',
            },
            {
              name: 'Rings',
              cat: 'Rings',
              img: '/public/assets/rings.jpg',
              desc: 'Hammered gold & gemstones',
            },
            {
              name: 'Bracelets',
              cat: 'Bracelets',
              img: '/public/assets/bracelets.jpg',
              desc: 'Seed pearl cuffs & chains',
            },
          ].map((item) => (
            <Link
              key={item.name}
              to={`/shop?category=${item.cat}`}
              className="group relative rounded-lg overflow-hidden bg-[#FFF9F4] border border-[#E7D9CC] shadow-soft hover:shadow-card transition-all"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#F1E4D8]">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#30251F]/60 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 text-center text-[#FFF9F4]">
                <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                  {item.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-[#F1E4D8]/80 font-sans mt-0.5">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Bestselling Products Grid matching Figma Shop Screen */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#30251F] mt-1 font-light">
              Bestselling Jewelry
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-widest font-medium text-[#B89A75] hover:text-[#96764F] flex items-center gap-1.5 transition-colors"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {bestselling.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Featured Bridal Collection matching Figma screen 4 & 5 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg sm:rounded-lg p-6 sm:p-12 shadow-card grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Editorial Visual */}
          <div className="relative aspect-[4/3] rounded-lg sm:rounded-lg overflow-hidden bg-[#F1E4D8] border border-[#E7D9CC]/60 shadow-sm">
            <img
              src="/public/assets/featured.jpg"
              alt="Bridal Radiance fine jewelry display"
              className="w-full h-full object-cover"
            />
            
          </div>

          {/* Copy and Actions matching Figma */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left ">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B89A75] font-semibold">
              The Bridal Suite
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#30251F] font-light leading-tight">
              {bridalCollection.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#827166] leading-relaxed max-w-md mx-auto lg:mx-0 font-sans">
              "Refined and luminous, designed to be worn with poise on your vows and cherished for generations."
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 ">
              <Link
                to={`/collections/${bridalCollection.slug}`}
                className="px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg bg-[#B89A75] hover:bg-[#96764F] text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-all shadow-card inline-flex items-center justify-center gap-2"
              >
                <span>Shop the Drop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop?category=Bridal"
                className="px-8 sm:px-5 py-3.5 sm:py-3 rounded-lg border border-[#E7D9CC] text-[#30251F] hover:bg-[#B89A75] hover:text-[#FFF9F4] text-xs uppercase tracking-widest font-medium transition-colors text-center"
              >
                Explore Bridal
              </Link>
            </div>
          </div>
        </div>
      </section>

      

      {/* 6. Short Brand Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B89A75] font-semibold">
          The Atelier Philosophy
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#30251F] font-light italic">
          "Jewelry should not disguise you; it should reveal the calm brilliance you already possess."
        </h2>
        <p className="text-xs sm:text-sm text-[#827166] leading-relaxed font-sans">
          Founded by Liya Gole
        </p>
      </section>
    </div>
  );
};
