'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');

  // Hardcoded values from the Quotation Engine for demonstration
  const quotation = {
    subtotal: 140.00,
    commissionFee: 7.00,
    taxFee: 22.40,
    importFee: 22.40, // Assuming 16% import tax
    deliveryFee: 20.00,
    totalAmount: 211.80
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Processing payment via ${paymentMethod} for $${quotation.totalAmount.toFixed(2)}`);
    // In a real app, this would submit the order and redirect to payment gateway
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout & Payment</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Final Quotation</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between"><span>Parts Subtotal:</span> <span>${quotation.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Marketplace Commission:</span> <span>${quotation.commissionFee.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Local Tax (16%):</span> <span>${quotation.taxFee.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Importation Fee (16%):</span> <span>${quotation.importFee.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Delivery:</span> <span>${quotation.deliveryFee.toFixed(2)}</span></div>
            <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold text-xl text-gray-900">
              <span>Total Amount Due:</span> <span>${quotation.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleCheckout}>
          <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
          <div className="space-y-4 mb-8">
            <label className={`block p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  value="mpesa" 
                  checked={paymentMethod === 'mpesa'} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="ml-3 font-semibold text-gray-900">M-Pesa (Safaricom)</span>
              </div>
            </label>
            <label className={`block p-4 border rounded-lg cursor-pointer transition ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === 'card'} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="ml-3 font-semibold text-gray-900">Credit / Debit Card (Stripe)</span>
              </div>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-4 px-4 rounded-md font-bold text-lg hover:bg-green-700 transition shadow-sm"
          >
            Pay Now (${quotation.totalAmount.toFixed(2)})
          </button>
        </form>
      </div>
    </div>
  );
}
