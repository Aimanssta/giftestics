import React from 'react';
import { ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setPage, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', value: Page.HOME },
    { label: 'Shop Gifts', value: Page.SHOP },
    { label: 'Customize Gift', value: Page.CUSTOMIZE },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setPage(Page.HOME)}
          >
            <div className="bg-brand-300 p-2 rounded-lg text-white mr-2">
              <Heart size={24} fill="white" />
            </div>
            <span className="text-2xl font-serif font-bold text-brand-700 tracking-wide">
              Giftestics
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setPage(item.value)}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  currentPage === item.value 
                    ? 'text-brand-500 border-b-2 border-brand-300' 
                    : 'text-gray-500 hover:text-brand-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="relative p-2 text-gray-500 hover:text-brand-500 transition-colors"
              onClick={() => setPage(Page.CART)}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-400 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setPage(item.value);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-500 hover:bg-brand-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};