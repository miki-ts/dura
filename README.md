# DURA by LIYA — Luxury Fine Jewelry E-commerce

A luxury jewelry e-commerce frontend inspired by the **DURA by LIYA** mobile & desktop design system. Built with React, Vite, TypeScript, Tailwind CSS, React Router v6, and Lucide Icons.

---

## Brand & Visual System

- **Main Background**: `#F9F2EB` (Warm Linen Cream)
- **Secondary Background**: `#F1E4D8` (Sand Alabaster)
- **Card Background**: `#FFF9F4` (Ivory Silk)
- **Signature Button / Gold Accent**: `#B89A75`
- **Hover Accent**: `#96764F`
- **Primary Text**: `#30251F` (Rich Espresso)
- **Secondary Text**: `#827166` (Warm Taupe)
- **Border**: `#E7D9CC`
- **Headings & Editorial**: Cormorant Garamond / Playfair Display
- **Body & Controls**: Inter / Manrope

---

## Implemented Pages & Routes

1. **Home** (`/`)
   - Campaign Hero: *"Where elegance meets intention"* with *"Shop the Drop"* CTA
   - Category exploration (Earrings, Necklaces, Rings, Bracelets)
   - Bestselling jewelry showcase
   - Featured Bridal Suite (*Bridal Radiance*)
   - Unboxing Ceremony & Signature gift packaging showcase
   - Atelier philosophy & newsletter subscription
2. **Shop** (`/shop`)
   - Interactive category filters: Earrings, Necklaces, Bracelets, Rings, Bridal, Gifts
   - Collection filter pills
   - Sorting by: Featured, Newest, Price: Low to High, Price: High to Low
   - Dynamic search input
   - View mode toggle (Grid vs Look List mode)
3. **Product Detail** (`/shop/:slug`)
   - Multi-angle gallery with zoom on hover and thumbnail carousel
   - Price, editorial description, in-stock badges
   - Dynamic quantity selector
   - Add to Bag & Wishlist toggle
   - Collapsible Accordions: *Details*, *Jewelry Care*, *Delivery & Returns*
   - Related complementary pieces
4. **Collections Overview** (`/collections`)
   - Featured *Bridal Radiance* edition
   - *Timeless Pearls*, *Golden Essentials*, *Modern Heirlooms*, *Everyday Elegance*, *Signature Gifts*
5. **Collection Detail** (`/collections/:slug`)
   - Thematic edition hero banner
   - "Shop the Look" stylist bundle
   - Product catalog filtered to collection with custom sorting
6. **Wishlist** (`/wishlist`)
   - Persistent saved items with localStorage sync
   - Individual & "Add All to Bag" actions
   - Empty state with direct shop navigation
7. **Shopping Bag** (`/cart`)
   - Initialized with sample items matching Figma mockups (Total $440)
   - Real-time quantity adjustments & item deletion
   - Expandable "Add a gift note" message module
   - Promo discount codes (try `DURA10` or `VIP20`)
   - Calculated subtotal, complimentary insured shipping over $300, and total
8. **Multi-Step Checkout** (`/checkout`)
   - **Step 1: Delivery** — Full form validation for name, phone, address, and email
   - **Step 2: Payment** — Stripe Checkout presentation, saved Visa 4242, manual bank wire, and atelier credit
   - **Step 3: Review** — Full order breakdown, destination review, and order placement
9. **Payment Status** (`/checkout/payment-status`)
   - Interactive preview switchers for *Successful*, *Pending*, *Failed*, and *Cancelled* states
10. **Order Confirmation** (`/checkout/success`)
    - Exact Figma recreation: *"Thank you, Amina."*, Order `#IR153720`, Total $440
    - Signature gift packaging preview & certificate of authenticity
11. **Client Account Portal** (`/account`)
    - Customer profile (*Amina Tesfaye*)
    - Active order tracking with stepper (*Order Placed* → *Preparing* → *Delivered*)
    - Saved addresses & authentication layout ready for Supabase Auth

---

## Getting Started

In your terminal:

```bash
cd "C:\Users\tesfa\Downloads\dura"
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```
Builds verified assets into the `dist/` directory.
