import React from 'react';
import { FileText, Scale, AlertCircle } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-lg bg-[#F1E4D8] border border-[#E7D9CC] flex items-center justify-center text-[#B89A75] mx-auto">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-4xl text-[#30251F]">Terms of Service</h1>
        <p className="text-sm text-[#827166] max-w-2xl mx-auto">
          Last updated: October 2026
        </p>
      </div>

      {/* Content */}
      <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-6 sm:p-8 shadow-soft space-y-6 text-sm text-[#30251F] leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Acceptance of Terms</h2>
          <p className="text-[#827166]">
            By accessing or using DURA by LIYA's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Products and Services</h2>
          <div className="space-y-3 text-[#827166]">
            <p>
              We strive to provide accurate descriptions and images of our products. However, we do not warrant that product descriptions are error-free. Colors may vary slightly due to monitor settings and photography lighting.
            </p>
            <p>
              All jewelry is handcrafted and may have slight variations, making each piece unique.
            </p>
            <p>
              We reserve the right to discontinue any product at any time without notice.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Pricing and Payment</h2>
          <div className="space-y-3 text-[#827166]">
            <p>
              All prices are listed in Ethiopian Birr (ETB) and are subject to change without notice. We reserve the right to modify prices or discontinue products at any time.
            </p>
            <p>
              Payment is due at the time of purchase. We accept payment through Stripe, which supports major credit cards and digital payment methods.
            </p>
            <p>
              All orders are subject to availability and confirmation of the order price.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Orders and Fulfillment</h2>
          <div className="space-y-3 text-[#827166]">
            <p>
              We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or suspected fraud.
            </p>
            <p>
              Order confirmation does not guarantee product availability. We will notify you if any item in your order is unavailable.
            </p>
            <p>
              Shipping times are estimates and are not guaranteed. We are not responsible for delays caused by shipping carriers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Returns and Refunds</h2>
          <div className="space-y-3 text-[#827166]">
            <p>
              Returns are accepted within 14 days of delivery. Items must be unworn, in original condition, and accompanied by proof of purchase.
            </p>
            <p>
              Custom or personalized items are final sale and cannot be returned unless defective.
            </p>
            <p>
              Refunds will be processed to the original payment method within 5-7 business days of receiving the returned item.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Intellectual Property</h2>
          <p className="text-[#827166]">
            All content on this website, including text, images, logos, and designs, is the property of DURA by LIYA and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content without our written permission.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Limitation of Liability</h2>
          <p className="text-[#827166]">
            DURA by LIYA shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Governing Law</h2>
          <p className="text-[#827166]">
            These Terms of Service are governed by and construed in accordance with the laws of Ethiopia. Any disputes shall be resolved in the courts of Ethiopia.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Contact Us</h2>
          <p className="text-[#827166]">
            If you have questions about these Terms of Service, please contact us at:
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
