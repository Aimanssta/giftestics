import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-50 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 right-3 bg-white p-3 rounded-full shadow-lg text-brand-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-500 hover:text-white"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold tracking-wider text-brand-300 uppercase">
            {product.category}
          </span>
          <div className="flex items-center text-yellow-400 text-xs">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-gray-400">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-brand-700">
            Rs. {product.price.toLocaleString()}
          </span>
          <button 
             onClick={() => onAddToCart(product)}
             className="text-sm font-semibold text-brand-500 hover:text-brand-700 underline decoration-2 underline-offset-4"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};