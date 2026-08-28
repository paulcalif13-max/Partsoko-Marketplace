export default function ImportFinancing() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Import Financing</h1>
        <p className="text-lg text-gray-600 mb-6">
          Looking to import specialized automotive parts? We offer comprehensive import financing solutions for high-value components that handle the heavy lifting—from paying overseas suppliers to clearing customs and duties. <strong>(Note: This service is exclusively for parts, not full vehicles.)</strong>
        </p>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
          <h3 className="text-xl font-bold text-blue-900 mb-2">How It Works</h3>
          <ol className="list-decimal pl-5 space-y-2 text-blue-800">
            <li>Identify your specialized parts overseas</li>
            <li>Submit your invoice for our quick appraisal</li>
            <li>We cover up to 80% of total import costs</li>
            <li>Repay over comfortable monthly installments</li>
          </ol>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition">
          Get an Import Quote
        </button>
      </div>
    </div>
  );
}
