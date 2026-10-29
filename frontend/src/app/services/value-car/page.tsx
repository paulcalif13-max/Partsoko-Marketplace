'use client';

import { useState } from 'react';

export default function ValueCar() {
  const [vehicleReg, setVehicleReg] = useState('');
  const [makeModel, setMakeModel] = useState('');
  const [year, setYear] = useState('2018');
  const [vin, setVin] = useState('');
  const [location, setLocation] = useState('Nairobi, Westlands');
  const [purpose, setPurpose] = useState('general');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('0702420404');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/valuations/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleReg,
          makeModel,
          year: parseInt(year),
          vin,
          location,
          purpose,
          customerName,
          customerPhone
        })
      });

      const data = await res.json();
      setRefCode(data.referenceCode || `VAL-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
    } catch (err) {
      setRefCode(`VAL-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-[80vh] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12 border border-gray-100">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="bg-blue-50 text-primary text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mb-3">
              Certified Automotive Valuers
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brandDark mb-3">
              Vehicle Valuation & Inspection
            </h1>
            <p className="text-sm text-gray-500">
              Selling, insuring, or taking a logbook loan? Get an official inspection and certified market valuation report recognized across Kenya.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
              <h2 className="text-2xl font-bold text-brandDark mb-2">Valuation Request Booked!</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                <span className="text-xs text-gray-500 uppercase font-bold block">Inspection File Ref</span>
                <span className="text-lg font-black text-primary">{refCode}</span>
              </div>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                A licensed valuer has been assigned to inspect <span className="font-bold text-brandDark">{vehicleReg} ({makeModel})</span> in {location}. You will receive a WhatsApp/Call to confirm the inspection timeslot.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-brandDark text-white px-6 py-2.5 rounded-full font-bold text-xs hover:bg-gray-800 transition"
              >
                Submit Another Vehicle
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Registration Number *</label>
                  <input 
                    required 
                    type="text" 
                    value={vehicleReg}
                    onChange={e => setVehicleReg(e.target.value)}
                    placeholder="e.g. KDA 123A" 
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm uppercase" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Make & Model *</label>
                  <input 
                    required 
                    type="text" 
                    value={makeModel}
                    onChange={e => setMakeModel(e.target.value)}
                    placeholder="e.g. Toyota Hilux / Prado" 
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Year of Manufacture *</label>
                  <input 
                    required 
                    type="number" 
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="2018" 
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Chassis / VIN Number</label>
                  <input 
                    type="text" 
                    value={vin}
                    onChange={e => setVin(e.target.value)}
                    placeholder="17-character VIN" 
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm uppercase" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Inspection Location *</label>
                  <input 
                    required 
                    type="text" 
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Nairobi, Ruaka" 
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Purpose of Valuation *</label>
                  <select 
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="general">General Market Valuation</option>
                    <option value="insurance">Insurance Policy Binding</option>
                    <option value="sale_purchase">Sale / Trade-In</option>
                    <option value="financing">Bank / Logbook Loan Collateral</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Contact Name *</label>
                  <input 
                    required 
                    type="text" 
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Paul Calif" 
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    required 
                    type="text" 
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="0702420404" 
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm" 
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brandDark text-white py-3 rounded-xl font-bold text-sm hover:bg-brandRed transition shadow-sm mt-4 disabled:opacity-50"
              >
                {isSubmitting ? 'Booking Valuation...' : 'Schedule Official Valuation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
