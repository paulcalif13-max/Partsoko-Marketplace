'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, commissionFee, taxFee, deliveryFee, totalAmount } = useCart();

  // Quotation Modal State
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [clientEmail, setClientEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [notes, setNotes] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState<string | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const handleSendQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail || !clientEmail.includes('@')) {
      setQuoteError('Please enter a valid email address.');
      return;
    }

    setIsSending(true);
    setQuoteError(null);
    setQuoteSuccess(null);

    try {
      const response = await fetch('/api/quotes/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientEmail,
          clientName: clientName.trim() || undefined,
          companyName: companyName.trim() || undefined,
          clientPhone: clientPhone.trim() || undefined,
          vehicleInfo: vehicleInfo.trim() || undefined,
          notes: notes.trim() || undefined,
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            seller: item.seller,
            price: item.price,
            quantity: item.quantity,
          })),
          subtotal,
          commissionFee,
          taxFee,
          deliveryFee,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to dispatch quotation email.');
      }

      setQuoteSuccess(`Official CALREE Quotation [${data.quoteNumber}] dispatched successfully to ${clientEmail}!`);
      if (data.htmlPreview) {
        setPreviewHtml(data.htmlPreview);
      }
    } catch (err: any) {
      setQuoteError(err.message || 'An error occurred while sending the quotation.');
    } finally {
      setIsSending(false);
    }
  };

  const handleOpenPrintable = () => {
    if (!previewHtml) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(previewHtml);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  return (
    <div className="bg-surface min-h-[80vh] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full mb-2 inline-block">
              CALREE Marketplace Order Desk
            </span>
            <h1 className="text-3xl font-extrabold text-brandDark">Your Shopping Cart</h1>
            <p className="text-sm text-gray-500 mt-1">Review your selected parts, calculate landed totals, or issue official quotations.</p>
          </div>
          <a href="/search" className="text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center">
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
              className="bg-calreeGreen text-slate-950 font-black px-8 py-3 rounded-full text-sm hover:bg-emerald-400 transition shadow-soft inline-block active:scale-95"
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
                      <p className="text-xs text-gray-500 mt-1">Sold by: <span className="font-semibold text-gray-700">{item.seller || 'CALREE Verified Vendor'}</span></p>
                      <p className="text-xs font-bold text-emerald-700 mt-1">KES {item.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition font-bold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-bold text-xs text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition font-bold"
                        aria-label="Increase quantity"
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
                        className="text-rose-600 hover:text-rose-700 text-xs hover:underline mt-1 font-semibold flex items-center ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary / Quotation Preview */}
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 h-fit space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="text-lg font-bold text-brandDark">Quotation Summary</h2>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Official Estimate
                </span>
              </div>
              
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
                  <span className="text-xl font-black text-slate-900">KES {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href="/checkout"
                  className="w-full bg-calreeGreen text-slate-950 py-3.5 rounded-xl font-black text-center block hover:bg-emerald-400 transition shadow-sm text-sm active:scale-95"
                >
                  Proceed to Checkout &rarr;
                </a>

                {/* Email Quotation Trigger Button */}
                <button
                  type="button"
                  onClick={() => {
                    setQuoteSuccess(null);
                    setQuoteError(null);
                    setShowQuoteModal(true);
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-calreeGreen border border-calreeGreen/30 py-3 rounded-xl font-bold text-center flex items-center justify-center space-x-2 transition shadow-xs text-sm active:scale-95"
                >
                  <svg className="w-4 h-4 text-calreeGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>Email Official Quotation</span>
                </button>
              </div>

              <div className="pt-2 flex flex-col items-center justify-center text-center space-y-1 text-[11px] text-gray-400 border-t border-gray-100">
                <div className="flex items-center space-x-1.5">
                  <span>🔒 Secure M-Pesa & Card Checkout</span>
                  <span>&bull;</span>
                  <span>14-day Quote Validity</span>
                </div>
                <div className="text-gray-500 font-medium">Official CALREE Quotations valid for LPO & corporate accounting.</div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Official Quotation Dispatch Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-950 text-white p-5 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-calreeGreen text-slate-950 font-black flex items-center justify-center text-lg">
                  C
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base tracking-wide text-white">Email Official Quotation</h3>
                  <p className="text-[11px] text-gray-400">CALREE Automotive Marketplace &bull; Ruaka, Nairobi</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowQuoteModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {quoteSuccess ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto font-black">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-1">Quotation Dispatched!</h4>
                    <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                      {quoteSuccess}
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-left space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Quoted Total:</span>
                      <span className="font-extrabold text-slate-900">KES {totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Valid Period:</span>
                      <span className="font-bold text-emerald-700">14 Calendar Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Support Desk:</span>
                      <span className="font-bold text-slate-900">+254 702 420 404</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    {previewHtml && (
                      <button
                        type="button"
                        onClick={handleOpenPrintable}
                        className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs transition"
                      >
                        <svg className="w-4 h-4 text-calreeGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                        </svg>
                        <span>View / Print Proforma</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowQuoteModal(false)}
                      className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2.5 px-4 rounded-xl text-xs transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendQuotation} className="space-y-4">
                  {quoteError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg font-medium text-xs">
                      {quoteError}
                    </div>
                  )}

                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-900 text-[11px] leading-relaxed">
                    <strong>Official Proforma Quotation:</strong> The client will receive an itemized email with the official CALREE geometric emblem, company contact details, KES breakdown, and payment instructions.
                  </div>

                  {/* Required Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Recipient / Client Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. client@company.co.ke or buyer@gmail.com"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none"
                    />
                  </div>

                  {/* Recipient Full Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Client Name</label>
                      <input 
                        type="text"
                        placeholder="e.g. David Kamau"
                        value={clientName}
                        onChange={e => setClientName(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Company / Garage Name</label>
                      <input 
                        type="text"
                        placeholder="e.g. Apex Auto Clinic"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none"
                      />
                    </div>
                  </div>

                  {/* Client Phone & Vehicle Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Client Phone / WhatsApp</label>
                      <input 
                        type="tel"
                        placeholder="e.g. 0712345678"
                        value={clientPhone}
                        onChange={e => setClientPhone(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Make / Model / Reg</label>
                      <input 
                        type="text"
                        placeholder="e.g. Prado TX (KDL 345X)"
                        value={vehicleInfo}
                        onChange={e => setVehicleInfo(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none"
                      />
                    </div>
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Special Notes / PO Reference</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Requested for corporate overhaul approval; urgent delivery to Westlands branch."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-calreeGreen focus:border-calreeGreen outline-none"
                    ></textarea>
                  </div>

                  {/* Summary of Items to be Quoted */}
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center font-bold text-xs text-gray-800">
                      <span>Total Quotation Items:</span>
                      <span>{cart.length} item{cart.length > 1 ? 's' : ''} ({cart.reduce((a, b) => a + b.quantity, 0)} units)</span>
                    </div>
                    <div className="flex justify-between items-center font-extrabold text-sm text-slate-900 mt-1">
                      <span>Grand Total:</span>
                      <span className="text-emerald-700">KES {totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-calreeGreen text-slate-950 font-black py-3 rounded-xl hover:bg-emerald-400 transition shadow-sm text-xs flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-95"
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-900" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating & Dispatching Quotation...</span>
                      </>
                    ) : (
                      <>
                        <span>✉️ Send Official CALREE Quotation</span>
                        <span>&rarr;</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
