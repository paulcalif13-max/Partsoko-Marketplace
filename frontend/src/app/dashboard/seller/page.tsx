'use client';

export default function SellerDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto min-h-[80vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Seller Hub</h1>
        <div className="flex space-x-3">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold text-sm flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Store Open
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold text-sm">
            ⭐ 4.6 (128 Reviews)
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Active Listings</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">New Orders</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">8</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Total Sales (Month)</p>
          <p className="text-3xl font-bold text-green-600 mt-2">KES 840,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-semibold">Pending Payouts</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">KES 45,000</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Books & Jobs (Orders & Inventory) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders (Books)</h2>
              <a href="/dashboard/orders" className="text-sm font-medium text-primary hover:underline">View All Orders</a>
            </div>
            
            <div className="divide-y divide-gray-100">
              {/* Order Item */}
              <div className="p-6 hover:bg-blue-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Order #ORD-9921</h3>
                    <p className="text-sm text-gray-500">2x Toyota Hilux Brake Pads • 1x Oil Filter</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">PENDING FULFILLMENT</span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="text-sm text-gray-700">
                    <p><strong>Total:</strong> KES 12,500</p>
                    <p><strong>Customer:</strong> Mechanic Mike's Garage</p>
                  </div>
                  <div className="space-x-3">
                    <button className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-blue-700 shadow-sm">Mark as Ready / Shipped</button>
                  </div>
                </div>
              </div>

              {/* Order Item */}
              <div className="p-6 hover:bg-blue-50 transition opacity-60">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Order #ORD-9918</h3>
                    <p className="text-sm text-gray-500">1x Land Rover Defender Front Bumper</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">SHIPPED</span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div className="text-sm text-gray-700">
                    <p><strong>Total:</strong> KES 45,000</p>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50 text-sm">View Waybill</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Inventory Management</h3>
            <p className="text-sm text-gray-500 mb-4">Add new parts to the marketplace or update your stock levels.</p>
            <a href="/dashboard/inventory" className="block w-full text-center bg-primary text-white hover:bg-blue-700 font-bold py-2 rounded transition">Add New Part</a>
            <button className="w-full mt-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-2 rounded transition text-sm">Bulk Upload (CSV)</button>
          </div>

          <div className="bg-blue-50 rounded-xl shadow-sm border border-blue-100 p-6">
            <h3 className="font-bold text-lg text-blue-900 mb-4">Low Stock Alerts</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-blue-200 pb-2">
                <span className="text-gray-700">Mazda Spark Plugs</span>
                <span className="font-bold text-red-600">2 left</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-blue-200 pb-2">
                <span className="text-gray-700">Subaru Air Filter</span>
                <span className="font-bold text-red-600">0 left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
