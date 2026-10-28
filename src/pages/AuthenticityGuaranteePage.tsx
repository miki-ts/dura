import React from 'react';
import { Gem, Award, CheckCircle, Sparkles } from 'lucide-react';

export const AuthenticityGuaranteePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-lg bg-[#F1E4D8] border border-[#E7D9CC] flex items-center justify-center text-[#B89A75] mx-auto">
          <Gem className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-4xl text-[#30251F]">Authenticity Guarantee</h1>
        <p className="text-sm text-[#827166] max-w-2xl mx-auto">
          Every piece from DURA by LIYA comes with our commitment to authenticity and quality
        </p>
      </div>

      {/* Content */}
      <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-6 sm:p-8 shadow-soft space-y-8 text-sm text-[#30251F] leading-relaxed">
        {/* Guarantee Statement */}
        <section className="text-center py-6 border-b border-[#E7D9CC]/70">
          <Award className="w-12 h-12 text-[#B89A75] mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-[#30251F] mb-3">Our Promise to You</h2>
          <p className="text-[#827166] max-w-2xl mx-auto">
            Every piece of jewelry from DURA by LIYA is guaranteed to be authentic and crafted with the finest materials. We stand behind the quality and craftsmanship of every item we sell.
          </p>
        </section>

        {/* What We Guarantee */}
        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-4">What We Guarantee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-[#F9F2EB] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#B89A75] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-[#30251F] mb-1">100% Authentic Materials</h3>
                <p className="text-[#827166]">All precious metals and gemstones are genuine and sourced from reputable suppliers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-[#F9F2EB] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#B89A75] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-[#30251F] mb-1">Expert Craftsmanship</h3>
                <p className="text-[#827166]">Each piece is handcrafted by skilled artisans with meticulous attention to detail.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-[#F9F2EB] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#B89A75] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-[#30251F] mb-1">Quality Assurance</h3>
                <p className="text-[#827166]">Every item undergoes rigorous quality inspection before reaching you.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-[#F9F2EB] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#B89A75] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-[#30251F] mb-1">Certified Documentation</h3>
                <p className="text-[#827166]">High-value items come with certificates of authenticity and appraisal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Materials */}
        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-4">Our Materials</h2>
          <div className="space-y-3 text-[#827166]">
            <p>
              <strong className="text-[#30251F]">Gold:</strong> We use 14K, 18K, and 24K gold, stamped with purity marks for verification.
            </p>
            <p>
              <strong className="text-[#30251F]">Silver:</strong> Our sterling silver is 925 purity, ensuring lasting quality and luster.
            </p>
            <p>
              <strong className="text-[#30251F]">Gemstones:</strong> All gemstones are ethically sourced and meet our strict quality standards.
            </p>
            <p>
              <strong className="text-[#30251F]">Pearls:</strong> Our pearls are carefully selected for their luster, shape, and surface quality.
            </p>
          </div>
        </section>

        {/* Verification Process */}
        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-4">Verification Process</h2>
          <div className="space-y-4 text-[#827166]">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#B89A75] flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#30251F]">Material Testing:</strong> All precious metals are tested for purity using industry-standard methods.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#B89A75] flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#30251F]">Gemstone Certification:</strong> Significant gemstones are accompanied by independent laboratory reports.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#B89A75] flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#30251F]">Craftsmanship Review:</strong> Each piece is inspected for construction quality and finish.
              </p>
            </div>
          </div>
        </section>

        {/* Lifetime Warranty */}
        <section className="bg-[#F1E4D8]/50 p-6 rounded-lg border border-[#E7D9CC]">
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Lifetime Warranty</h2>
          <p className="text-[#827166]">
            We stand behind our jewelry with a lifetime warranty against manufacturing defects. If your piece shows any defect due to craftsmanship, we will repair or replace it at no cost to you. This warranty does not cover normal wear and tear, damage from misuse, or loss of the item.
          </p>
        </section>

        {/* Return Policy */}
        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Return Policy</h2>
          <p className="text-[#827166]">
            If you are not completely satisfied with your purchase, you may return it within 14 days of delivery for a full refund. The item must be in its original condition with all tags and packaging intact. Custom pieces are final sale unless defective.
          </p>
        </section>

        {/* Contact */}
        <section className="pt-4 border-t border-[#E7D9CC]/70">
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Questions About Authenticity?</h2>
          <p className="text-[#827166]">
            Our team of jewelry experts is available to answer any questions about our materials, craftsmanship, or authenticity guarantees.
          </p>
          <p className="text-[#827166] mt-2">
            <strong className="text-[#30251F]">Email:</strong> info@durabyliya.com<br />
            <strong className="text-[#30251F]">Phone:</strong> +251952203333<br />
            <strong className="text-[#30251F]">Address:</strong> Dembel City Center New Building, ground floor
          </p>
        </section>
      </div>
    </div>
  );
};
