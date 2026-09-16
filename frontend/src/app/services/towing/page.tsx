'use client';

import { useState } from 'react';

const MOCK_PROVIDERS = [
  { id: 1, name: 'Rapid Response Recovery', rating: 4.8, reviews: 124, eta: '15 mins', basePrice: 4500, features: ['Flatbed', '24/7 Service'] },
  { id: 2, name: 'Nairobi Safe Towing', rating: 4.5, reviews: 89, eta: '25 mins', basePrice: 3500, features: ['Wheel-Lift', 'Jumpstarts'] },
  { id: 3, name: 'Highway Breakdown Pros', rating: 4.9, reviews: 312, eta: '35 mins', basePrice: 5000, features: ['Heavy Duty', 'Flatbed', 'Winch Out'] },
];

export default function TowingService() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    destination: '',
    vehicleId: '',
  });
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Move to provider selection
  };

  const handleBook = (provider: any) => {
    setSelectedProvider(provider);
    setStep(3); // Confirmation
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Emergency Towing & Recovery</h1>
          <p className="text-lg text-gray-600">Stranded? Fill out your details below and choose a trusted recovery partner to dispatch immediately.</p>
        </div>

        {/* STEP 1: Details Form */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 animate-fade-in-up">
            <div className="flex items-center mb-6 text-primary">
              <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <h2 className="text-2xl font-bold text-gray-900">Request a Tow Truck</h2>
            </div>
            
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary" placeholder="e.g. 0702420404" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Identification (Make, Model, Color, Reg)</label>
                <input required type="text" className="w-full border border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary" placeholder="e.g. White Toyota Prado, KCA 123A" value={formData.vehicleId} onChange={e => setFormData({...formData, vehicleId: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-500">📍</div>
                    <input required type="text" className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-primary focus:border-primary" placeholder="Where are you stranded?" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Destination</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-green-600">🏁</div>
                    <input required type="text" className="w-full border border-gray-300 rounded-md p-3 pl-10 focus:ring-primary focus:border-primary" placeholder="Where do you need to go?" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-white py-4 rounded-md font-bold text-lg hover:bg-blue-700 transition shadow-lg">
                Find Available Providers
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Provider Selection */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Available Providers</h2>
                <p className="text-gray-600 text-sm mt-1">Found {MOCK_PROVIDERS.length} tow trucks near <strong>{formData.location}</strong></p>
              </div>
              <button onClick={() => setStep(1)} className="text-sm font-medium text-primary hover:underline">Edit Search Details</button>
            </div>

            <div className="space-y-4">
              {MOCK_PROVIDERS.map((provider) => (
                <div key={provider.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-1">
                      <h3 className="text-xl font-bold text-gray-900 mr-3">{provider.name}</h3>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold flex items-center">
                        ⭐ {provider.rating} ({provider.reviews})
                      </span>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      {provider.features.map(f => (
                        <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{f}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end md:space-x-8 border-t md:border-t-0 pt-4 md:pt-0">
                    <div className="text-left md:text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Est. Arrival</p>
                      <p className="text-lg font-bold text-green-600">{provider.eta}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Est. Cost</p>
                      <p className="text-lg font-bold text-gray-900">KES {provider.basePrice.toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleBook(provider)} className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition">
                      Dispatch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Confirmation */}
        {step === 3 && selectedProvider && (
          <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tow Truck Dispatched!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
              <strong>{selectedProvider.name}</strong> has received your request and is en route to <strong>{formData.location}</strong>.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto text-left border border-gray-200">
              <h3 className="font-bold text-gray-900 border-b pb-2 mb-3">Dispatch Summary</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between"><span>Driver ETA:</span><strong className="text-green-600">{selectedProvider.eta}</strong></div>
                <div className="flex justify-between"><span>Vehicle:</span><strong>{formData.vehicleId}</strong></div>
                <div className="flex justify-between"><span>Destination:</span><strong>{formData.destination}</strong></div>
                <div className="flex justify-between"><span>Est. Total:</span><strong>KES {selectedProvider.basePrice.toLocaleString()}</strong></div>
              </div>
            </div>

            <button onClick={() => setStep(1)} className="mt-8 text-primary font-medium hover:underline">Track Your Driver (Coming Soon)</button>
          </div>
        )}
      </div>
    </div>
  );
}
