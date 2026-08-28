'use client';

import { useState, useEffect } from 'react';

// Mock data for display purposes
const mockProducts = [
  { id: '1', name: 'Brake Pads (Ceramic)', price: 45.0, seller: 'AutoParts Inc' },
  { id: '2', name: 'Spark Plugs (Iridium)', price: 12.5, seller: 'Nairobi Motors' },
  { id: '3', name: 'LED Headlights Kit', price: 85.0, seller: 'ElectroCar Parts' },
  { id: '4', name: 'Oil Filter (Premium)', price: 15.0, seller: 'AutoParts Inc' },
];

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (searchKeyword = '') => {
    try {
      const res = await fetch(`http://localhost:5000/api/products${searchKeyword ? `?keyword=${searchKeyword}` : ''}`);
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchProducts(keyword);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Search Spare Parts</h1>
        <form onSubmit={handleSearch} className="w-full md:w-1/2 flex">
          <input
            type="text"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary focus:border-primary"
            placeholder="Search parts by name, model, or brand..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-400">Image Placeholder</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">Sold by: {product.seller?.name || 'Unknown'}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
              <a href={`/product/${product.id}`} className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded hover:bg-gray-200">
                View
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          No products found matching "{keyword}"
        </div>
      )}
    </div>
  );
}
