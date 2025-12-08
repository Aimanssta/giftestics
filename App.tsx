import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { GiftAssistant } from './components/GiftAssistant';
import { PRODUCTS, CATEGORIES } from './constants';
import { Page, Product, CartItem } from './types';
import { ArrowRight, Truck, ShieldCheck, HeartHandshake, ShoppingBag, Trash2, Heart, MapPin } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = selectedCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-brand-50">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-brand-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-serif font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Premium Gifts in</span>{' '}
                  <span className="block text-brand-500 xl:inline">Lahore Only</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Send luxury flowers, trendy accessories, and organic skincare to your loved ones in Lahore. Exclusive delivery to DHA, Gulberg, and Bahria Town.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => setCurrentPage(Page.SHOP)}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-500 hover:bg-brand-600 md:py-4 md:text-lg transition-all"
                    >
                      Shop Now
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => setCurrentPage(Page.CUSTOMIZE)}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-700 bg-brand-100 hover:bg-brand-200 md:py-4 md:text-lg transition-all"
                    >
                      Customize Gift
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Gift giving"
          />
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-brand-600 tracking-wide uppercase">Exclusive Collection</h2>
            <p className="mt-2 text-3xl leading-8 font-serif font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Flowers, Accessories & Skincare
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
          <div className="mt-12 text-center">
             <button 
               onClick={() => setCurrentPage(Page.SHOP)}
               className="inline-flex items-center text-brand-600 hover:text-brand-800 font-bold"
             >
               View All Products <ArrowRight size={20} className="ml-2" />
             </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-brand-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="bg-white p-4 rounded-full shadow-md mb-4 text-brand-500">
                <Truck size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delivery in Lahore Only</h3>
              <p className="mt-2 text-gray-500">Fast delivery to DHA, Gulberg, Bahria Town & nearby areas.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="bg-white p-4 rounded-full shadow-md mb-4 text-brand-500">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Luxury Quality</h3>
              <p className="mt-2 text-gray-500">Imported flowers, premium skincare, and elegant accessories.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="bg-white p-4 rounded-full shadow-md mb-4 text-brand-500">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Custom Packages</h3>
              <p className="mt-2 text-gray-500">Create your own box with our customization tool.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Block */}
      <div className="bg-white py-16 border-t border-pink-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Online Gift Delivery in Lahore</h2>
          <div className="text-gray-500 space-y-4 text-sm leading-relaxed">
            <p>
              Looking for the perfect gift in Lahore? <strong>Giftestics</strong> offers a premium selection of flower bouquets, luxury skincare sets, and stylish accessories. We focus exclusively on the Lahore market to ensure the highest quality and fastest delivery.
            </p>
            <p>
              We specialize in same-day delivery across all major areas including <strong>DHA, Gulberg, Bahria Town, Johar Town, Wapda Town, and Model Town</strong>. Whether you need a fresh bouquet of roses, a silver pendant, or a pampering skincare box, we have you covered.
            </p>
            <p>
              Use our <strong>"Customize Gift"</strong> feature to design a unique package tailored to your loved one's taste. Send love to Lahore with confidence and style.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderShop = () => (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Shop Gifts</h2>
          <div className="mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0 flex space-x-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-brand-500 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
           <div className="text-center py-20">
             <p className="text-gray-500 text-lg">No products found in this category.</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Your Bag</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
          <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
             <ShoppingBag size={96} strokeWidth={1} />
          </div>
          <p className="text-xl text-gray-500 font-medium mb-6">Your bag is currently empty.</p>
          <button 
            onClick={() => setCurrentPage(Page.SHOP)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-500 hover:bg-brand-600"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="ml-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      <p className="font-bold text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-brand-500"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-gray-700">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, 1)}
                         className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-brand-500"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Lahore Only)</span>
                  <span className="text-brand-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-brand-500 text-white py-4 rounded-xl font-bold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-200">
                Proceed to Checkout
              </button>
              <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center">
                <ShieldCheck size={14} className="mr-1" /> Secure Payment (JazzCash/EasyPaisa)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50/50">
      <Header currentPage={currentPage} setPage={setCurrentPage} cartCount={cartCount} />
      
      <main>
        {currentPage === Page.HOME && renderHome()}
        {currentPage === Page.SHOP && renderShop()}
        {currentPage === Page.CUSTOMIZE && <GiftAssistant />}
        {currentPage === Page.CART && renderCart()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-brand-500 p-2 rounded-lg text-white mr-2">
                <Heart size={20} fill="white" />
              </div>
              <span className="text-xl font-serif font-bold text-brand-800">
                Giftestics
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Giftestics Lahore. Spreading love, one gift at a time.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center"><MapPin size={12} className="mr-1"/> DHA Phase 6, Lahore</span>
            <span>|</span>
            <span>Gulberg III</span>
            <span>|</span>
            <span>Bahria Town</span>
          </div>
        </div>
      </footer>
    </div>
  );
}