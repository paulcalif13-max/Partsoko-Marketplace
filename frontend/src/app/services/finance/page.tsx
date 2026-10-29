'use client';

import { useState } from 'react';

const PRODUCTS = [
  { 
    id: 'LOGBOOK', 
    name: 'Logbook Finance', 
    desc: 'Unlock cash against your vehicle logbook up to 80% valuation while retaining full daily use of your car.', 
    icon: '🚙',
    min: 50000,
    max: 5000000,
    defaultAmount: 300000,
    rate: 0.02
  },
  { 
    id: 'REPAIR', 
    name: 'Repair & Overhaul Finance', 
    desc: 'Finance major mechanical overhauls, gearbox repairs, and bodywork with zero upfront cash stress.', 
    icon: '🔧',
    min: 20000,
    max: 800000,
    defaultAmount: 120000,
    rate: 0.018
  },
  { 
    id: 'PARTS', 
    name: 'Spare Parts BNPL', 
    desc: 'Purchase high-value replacement auto parts and genuine spares today, spread payments up to 12 months.', 
    icon: '⚙️',
    min: 15000,
    max: 500000,
    defaultAmount: 75000,
    rate: 0.015
  },
  { 
    id: 'IMPORT', 
    name: 'Global Import Finance', 
    desc: 'We fund up to 70% of CIF and KRA duty for specialized engine and parts consignments from Japan, UAE, and UK.', 
    icon: '🚢',
    min: 100000,
    max: 3000000,
    defaultAmount: 450000,
    rate: 0.022
  }
];

export default function FinanceHub() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [amount, setAmount] = useState<number>(300000);
  const [tenure, setTenure] = useState<number>(12);

  // Form Fields
  const [formData, setFormData] = useState({
    applicantName: '',
    phone: '',
    email: '',
    vehicleReg: '',
    vehicleMakeModel: '',
    vehicleYear: '2017',
    employmentStatus: 'Employed',
    monthlyIncome: '120000'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Installment calculation: P * (1 + r * n) / n
  const monthlyRate = selectedProduct.rate;
  const estimatedMonthlyInstallment = Math.round(
    (amount * (1 + monthlyRate * tenure)) / tenure
  );
  const totalRepayment = estimatedMonthlyInstallment * tenure;

  const handleProductSelect = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setAmount(product.defaultAmount);
    setCurrentStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.applicantName || !formData.phone || !formData.vehicleReg) {
      setError('Please fill in your name, M-Pesa phone number, and vehicle registration number.');
      return;
    }

    setLoading(true);

    const payload = {
      applicantName: formData.applicantName,
      phone: formData.phone,
      email: formData.email,
      productType: selectedProduct.id,
      requestedAmount: amount,
      tenureMonths: tenure,
      vehicleData: {
        registrationNumber: formData.vehicleReg.toUpperCase(),
        makeModel: formData.vehicleMakeModel,
        year: parseInt(formData.vehicleYear) || 2017,
        employmentStatus: formData.employmentStatus,
        monthlyIncome: Number(formData.monthlyIncome)
      }
    };

    try {
      const response = await fetch('/api/finance/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const code = data.referenceCode || `FIN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setReferenceCode(code);

      if (data.whatsappUrl) {
        setWhatsappUrl(data.whatsappUrl);
      } else {
        const fallbackMsg = encodeURIComponent(
          `Habari PARTSOKO, I have submitted a Financing Application.\n\n` +
          `*Reference Code:* ${code}\n` +
          `*Applicant:* ${formData.applicantName}\n` +
          `*Phone:* ${formData.phone}\n` +
          `*Amount:* KES ${amount.toLocaleString()}\n` +
          `*Vehicle:* ${formData.vehicleReg.toUpperCase()}\n\n` +
          `Please verify and guide on the next steps.`
        );
        setWhatsappUrl(`https://wa.me/254702420404?text=${fallbackMsg}`);
      }

      setCurrentStep(4);
    } catch (err: any) {
      console.error('Finance application error:', err);
      const fallbackCode = `FIN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setReferenceCode(fallbackCode);
      const fallbackMsg = encodeURIComponent(
        `Habari PARTSOKO, I have submitted a Financing Application.\n\n` +
        `*Reference Code:* ${fallbackCode}\n` +
        `*Applicant:* ${formData.applicantName}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Amount:* KES ${amount.toLocaleString()}\n` +
        `*Vehicle:* ${formData.vehicleReg.toUpperCase()}\n\n` +
        `Please verify and guide on the next steps.`
      );
      setWhatsappUrl(`https://wa.me/254702420404?text=${fallbackMsg}`);
      setCurrentStep(4);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-brandRed font-bold text-xs uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            PARTSOKO Auto Financial Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-3">
            Automotive Financing & Overhaul Credit
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Get instant approvals, transparent interest rates, and flexible repayment terms backed by Kenya's verified auto credit network.
          </p>
        </div>

        {/* Stepper Progress */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-brandRed z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
            
            {[
              { num: 1, title: 'Product' },
              { num: 2, title: 'Calculator' },
              { num: 3, title: 'Details' },
              { num: 4, title: 'Approval' }
            ].map(step => (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                  step.num <= currentStep ? 'bg-brandRed text-white ring-4 ring-red-100 shadow' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.num < currentStep ? '✓' : step.num}
                </div>
                <span className={`text-[11px] font-bold mt-2 uppercase tracking-wider ${
                  step.num <= currentStep ? 'text-brandDark' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
          
          {/* STEP 1: SELECT PRODUCT */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Select Financing Facility</h2>
              <p className="text-gray-500 text-sm text-center mb-8">Choose the financing package that matches your current automotive requirement.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PRODUCTS.map(prod => (
                  <div 
                    key={prod.id}
                    onClick={() => handleProductSelect(prod)}
                    className="p-6 border-2 border-gray-100 rounded-xl hover:border-brandRed hover:bg-red-50/40 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-4xl group-hover:scale-110 transition-transform">{prod.icon}</span>
                        <span className="text-[10px] font-bold text-brandRed bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                          KES {prod.min.toLocaleString()} - {prod.max.toLocaleString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-brandRed transition mb-1">{prod.name}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{prod.desc}</p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                      <span>Rate from {(prod.rate * 100).toFixed(1)}%/mo</span>
                      <span className="text-brandRed group-hover:underline">Configure & Apply &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: LOAN CALCULATOR */}
          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-brandRed uppercase tracking-wider">{selectedProduct.name}</span>
                  <h2 className="text-2xl font-bold text-gray-900">Configure Loan & Repayment</h2>
                </div>
                <button 
                  onClick={() => setCurrentStep(1)} 
                  className="text-xs text-gray-500 hover:text-brandRed underline"
                >
                  Change Product
                </button>
              </div>

              {/* Amount Slider & Input */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700">Requested Amount</label>
                    <span className="text-xl font-extrabold text-brandRed">
                      KES {amount.toLocaleString()}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min={selectedProduct.min} 
                    max={selectedProduct.max} 
                    step={5000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brandRed"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>KES {selectedProduct.min.toLocaleString()}</span>
                    <span>KES {selectedProduct.max.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tenure Selector */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Repayment Period</label>
                  <div className="grid grid-cols-4 gap-3">
                    {[3, 6, 12, 24].map(months => (
                      <button
                        key={months}
                        type="button"
                        onClick={() => setTenure(months)}
                        className={`py-3 px-2 rounded-lg text-xs font-bold border transition ${
                          tenure === months 
                            ? 'bg-brandDark text-white border-brandDark shadow' 
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {months} Months
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Estimator Card */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="border-r border-gray-200 pr-4">
                      <p className="text-xs text-gray-500 mb-1">Estimated Monthly Installment</p>
                      <p className="text-2xl font-extrabold text-gray-900">KES {estimatedMonthlyInstallment.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">at approx {(selectedProduct.rate * 100).toFixed(1)}% monthly interest</p>
                    </div>
                    <div className="pl-4">
                      <p className="text-xs text-gray-500 mb-1">Total Repayment Amount</p>
                      <p className="text-2xl font-extrabold text-brandRed">KES {totalRepayment.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Spread over {tenure} equal installments</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    onClick={() => setCurrentStep(1)} 
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    &larr; Back
                  </button>
                  <button 
                    onClick={() => setCurrentStep(3)} 
                    className="px-8 py-2.5 bg-brandRed text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow transition"
                  >
                    Proceed to Application &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: APPLICANT & VEHICLE DETAILS */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="border-b pb-4 mb-6">
                <span className="text-xs font-bold text-brandRed uppercase tracking-wider">{selectedProduct.name} Application</span>
                <h2 className="text-2xl font-bold text-gray-900">Borrower & Vehicle Information</h2>
                <p className="text-xs text-gray-500 mt-1">Please provide accurate info for same-day credit appraisal.</p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name (as per ID) *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Mwangi" 
                      value={formData.applicantName}
                      onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">M-Pesa Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 0712345678" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. mwangi@gmail.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Registration Number *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. KDH 456X" 
                      value={formData.vehicleReg}
                      onChange={(e) => setFormData({...formData, vehicleReg: e.target.value})}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Make & Model</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Toyota Prado TX / Mazda CX-5" 
                      value={formData.vehicleMakeModel}
                      onChange={(e) => setFormData({...formData, vehicleMakeModel: e.target.value})}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Year of Manufacture</label>
                    <input 
                      type="number" 
                      placeholder="2017" 
                      value={formData.vehicleYear}
                      onChange={(e) => setFormData({...formData, vehicleYear: e.target.value})}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Employment / Income Source</label>
                    <select 
                      value={formData.employmentStatus}
                      onChange={(e) => setFormData({...formData, employmentStatus: e.target.value})}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    >
                      <option>Employed (Salaried)</option>
                      <option>Business Owner / Self-Employed</option>
                      <option>Commercial Fleet Operator</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Approx. Monthly Income (KES)</label>
                    <input 
                      type="number" 
                      placeholder="120000" 
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                      className="w-full text-sm border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-3.5 rounded-lg border border-blue-200 text-[11px] text-blue-900">
                  🔒 <strong>Confidentiality Guaranteed:</strong> Your data is protected by the Data Protection Act (Kenya). Only certified partner lenders review your eligibility.
                </div>

                <div className="flex justify-between pt-4">
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(2)} 
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    &larr; Back
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="px-8 py-2.5 bg-brandRed text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow transition disabled:opacity-50"
                  >
                    {loading ? 'Submitting Application...' : 'Submit Application Now'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: SUBMITTED CONFIRMATION */}
          {currentStep === 4 && (
            <div className="max-w-xl mx-auto text-center py-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                ✓
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full uppercase">
                Application Received
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3 mb-2">
                Financing Application Submitted!
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Your loan appraisal is currently queued for fast-track review with PARTSOKO lending partners.
              </p>

              {/* Reference Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left mb-6 space-y-3">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <span className="text-xs text-gray-500 block">Your Application Reference Code</span>
                    <span className="text-xs text-gray-400">Save this code to track your status</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-mono font-extrabold text-brandRed tracking-wide">{referenceCode}</span>
                    <button 
                      type="button"
                      onClick={() => {
                        if (referenceCode) {
                          navigator.clipboard.writeText(referenceCode);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }
                      }}
                      className="text-[11px] bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-2.5 py-1 rounded font-bold transition shadow-xs"
                    >
                      {copied ? 'Copied! ✓' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs text-gray-500">Facility Type</span>
                  <span className="text-xs font-bold text-gray-800">{selectedProduct.name}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs text-gray-500">Requested Amount</span>
                  <span className="text-xs font-bold text-brandRed">KES {amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs text-gray-500">Tenure</span>
                  <span className="text-xs font-bold text-gray-800">{tenure} Months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Estimated Installment</span>
                  <span className="text-xs font-extrabold text-gray-900">KES {estimatedMonthlyInstallment.toLocaleString()} / mo</span>
                </div>
              </div>

              {/* Instant WhatsApp Verification Button */}
              <div className="my-6">
                <a
                  href={whatsappUrl || `https://wa.me/254702420404?text=Habari%20PARTSOKO,%20my%20financing%20reference%20code%20is%20${referenceCode}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25D366] hover:bg-green-600 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center space-x-2 transition transform active:scale-[0.99]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Verify on WhatsApp (+254 702 420 404) &rarr;</span>
                </a>
                <p className="text-[11px] text-gray-500 mt-2">
                  Tap above to instantly send your application code to the credit desk for rapid appraisal.
                </p>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-left text-xs text-blue-900 mb-6 space-y-1.5">
                <p className="font-bold">What happens next?</p>
                <p>1. Our credit verification officer will contact you on <strong>{formData.phone || 'your phone'}</strong>.</p>
                <p>2. You will provide a copy of your National ID and latest M-Pesa / Bank statement.</p>
                <p>3. Funds are disbursed directly to your M-Pesa or registered vendor/garage.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a 
                  href="/services/finance" 
                  onClick={() => setCurrentStep(1)} 
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  New Application
                </a>
                <a 
                  href="/search" 
                  className="px-6 py-2.5 bg-brandDark text-white rounded-lg text-xs font-bold hover:bg-primary transition shadow"
                >
                  Browse Auto Parts Catalog &rarr;
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
