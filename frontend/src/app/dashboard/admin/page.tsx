'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [commission, setCommission] = useState(5.0);
  const [tax, setTax] = useState(16.0);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Settings saved: Commission ${commission}%, Tax ${tax}%`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Command Center</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* left column - Core Settings */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Financials & Categories</h2>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Set Commission (%)</label>
                <input type="number" step="0.1" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={commission} onChange={(e) => setCommission(parseFloat(e.target.value))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Set Tax / Import (%)</label>
                <input type="number" step="0.1" className="mt-1 block w-full border border-gray-300 rounded-md p-2" value={tax} onChange={(e) => setTax(parseFloat(e.target.value))} />
              </div>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-blue-700 w-full">Update Global Fees</button>
            </form>
            <div className="mt-4 space-y-2">
              <button className="w-full text-left px-4 py-2 bg-gray-50 border rounded hover:bg-gray-100">⚙️ Set Service Categories</button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 border rounded hover:bg-gray-100">💰 Manage Prices & Margins</button>
            </div>
          </div>
        </div>

        {/* Middle Column - User & Provider Management */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Provider & User Management</h2>
            <div className="space-y-3">
              <a href="/dashboard/admin/users" className="w-full text-left px-4 py-2 bg-blue-50 text-blue-900 border border-blue-200 rounded font-medium block">📄 Verify Documents (3 Pending)</a>
              <a href="/dashboard/admin/users" className="w-full text-left px-4 py-2 bg-gray-50 border rounded hover:bg-gray-100 block">⚖️ Approve / Reject Valuers</a>
              <a href="/dashboard/admin/users" className="w-full text-left px-4 py-2 bg-gray-50 border rounded hover:bg-gray-100 block">🛑 Suspend Providers</a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Operations</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-gray-50 border rounded hover:bg-gray-100">📅 Manage Bookings</button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 border rounded hover:bg-gray-100">⭐ Manage Reviews</button>
            </div>
          </div>
        </div>

        {/* Right Column - Resolutions & Reports */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-red-500">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Disputes & Refunds</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-gray-50 border rounded hover:bg-gray-100">🚨 Handle Disputes</button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 border rounded hover:bg-gray-100">💸 Handle Refunds</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Analytics</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-gray-50 border rounded hover:bg-gray-100">📊 Monitor Reports</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
