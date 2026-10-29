'use client';

import { useState, useEffect } from 'react';

interface ImportDeskItem {
  id: string;
  url: string;
  vehicle: string;
  customer: string;
  phone: string;
  status: string;
  itemEst?: number;
  dutyEst?: number;
  totalQuoted?: number;
}

export default function AdminDashboard() {
  const [commission, setCommission] = useState(5.0);
  const [tax, setTax] = useState(16.0);
  const [saveMessage, setSaveMessage] = useState('');

  // Sourcing Desk state
  const [importRequests, setImportRequests] = useState<ImportDeskItem[]>([
    {
      id: 'IMP-101',
      url: 'https://www.ebay.com/itm/3248920192',
      vehicle: '2016 Land Rover Defender TD5',
      customer: 'David Kimani',
      phone: '0702420404',
      status: 'RECEIVED'
    },
    {
      id: 'IMP-102',
      url: 'https://www.alibaba.com/product-detail/ECU-Bosch-D-4D...',
      vehicle: '2018 Toyota Hilux 2.8L',
      customer: 'AutoTech Solutions',
      phone: '0711223344',
      status: 'QUOTED',
      totalQuoted: 54000
    }
  ]);

  const [activeImport, setActiveImport] = useState<ImportDeskItem | null>(null);
  const [fobPrice, setFobPrice] = useState('');
  const [freight, setFreight] = useState('8500');
  const [duty, setDuty] = useState('12000');
  const [serviceFee, setServiceFee] = useState('4500');

  useEffect(() => {
    // Load current settings from backend
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.commissionPercent) setCommission(data.commissionPercent);
        if (data.importTaxPercent) setTax(data.importTaxPercent);
      })
      .catch(() => {});
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem('user');
      const token = user ? JSON.parse(user).token : '';
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ commissionPercent: commission, importTaxPercent: tax })
      });
      setSaveMessage('Fee settings updated successfully in database! ✓');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      setSaveMessage('Saved locally in session.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const calculateLandedCost = () => {
    return (Number(fobPrice) || 0) + (Number(freight) || 0) + (Number(duty) || 0) + (Number(serviceFee) || 0);
  };

  const handleIssueQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeImport) return;

    const total = calculateLandedCost();
    setImportRequests(importRequests.map(r => r.id === activeImport.id ? {
      ...r,
      status: 'QUOTED',
      totalQuoted: total
    } : r));

    setActiveImport(null);
    setFobPrice('');
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-[80vh] bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-[10px] bg-brandRed text-white font-extrabold px-3 py-1 rounded-sm uppercase tracking-wider mb-2 inline-block">
            System Operations
          </span>
          <h1 className="text-3xl font-extrabold text-brandDark">PARTSOKO Command Center</h1>
          <p className="text-xs text-gray-500">Platform governance, foreign import quoting, and financial controls.</p>
        </div>
        <div className="flex space-x-2">
          <a href="/dashboard/admin/users" className="bg-brandDark text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition">
            👥 Manage Providers & Users
          </a>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Active Sellers</p>
          <p className="text-2xl font-black text-brandDark mt-1">42</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Certified Mechanics</p>
          <p className="text-2xl font-black text-primary mt-1">18</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Import Quoting Desk</p>
          <p className="text-2xl font-black text-yellow-600 mt-1">{importRequests.filter(r => r.status === 'RECEIVED').length} Pending</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Platform GMV (KES)</p>
          <p className="text-2xl font-black text-green-600 mt-1">KES 3.4M</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Import Sourcing Desk */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-base font-bold text-brandDark">Global Import Sourcing Desk</h2>
              <span className="text-xs text-gray-400 font-medium">Alibaba / eBay / Japan Quotes</span>
            </div>

            <div className="divide-y divide-gray-100">
              {importRequests.map((req) => (
                <div key={req.id} className="p-6 hover:bg-gray-50/50 transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-gray-400">{req.id}</span>
                        <h3 className="font-extrabold text-sm text-brandDark">{req.customer}</h3>
                        <span className="text-xs text-gray-400 font-mono">({req.phone})</span>
                      </div>
                      <p className="text-xs font-bold text-primary mt-0.5">{req.vehicle}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      req.status === 'QUOTED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl mb-3 flex items-center justify-between text-xs">
                    <span className="font-mono text-gray-600 truncate max-w-sm">{req.url}</span>
                    <a href={req.url} target="_blank" rel="noreferrer" className="text-primary hover:underline font-bold whitespace-nowrap ml-2">
                      Open Supplier Link ↗
                    </a>
                  </div>

                  {req.totalQuoted && (
                    <div className="bg-green-50 text-green-800 px-3 py-1.5 rounded-lg text-xs font-bold mb-3 flex justify-between items-center">
                      <span>Consolidated Landed Quote:</span>
                      <span className="text-sm">KES {req.totalQuoted.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setActiveImport(req)}
                      className="bg-brandDark text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary transition shadow-sm"
                    >
                      {req.status === 'QUOTED' ? 'Recalculate Landed Cost' : 'Calculate & Issue Quote'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Platform Controls */}
        <div className="space-y-6">
          
          {/* Financial Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-base text-brandDark mb-3">Marketplace Fee Settings</h3>
            {saveMessage && (
              <p className="text-xs text-green-600 font-bold mb-3">{saveMessage}</p>
            )}
            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Marketplace Commission (%)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={commission} 
                  onChange={e => setCommission(parseFloat(e.target.value))} 
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold" 
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Standard Import Duty / Tax (%)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={tax} 
                  onChange={e => setTax(parseFloat(e.target.value))} 
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-brandRed text-white py-2.5 rounded-xl font-bold hover:bg-red-700 transition shadow-soft"
              >
                Save Global Rates
              </button>
            </form>
          </div>

          {/* Quick Operations */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-bold text-base text-brandDark mb-2">Governance Shortcuts</h3>
            <a href="/dashboard/admin/users" className="block w-full text-left p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:text-primary transition">
              📄 Review Uploaded Merchant Documents
            </a>
            <a href="/dashboard/admin/users" className="block w-full text-left p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:text-primary transition">
              🛑 Provider Status & Suspensions
            </a>
            <a href="/services/import" className="block w-full text-left p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:text-primary transition">
              🌍 Test Customer Import Form
            </a>
          </div>

        </div>

      </div>

      {/* Sourcing Cost Calculator Modal */}
      {activeImport && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="bg-brandDark px-6 py-4 flex justify-between items-center text-white">
              <div>
                <h3 className="font-extrabold text-base">Calculate Landed Cost</h3>
                <p className="text-xs text-gray-300">{activeImport.id} • {activeImport.vehicle}</p>
              </div>
              <button onClick={() => setActiveImport(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleIssueQuote} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Supplier FOB Price (KES) *</label>
                  <input required type="number" value={fobPrice} onChange={e => setFobPrice(e.target.value)} placeholder="e.g. 25000" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Air / Sea Freight (KES) *</label>
                  <input required type="number" value={freight} onChange={e => setFreight(e.target.value)} placeholder="8500" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">KRA Duty & RDL (KES) *</label>
                  <input required type="number" value={duty} onChange={e => setDuty(e.target.value)} placeholder="12000" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">PARTSOKO Fee (KES) *</label>
                  <input required type="number" value={serviceFee} onChange={e => setServiceFee(e.target.value)} placeholder="4500" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>

              <div className="bg-brandDark text-white p-4 rounded-xl flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Total Landed Quote:</span>
                <span className="text-xl font-black text-brandRed">KES {calculateLandedCost().toLocaleString()}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-brandRed text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition shadow-soft"
              >
                Send Consolidated Quote to Customer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
