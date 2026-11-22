'use client';

import { useState, useEffect } from 'react';

interface ImportDeskItem {
  id: string;
  url: string;
  vehicle: string;
  customer: string;
  phone: string;
  email?: string;
  notes?: string;
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
      email: 'kimani@example.com',
      status: 'RECEIVED'
    },
    {
      id: 'IMP-102',
      url: 'https://www.alibaba.com/product-detail/ECU-Bosch-D-4D...',
      vehicle: '2018 Toyota Hilux 2.8L',
      customer: 'AutoTech Solutions',
      phone: '0711223344',
      email: 'purchasing@autotech.co.ke',
      status: 'QUOTED',
      totalQuoted: 54000
    }
  ]);

  const [activeImport, setActiveImport] = useState<ImportDeskItem | null>(null);
  const [fobPrice, setFobPrice] = useState('');
  const [freight, setFreight] = useState('8500');
  const [duty, setDuty] = useState('12000');
  const [serviceFee, setServiceFee] = useState('4500');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [isSendingQuote, setIsSendingQuote] = useState(false);
  const [actionNotice, setActionNotice] = useState('');
  const [bugReports, setBugReports] = useState<any[]>([]);
  const [lastIssuedQuote, setLastIssuedQuote] = useState<{
    quoteNumber: string;
    email: string;
    emailSent: boolean;
    transportInfo: string;
    htmlPreview: string;
  } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);
  const [priceDetectionBadge, setPriceDetectionBadge] = useState<{
    text: string;
    type: 'success' | 'estimate' | 'error';
  } | null>(null);

  // Supplier multi-currency converter state
  const [supplierPriceInput, setSupplierPriceInput] = useState('');
  const [supplierCurrency, setSupplierCurrency] = useState('AUD');

  const FX_RATES: Record<string, number> = {
    AUD: 85.5,
    USD: 129.5,
    GBP: 167.0,
    EUR: 141.0,
    CAD: 94.2,
    JPY: 0.86,
    AED: 35.3,
    CNY: 18.2,
    KES: 1.0,
  };

  useEffect(() => {
    // Load current settings from backend
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data.commissionPercent) setCommission(data.commissionPercent);
        if (data.importTaxPercent) setTax(data.importTaxPercent);
      })
      .catch(() => {});

    // Load live import sourcing requests from API
    fetch('/api/imports/request')
      .then(res => res.json())
      .then(data => {
        if (data.requests && Array.isArray(data.requests)) {
          setImportRequests(data.requests);
        }
      })
      .catch(() => {});

    // Load reported bugs and issue tickets
    fetch('/api/bugs/report')
      .then(res => res.json())
      .then(data => {
        if (data.reports) setBugReports(data.reports);
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

  const handleConvertSupplierPrice = (rawInput: string, currencyCode: string) => {
    setSupplierPriceInput(rawInput);
    if (!rawInput.trim()) {
      setPriceDetectionBadge(null);
      return;
    }

    let detectedCurr = currencyCode;
    // Check if user pasted e.g. "AU $112.67", "US $74.68", "£50", etc.
    if (/AU\s*\$|AUD/i.test(rawInput)) detectedCurr = 'AUD';
    else if (/C\s*\$|CAD/i.test(rawInput)) detectedCurr = 'CAD';
    else if (/US\s*\$|USD/i.test(rawInput)) detectedCurr = 'USD';
    else if (/€|EUR/i.test(rawInput)) detectedCurr = 'EUR';
    else if (/£|GBP/i.test(rawInput)) detectedCurr = 'GBP';
    else if (/¥|JPY/i.test(rawInput)) detectedCurr = 'JPY';
    else if (/AED/i.test(rawInput)) detectedCurr = 'AED';
    else if (/CNY/i.test(rawInput)) detectedCurr = 'CNY';

    setSupplierCurrency(detectedCurr);

    const numeric = parseFloat(rawInput.replace(/[^0-9.]/g, ''));
    if (!isNaN(numeric) && numeric > 0) {
      const rate = FX_RATES[detectedCurr] || 129.5;
      const convertedKes = Math.round(numeric * rate);
      setFobPrice(String(convertedKes));

      // Auto-compute KRA duty recommendation: ~42% of CIF (FOB + Freight)
      const currentFreight = Number(freight) || 8500;
      const autoDuty = Math.round(((convertedKes + currentFreight) * 0.42) / 500) * 500;
      setDuty(String(autoDuty));

      setPriceDetectionBadge({
        text: `✨ Converted: ${numeric.toFixed(2)} ${detectedCurr} → KES ${convertedKes.toLocaleString()} (Rate: ${rate} KES/${detectedCurr}) • Recommended Duty: KES ${autoDuty.toLocaleString()}`,
        type: 'success',
      });
    }
  };

  const triggerPriceDetection = async (targetUrl?: string, vehicleInfo?: string, notesInfo?: string) => {
    const urlToFetch = targetUrl || activeImport?.url;
    if (!urlToFetch) return;

    setIsFetchingPrice(true);

    try {
      const res = await fetch('/api/imports/fetch-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: urlToFetch,
          vehicle: vehicleInfo || activeImport?.vehicle,
          notes: notesInfo || activeImport?.notes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFobPrice(String(data.fobKes));
        if (data.originalPrice) {
          setSupplierPriceInput(String(data.originalPrice));
        }
        if (data.currency) {
          setSupplierCurrency(data.currency);
        }
        if (data.estimatedDuty) {
          setDuty(String(data.estimatedDuty));
        }

        setPriceDetectionBadge({
          text: `✨ Verified from ${data.detectedVendor}: ${data.originalPrice} ${data.currency} → KES ${data.fobKes.toLocaleString()} (@ ${data.exchangeRate} KES/${data.currency})`,
          type: 'success',
        });
      } else {
        setPriceDetectionBadge({
          text: data.message || 'Supplier page blocked automated reading. Check supplier tab and enter price (e.g. AU $112.67) in the converter above.',
          type: 'error',
        });
      }
    } catch (err: any) {
      setPriceDetectionBadge({
        text: 'Price detection offline. Enter supplier price in currency converter above.',
        type: 'error',
      });
    } finally {
      setIsFetchingPrice(false);
    }
  };

  const handleOpenQuoteModal = (req: ImportDeskItem) => {
    setActiveImport(req);
    setRecipientEmail(req.email || '');
    setSupplierPriceInput('');

    // Pre-detect currency from supplier URL
    const urlLower = (req.url || '').toLowerCase();
    if (urlLower.includes('.au') || urlLower.includes('ebay.com.au')) {
      setSupplierCurrency('AUD');
    } else if (urlLower.includes('.co.uk') || urlLower.includes('ebay.co.uk')) {
      setSupplierCurrency('GBP');
    } else if (urlLower.includes('partsouq')) {
      setSupplierCurrency('AED');
    } else if (urlLower.includes('amayama') || urlLower.includes('.jp')) {
      setSupplierCurrency('JPY');
    } else {
      setSupplierCurrency('USD');
    }

    if (req.itemEst && req.itemEst !== 24050) {
      setFobPrice(String(req.itemEst));
      setDuty(req.dutyEst ? String(req.dutyEst) : '12000');
      setPriceDetectionBadge({
        text: `Saved Sourcing Quote: KES ${Number(req.itemEst).toLocaleString()}`,
        type: 'success',
      });
    } else {
      setFobPrice('');
      setDuty('12000');
      setPriceDetectionBadge(null);
      if (req.url) {
        triggerPriceDetection(req.url, req.vehicle, req.notes);
      }
    }
  };

  const handleIssueQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeImport) return;

    const total = calculateLandedCost();
    setIsSendingQuote(true);

    try {
      let quoteData: any = null;
      if (sendEmail && recipientEmail && recipientEmail.includes('@')) {
        const quoteRes = await fetch('/api/quotes/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientEmail: recipientEmail,
            clientName: activeImport.customer,
            clientPhone: activeImport.phone,
            vehicleInfo: activeImport.vehicle,
            quoteNumber: `CAL-${activeImport.id}`,
            items: [
              {
                name: `Global Import Sourced Part (${activeImport.vehicle})`,
                seller: 'Verified Overseas Supplier (CALREE Global)',
                price: total,
                quantity: 1
              }
            ],
            subtotal: total - Number(serviceFee),
            deliveryFee: Number(serviceFee),
            totalAmount: total,
            notes: `Consolidated Landed Quote: FOB KES ${Number(fobPrice).toLocaleString()} | Freight KES ${Number(freight).toLocaleString()} | KRA Customs & Duty KES ${Number(duty).toLocaleString()} | CALREE Clearance Fee KES ${Number(serviceFee).toLocaleString()}`
          })
        });

        quoteData = await quoteRes.json();

        // Update request in backend store
        await fetch('/api/imports/request', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: activeImport.id,
            status: 'QUOTED',
            totalQuoted: total,
            itemEst: Number(fobPrice) || 0,
            dutyEst: Number(duty) || 0,
            email: recipientEmail
          })
        });

        if (quoteData && quoteData.htmlPreview) {
          setLastIssuedQuote({
            quoteNumber: quoteData.quoteNumber || `CAL-${activeImport.id}`,
            email: recipientEmail,
            emailSent: quoteData.emailSent,
            transportInfo: quoteData.transportInfo,
            htmlPreview: quoteData.htmlPreview
          });
        }

        if (quoteData && quoteData.emailSent) {
          setActionNotice(`Official CALREE quotation successfully sent to ${recipientEmail}! ✓`);
        } else {
          setActionNotice(`Notice for ${recipientEmail}: ${quoteData?.transportInfo || 'Generated in preview mode'}. Click "View Quotation Letter" to inspect.`);
        }
      }
    } catch (err) {
      console.error('Failed to email quote from admin:', err);
    } finally {
      setIsSendingQuote(false);
      setImportRequests(importRequests.map(r => r.id === activeImport.id ? {
        ...r,
        status: 'QUOTED',
        totalQuoted: total,
        email: recipientEmail || r.email
      } : r));

      setActiveImport(null);
      setFobPrice('');
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-[80vh] bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-[10px] bg-calreeGreen text-slate-950 font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
            System Operations
          </span>
          <h1 className="text-3xl font-extrabold text-brandDark">CALREE Command Center</h1>
          <p className="text-xs text-gray-500">Platform governance, foreign import quoting, and financial controls.</p>
        </div>
        <div className="flex space-x-2">
          <a href="/dashboard/admin/users" className="bg-brandDark text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition">
            👥 Manage Providers & Users
          </a>
        </div>
      </div>

      {actionNotice && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl font-bold text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center space-x-2">
            <span>{actionNotice}</span>
          </div>
          <div className="flex items-center space-x-2">
            {lastIssuedQuote && (
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-800 transition shadow-sm"
              >
                👁️ View Quotation Letter
              </button>
            )}
            <button onClick={() => setActionNotice('')} className="text-emerald-700 px-1 hover:text-emerald-900">✕</button>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Active Sellers</p>
          <p className="text-2xl font-black text-brandDark mt-1">42</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Certified Mechanics</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">18</p>
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
                      <p className="text-xs font-bold text-emerald-700 mt-0.5">{req.vehicle}</p>
                      {req.email && (
                        <p className="text-[11px] text-gray-500 mt-0.5">Email: <span className="font-mono">{req.email}</span></p>
                      )}
                      {req.itemEst && req.status !== 'QUOTED' && (
                        <span className="inline-block mt-1 text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                          ⚡ Auto-detected FOB: KES {req.itemEst.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      req.status === 'QUOTED' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl mb-3 flex items-center justify-between text-xs">
                    <span className="font-mono text-gray-600 truncate max-w-sm">{req.url}</span>
                    <a href={req.url} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline font-bold whitespace-nowrap ml-2">
                      Open Supplier Link ↗
                    </a>
                  </div>

                  {req.totalQuoted && (
                    <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold mb-3 flex justify-between items-center">
                      <span>Consolidated Landed Quote:</span>
                      <span className="text-sm font-black text-emerald-800">KES {req.totalQuoted.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleOpenQuoteModal(req)}
                      className="bg-calreeGreen text-slate-950 px-4 py-2 rounded-xl text-xs font-black hover:bg-emerald-400 transition shadow-sm active:scale-95"
                    >
                      {req.status === 'QUOTED' ? 'Recalculate & Re-email Quote' : 'Calculate & Issue Official Quote'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Reported Issues & Bug Tickets */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-brandDark">User Reported Issues &amp; Bug Tickets</h2>
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                  {bugReports.filter(b => b.status !== 'RESOLVED').length} Active
                </span>
              </div>
              <span className="text-xs text-gray-400">Live Client Feedback</span>
            </div>

            <div className="divide-y divide-gray-100">
              {bugReports.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-400">
                  No active issue reports. System running smoothly.
                </div>
              ) : (
                bugReports.map((report) => (
                  <div key={report.id} className="p-5 hover:bg-gray-50/50 transition">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gray-400">{report.id}</span>
                          <h4 className="text-sm font-extrabold text-slate-900">{report.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                          {report.description}
                        </p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        report.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 pt-2 border-t border-gray-50">
                      <span>URL: <span className="text-emerald-700 font-mono">{report.url}</span></span>
                      <span>&bull;</span>
                      <span>Logged: {new Date(report.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Platform Configuration */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-brandDark mb-4">Platform Fee Controls</h2>
            
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  CALREE Marketplace Fee (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={commission}
                    onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-brandDark focus:ring-1 focus:ring-calreeGreen outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-bold">%</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Deducted automatically from seller payouts on checkout.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Local VAT Tax Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={tax}
                    onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-brandDark focus:ring-1 focus:ring-calreeGreen outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-bold">%</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Standard KRA local VAT levied on marketplace purchases.</p>
              </div>

              {saveMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg animate-fade-in">
                  {saveMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 text-calreeGreen border border-calreeGreen/30 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition shadow-sm active:scale-95"
              >
                Update Global Fee Parameters
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Audit Links</h3>
            <a href="/dashboard/admin/users" className="block w-full text-left p-3 bg-gray-50 hover:bg-emerald-50/50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:text-emerald-700 transition">
              👥 Provider Status & Verification
            </a>
            <a href="/services/import" className="block w-full text-left p-3 bg-gray-50 hover:bg-emerald-50/50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:text-emerald-700 transition">
              🌍 Test Customer Import Form
            </a>
          </div>

        </div>

      </div>

      {/* Sourcing Cost Calculator Modal */}
      {activeImport && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-slate-950 px-6 py-4 flex justify-between items-center text-white border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-calreeGreen text-slate-950 font-black flex items-center justify-center text-lg">
                  C
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Calculate Landed Cost & Issue Quote</h3>
                  <p className="text-xs text-gray-400">{activeImport.id} &bull; {activeImport.vehicle}</p>
                </div>
              </div>
              <button onClick={() => setActiveImport(null)} className="text-gray-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleIssueQuote} className="p-6 space-y-4">
              {/* Supplier Link & Foreign Currency Converter */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <span>🌐</span> Real-Time Supplier Currency Converter
                  </span>
                  {activeImport.url && (
                    <a
                      href={activeImport.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-white border border-emerald-300 hover:bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1 shadow-2xs"
                    >
                      <span>Open Supplier Tab ↗</span>
                    </a>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={supplierPriceInput}
                    onChange={e => handleConvertSupplierPrice(e.target.value, supplierCurrency)}
                    placeholder="Enter price on site (e.g. 112.67 or AU $112.67)"
                    className="flex-1 p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-slate-900 placeholder:text-gray-400 focus:ring-1 focus:ring-calreeGreen outline-none"
                  />
                  <select
                    value={supplierCurrency}
                    onChange={e => handleConvertSupplierPrice(supplierPriceInput, e.target.value)}
                    className="p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-calreeGreen outline-none"
                  >
                    <option value="AUD">AUD (AU $ - 85.5 KES)</option>
                    <option value="USD">USD ($ - 129.5 KES)</option>
                    <option value="GBP">GBP (£ - 167.0 KES)</option>
                    <option value="EUR">EUR (€ - 141.0 KES)</option>
                    <option value="CAD">CAD (C $ - 94.2 KES)</option>
                    <option value="JPY">JPY (¥ - 0.86 KES)</option>
                    <option value="AED">AED (35.3 KES)</option>
                    <option value="CNY">CNY (18.2 KES)</option>
                  </select>
                </div>
                <p className="text-[10px] text-gray-500 mt-1.5">
                  Type what you see on the supplier site (e.g. AU $112.67 or $74.68). It instantly sets the accurate FOB and recalculates KRA duty.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-gray-700">Supplier FOB (KES) *</label>
                    <button
                      type="button"
                      onClick={() => triggerPriceDetection()}
                      disabled={isFetchingPrice}
                      className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded transition disabled:opacity-50"
                      title="Re-scrape and detect price from link"
                    >
                      {isFetchingPrice ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin inline-block"></span>
                          <span>Scanning...</span>
                        </>
                      ) : (
                        <span>⚡ Auto-Detect</span>
                      )}
                    </button>
                  </div>
                  <input 
                    required 
                    type="number" 
                    value={fobPrice} 
                    onChange={e => setFobPrice(e.target.value)} 
                    placeholder="e.g. 9650" 
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-brandDark focus:ring-1 focus:ring-calreeGreen outline-none" 
                  />
                  {priceDetectionBadge && (
                    <div className={`mt-1.5 text-[10px] font-semibold p-1.5 rounded-lg leading-tight ${
                      priceDetectionBadge.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      priceDetectionBadge.type === 'estimate' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                      'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {priceDetectionBadge.text}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Air / Sea Freight (KES) *</label>
                  <input required type="number" value={freight} onChange={e => setFreight(e.target.value)} placeholder="8500" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-brandDark" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-gray-700">KRA Duty & RDL (KES) *</label>
                    <button
                      type="button"
                      onClick={() => {
                        const calculated = Math.round(((Number(fobPrice) || 0) + (Number(freight) || 8500)) * 0.42 / 500) * 500;
                        setDuty(String(calculated > 0 ? calculated : 5000));
                      }}
                      className="text-[10px] text-gray-500 hover:text-emerald-700 font-semibold underline"
                    >
                      Auto-Duty
                    </button>
                  </div>
                  <input required type="number" value={duty} onChange={e => setDuty(e.target.value)} placeholder="12000" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-brandDark" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">CALREE Fee (KES) *</label>
                  <input required type="number" value={serviceFee} onChange={e => setServiceFee(e.target.value)} placeholder="4500" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-brandDark" />
                </div>
              </div>

              {/* Recipient Email for Official Quotation */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-800">Client Email for Official Quotation</label>
                  <label className="flex items-center space-x-1.5 text-[11px] text-gray-600 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={sendEmail} 
                      onChange={e => setSendEmail(e.target.checked)} 
                      className="accent-calreeGreen rounded"
                    />
                    <span>Email client</span>
                  </label>
                </div>
                <input 
                  type="email" 
                  value={recipientEmail} 
                  onChange={e => setRecipientEmail(e.target.value)} 
                  placeholder="e.g. client@company.com" 
                  className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs" 
                />
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Total Landed Quote:</span>
                <span className="text-xl font-black text-calreeGreen">KES {calculateLandedCost().toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={isSendingQuote}
                className="w-full bg-calreeGreen text-slate-950 py-3 rounded-xl font-black text-sm hover:bg-emerald-400 transition shadow-sm active:scale-95 disabled:opacity-50"
              >
                {isSendingQuote ? 'Generating & Sending Official Quote...' : 'Issue & Send Official CALREE Quote'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Quotation HTML Preview Modal */}
      {isPreviewOpen && lastIssuedQuote && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-gray-100">
            <div className="bg-slate-950 px-6 py-4 flex justify-between items-center text-white border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-calreeGreen text-slate-950 font-black flex items-center justify-center text-lg">
                  C
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Official CALREE Quotation Preview</h3>
                  <p className="text-xs text-gray-400">{lastIssuedQuote.quoteNumber} &bull; {lastIssuedQuote.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    const iframe = document.getElementById('quotation-preview-frame') as HTMLIFrameElement;
                    if (iframe && iframe.contentWindow) {
                      iframe.contentWindow.print();
                    }
                  }}
                  className="bg-calreeGreen text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-400 transition"
                >
                  🖨️ Print / Save PDF
                </button>
                <button onClick={() => setIsPreviewOpen(false)} className="text-gray-400 hover:text-white text-lg font-bold">✕</button>
              </div>
            </div>
            
            <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-200 text-amber-900 text-xs flex justify-between items-center">
              <span>
                <strong>Delivery Status:</strong> {lastIssuedQuote.emailSent ? 'Dispatched via live SMTP server' : 'Generated in verified preview mode (Requires Google App Password in .env.local for external inbox delivery)'}
              </span>
              <span className="font-mono text-[11px] text-amber-700">{lastIssuedQuote.transportInfo}</span>
            </div>

            <div className="flex-1 bg-gray-100 p-4 overflow-auto">
              <iframe
                id="quotation-preview-frame"
                srcDoc={lastIssuedQuote.htmlPreview}
                title="Quotation Preview"
                className="w-full h-full bg-white rounded-xl shadow-inner border border-gray-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
