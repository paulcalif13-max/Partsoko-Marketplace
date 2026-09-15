'use client';

import { useState } from 'react';

const STEPS = [
  'Choose Product',
  'Enter Details',
  'Vehicle Verification',
  'Eligibility Assessment',
  'Compare Offers',
  'Select Partner',
  'Lender Application',
  'Approval',
  'Disbursement'
];

export default function FinanceHub() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleProductSelect = (product: string) => {
    setSelectedProduct(product);
    setCurrentStep(1); // Move to enter details
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">PARTSOKO Financing</h1>
          <p className="text-xl text-gray-600">Flexible financing solutions tailored for your automotive needs.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary z-0 transition-all duration-500"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            ></div>
            
            {STEPS.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                  index <= currentStep ? 'bg-primary text-white ring-4 ring-blue-100' : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                {/* Only show text for active/adjacent steps on small screens, or all on large */}
                <span className={`absolute top-10 text-[10px] uppercase font-bold tracking-wider w-24 text-center ${
                  index <= currentStep ? 'text-primary' : 'text-gray-400'
                } hidden md:block`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 min-h-[400px]">
          
          {/* STEP 0: CHOOSE PRODUCT */}
          {currentStep === 0 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What type of financing do you need?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'logbook', name: 'Logbook Finance', desc: 'Get cash using your car logbook as collateral', icon: '🚙' },
                  { id: 'repair', name: 'Repair Finance', desc: 'Finance major mechanical overhauls and repairs', icon: '🔧' },
                  { id: 'parts', name: 'Parts Finance', desc: 'Buy high-value spare parts and pay later', icon: '⚙️' },
                  { id: 'import', name: 'Import Finance', desc: 'Fund the importation of specialized automotive parts', icon: '🚢' }
                ].map(prod => (
                  <button 
                    key={prod.id}
                    onClick={() => handleProductSelect(prod.name)}
                    className="flex flex-col items-center p-8 border-2 border-gray-100 rounded-xl hover:border-primary hover:bg-blue-50 transition-all group text-left"
                  >
                    <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{prod.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{prod.name}</h3>
                    <p className="text-gray-500 text-center text-sm">{prod.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: ENTER DETAILS */}
          {currentStep === 1 && (
            <div className="animate-fade-in-up max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Details</h2>
              <p className="text-gray-500 mb-8">Tell us more about your {selectedProduct} request.</p>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Requested Amount (KES)</label>
                  <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary" placeholder="e.g. 500000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Repayment Period (Months)</label>
                  <select className="mt-1 block w-full border border-gray-300 rounded-md p-3 bg-white">
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>12 Months</option>
                    <option>24 Months</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-between">
                  <button onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Back</button>
                  <button onClick={nextStep} className="px-6 py-2 bg-primary text-white rounded-md font-bold hover:bg-blue-700 shadow-lg">Continue to Verification</button>
                </div>
              </div>
            </div>
          )}

          {/* PLACEHOLDER FOR REMAINING STEPS */}
          {currentStep > 1 && (
            <div className="animate-fade-in-up flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{STEPS[currentStep]}</h2>
              <p className="text-gray-500 text-center max-w-md mb-8">
                This is a placeholder for the <strong>{STEPS[currentStep]}</strong> phase of the application pipeline. In production, this will connect to the internal API or third-party banking integration.
              </p>
              <div className="flex space-x-4">
                <button onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Go Back</button>
                {currentStep < STEPS.length - 1 ? (
                  <button onClick={nextStep} className="px-6 py-2 bg-primary text-white rounded-md font-bold hover:bg-blue-700 shadow-lg">Simulate Next Step</button>
                ) : (
                  <button onClick={() => setCurrentStep(0)} className="px-6 py-2 bg-green-600 text-white rounded-md font-bold hover:bg-green-700 shadow-lg">Finish & Restart</button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
