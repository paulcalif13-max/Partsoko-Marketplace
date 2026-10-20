export default function AboutPage() {
  return (
    <div className="bg-surface min-h-[80vh] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100">
          <span className="bg-brandRed text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mb-4">
            Proudly Kenyan
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-brandDark tracking-tight mb-6">
            About PARTSOKO
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
            PARTSOKO is Kenya's premier automotive spare parts marketplace and integrated vehicle services platform. We connect vehicle owners, fleet managers, and workshops directly with verified local part distributors, international manufacturers, certified mechanics, and recovery services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
              <span className="text-4xl mb-2 block">🛡️</span>
              <h3 className="font-bold text-base text-brandDark mb-1">Genuine Parts Guarantee</h3>
              <p className="text-xs text-gray-500">Zero counterfeit parts. All sellers vetted and verified.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
              <span className="text-4xl mb-2 block">🌍</span>
              <h3 className="font-bold text-base text-brandDark mb-1">Global Import Concierge</h3>
              <p className="text-xs text-gray-500">Sourcing rare European, US, Japanese, and Chinese parts with guaranteed landed costs.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
              <span className="text-4xl mb-2 block">🤝</span>
              <h3 className="font-bold text-base text-brandDark mb-1">360° Auto Solutions</h3>
              <p className="text-xs text-gray-500">From 24/7 towing to valuation, financing, and certified mechanics.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-brandDark mb-4">Our Physical Presence</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Headquartered in Ruaka near Tech Driving, Kiambu County, Kenya. We service clients across Nairobi Metropolitan, Mombasa, Nakuru, Kisumu, Eldoret, and East Africa.
          </p>
          <div className="text-sm font-semibold text-gray-700">
            <p>📞 Phone / WhatsApp: +254 702 420 404</p>
            <p>✉️ Email: partsoko@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
