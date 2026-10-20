export default function ImportFinancing() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-gray-100">
        <span className="text-primary font-bold text-xs uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
          Cross-Border Sourcing Capital
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-4">
          Global Import Financing for Automotive Parts
        </h1>
        <p className="text-base text-gray-600 mb-8 leading-relaxed">
          Need a rare Mercedes gearbox from Germany, a Toyota half-cut engine from Osaka, or specialized Land Rover suspension from the UK? PARTSOKO funds up to 70% of foreign purchase invoices, air/sea freight, and KRA import duties. 
          <span className="block mt-2 font-medium text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs">
            ⚠️ Note: Import financing is exclusively for automotive components, engines, body sections, and diagnostic tools—not complete vehicles.
          </span>
        </p>

        <div className="bg-blue-50/70 p-6 rounded-xl border border-blue-200 mb-8">
          <h3 className="text-sm font-bold text-blue-900 mb-3 uppercase tracking-wider">How PARTSOKO Import Sourcing Works</h3>
          <ol className="list-decimal pl-5 space-y-2 text-xs text-blue-950 leading-relaxed">
            <li><strong>Find the Part:</strong> Identify your part overseas or paste the URL (eBay, Be Forward, Rakuten, Yahoo Auctions).</li>
            <li><strong>Landed Cost Appraisal:</strong> PARTSOKO calculates FOB + Sea/Air Freight + KRA Duty + Clearing charges.</li>
            <li><strong>Pay 30% Commitment:</strong> We finance the remaining 70% and execute overseas supplier procurement.</li>
            <li><strong>Delivery & Repayment:</strong> Pick up your parts in Ruaka/Nairobi and repay over flexible 3 to 12 month installments.</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="/services/import" 
            className="inline-flex justify-center items-center bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-700 transition shadow text-sm"
          >
            Submit Import Request for Quote &rarr;
          </a>
          <a 
            href="/services/finance" 
            className="inline-flex justify-center items-center border border-gray-300 text-gray-700 px-6 py-3.5 rounded-lg font-semibold hover:bg-gray-50 transition text-sm"
          >
            Explore General Financing Options
          </a>
        </div>
      </div>
    </div>
  );
}
