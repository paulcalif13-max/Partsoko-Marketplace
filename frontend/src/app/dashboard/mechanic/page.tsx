'use client';

export default function MechanicDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto min-h-[80vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Mechanic Workspace</h1>
        <div className="flex space-x-3">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Accepting Jobs
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-sm">
            ⭐ 4.8 (89 Reviews)
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Pending Bookings</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Jobs Completed</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">420</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Total Revenue (Month)</p>
          <p className="text-3xl font-bold text-green-600 mt-2">KES 124,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Trade Discount Saved</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">KES 12,450</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Job Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Active Bookings (Books & Jobs)</h2>
              <button className="text-sm font-medium text-primary hover:underline">View All History</button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {/* Booking Item */}
              <div className="p-6 hover:bg-blue-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Alice Smith - Brake Pad Replacement</h3>
                    <p className="text-sm text-gray-500">2016 Nissan X-Trail • 0700112233</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">TOMORROW, 10:00 AM</span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="text-sm text-gray-700">
                    <p><strong>Customer Notes:</strong> Squeaking noises from front wheels when stopping.</p>
                  </div>
                  <div className="space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50">Reschedule</button>
                    <button className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-blue-700 shadow-sm">Confirm Job</button>
                  </div>
                </div>
              </div>

              {/* Booking Item */}
              <div className="p-6 hover:bg-blue-50 transition opacity-60">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">John Doe - Full Service</h3>
                    <p className="text-sm text-gray-500">2019 Toyota Hilux • 0722334455</p>
                  </div>
                  <span className="bg-gray-200 text-gray-800 text-xs font-bold px-2 py-1 rounded">COMPLETED</span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="text-sm text-gray-700">
                    <p><strong>Invoice Total:</strong> KES 15,000</p>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 text-sm">View Receipt</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          <div className="bg-blue-900 rounded-xl shadow-sm border border-blue-800 p-6 text-white">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11V7a2 2 0 114 0v4h1a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2a1 1 0 011-1h1z"></path></svg>
              Trade Discount Active
            </h3>
            <p className="text-sm text-blue-200 mb-4">You are receiving a 10% wholesale discount on all spare parts purchased for your client jobs.</p>
            <a href="/search" className="block w-full text-center bg-white text-blue-900 hover:bg-blue-50 font-bold py-2 rounded transition">Order Parts Now</a>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Diagnostic Reports</h3>
            <p className="text-sm text-gray-500 mb-4">Upload mechanical diagnostic reports for your clients to view on their dashboards.</p>
            <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 rounded transition text-sm">Upload New Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}
