'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you'd get this from a JWT token or state management
    // For now, we mock it.
    const user = localStorage.getItem('user');
    if (user) {
      setRole(JSON.parse(user).role);
    } else {
      // For demo purposes, defaulting to buyer if not logged in
      setRole('BUYER');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {role === 'ADMIN' && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded cursor-pointer hover:bg-gray-50 text-center text-gray-700">Manage Users</div>
              <div className="p-4 border rounded cursor-pointer hover:bg-gray-50 text-center text-gray-700">Global Orders</div>
              <a href="/dashboard/admin" className="p-4 border rounded cursor-pointer hover:bg-gray-50 text-center block text-primary font-medium">Fee Settings</a>
            </div>
          </div>
        )}

        {role === 'SELLER' && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Seller Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/dashboard/inventory" className="p-4 border rounded cursor-pointer hover:bg-gray-50 text-center block text-primary font-medium">Manage Inventory (Add Parts)</a>
              <a href="/dashboard/orders" className="p-4 border rounded cursor-pointer hover:bg-gray-50 text-center block text-primary font-medium">Incoming Orders</a>
            </div>
          </div>
        )}

        {/* Buyer Section is available to ALL users (Sellers and Mechanics can also buy) */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">My Shopping Account (Buyer)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/dashboard/purchases" className="p-4 border rounded cursor-pointer hover:bg-gray-50 text-center block text-primary font-medium">My Purchase History & Quotations</a>
          </div>
        </div>

        {role === 'MECHANIC' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Mechanic Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/dashboard/mechanic" className="p-4 border rounded cursor-pointer hover:bg-gray-50 text-center block text-primary font-medium">My Bookings</a>
              <div className="p-4 border rounded cursor-pointer hover:bg-gray-50 text-center text-gray-700">Trade Discount Parts</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
