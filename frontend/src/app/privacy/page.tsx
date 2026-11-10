export default function PrivacyPage() {
  return (
    <div className="bg-surface min-h-[80vh] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100">
          <h1 className="text-3xl font-extrabold text-brandDark mb-2">Data Protection & Privacy Policy</h1>
          <p className="text-xs text-gray-400 mb-8">CALREE Automotive Marketplace • In compliance with the Kenya Data Protection Act, 2019</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-brandDark mb-2">1. Data Controller</h2>
              <p>CALREE Automotive Marketplace operates as a registered data controller for personal and vehicular data collected through our web platform, mobile interfaces, and communication channels.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brandDark mb-2">2. Information We Collect</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Personal identifiers: Name, email address, physical delivery address, and phone number.</li>
                <li>Vehicular data: Registration numbers, make/model/year, and VIN / Chassis numbers for guaranteed fitment verification.</li>
                <li>Transaction data: M-Pesa receipt numbers, checkout totals, financing reference codes, and service appointment records.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-brandDark mb-2">3. Customer Rights (ODPC Kenya)</h2>
              <p>Under the Kenya Data Protection Act, you have the right to request access to, rectification of, portability, or erasure of your personal data. To exercise these rights, email partsoko@gmail.com or contact our data protection desk at +254 702 420 404.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
