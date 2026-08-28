export default function LogbookFinancing() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Logbook Financing</h1>
        <p className="text-lg text-gray-600 mb-6">
          Unlock the value of your vehicle with our fast and flexible logbook financing options. Get the cash you need while you continue driving your car.
        </p>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Why Choose PARTSOKO Financing?</h3>
          <ul className="list-disc pl-5 space-y-2 text-blue-800">
            <li>Approval within 24 hours</li>
            <li>Keep driving your car</li>
            <li>Flexible repayment periods</li>
            <li>Competitive interest rates</li>
          </ul>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
}
