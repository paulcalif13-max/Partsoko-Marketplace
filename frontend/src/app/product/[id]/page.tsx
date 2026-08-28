'use client';

// In a real app, you would fetch this from /api/products/:id
export default function ProductDetail({ params }: { params: { id: string } }) {
  // Mock data
  const product = {
    id: params.id,
    name: 'Brake Pads (Ceramic)',
    description: 'High-quality ceramic brake pads designed for optimal stopping power and low dust generation. Compatible with most sedan and SUV models (2015-2023).',
    price: 45.00,
    stock: 24,
    seller: 'AutoParts Inc',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 w-full md:w-1/2 h-64 md:h-auto bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg">Product Image Placeholder</span>
          </div>
          <div className="p-8 w-full md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold">Automotive Part</div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Sold by <span className="font-semibold text-gray-900">{product.seller}</span>
            </p>
            <p className="mt-4 text-gray-600">
              {product.description}
            </p>
            
            <div className="mt-8 flex items-center justify-between">
              <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
              </span>
            </div>

            <div className="mt-8">
              <button 
                className="w-full bg-primary text-white py-3 px-4 rounded-md font-bold hover:bg-blue-700 transition shadow-sm"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              Requires login to checkout or generate quotation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
