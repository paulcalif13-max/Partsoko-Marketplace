'use client';

import { useState } from 'react';

interface PartItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  partNumber: string;
  price: number;
  stock: number;
  condition: string;
}

export default function SellerDashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<PartItem[]>([
    { id: '1', name: 'Toyota Prado Front Brake Pads', category: 'SUSPENSION', brand: 'Toyota Genuine', partNumber: '04465-60320', price: 12500, stock: 18, condition: 'NEW' },
    { id: '2', name: 'Alternator 12V 150A - Denso', category: 'ELECTRICAL', brand: 'Denso', partNumber: '104210-4820', price: 28000, stock: 6, condition: 'NEW' },
    { id: '3', name: 'Subaru Forester SJ Turbo Assembly', category: 'ENGINE', brand: 'IHI', partNumber: '14411AA881', price: 48000, stock: 3, condition: 'REFURBISHED' }
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-9921', items: '2x Toyota Hilux Brake Pads • 1x Oil Filter', total: 12500, customer: "Mechanic Mike's Garage", status: 'PENDING' },
    { id: 'ORD-9918', items: '1x Land Rover Defender Front Bumper', total: 45000, customer: 'Ridgeview 4x4 Club', status: 'SHIPPED' }
  ]);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('ENGINE');
  const [brand, setBrand] = useState('OEM');
  const [partNumber, setPartNumber] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [condition, setCondition] = useState('NEW');

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: PartItem = {
      id: `p-${Date.now()}`,
      name,
      category,
      brand,
      partNumber,
      price: Number(price),
      stock: Number(stock),
      condition
    };

    try {
      const user = localStorage.getItem('user');
      const token = user ? JSON.parse(user).token : '';
      if (token) {
        await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newProd)
        });
      }
    } catch (err) {
      console.warn('Backend offline, saving locally in session state');
    }

    setProducts([newProd, ...products]);
    setShowAddModal(false);
    // Reset form
    setName('');
    setPartNumber('');
    setPrice('');
  };

  const handleToggleOrderStatus = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: o.status === 'PENDING' ? 'SHIPPED' : 'PENDING' } : o));
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-[80vh] bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-[10px] bg-brandRed text-white font-extrabold px-3 py-1 rounded-sm uppercase tracking-wider mb-2 inline-block">
            Seller Control Center
          </span>
          <h1 className="text-3xl font-extrabold text-brandDark">Merchant Dashboard</h1>
          <p className="text-xs text-gray-500">Manage your parts inventory, orders, and sales performance.</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-bold text-xs flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Store Active
          </span>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-brandRed text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-red-700 transition shadow-soft flex items-center"
          >
            + Add New Part
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Active Listings</p>
          <p className="text-2xl font-black text-brandDark mt-1">{products.length + 12}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Pending Orders</p>
          <p className="text-2xl font-black text-yellow-600 mt-1">{orders.filter(o => o.status === 'PENDING').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Monthly Sales</p>
          <p className="text-2xl font-black text-green-600 mt-1">KES 840,000</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Escrow Payout Balance</p>
          <p className="text-2xl font-black text-primary mt-1">KES 68,500</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Orders Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-base font-bold text-brandDark">Recent Customer Orders</h2>
              <span className="text-xs text-gray-400 font-medium">Automatic M-Pesa Verification</span>
            </div>
            
            <div className="divide-y divide-gray-100">
              {orders.map((order) => (
                <div key={order.id} className="p-6 hover:bg-gray-50/50 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-extrabold text-sm text-brandDark">{order.id}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{order.items}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      order.status === 'SHIPPED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="text-xs text-gray-600">
                      <p>Customer: <strong className="text-brandDark">{order.customer}</strong></p>
                      <p className="font-bold text-brandDark text-sm mt-0.5">KES {order.total.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => handleToggleOrderStatus(order.id)}
                      className="px-4 py-1.5 bg-brandDark text-white rounded-lg text-xs font-bold hover:bg-primary transition shadow-sm"
                    >
                      {order.status === 'PENDING' ? 'Mark as Shipped' : 'Mark as Pending'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Inventory */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-brandDark">Current Store Inventory</h2>
              <span className="text-xs text-gray-400">{products.length} parts listed</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className="py-2.5 px-3">Part Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">OEM / SKU</th>
                    <th className="py-2.5 px-3">Price</th>
                    <th className="py-2.5 px-3">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-3 font-bold text-brandDark">{p.name}</td>
                      <td className="py-2.5 px-3 text-gray-500">{p.category}</td>
                      <td className="py-2.5 px-3 font-mono text-gray-600">{p.partNumber || '—'}</td>
                      <td className="py-2.5 px-3 font-extrabold text-brandDark">KES {p.price.toLocaleString()}</td>
                      <td className="py-2.5 px-3 font-bold text-green-600">{p.stock} units</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Tools */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-base text-brandDark mb-2">Merchant Tools</h3>
            <p className="text-xs text-gray-500 mb-4">Quick actions to grow your automotive parts business.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="block w-full text-center bg-brandRed text-white hover:bg-red-700 font-bold py-2.5 rounded-xl transition text-xs shadow-soft"
            >
              + List New Spare Part
            </button>
            <button className="w-full mt-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-2.5 rounded-xl transition text-xs">
              📄 Bulk Import via CSV
            </button>
          </div>

          <div className="bg-blue-50/60 rounded-2xl shadow-sm border border-blue-100 p-6">
            <h3 className="font-bold text-sm text-blue-900 mb-2">Payout Schedule</h3>
            <p className="text-xs text-blue-800 leading-relaxed mb-4">
              Escrow funds for verified customer deliveries are released directly to your Safaricom M-Pesa / Bank account every Tuesday and Friday.
            </p>
            <div className="bg-white rounded-xl p-3 border border-blue-100 flex justify-between items-center text-xs">
              <span className="text-gray-500">Next Payout:</span>
              <strong className="text-blue-900">Friday, 10:00 AM</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="bg-brandDark px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-extrabold text-base">List New Spare Part</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Part / Product Name *</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Toyota Prado Front Brake Pads" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                    <option value="ENGINE">Engine & Parts</option>
                    <option value="TRANSMISSION">Transmission & Drive</option>
                    <option value="SUSPENSION">Suspension & Steering</option>
                    <option value="ELECTRICAL">Electrical & Electronics</option>
                    <option value="LIGHTING">Lighting & Lamps</option>
                    <option value="FUEL">Fuel Systems & Injectors</option>
                    <option value="BODY">Body & Exterior</option>
                    <option value="ACCESSORIES">Accessories & Car Care</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Brand / Manufacturer *</label>
                  <input required type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. Denso, Bosch, Toyota" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">OEM Part # / SKU</label>
                  <input type="text" value={partNumber} onChange={e => setPartNumber(e.target.value)} placeholder="e.g. 04465-60320" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Condition *</label>
                  <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                    <option value="NEW">Brand New</option>
                    <option value="REFURBISHED">Refurbished / Tested</option>
                    <option value="USED">Used / Scrap Salvage</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Selling Price (KES) *</label>
                  <input required type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="12500" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Available Stock *</label>
                  <input required type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="10" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brandRed text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition shadow-soft mt-2"
              >
                Publish Part to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
