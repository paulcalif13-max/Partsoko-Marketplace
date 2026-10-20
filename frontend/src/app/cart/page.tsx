'use client';

import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, commissionFee, taxFee, deliveryFee, totalAmount } = useCart();

  return (
    <div className="bg-surface min-h-[80vh] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-brandDark">Your Shopping Cart</h1>
            <p className="text-sm text-gray-500 mt-1">Review your selected parts and auto accessories.</p>
          </div>
          <a href="/search" className="text-sm font-bold text-primary hover:underline flex items-center">
            ← Continue Shopping
          </a>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-xl mx-auto">
            <span className="text-6xl mb-4 block">🛒</span>
            <h2 className="text-xl font-bold text-brandDark mb-2">Your cart is currently empty</h2>
            <p className="text-gray-500 text-sm mb-6">Looks like you haven't added any spare parts yet.</p>
            <a 
              href="/search" 
              className="bg-brandDark text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-brandRed transition shadow-soft inline-block"
            >
              Browse Spare Parts Catalog
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-200 transition">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-2 flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-brandDark leading-snug">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Sold by: <span className="font-semibold text-gray-700">{item.seller || 'PARTSOKO Verified Vendor'}</span></p>
                      <p className="text-xs font-bold text-primary mt-1">KES {item.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-bold text-xs text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Line Total & Remove */}
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-brandDark">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-brandRed text-xs hover:underline mt-1 font-semibold flex items-center ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary / Quotation Preview */}
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 h-fit space-y-6">
              <h2 className="text-lg font-bold text-brandDark border-b border-gray-100 pb-3">Quotation Summary</h2>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Parts Subtotal</span>
                  <span className="font-bold text-brandDark">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Marketplace Commission (5%)</span>
                  <span>KES {commissionFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local VAT (16%)</span>
                  <span>KES {taxFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Delivery (Kenya)</span>
                  <span>KES {deliveryFee.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-base font-extrabold text-brandDark">
                  <span>Total Amount Due</span>
                  <span className="text-lg text-brandRed">KES {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <a
                href="/checkout"
                className="w-full bg-brandRed text-white py-3.5 rounded-xl font-bold text-center block hover:bg-red-700 transition shadow-soft text-sm"
              >
                Proceed to Checkout
              </a>

              <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] text-gray-400">
                <span>🔒 Secure checkout via M-Pesa & Cards</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
