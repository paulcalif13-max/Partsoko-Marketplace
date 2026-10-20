'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  return (
    <div className="bg-surface pb-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div 
          className="bg-brandDark rounded-2xl overflow-hidden shadow-soft flex flex-col md:flex-row items-center relative animate-fade-in-up bg-cover bg-center"
          style={{ backgroundImage: "url('/defender-bg.jpg')", backgroundBlendMode: 'overlay', backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
        >
          
          <div className="w-full p-12 lg:p-16 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2">
              <span className="bg-brandRed text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-widest mb-6 inline-block">
                PARTSOKO AUTO PARTS MARKETPLACE
              </span>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
                Quality Parts.<br/>
                Better <span className="text-brandRed">Journeys.</span>
              </h1>
              <p className="text-gray-300 mb-8 max-w-md text-lg">
                Genuine spare parts, automotive electronics, automotive components, and more — all in one place.
              </p>
              <div className="flex space-x-4">
                <a href="/search" className="bg-brandRed text-white px-6 py-3 rounded-full font-bold shadow-soft hover:shadow-hover hover:bg-red-700 transition flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  Shop Now 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
                <a href="/services/finance" className="border border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-brandDark transition flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  Get a Quote
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-end mt-10 md:mt-0 pr-8 hidden lg:flex">
              <p className="font-['Caveat',cursive] text-3xl font-bold text-white italic tracking-wider self-start mt-8 rotate-[-5deg]">Keep Your<br/>Vehicle Moving</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 animate-fade-in-up" style={{animationDelay: '100ms'}}>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-brandDark">Shop by Category</h2>
            <p className="text-sm text-gray-500 mt-1">Find the parts and products you need, fast and easy.</p>
          </div>
          <a href="/search" className="text-sm font-bold text-primary hover:underline flex items-center">View All Categories <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { name: 'Engine and Engine Parts', image: '/categories/engine.png' },
            { name: 'Transmission and Drive Terrain', image: '/categories/transmission.png' },
            { name: 'Suspension', image: '/categories/suspension.png' },
            { name: 'Electrical and Electronics', image: '/categories/electrical.png' },
            { name: 'Lighting', image: '/categories/lighting.png' },
            { name: 'Fuel System', image: '/categories/fuel.png' },
            { name: 'Body and Exterior', image: '/categories/body.png' }
          ].map((cat, i) => (
            <a href="/search" key={cat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 hover:shadow-hover hover:border-brandRed transition group relative overflow-hidden flex flex-col">
              <div className="h-28 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden rounded-lg bg-gray-50/50">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-contain p-1" />
              </div>
              <div className="absolute top-24 left-3 w-7 h-7 bg-brandRed text-white rounded-full flex items-center justify-center shadow-md border-2 border-white z-10">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
              <h3 className="font-bold text-xs text-brandDark mt-1 leading-tight flex-grow">{cat.name}</h3>
              <div className="mt-auto pt-2 text-right">
                <svg className="w-4 h-4 text-brandDark inline-block group-hover:text-brandRed transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 animate-fade-in-up" style={{animationDelay: '200ms'}}>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-brandDark">Featured Products</h2>
            <p className="text-sm text-gray-500 mt-1">Top picks from trusted sellers.</p>
          </div>
          <a href="/search" className="text-sm font-bold text-primary hover:underline flex items-center">View All Products <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'Toyota Prado Brake Pads (Front) - Genuine', price: 12500, rating: 4.8, reviews: 124, seller: 'AutoParts KE', image: '/products/brake-pads.png', badge: 'Best Seller', badgeColor: 'bg-brandRed' },
            { name: 'Alternator 12V 150A - Denso (Keunner/Prado)', price: 28000, rating: 4.7, reviews: 98, seller: 'PowerParts Ltd', image: '/products/alternator.png', badge: 'Fast Delivery', badgeColor: 'bg-blue-600' },
            { name: 'Android Car Multimedia (Universal 9")', price: 18500, rating: 4.6, reviews: 73, seller: 'TechAuto Solutions', image: '/products/multimedia.png', badge: 'Popular', badgeColor: 'bg-emerald-600' },
            { name: 'LED Headlight Bulbs H11 (6000K)', price: 4200, rating: 4.5, reviews: 66, seller: 'AutoLED Kenya', image: '/products/led-bulbs.png', badge: 'New', badgeColor: 'bg-blue-500' },
            { name: 'Raspberry Pi 5 - 8GB', price: 15800, rating: 4.9, reviews: 42, seller: 'Makers Hub', image: '/products/raspberry.png', badge: 'Tech', badgeColor: 'bg-purple-600' }
          ].map((prod, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-hover transition flex flex-col relative group">
              <span className={`absolute top-3 left-3 ${prod.badgeColor} text-white text-[9px] font-bold px-2 py-0.5 rounded-full z-10`}>
                {prod.badge}
              </span>
              <button className="absolute top-3 right-3 text-gray-400 hover:text-brandRed transition z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>
              <div className="h-32 rounded-lg mb-3 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="font-semibold text-xs text-brandDark mb-1.5 leading-tight h-8 line-clamp-2">{prod.name}</h3>
              <div className="flex items-center text-[10px] text-gray-500 mb-2">
                <span className="text-yellow-400 mr-1">⭐</span> <span className="font-bold text-gray-700 mr-1">{prod.rating}</span> ({prod.reviews})
              </div>
              <div className="text-sm font-extrabold text-brandDark mb-1.5">KES {prod.price.toLocaleString()}</div>
              <div className="flex items-center text-[10px] text-green-600 font-bold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span> In Stock
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-gray-100">
                <div className="flex items-center text-[10px] text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  <span className="truncate w-16">{prod.seller}</span>
                </div>
                <button 
                  onClick={() => {
                    addToCart({
                      id: `fp-${i}`,
                      name: prod.name,
                      price: prod.price,
                      image: prod.image,
                      seller: prod.seller
                    });
                    setAddedId(`fp-${i}`);
                    setTimeout(() => setAddedId(null), 1500);
                  }}
                  className={`text-[10px] px-3 py-1.5 rounded font-bold transition ${
                    addedId === `fp-${i}` ? 'bg-green-600 text-white' : 'bg-brandRed text-white hover:bg-red-700'
                  }`}
                >
                  {addedId === `fp-${i}` ? 'Added! ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 animate-fade-in-up" style={{animationDelay: '300ms'}}>
        <div className="bg-brandDark rounded-2xl overflow-hidden shadow-lg relative flex flex-col md:flex-row items-stretch border border-gray-800">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{backgroundImage: "url('/defender-bg.jpg')"}}></div>
          
          <div className="relative z-10 p-10 md:p-16 md:w-1/2 flex flex-col justify-center">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">MORE THAN JUST PARTS</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">Complete Automotive<br/>Solutions</h2>
            <p className="text-gray-300 text-sm md:text-base mb-8 max-w-sm">Find trusted mechanics, skilled technicians, import parts, and more — all in one platform.</p>
            <a href="/services/import" className="bg-brandRed text-white px-6 py-3 rounded-full font-bold shadow-soft hover:bg-red-700 transition inline-flex items-center w-max">
              Explore Services <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>

          <div className="relative z-10 md:w-1/2 flex flex-col justify-end p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
              <a href="/mechanics" className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:bg-black/80 transition cursor-pointer">
                <svg className="w-6 h-6 mx-auto text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <h4 className="text-white font-bold text-xs">Find Mechanic</h4>
                <p className="text-gray-400 text-[9px]">Skilled & verified</p>
              </a>
              <a href="/mechanics" className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:bg-black/80 transition cursor-pointer">
                <svg className="w-6 h-6 mx-auto text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                <h4 className="text-white font-bold text-xs">Find Technician</h4>
                <p className="text-gray-400 text-[9px]">Electrical & electronic</p>
              </a>
              <a href="/services/import" className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:bg-black/80 transition cursor-pointer">
                <svg className="w-6 h-6 mx-auto text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                <h4 className="text-white font-bold text-xs">Import Parts</h4>
                <p className="text-gray-400 text-[9px]">Global sourcing</p>
              </a>
              <a href="/events" className="bg-black/60 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:bg-black/80 transition cursor-pointer">
                <svg className="w-6 h-6 mx-auto text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <h4 className="text-white font-bold text-xs">Events</h4>
                <p className="text-gray-400 text-[9px]">Workshops & more</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-8 border-b border-gray-200 animate-fade-in-up" style={{animationDelay: '400ms'}}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center space-x-4">
            <svg className="w-8 h-8 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
            <div>
              <h4 className="font-bold text-sm text-brandDark">Genuine Products</h4>
              <p className="text-xs text-gray-500">Trusted sellers & brands</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <svg className="w-8 h-8 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
            <div>
              <h4 className="font-bold text-sm text-brandDark">Fast Delivery</h4>
              <p className="text-xs text-gray-500">Across Kenya</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <svg className="w-8 h-8 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <div>
              <h4 className="font-bold text-sm text-brandDark">Secure Payments</h4>
              <p className="text-xs text-gray-500">M-Pesa, Cards, Bank & Wallets</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <svg className="w-8 h-8 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <h4 className="font-bold text-sm text-brandDark">24/7 Support</h4>
              <p className="text-xs text-gray-500">We're here to help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
