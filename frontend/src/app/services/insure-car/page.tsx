'use client';

import { useState } from 'react';

const MOCK_QUOTES = [
  { id: 1, provider: 'Jubilee Insurance', type: 'Comprehensive', premium: 45000, features: ['Zero Theft Excess', 'Free Windscreen Cover', '24/7 Roadside Assist'] },
  { id: 2, provider: 'APA Insurance', type: 'Comprehensive', premium: 42000, features: ['Courtesy Car (14 Days)', 'Personal Accident Cover'] },
  { id: 3, provider: 'Directline Assurance', type: 'Third Party Only', premium: 7500, features: ['Legal Liability', 'Property Damage up to 20M'] },
];

export default function InsuranceHub() {
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState({ make: '', year: '', value: '' });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">PARTSOKO Insurance Connect</h1>
          <p className="text-lg text-gray-600">Compare quotes from top providers and get your vehicle covered instantly.</p>
        </div>

        {/* Step 1: Vehicle Details */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-2xl mx-auto animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Vehicle Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Make & Model</label>
                <input type="text" className="mt-1 w-full border border-gray-300 rounded-md p-3" placeholder="e.g. Mazda CX-5" onChange={e => setVehicle({...vehicle, make: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year of Manufacture</label>
                  <input type="number" className="mt-1 w-full border border-gray-300 rounded-md p-3" placeholder="2018" onChange={e => setVehicle({...vehicle, year: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estimated Value (KES)</label>
                  <input type="number" className="mt-1 w-full border border-gray-300 rounded-md p-3" placeholder="2000000" onChange={e => setVehicle({...vehicle, value: e.target.value})} />
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-primary text-white py-3 rounded-md font-bold mt-6 hover:bg-blue-700">
                Generate Quotations
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Quotations Comparison */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">2. Compare Quotations</h2>
              <button onClick={() => setStep(1)} className="text-primary hover:underline">Edit Vehicle Details</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_QUOTES.map(quote => (
                <div key={quote.id} className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col justify-between hover:shadow-xl transition relative overflow-hidden">
                  {quote.id === 1 && <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">BEST VALUE</div>}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{quote.provider}</h3>
                    <p className="text-sm font-semibold text-primary mb-4">{quote.type}</p>
                    <div className="text-3xl font-extrabold text-gray-900 mb-6">KES {quote.premium.toLocaleString()}<span className="text-sm text-gray-500 font-normal">/yr</span></div>
                    
                    <ul className="space-y-2 mb-8">
                      {quote.features.map(f => (
                        <li key={f} className="flex items-start text-sm text-gray-600">
                          <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => setStep(3)} className="w-full bg-gray-900 text-white py-3 rounded-md font-bold hover:bg-gray-800">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Application & Payment */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100 max-w-2xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Fast-Track Application</h2>
            <p className="text-gray-600 mb-8">You are applying for coverage. Our intermediary team will process your logbook details and send a payment link for instant policy generation.</p>
            
            <div className="bg-blue-50 p-6 rounded-lg text-left mb-8">
              <h3 className="font-bold text-blue-900 mb-2">Next Steps (Architecture Mapped):</h3>
              <ul className="list-disc pl-5 space-y-1 text-blue-800 text-sm">
                <li><strong>/applications:</strong> Your KYC data is stored.</li>
                <li><strong>/payments:</strong> You receive an M-Pesa prompt.</li>
                <li><strong>/policies:</strong> Digital certificate is issued.</li>
                <li><strong>/commissions:</strong> PARTSOKO records the intermediary cut.</li>
              </ul>
            </div>
            
            <button onClick={() => setStep(1)} className="text-primary font-medium hover:underline">Start Over</button>
          </div>
        )}

      </div>
    </div>
  );
}
