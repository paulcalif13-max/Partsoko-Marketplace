'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const DEFAULT_PARTS = [
  { id: 'p1', name: 'Toyota Prado 150 Front Brake Pads (Genuine)', price: 12500, category: 'SUSPENSION', brand: 'Toyota Genuine', condition: 'NEW', seller: 'AutoParts KE', image: '/products/brake-pads.png' },
  { id: 'p2', name: 'Alternator 12V 150A - Denso (Keunner/Prado)', price: 28000, category: 'ELECTRICAL', brand: 'Denso', condition: 'NEW', seller: 'PowerParts Ltd', image: '/products/alternator.png' },
  { id: 'p3', name: 'Android Car Multimedia (Universal 9" IPS Touchscreen)', price: 18500, category: 'ELECTRICAL', brand: 'TechAuto', condition: 'NEW', seller: 'TechAuto Solutions', image: '/products/multimedia.png' },
  { id: 'p4', name: 'LED Headlight Bulbs H11 (6000K Super Bright)', price: 4200, category: 'LIGHTING', brand: 'AutoLED', condition: 'NEW', seller: 'AutoLED Kenya', image: '/products/led-bulbs.png' },
  { id: 'p5', name: 'Raspberry Pi 5 - 8GB OBD2 Diagnostic System', price: 15800, category: 'ELECTRICAL', brand: 'Makers', condition: 'NEW', seller: 'Makers Hub', image: '/products/raspberry.png' },
  { id: 'p6', name: 'Subaru Forester SJ Turbocharge Assembly', price: 48000, category: 'ENGINE', brand: 'IHI Turbo', condition: 'REFURBISHED', seller: 'Subaru Pros KE', image: '/categories/engine.png' },
  { id: 'p7', name: 'Hilux D-4D Common Rail Diesel Injectors (Set of 4)', price: 65000, category: 'FUEL', brand: 'Denso Japan', condition: 'NEW', seller: 'Diesel Care Ruaka', image: '/categories/fuel.png' },
  { id: 'p8', name: 'Heavy Duty Transmission Gearbox 4WD', price: 85000, category: 'TRANSMISSION', brand: 'Aisin', condition: 'USED', seller: 'Nairobi Gearbox Center', image: '/categories/transmission.png' },
  { id: 'p9', name: 'Front Suspension Strut & Coil Springs Pair', price: 24500, category: 'SUSPENSION', brand: 'KYB Excel-G', condition: 'NEW', seller: 'Suspension KE', image: '/categories/suspension.png' },
  { id: 'p10', name: 'Mercedes Benz W205 LED Headlamp Left Assembly', price: 72000, category: 'LIGHTING', brand: 'Magneti Marelli', condition: 'NEW', seller: 'EuroParts Kenya', image: '/categories/lighting.png' },
  { id: 'p11', name: 'Front Bumper Cover (Primer Finish)', price: 16000, category: 'BODY', brand: 'OEM Replacement', condition: 'NEW', seller: 'BodyCraft Nairobi', image: '/categories/body.png' },
];

export default function SearchPage() {
  const { addToCart } = useCart();
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedCondition, setSelectedCondition] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [products, setProducts] = useState<any[]>(DEFAULT_PARTS);
  const [loading, setLoading] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Read URL query params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const q = params.get('keyword');
      if (cat) setSelectedCategory(cat.toUpperCase());
      if (q) setKeyword(q);
      fetchProducts(q || '', cat || '');
    }
  }, []);

  const fetchProducts = async (searchKeyword = '', catFilter = '') => {
    setLoading(true);
    try {
      let url = '/api/products?';
      if (searchKeyword) url += `keyword=${searchKeyword}&`;
      if (catFilter && catFilter !== 'ALL') url += `category=${catFilter}&`;

      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        // Fallback to rich local catalog if DB is newly initialized
        setProducts(DEFAULT_PARTS);
      }
    } catch (err) {
      setProducts(DEFAULT_PARTS);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(keyword, selectedCategory);
  };

  const filteredProducts = products.filter((p) => {
    const matchesKeyword =
      !keyword ||
      p.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(keyword.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(keyword.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'ALL' ||
      (p.category && p.category.toUpperCase() === selectedCategory.toUpperCase());

    const matchesCondition =
      selectedCondition === 'ALL' ||
      (p.condition && p.condition.toUpperCase() === selectedCondition.toUpperCase());

    const matchesPrice = p.price <= maxPrice;

    return matchesKeyword && matchesCategory && matchesCondition && matchesPrice;
  });

  return (
    <div className="bg-surface min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Search Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-brandDark">Automotive Spare Parts Catalog</h1>
            <p className="text-xs text-gray-500 mt-0.5">Explore 100% verified genuine auto components and accessories.</p>
          </div>

          <form onSubmit={handleSearch} className="w-full md:w-1/2 flex bg-gray-50 rounded-xl p-1 border border-gray-200">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search parts by name, OEM part #, model, or brand..."
              className="w-full px-4 py-2 bg-transparent text-sm outline-none font-medium"
            />
            <button
              type="submit"
              className="bg-brandDark text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-brandRed transition flex items-center"
            >
              Search
            </button>
          </form>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-none">
          {['ALL', 'ENGINE', 'TRANSMISSION', 'SUSPENSION', 'ELECTRICAL', 'LIGHTING', 'FUEL', 'BODY'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                fetchProducts(keyword, cat);
              }}
              className={`text-xs px-4 py-2 rounded-full font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-brandRed text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat === 'ALL' ? 'All Categories' : cat.charAt(0) + cat.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Side Filters */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-6">
            <h3 className="font-bold text-sm text-brandDark uppercase tracking-wider border-b border-gray-100 pb-2">Filters</h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Condition</label>
              <div className="space-y-1.5">
                {['ALL', 'NEW', 'REFURBISHED', 'USED'].map((cond) => (
                  <label key={cond} className="flex items-center text-xs font-medium text-gray-600 cursor-pointer">
                    <input
                      type="radio"
                      name="condition"
                      value={cond}
                      checked={selectedCondition === cond}
                      onChange={() => setSelectedCondition(cond)}
                      className="mr-2 text-brandRed focus:ring-brandRed"
                    />
                    {cond === 'ALL' ? 'Any Condition' : cond.charAt(0) + cond.slice(1).toLowerCase()}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Max Price</label>
                <span className="text-xs font-extrabold text-brandRed">KES {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brandRed"
              />
            </div>

            <button
              onClick={() => {
                setKeyword('');
                setSelectedCategory('ALL');
                setSelectedCondition('ALL');
                setMaxPrice(100000);
              }}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition"
            >
              Reset Filters
            </button>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 font-medium text-sm">Searching parts catalog...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8">
                <span className="text-5xl mb-4 block">🔍</span>
                <h3 className="font-bold text-lg text-brandDark mb-2">No spare parts found</h3>
                <p className="text-xs text-gray-500 mb-6">Can't find what you need in local stock? You can import any rare part from global suppliers.</p>
                <a
                  href="/services/import"
                  className="bg-brandRed text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-red-700 transition shadow-sm inline-block"
                >
                  Request Global Import Quote
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((prod, idx) => (
                  <div
                    key={prod.id || idx}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-hover hover:border-gray-200 transition flex flex-col relative group"
                  >
                    <div className="h-40 rounded-xl bg-gray-50/50 mb-3 flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={prod.image || '/categories/engine.png'}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => { e.currentTarget.src = '/categories/engine.png'; }}
                      />
                    </div>

                    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">{prod.category || 'Spare Part'}</span>
                    <h3 className="font-bold text-xs text-brandDark mb-2 leading-snug line-clamp-2 h-8">{prod.name}</h3>
                    
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
                      <span>Brand: <strong className="text-gray-700">{prod.brand || 'OEM'}</strong></span>
                      <span className="text-green-600 font-bold">● In Stock</span>
                    </div>

                    <div className="text-base font-extrabold text-brandDark mb-4">
                      KES {prod.price.toLocaleString()}
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 truncate w-24">{prod.seller?.name || prod.seller || 'Verified Dealer'}</span>
                      <button
                        onClick={() => {
                          addToCart({
                            id: prod.id,
                            name: prod.name,
                            price: prod.price,
                            image: prod.image,
                            seller: prod.seller?.name || prod.seller
                          });
                          setAddedItem(prod.id);
                          setTimeout(() => setAddedItem(null), 1500);
                        }}
                        className={`text-[10px] px-3.5 py-1.5 rounded-lg font-bold transition shadow-sm ${
                          addedItem === prod.id ? 'bg-green-600 text-white' : 'bg-brandDark text-white hover:bg-brandRed'
                        }`}
                      >
                        {addedItem === prod.id ? 'Added! ✓' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
