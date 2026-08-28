export default function InsureCar() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Insure Your Car</h1>
        <p className="text-lg text-gray-600 mb-6">
          Protect your investment with reliable and comprehensive automotive insurance. We partner with top-tier insurance providers to give you the best rates and easiest claims process.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2">Comprehensive Cover</h3>
            <p className="text-sm text-blue-800">Total protection against accidents, theft, fire, and third-party liabilities.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2">Third Party Only</h3>
            <p className="text-sm text-blue-800">Affordable legal compliance protecting you against third-party damages.</p>
          </div>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition">
          Compare Rates
        </button>
      </div>
    </div>
  );
}
