'use client';

import { useState } from 'react';

export default function ImportQuotePage() {
  const [url, setUrl] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [notes, setNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('0702420404');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/imports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          vehicleMake,
          vehicleModel,
          vehicleYear,
          notes,
          customerName,
          customerPhone
        })
      });

      const data = await res.json();
      if (res.ok) {
        setReferenceCode(data.referenceCode || `PSK-IMP-${Date.now().toString().slice(-6)}`);
      } else {
        setReferenceCode(`PSK-IMP-${Date.now().toString().slice(-6)}`);
      }
      setSubmitted(true);
    } catch (err) {
      setReferenceCode(`PSK-IMP-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in-up">
          <span className="bg-blue-100 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Global Sourcing</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brandDark mb-4 tracking-tight">
            Import Any Part with <span className="text-primary">Confidence</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Found a part on Alibaba, eBay, Japan, or an overseas supplier? Paste the link below.
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-brandDark text-white p-6 md:p-8 rounded-2xl shadow-hover mb-10 flex flex-col md:flex-row items-center justify-between border-l-4 border-brandRed animate-fade-in-up" style={{animationDelay: '100ms'}}>
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-xl font-bold mb-2">The PARTSOKO Guarantee</h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Request an import quote. PARTSOKO verifies availability, compatibility, regulatory requirements, and calculates the exact landed cost before you commit.
            </p>
          </div>
          <div className="flex-shrink-0 text-5xl">
            🌍
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-soft p-6 md:p-10 border border-gray-100 animate-fade-in-up" style={{animationDelay: '200ms'}}>
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-brandDark mb-2">Quote Request Received!</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-sm mx-auto mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Your Tracking Reference</p>
                <p className="text-xl font-black text-primary mt-1">{referenceCode}</p>
              </div>
              <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
                Our sourcing experts in Nairobi are verifying the supplier, customs duties, air/sea freight, and fitment for your vehicle. We will send a consolidated landed quote to <span className="font-bold text-brandDark">{customerPhone}</span>.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-brandDark text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition text-sm"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* URL Input */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-brandDark">
                  Product Link (URL) <span className="text-brandRed">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input 
                    type="url" 
                    required 
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://www.alibaba.com/product-detail/... or https://www.ebay.com/itm/..." 
                    className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition font-medium text-sm"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Accepts URLs from Alibaba, eBay, Japanese, European, US suppliers, or any legitimate manufacturer.</p>
              </div>

              {/* Compatibility Info */}
              <div className="pt-4 pb-2 border-b border-gray-100">
                <h3 className="font-bold text-brandDark mb-1">Vehicle Verification</h3>
                <p className="text-xs text-gray-500 mb-4">Provide your vehicle details so we can guarantee the part fits perfectly.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Make *</label>
                    <input type="text" required value={vehicleMake} onChange={e => setVehicleMake(e.target.value)} placeholder="e.g. Toyota" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Model *</label>
                    <input type="text" required value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} placeholder="e.g. Prado TX" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Year of Manufacture *</label>
                    <input type="number" required value={vehicleYear} onChange={e => setVehicleYear(e.target.value)} placeholder="e.g. 2018" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-2 pb-2 border-b border-gray-100">
                <h3 className="font-bold text-brandDark mb-1">Where Should We Send the Landed Quote?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                    <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g. Paul M." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone / WhatsApp *</label>
                    <input type="text" required value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="0702420404" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-brandDark">
                  Additional Notes (Optional)
                </label>
                <textarea 
                  rows={3} 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Part numbers, specific variants, color codes, or urgent timelines..." 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition text-sm"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brandRed text-white py-4 rounded-xl font-extrabold text-base shadow-soft hover:shadow-hover hover:bg-red-700 transition flex justify-center items-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Transmitting to Sourcing Desk...
                    </span>
                  ) : (
                    "GET PARTSOKO IMPORT QUOTE"
                  )}
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  By requesting a quote, you agree to our Import Servicing Terms and Conditions.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
