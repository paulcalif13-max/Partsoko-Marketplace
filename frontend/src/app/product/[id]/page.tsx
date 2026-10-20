'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
  partNumber?: string;
  brand?: string;
  condition?: string;
  compatibility?: string;
  images?: string;
  seller?: {
    name?: string;
    businessName?: string;
    phone?: string;
  };
}

const FALLBACK_PRODUCTS: Record<string, ProductData> = {
  default: {
    id: 'prod-fallback',
    name: 'Brembo Premium Ceramic Brake Pads Set (Front)',
    description: 'Original Brembo ceramic front brake pad set offering superior stopping bite, zero squeal, and minimal rotor wear. Formulated specifically for high-performance and demanding Kenyan road conditions.',
    price: 14500,
    stock: 18,
    category: 'BRAKES',
    partNumber: 'P83082N',
    brand: 'Brembo Italy',
    condition: 'Brand New (Original Box)',
    compatibility: 'Toyota Land Cruiser Prado J150 (2009-2023), Lexus GX460, Toyota Hilux Revo 2.8GD',
    images: 'https://images.unsplash.com/photo-1600703136783-bdb5ef36f914?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'Nairobi Brakes & Suspension Ltd',
      businessName: 'Ruaka Auto Hub',
      phone: '+254 702 420 404'
    }
  }
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductData>(FALLBACK_PRODUCTS.default);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setProduct({
              ...FALLBACK_PRODUCTS.default,
              ...data,
              price: Number(data.price) || 14500
            });
          }
        }
      } catch (err) {
        // Fallback gracefully to high-res auto sample
        setProduct(prev => ({
          ...prev,
          id: params.id,
          name: params.id.includes('engine') 
            ? 'Toyota 1GD-FTV 2.8L D-4D Turbo Diesel Complete Engine' 
            : prev.name
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        partNumber: product.partNumber,
        brand: product.brand,
        image: product.images || 'https://images.unsplash.com/photo-1600703136783-bdb5ef36f914?auto=format&fit=crop&w=800&q=80'
      });
    }

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center space-x-2">
        <a href="/" className="hover:text-brandRed">Home</a>
        <span>/</span>
        <a href="/search" className="hover:text-brandRed">Auto Parts</a>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brandDark text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border-l-4 border-green-500 animate-bounce">
          <span className="text-xl">✓</span>
          <div>
            <p className="text-xs font-bold">Added to Cart!</p>
            <p className="text-[11px] text-gray-300">{quantity}x {product.name}</p>
          </div>
          <a href="/cart" className="ml-4 bg-brandRed text-white text-xs px-3 py-1 rounded font-bold hover:bg-red-700">
            View Cart
          </a>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 sm:p-10">
          
          {/* Column 1: Image & Badges */}
          <div>
            <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-[4/3] flex items-center justify-center">
              <img 
                src={product.images || 'https://images.unsplash.com/photo-1600703136783-bdb5ef36f914?auto=format&fit=crop&w=800&q=80'} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <span className="absolute top-3 left-3 bg-brandDark text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                {product.condition || 'Verified Genuine'}
              </span>
              <span className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                Verified In Stock
              </span>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg">
                <span className="text-lg">🛡️</span>
                <p className="text-[10px] font-bold text-gray-800 mt-1">Guaranteed Fit</p>
                <p className="text-[9px] text-gray-500">Free VIN matching</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg">
                <span className="text-lg">🚚</span>
                <p className="text-[10px] font-bold text-gray-800 mt-1">Nairobi / Ruaka</p>
                <p className="text-[9px] text-gray-500">Same-day delivery</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg">
                <span className="text-lg">↩️</span>
                <p className="text-[10px] font-bold text-gray-800 mt-1">7-Day Returns</p>
                <p className="text-[9px] text-gray-500">Exchange or refund</p>
              </div>
            </div>
          </div>

          {/* Column 2: Details & Pricing */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-brandRed uppercase tracking-wider">
                  Brand: {product.brand || 'Original Equipment Manufacturer'}
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  Part #: <strong className="text-gray-900">{product.partNumber || 'OEM-84920'}</strong>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="bg-red-50/60 border border-red-100 rounded-xl p-4 mb-6 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">PARTSOKO Price</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-brandRed">
                    KES {product.price.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-gray-500">VAT & PARTSOKO buyer protection included</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                    {product.stock} units left
                  </span>
                </div>
              </div>

              {/* Vehicle Compatibility Box */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
                <div className="flex items-center text-xs font-bold text-gray-800 mb-1.5">
                  <span className="text-brandRed mr-2">🚙</span> Compatible Vehicles:
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {product.compatibility || 'Universal fit for most common sedan and SUV applications in Kenya. Verify with your chassis/VIN number.'}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Description & Specs</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Actions & Quantity */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-gray-900 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-brandRed text-white py-3.5 px-6 rounded-lg font-bold hover:bg-red-700 transition shadow flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  <span>Add to Shopping Cart</span>
                </button>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
                <a 
                  href={`https://wa.me/254702420404?text=Hi%20PARTSOKO%2C%20I%20am%20inquiring%20about%20Part%20${product.partNumber || product.name}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-green-700 font-semibold hover:underline flex items-center"
                >
                  💬 Inquire on WhatsApp (+254 702 420 404)
                </a>
                <a href="/mechanics" className="text-primary font-semibold hover:underline">
                  Need installation? Book a mechanic &rarr;
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
