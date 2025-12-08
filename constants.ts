import { Product } from './types';

export const CATEGORIES = ["All", "Flowers", "Accessories", "Skincare", "Personalized"];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Red Roses Bouquet',
    price: 12500,
    category: 'Flowers',
    image: 'https://images.unsplash.com/photo-1518709779341-56cf8536a8e1?auto=format&fit=crop&w=800&q=80',
    description: 'Premium imported red roses arranged beautifully in a bouquet. Perfect for anniversaries in Lahore.',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Silver Zircon Pendant',
    price: 4500,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    description: 'A stunning sterling silver pendant with high-quality zirconia stones.',
    rating: 4.9
  },
  {
    id: '5',
    name: 'Glow & Care Skincare Set',
    price: 8500,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1544367563-12123d8959c9?auto=format&fit=crop&w=800&q=80',
    description: 'Halal organic skincare essentials, scented candles, and a plush towel set.',
    rating: 4.6
  },
  {
    id: '4',
    name: 'Personalized Star Map Frame',
    price: 2500,
    category: 'Personalized',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    description: 'A custom framed map of the stars from a specific date and location special to you.',
    rating: 4.9
  },
  {
    id: '6',
    name: 'Velvet Jewelry Box',
    price: 1800,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    description: 'Soft pink velvet jewelry box to keep precious accessories safe and organized.',
    rating: 4.5
  },
  {
    id: '7',
    name: 'Pink Lilies Bunch',
    price: 5000,
    category: 'Flowers',
    image: 'https://images.unsplash.com/photo-1563241527-3af1848a5656?auto=format&fit=crop&w=800&q=80',
    description: 'Freshly cut pink lilies wrapped in our signature Giftestics paper.',
    rating: 4.8
  },
  {
    id: '8',
    name: 'Custom Engraved Watch',
    price: 9500,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    description: 'Minimalist watch with a custom message engraved on the back. Elegant and timeless.',
    rating: 4.9
  },
  {
    id: '9',
    name: 'Luxury Perfume Gift Set',
    price: 15000,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1594035910387-406691aa9303?auto=format&fit=crop&w=800&q=80',
    description: 'A curated set of imported fragrances for a touch of elegance.',
    rating: 4.7
  }
];