'use client';

export default function ValuerDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto min-h-[80vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Valuer Command Center</h1>
        <div className="flex space-x-3">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Active
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-sm">
            ⭐ 4.9 (42 Reviews)
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Pending Requests</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Completed Valuations</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">143</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">This Month's Earnings</p>
          <p className="text-3xl font-bold text-green-600 mt-2">KES 84,500</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Average Turnaround</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">4 Hrs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Valuation Queue (Books & Jobs)</h2>
              <button className="text-sm font-medium text-primary hover:underline">View All History</button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {/* Job Item */}
              <div className="p-6 hover:bg-blue-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">2018 Toyota Prado TX</h3>
                    <p className="text-sm text-gray-500">Reg: KDA 456X • Chassis: JTEBX99...</p>
                  </div>
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">URGENT</span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="text-sm">
                    <p className="text-gray-700"><strong>Location:</strong> Nairobi, Westlands</p>
                    <p className="text-gray-700"><strong>Purpose:</strong> Insurance Renewal</p>
                  </div>
                  <div className="space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50">Reject</button>
                    <button className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-blue-700 shadow-sm">Accept Job</button>
                  </div>
                </div>
              </div>

              {/* Job Item */}
              <div className="p-6 hover:bg-blue-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">2015 Mazda Demio</h3>
                    <p className="text-sm text-gray-500">Reg: KCE 123Y • Chassis: DEJFS...</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">STANDARD</span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="text-sm">
                    <p className="text-gray-700"><strong>Location:</strong> Thika Road</p>
                    <p className="text-gray-700"><strong>Purpose:</strong> Sale/Purchase</p>
                  </div>
                  <div className="space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50">Reject</button>
                    <button className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-blue-700 shadow-sm">Accept Job</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 p-6 text-white">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Submit Report
            </h3>
            <p className="text-sm text-gray-400 mb-4">Completed an inspection? Upload your official valuation certificate directly to the client's file.</p>
            <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2 rounded transition">Upload Certificate</button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">My Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm border-l-2 border-primary pl-3 py-1">
                <span className="font-bold text-gray-900 w-16">10:00</span>
                <span className="text-gray-600">Subaru Outback (Kilimani)</span>
              </div>
              <div className="flex items-center text-sm border-l-2 border-primary pl-3 py-1">
                <span className="font-bold text-gray-900 w-16">14:30</span>
                <span className="text-gray-600">Honda Fit (CBD)</span>
              </div>
              <div className="flex items-center text-sm border-l-2 border-gray-300 pl-3 py-1 opacity-50">
                <span className="font-bold text-gray-900 w-16">16:00</span>
                <span className="text-gray-600">Available</span>
              </div>
            </div>
            <button className="w-full mt-4 border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 rounded transition text-sm">Manage Calendar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
