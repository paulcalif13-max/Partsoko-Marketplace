'use client';

import { useState } from 'react';

interface InspectionJob {
  id: string;
  vehicleReg: string;
  makeModel: string;
  year: number;
  location: string;
  purpose: string;
  customerName: string;
  customerPhone: string;
  status: 'PENDING' | 'COMPLETED';
  estimatedValue?: number;
}

export default function ValuerDashboard() {
  const [jobs, setJobs] = useState<InspectionJob[]>([
    {
      id: 'VAL-8821',
      vehicleReg: 'KDA 789B',
      makeModel: 'Toyota Land Cruiser Prado TX',
      year: 2018,
      location: 'Westlands, Muthithi Road, Nairobi',
      purpose: 'Insurance Policy Binding',
      customerName: 'George Ndung\'u',
      customerPhone: '0711445566',
      status: 'PENDING'
    },
    {
      id: 'VAL-8820',
      vehicleReg: 'KCB 456C',
      makeModel: 'Subaru Forester 2.0XT',
      year: 2015,
      location: 'Ruaka, Kiambu Road',
      purpose: 'Sale / Purchase Market Value',
      customerName: 'Mary Wanjiku',
      customerPhone: '0722334455',
      status: 'PENDING'
    },
    {
      id: 'VAL-8815',
      vehicleReg: 'KCX 101X',
      makeModel: 'Mercedes Benz C200 W205',
      year: 2017,
      location: 'Karen, Nairobi',
      purpose: 'Logbook Loan Collateral',
      customerName: 'Davis Kiprono',
      customerPhone: '0733889900',
      status: 'COMPLETED',
      estimatedValue: 3450000
    }
  ]);

  const [selectedJob, setSelectedJob] = useState<InspectionJob | null>(null);
  const [marketValue, setMarketValue] = useState('');
  const [forcedSaleValue, setForcedSaleValue] = useState('');
  const [conditionRating, setConditionRating] = useState('Clean / Excellent');
  const [reportNotes, setReportNotes] = useState('');

  const handleCompleteReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setJobs(jobs.map(j => j.id === selectedJob.id ? {
      ...j,
      status: 'COMPLETED',
      estimatedValue: Number(marketValue)
    } : j));

    setSelectedJob(null);
    setMarketValue('');
    setForcedSaleValue('');
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-[80vh] bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-[10px] bg-brandDark text-white font-extrabold px-3 py-1 rounded-sm uppercase tracking-wider mb-2 inline-block">
            Certified Valuer Workspace
          </span>
          <h1 className="text-3xl font-extrabold text-brandDark">Vehicle Inspection & Valuation</h1>
          <p className="text-xs text-gray-500">Conduct physical inspections, verify chassis numbers, and issue certified valuation reports.</p>
        </div>
        <span className="bg-blue-100 text-primary px-3.5 py-1.5 rounded-full font-bold text-xs">
          ⭐ Verified Valuer (Licensed by AKI / NTSA)
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Pending Inspections</p>
          <p className="text-2xl font-black text-yellow-600 mt-1">{jobs.filter(j => j.status === 'PENDING').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Completed Reports</p>
          <p className="text-2xl font-black text-green-600 mt-1">{jobs.filter(j => j.status === 'COMPLETED').length + 48}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Valuation Revenue</p>
          <p className="text-2xl font-black text-brandDark mt-1">KES 175,000</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Average Turnaround</p>
          <p className="text-2xl font-black text-primary mt-1">4.2 Hours</p>
        </div>
      </div>

      {/* Job List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h2 className="text-base font-bold text-brandDark">Assigned Vehicle Inspections</h2>
          <span className="text-xs text-gray-400">NTSA / Bank Recognized</span>
        </div>

        <div className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50/50 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-gray-400">{job.id}</span>
                  <span className="font-black text-base text-brandDark">{job.vehicleReg}</span>
                  <span className="text-xs font-semibold text-gray-600">• {job.makeModel} ({job.year})</span>
                </div>
                <div className="text-xs text-gray-500 mt-1 space-x-3">
                  <span>📍 {job.location}</span>
                  <span>🎯 {job.purpose}</span>
                  <span>👤 {job.customerName} ({job.customerPhone})</span>
                </div>
                {job.estimatedValue && (
                  <p className="text-xs font-bold text-green-600 mt-2">
                    Official Valuation: KES {job.estimatedValue.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                  job.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {job.status}
                </span>

                {job.status === 'PENDING' ? (
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="bg-brandDark text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary transition shadow-sm"
                  >
                    Conduct Valuation
                  </button>
                ) : (
                  <button className="border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition">
                    Download PDF Certificate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Valuation Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="bg-brandDark px-6 py-4 flex justify-between items-center text-white">
              <div>
                <h3 className="font-extrabold text-base">Complete Vehicle Valuation</h3>
                <p className="text-xs text-gray-300">{selectedJob.vehicleReg} • {selectedJob.makeModel}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCompleteReport} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Market Value (KES) *</label>
                  <input required type="number" value={marketValue} onChange={e => setMarketValue(e.target.value)} placeholder="3800000" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Forced Sale Value (KES) *</label>
                  <input required type="number" value={forcedSaleValue} onChange={e => setForcedSaleValue(e.target.value)} placeholder="2900000" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Overall Mechanical & Body Condition *</label>
                <select value={conditionRating} onChange={e => setConditionRating(e.target.value)} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                  <option value="Clean / Excellent">Clean / Excellent (No defect noted)</option>
                  <option value="Good / Normal Wear">Good / Normal Wear & Tear</option>
                  <option value="Fair / Minor Body Scratches">Fair / Minor Body Scratches</option>
                  <option value="Poor / Requires Mechanical Repairs">Poor / Requires Mechanical Repairs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Valuer Observations & Recommendation</label>
                <textarea rows={3} value={reportNotes} onChange={e => setReportNotes(e.target.value)} placeholder="Tyre tread depth ~70%, original engine block confirmed, zero chassis realignment marks..." className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brandRed text-white py-3 rounded-xl font-bold text-sm hover:bg-red-700 transition shadow-soft"
              >
                Sign & Issue Official Valuation Certificate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
