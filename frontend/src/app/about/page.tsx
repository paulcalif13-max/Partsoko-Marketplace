import CalreeLogo from '@/components/CalreeLogo';

export default function AboutPage() {
  return (
    <div className="bg-surface min-h-[80vh] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <span className="bg-calreeGreen text-slate-950 text-[10px] font-black px-3 py-1 rounded uppercase tracking-widest inline-block">
              Proudly Kenyan 🇰🇪
            </span>
            <span className="text-xs font-bold text-gray-400 tracking-wider">
              EST. 2026 &bull; NAIROBI
            </span>
          </div>

          <div className="mb-6">
            <CalreeLogo variant="header" size="lg" showSlogan={true} />
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-brandDark tracking-tight mb-4">
            About CALREE Automotive Marketplace
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
            <strong>CALREE</strong> (<em>"Better parts. Smoother journeys."</em>) is Kenya's premier automotive spare parts marketplace and integrated vehicle services platform. We connect vehicle owners, fleet managers, and workshops directly with verified local part distributors, international manufacturers, certified mechanics, and 24/7 recovery services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:border-calreeGreen transition">
              <span className="text-4xl mb-2 block">🛡️</span>
              <h3 className="font-bold text-base text-brandDark mb-1">Genuine Parts Guarantee</h3>
              <p className="text-xs text-gray-500">Zero counterfeit parts. All sellers vetted and guaranteed fitment with VIN verification.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:border-calreeGreen transition">
              <span className="text-4xl mb-2 block">🌍</span>
              <h3 className="font-bold text-base text-brandDark mb-1">Global Import Concierge</h3>
              <p className="text-xs text-gray-500">Sourcing rare European, US, Japanese, and UAE parts with guaranteed landed costs and air/sea freight.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:border-calreeGreen transition">
              <span className="text-4xl mb-2 block">🤝</span>
              <h3 className="font-bold text-base text-brandDark mb-1">360° Auto Solutions</h3>
              <p className="text-xs text-gray-500">From 24/7 roadside towing to valuation, repair financing, and certified mechanics.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-brandDark mb-4">Our Physical Presence</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Headquartered in Ruaka near Limuru Road, Nairobi Metropolitan, Kenya. We service clients across Nairobi, Mombasa, Nakuru, Kisumu, Eldoret, and East Africa.
          </p>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-semibold text-gray-700 space-y-1">
            <p>📍 Location: Ruaka Town, Limuru Rd, Nairobi</p>
            <p>📞 Phone / WhatsApp: <a href="tel:+254702420404" className="text-calreeGreenDark hover:underline">+254 702 420 404</a></p>
            <p>✉️ Email: <a href="mailto:partsoko@gmail.com" className="text-calreeGreenDark hover:underline">partsoko@gmail.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
