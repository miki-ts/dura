import React from 'react';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-lg bg-[#F1E4D8] border border-[#E7D9CC] flex items-center justify-center text-[#B89A75] mx-auto">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-4xl text-[#30251F]">Privacy Policy</h1>
        <p className="text-sm text-[#827166] max-w-2xl mx-auto">
          Last updated: October 2026
        </p>
      </div>

      {/* Content */}
      <div className="bg-[#FFF9F4] border border-[#E7D9CC] rounded-lg p-6 sm:p-8 shadow-soft space-y-6 text-sm text-[#30251F] leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Introduction</h2>
          <p className="text-[#827166]">
            DURA by LIYA ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website and make purchases.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Information We Collect</h2>
          <div className="space-y-3 text-[#827166]">
            <p>
              <strong className="text-[#30251F]">Personal Information:</strong> Name, email address, phone number, shipping and billing addresses, and payment information.
            </p>
            <p>
              <strong className="text-[#30251F]">Order Information:</strong> Products purchased, order history, and preferences.
            </p>
            <p>
              <strong className="text-[#30251F]">Technical Information:</strong> IP address, browser type, device information, and browsing behavior.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-[#827166]">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Provide customer support</li>
            <li>Improve our products and services</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Prevent fraud and ensure security</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Data Security</h2>
          <p className="text-[#827166]">
            We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology. We regularly review our security practices to ensure your data remains safe.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Your Rights</h2>
          <ul className="list-disc list-inside space-y-2 text-[#827166]">
            <li>Access to your personal information</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-[#30251F] mb-3">Contact Us</h2>
          <p className="text-[#827166]">
            If you have questions about this Privacy Policy or our data practices, please contact us at:
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
