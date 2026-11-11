'use client';

import React, { useState } from 'react';
import PartScannerModal from '@/components/PartScannerModal';

export default function ScanPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="bg-surface min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden mb-8 border border-slate-800">
          <div className="relative z-10">
            <span className="bg-calreeGreen text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              CALREE Smart Recognition &bull; Vehicle Fitment
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
              Scan &amp; Match Your <span className="text-calreeGreen">Spare Part</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed mb-6">
              Take or upload a photo of the spare part, enter its OEM part number, and select your specific vehicle to guarantee 100% fitment before buying.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-calreeGreen hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 text-sm tracking-wide active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Open Part Scanner &amp; Upload
            </button>
          </div>

          {/* Background Accents */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-calreeGreen/10 to-transparent pointer-events-none hidden sm:block"></div>
        </div>

        {/* 3 Step Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-black text-sm flex items-center justify-center mb-4 border border-emerald-100">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Scan or Upload Photo</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Use your phone camera or upload a clear photo of the part, damaged component, or original box label.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-black text-sm flex items-center justify-center mb-4 border border-emerald-100">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Input OEM Part Number</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Enter the stamped part code (e.g. 04465-60320) or let the scanner detect it automatically from your image.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-black text-sm flex items-center justify-center mb-4 border border-emerald-100">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Lock in Specific Vehicle</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Select your vehicle Make, Model, Year, and Engine/Chassis to verify exact fitment and order with total confidence.
            </p>
          </div>
        </div>

        {/* Direct Sourcing Assistance Banner */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm">Need help identifying an unlabelled part?</h4>
            <p className="text-xs text-gray-500 mt-1">Our Ruaka parts specialists can cross-reference your chassis/VIN on WhatsApp.</p>
          </div>

          <a
            href="https://wa.me/254702420404?text=Habari%20CALREE%2C%20I%20need%20help%20identifying%20a%20spare%20part%20for%20my%20vehicle."
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm flex-shrink-0"
          >
            Chat with Parts Specialist (+254 702 420 404)
          </a>
        </div>

      </div>

      {/* Embedded Scanner Modal */}
      <PartScannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
