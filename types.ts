export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface GiftIdea {
  productName: string;
  reason: string;
  estimatedPrice: string;
}

export enum Page {
  HOME = 'HOME',
  SHOP = 'SHOP',
  CART = 'CART',
  CUSTOMIZE = 'CUSTOMIZE'
}