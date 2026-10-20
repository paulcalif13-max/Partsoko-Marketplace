'use client';

import { useState } from 'react';

interface UnderwriterQuote {
  id: string;
  provider: string;
  logo: string;
  type: string;
  rate: number;
  features: string[];
  bestFor: string;
}

const PROVIDERS: UnderwriterQuote[] = [
  {
    id: 'jubilee',
    provider: 'Jubilee Allianz Insurance',
    logo: '🛡️',
    type: 'Comprehensive Motor',
    rate: 0.042,
    features: ['Zero Theft Excess', 'Free Windscreen up to KES 50k', '24/7 Roadside Towing', 'Authorized Garage Repairs'],
    bestFor: 'BEST VALUE'
  },
  {
    id: 'apa',
    provider: 'APA Insurance',
    logo: '🚗',
    type: 'Comprehensive Motor',
    rate: 0.040,
    features: ['Courtesy Car (14 Days)', 'Personal Accident Cover KES 500k', 'Towing Assistance', 'Fast Claim Turnaround'],
    bestFor: 'MOST POPULAR'
  },
  {
    id: 'heritage',
    provider: 'Heritage Insurance',
    logo: '⭐',
    type: 'Comprehensive Motor',
    rate: 0.038,
    features: ['Agreed Value Settlement', 'Radio Cassette / Stereo Cover', 'Riot & Strike Protection', 'Free Excess Protector'],
    bestFor: 'TOP RATED'
  },
  {
    id: 'directline',
    provider: 'Directline Assurance',
    logo: '📜',
    type: 'Third Party Only',
    rate: 0, // Flat fee
    features: ['Compulsory Legal Liability', 'Property Damage up to KES 20M', 'Instant Digital Certificate', 'KRA Validated'],
    bestFor: 'BUDGET FRIENDLY'
  }
];

export default function InsuranceHub() {
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState({
    makeModel: 'Toyota Harrier',
    year: '2018',
    value: 2800000,
    usage: 'Private',
  });

  const [selectedQuote, setSelectedQuote] = useState<UnderwriterQuote>(PROVIDERS[0]);
  const [applicant, setApplicant] = useState({
    fullName: '',
    phone: '',
    email: '',
    nationalId: '',
    regNo: '',
    paymentMethod: 'MPESA'
  });

  const [policyRef, setPolicyRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculatePremium = (quote: UnderwriterQuote) => {
    if (quote.type === 'Third Party Only') {
      return 7500;
    }
    const val = Number(vehicle.value) || 1500000;
    const base = Math.round(val * quote.rate);
    // Add PCF (0.25%) + Training Levy (0.2%) + Stamp Duty (KES 40)
    const statutory = Math.round(base * 0.0045) + 40;
    return base + statutory;
  };

  const handleSelectQuote = (quote: UnderwriterQuote) => {
    setSelectedQuote(quote);
    setStep(3);
  };

  const handleSubmitPolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicant.fullName || !applicant.phone || !applicant.regNo) {
      alert('Please provide your name, phone number, and vehicle registration number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `INS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setPolicyRef(generatedRef);
      setIsSubmitting(false);
      setStep(4);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-brandRed font-bold text-xs uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            PARTSOKO Insurance Connect
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-3">
            Motor Vehicle Insurance Quotes & Instant Cover
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Compare verified underwriter quotes side-by-side, unlock negotiated intermediary rates, and get your digital certificate issued in minutes.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-brandRed z-0 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
            
            {[
              { num: 1, title: 'Vehicle' },
              { num: 2, title: 'Compare' },
              { num: 3, title: 'Apply' },
              { num: 4, title: 'Policy' }
            ].map(s => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                  s.num <= step ? 'bg-brandRed text-white ring-4 ring-red-100 shadow' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s.num < step ? '✓' : s.num}
                </div>
                <span className={`text-[11px] font-bold mt-2 uppercase tracking-wider ${
                  s.num <= step ? 'text-brandDark' : 'text-gray-400'
                }`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: VEHICLE DETAILS */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Vehicle Information</h2>
            <p className="text-gray-500 text-xs mb-6">Enter vehicle specifications to compute accurate annual insurance premiums.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Make & Model</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none" 
                  placeholder="e.g. Mazda CX-5, Toyota Harrier, Subaru Outback" 
                  value={vehicle.makeModel}
                  onChange={e => setVehicle({...vehicle, makeModel: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Year of Manufacture</label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none" 
                    placeholder="2018" 
                    value={vehicle.year}
                    onChange={e => setVehicle({...vehicle, year: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Usage</label>
                  <select 
                    value={vehicle.usage}
                    onChange={e => setVehicle({...vehicle, usage: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                  >
                    <option>Private</option>
                    <option>Commercial (General Cartage)</option>
                    <option>Online Ride Hailing (Uber/Bolt)</option>
                    <option>School/Corporate Bus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Estimated Vehicle Market Value (KES)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-sm font-bold text-gray-400">KES</span>
                  <input 
                    type="number" 
                    className="w-full pl-14 border border-gray-300 rounded-lg p-3 text-sm font-bold text-gray-900 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none" 
                    placeholder="2500000" 
                    value={vehicle.value}
                    onChange={e => setVehicle({...vehicle, value: Number(e.target.value)})} 
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Need an official certified appraisal first? <a href="/services/value-car" className="text-brandRed hover:underline font-semibold">Value your car with PARTSOKO &rarr;</a>
                </p>
              </div>

              <button 
                onClick={() => setStep(2)} 
                className="w-full bg-brandRed text-white py-3.5 rounded-lg font-bold mt-4 hover:bg-red-700 transition shadow"
              >
                Compare Instant Underwriter Quotations &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: COMPARE QUOTATIONS */}
        {step === 2 && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">2. Available Insurance Underwriters</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Showing premium estimates for <strong>{vehicle.makeModel} ({vehicle.year})</strong> valued at <strong>KES {vehicle.value.toLocaleString()}</strong>
                </p>
              </div>
              <button 
                onClick={() => setStep(1)} 
                className="text-xs font-semibold text-brandRed hover:underline mt-2 sm:mt-0"
              >
                &larr; Modify Vehicle Details
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROVIDERS.map(quote => {
                const premium = calculatePremium(quote);
                return (
                  <div 
                    key={quote.id} 
                    className="bg-white rounded-2xl shadow border border-gray-200 p-6 flex flex-col justify-between hover:border-brandRed hover:shadow-xl transition relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 bg-brandDark text-white text-[9px] font-bold px-2.5 py-1 rounded-bl-lg">
                      {quote.bestFor}
                    </div>

                    <div>
                      <div className="text-3xl mb-2">{quote.logo}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-0.5">{quote.provider}</h3>
                      <p className="text-xs font-semibold text-brandRed mb-4">{quote.type}</p>

                      <div className="mb-5 pb-4 border-b border-gray-100">
                        <span className="text-xs text-gray-400 block">Annual Premium</span>
                        <div className="text-2xl font-extrabold text-gray-900">
                          KES {premium.toLocaleString()}
                          <span className="text-xs text-gray-400 font-normal"> / yr</span>
                        </div>
                        {quote.rate > 0 && (
                          <span className="text-[10px] text-gray-500">Incl. PCF, Training Levy & Stamp Duty</span>
                        )}
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {quote.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-xs text-gray-600">
                            <span className="text-green-500 font-bold mr-1.5 flex-shrink-0">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => handleSelectQuote(quote)} 
                      className="w-full bg-brandDark text-white py-2.5 rounded-lg text-xs font-bold hover:bg-brandRed transition shadow"
                    >
                      Select & Apply Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: APPLICATION FORM */}
        {step === 3 && (
          <form onSubmit={handleSubmitPolicy} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-2xl mx-auto">
            <div className="border-b pb-4 mb-6">
              <span className="text-xs font-bold text-brandRed uppercase tracking-wider">{selectedQuote.provider}</span>
              <h2 className="text-2xl font-bold text-gray-900">3. Policy Applicant Details</h2>
              <p className="text-xs text-gray-500 mt-1">
                Annual Premium: <strong className="text-brandRed">KES {calculatePremium(selectedQuote).toLocaleString()}</strong> for {vehicle.makeModel}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name (as per National ID) *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Faith Wanjiku" 
                  value={applicant.fullName}
                  onChange={e => setApplicant({...applicant, fullName: e.target.value})}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">M-Pesa Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. 0712345678" 
                    value={applicant.phone}
                    onChange={e => setApplicant({...applicant, phone: e.target.value})}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="e.g. wanjiku@example.com" 
                    value={applicant.email}
                    onChange={e => setApplicant({...applicant, email: e.target.value})}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Registration Number *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. KDL 789M" 
                    value={applicant.regNo}
                    onChange={e => setApplicant({...applicant, regNo: e.target.value})}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 uppercase font-bold focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">National ID / Passport Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 29384756" 
                    value={applicant.nationalId}
                    onChange={e => setApplicant({...applicant, nationalId: e.target.value})}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                  />
                </div>
              </div>

              <div className="bg-green-50 p-3.5 rounded-lg border border-green-200 text-xs text-green-900">
                📄 <strong>Instant Digital Certificate:</strong> Once submitted, a certified electronic motor certificate valid for NTSA & police inspection will be generated and sent directly to your phone and email.
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  type="button"
                  onClick={() => setStep(2)} 
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  &larr; Back
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-2.5 bg-brandRed text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Issuing Policy Inscription...' : 'Submit Application & Generate Cover Note'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 4: CONFIRMATION & COVER NOTE */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              ✓
            </div>
            <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full uppercase">
              Cover Note Inscription Active
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3 mb-2">
              Insurance Policy Initiated!
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Your application has been received by PARTSOKO Insurance Intermediary Desk and routed to {selectedQuote.provider}.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left mb-6 space-y-2.5 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Tracking Reference:</span>
                <span className="font-mono font-extrabold text-brandDark">{policyRef}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Underwriter:</span>
                <span className="font-bold text-gray-900">{selectedQuote.provider}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Vehicle:</span>
                <span className="font-bold text-gray-900">{vehicle.makeModel} ({applicant.regNo.toUpperCase() || 'KDL 789M'})</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Coverage Type:</span>
                <span className="font-bold text-brandRed">{selectedQuote.type}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span className="text-gray-700">Total Premium:</span>
                <span className="text-brandDark">KES {calculatePremium(selectedQuote).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href={`https://wa.me/254702420404?text=Hello%20PARTSOKO%2C%20I%20have%20applied%20for%20insurance%20ref%20${policyRef}`} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition shadow flex items-center justify-center"
              >
                Chat on WhatsApp with Insurance Desk
              </a>
              <a 
                href="/services/insure-car" 
                onClick={() => setStep(1)} 
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                New Quote
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
