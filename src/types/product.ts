export type ProductCategory = 
  | 'All'
  | 'Earrings' 
  | 'Necklaces' 
  | 'Bracelets' 
  | 'Rings' 
  | 'Bridal' 
  | 'Gifts';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  collection: string;
  collectionSlug: string;
  description: string;
  material: string;
  images: string[];
  featured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  details: string[];
  care: string[];
  deliveryReturns: string;
  rating?: number;
  reviewsCount?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  heroImage: string;
  curatedImage?: string;
  featuredProductSlugs: string[];
}
