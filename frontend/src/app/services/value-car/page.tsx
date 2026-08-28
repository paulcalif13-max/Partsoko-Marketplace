export default function ValueCar() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Value Your Car</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Planning to sell or trade in your vehicle? Get an accurate, real-time market valuation backed by our extensive automotive database.
        </p>
        
        <form className="max-w-lg mx-auto bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration Number</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-3" placeholder="e.g. KCA 123A" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Make / Model</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-3" placeholder="e.g. Toyota Hilux" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Year of Manufacture</label>
                <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md p-3" placeholder="e.g. 2018" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Chassis / VIN Number</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-3" placeholder="Enter 17-character VIN" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Location</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-3" placeholder="e.g. Nairobi, Westlands" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Purpose of Valuation</label>
              <select className="mt-1 block w-full border border-gray-300 rounded-md p-3 bg-white">
                <option value="">-- Select Purpose --</option>
                <option value="insurance">Insurance</option>
                <option value="sale_purchase">Sale / Purchase</option>
                <option value="financing">Financing Importation</option>
                <option value="general">General Market Valuation</option>
              </select>
            </div>

            <button type="button" className="w-full bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition mt-6">
              Get Instant Valuation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
