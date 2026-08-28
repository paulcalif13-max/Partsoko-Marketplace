'use client';

export default function MechanicDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mechanic Workspace</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Alice Smith<br/><span className="text-xs text-gray-500">0700112233</span></td>
              <td className="px-6 py-4 whitespace-nowrap">Oct 24, 2024</td>
              <td className="px-6 py-4 text-sm text-gray-500">Brake pad replacement</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">PENDING</span></td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button className="text-green-600 hover:underline mr-3">Confirm</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Trade Discounts</h3>
        <p className="text-blue-800 mb-4">As a verified PARTSOKO mechanic, you automatically receive a 10% discount on all parts at checkout.</p>
        <a href="/search" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Browse Parts</a>
      </div>
    </div>
  );
}
