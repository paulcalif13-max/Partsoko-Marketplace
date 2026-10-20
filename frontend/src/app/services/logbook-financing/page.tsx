export default function LogbookFinancing() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100">
        <span className="text-brandRed font-bold text-xs uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full">
          Instant Auto Equity
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
          Logbook Financing in Kenya
        </h1>
        <p className="text-base text-gray-600 mb-8 leading-relaxed">
          Unlock cash liquidity against your vehicle logbook up to 80% of appraised market value within 6 to 12 hours. Continue driving your car throughout the loan tenure with flexible repayment periods from 3 to 36 months.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-2">⚡ Rapid Turnaround</h3>
            <p className="text-xs text-gray-600">Same-day vehicle valuation and M-Pesa or bank account disbursement.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-2">🚗 Keep Driving Your Car</h3>
            <p className="text-xs text-gray-600">No impounding or vehicle storage. Your daily mobility is completely uninterrupted.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-2">📉 Competitive Rates</h3>
            <p className="text-xs text-gray-600">Negotiated partner interest rates from 1.8% to 2.5% monthly with no hidden appraisal fees.</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-2">🛡️ Certified Valuations</h3>
            <p className="text-xs text-gray-600">Integrated with PARTSOKO certified motor valuers across Nairobi and Kiambu.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="/services/finance" 
            className="inline-flex justify-center items-center bg-brandRed text-white px-8 py-3.5 rounded-lg font-bold hover:bg-red-700 transition shadow text-sm"
          >
            Calculate Loan & Apply Now &rarr;
          </a>
          <a 
            href="/services/value-car" 
            className="inline-flex justify-center items-center border border-gray-300 text-gray-700 px-6 py-3.5 rounded-lg font-semibold hover:bg-gray-50 transition text-sm"
          >
            Get Car Valued First
          </a>
        </div>
      </div>
    </div>
  );
}
