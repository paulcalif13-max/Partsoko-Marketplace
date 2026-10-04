export default function Home() {
  return (
    <div className="bg-surface pb-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gradient-to-r from-blue-50 to-gray-100 rounded-2xl overflow-hidden shadow-soft flex flex-col md:flex-row items-center relative animate-fade-in-up">
          
          <div className="md:w-1/2 p-12 lg:p-16 relative z-10">
            <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-4">Your One-Stop Auto & Electronics Marketplace</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-brandDark leading-tight tracking-tight mb-6">
              Quality Parts.<br/>
              <span className="text-primary">Better Journeys.</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-md text-lg">
              Find genuine spare parts, automotive electronics, electronic components, maker products and consumer electronics — all in one place.
            </p>
            <div className="flex space-x-4">
              <a href="/search" className="bg-brandDark text-white px-8 py-3 rounded-full font-bold shadow-soft hover:shadow-hover hover:bg-gray-800 transition flex items-center">
                Shop Now <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
              <a href="/services/finance" className="border-2 border-gray-300 text-brandDark px-8 py-3 rounded-full font-bold hover:bg-white transition">
                Get a Quote
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 relative h-64 md:h-full min-h-[400px] w-full flex items-center justify-center p-8">
            {/* Clean empty right side as requested */}
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
            { name: 'Engines and Engine Parts', icon: '⚙️' },
            { name: 'Transmission and Drive Terrain', icon: '🔄' },
            { name: 'Suspension', icon: '🛞' },
            { name: 'Electrical and Electronics', icon: '⚡' },
            { name: 'Lighting', icon: '💡' },
            { name: 'Fuel Systems', icon: '⛽' },
            { name: 'Body and Exterior', icon: '🚘' }
          ].map((cat, i) => (
            <a href="/search" key={cat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-hover hover:border-primary transition group relative overflow-hidden flex flex-col">
              <div className="h-24 bg-surface rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300 border border-gray-100">
                {cat.icon}
              </div>
              <div className="absolute top-24 left-6 transform -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
              <h3 className="font-bold text-sm text-brandDark mb-1 leading-tight">{cat.name}</h3>
              <p className="text-xs text-gray-500 leading-tight">{cat.desc}</p>
              <div className="mt-auto pt-3 text-right">
                <svg className="w-4 h-4 text-primary inline-block opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
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
            { name: 'Toyota Prado Brake Pads (Front) - Genuine', price: 12500, rating: 4.8, reviews: 124, seller: 'AutoParts KE' },
            { name: 'Alternator 12V 150A - Denso (KDJ/Prado)', price: 28000, rating: 4.7, reviews: 98, seller: 'PowerParts Ltd' },
            { name: 'Android Car Multimedia (Universal 9")', price: 18500, rating: 4.6, reviews: 73, seller: 'TechAuto Solutions' },
            { name: 'LED Headlight Bulbs H11 (6000K)', price: 4200, rating: 4.5, reviews: 66, seller: 'AutoLED Kenya' },
            { name: 'Raspberry Pi 5 - 8GB', price: 15800, rating: 4.9, reviews: 42, seller: 'Makers Hub' }
          ].map((prod, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-hover transition flex flex-col relative group">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-brandRed transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>
              <div className="h-32 bg-surface rounded-lg mb-4 flex items-center justify-center text-4xl border border-gray-50 group-hover:bg-blue-50 transition">
                📦
              </div>
              <h3 className="font-medium text-xs text-brandDark mb-2 leading-tight h-8">{prod.name}</h3>
              <div className="flex items-center text-[10px] text-gray-500 mb-2">
                <span className="text-yellow-400 mr-1">⭐</span> <span className="font-bold text-gray-700 mr-1">{prod.rating}</span> ({prod.reviews})
              </div>
              <div className="text-sm font-extrabold text-brandDark mb-1">KES {prod.price.toLocaleString()}</div>
              <div className="flex items-center text-[10px] text-green-600 font-bold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span> In Stock
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center text-[10px] text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span className="truncate w-16">{prod.seller}</span>
                </div>
                <button className="bg-brandDark text-white text-[10px] px-3 py-1.5 rounded font-bold hover:bg-primary transition">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 animate-fade-in-up" style={{animationDelay: '300ms'}}>
        <div className="bg-brandDark rounded-2xl overflow-hidden shadow-lg relative flex flex-col md:flex-row items-center border border-gray-800">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{backgroundImage: "url('/defender-bg.jpg')"}}></div>
          
          <div className="relative z-10 p-10 md:p-16 md:w-1/2">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">From a love of minimal shapes & edgy details</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">Premium Accessories<br/>for Your Ride</h2>
            <p className="text-gray-300 text-sm md:text-base mb-8 max-w-sm">Stylish, durable and built for everyday use. Discover a range of premium car accessories, bags and organizers.</p>
            <a href="/search" className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-soft hover:bg-blue-600 transition inline-flex items-center">
              Explore Accessories <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>

          <div className="relative z-10 md:w-1/2 flex justify-end p-8 hidden md:flex">
             <div className="bg-black/40 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-xl transform rotate-3">
               <p className="font-['Caveat',cursive] text-2xl font-bold text-white italic">Quality<br/>Meets Style</p>
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
