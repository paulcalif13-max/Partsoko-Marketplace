'use client';

import { useState } from 'react';

// Mock cart items
const initialCart = [
  { id: '1', name: 'Brake Pads (Ceramic)', price: 45.0, quantity: 2, seller: 'AutoParts Inc' },
  { id: '2', name: 'Spark Plugs (Iridium)', price: 12.5, quantity: 4, seller: 'Nairobi Motors' },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // These would typically come from the backend Quotation Engine
  const commission = subtotal * 0.05;
  const tax = subtotal * 0.16;
  const total = subtotal + commission + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-lg shadow-sm">
          Your cart is empty. <a href="/search" className="text-primary hover:underline">Continue shopping</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gray-200 rounded flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Seller: {item.seller}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="text-red-500 text-sm hover:text-red-700 mt-2">Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary / Quotation Preview */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quotation Summary</h2>
            <div className="space-y-3 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Commission (5%)</span>
                <span>${commission.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <a 
              href="/checkout"
              className="w-full block text-center bg-primary text-white py-3 px-4 rounded-md font-bold hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </a>
            <p className="text-xs text-gray-500 text-center mt-4">
              Final import fees and delivery will be calculated at checkout.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
