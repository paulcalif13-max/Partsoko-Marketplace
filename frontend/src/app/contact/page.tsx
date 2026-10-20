'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-surface min-h-[80vh] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="bg-blue-50 text-primary text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mb-3">
              We're Here to Help
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brandDark mb-3">
              Contact PARTSOKO Support
            </h1>
            <p className="text-gray-500 text-sm">
              Have questions about spare parts fitment, global orders, mechanic bookings, or merchant onboarding?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-50 text-brandRed rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-base text-brandDark">Main Office</h3>
                  <p className="text-sm text-gray-500">Ruaka near Tech Driving, Kiambu County, Kenya</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  💬
                </div>
                <div>
                  <h3 className="font-bold text-base text-brandDark">Customer WhatsApp & Call Line</h3>
                  <p className="text-sm text-gray-500 font-semibold">+254 702 420 404</p>
                  <p className="text-xs text-gray-400">Available 24/7 for emergency towing & parts sourcing</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold text-base text-brandDark">Email Support</h3>
                  <p className="text-sm text-gray-500 font-semibold">partsoko@gmail.com</p>
                  <p className="text-xs text-gray-400">Replies typically within 1 hour</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                    ✓
                  </div>
                  <h3 className="font-bold text-lg text-brandDark mb-1">Message Sent!</h3>
                  <p className="text-xs text-gray-500">Our customer care desk will contact you promptly.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                    <input required type="text" placeholder="Jane Doe" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email / Phone</label>
                    <input required type="text" placeholder="0702420404 or jane@gmail.com" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Subject / Part Inquiry</label>
                    <input required type="text" placeholder="e.g. Inquiring on Mercedes W205 Shock Absorbers" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
                    <textarea required rows={3} placeholder="Please provide your car VIN / chassis number or detailed requirement..." className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-brandDark text-white py-3 rounded-xl font-bold text-xs hover:bg-brandRed transition shadow-sm">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
