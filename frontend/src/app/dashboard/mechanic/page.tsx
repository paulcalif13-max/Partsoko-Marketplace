'use client';

import { useState } from 'react';

interface Job {
  id: string;
  customerName: string;
  phone: string;
  vehicle: string;
  service: string;
  serviceDate: string;
  notes: string;
  fee: number;
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED';
}

export default function MechanicDashboard() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 'BK-101',
      customerName: 'Alice Mwangi',
      phone: '0700112233',
      vehicle: '2016 Nissan X-Trail 2.0L',
      service: 'Front Brake Pad Replacement & Disc Skimming',
      serviceDate: 'Today, 2:00 PM',
      notes: 'Squeaking noises when braking from front left wheel.',
      fee: 3500,
      status: 'PENDING'
    },
    {
      id: 'BK-102',
      customerName: 'Kiprono Koech',
      phone: '0722998877',
      vehicle: '2019 Toyota Prado TX-L',
      service: '50,000 KM Major Periodic Service',
      serviceDate: 'Tomorrow, 9:00 AM',
      notes: 'Oil, transmission fluid, and spark plugs check.',
      fee: 8500,
      status: 'ACCEPTED'
    },
    {
      id: 'BK-103',
      customerName: 'Brian Mutua',
      phone: '0733445566',
      vehicle: '2014 Subaru Outback 2.5i',
      service: 'Check Engine Light & OBD2 Diagnostics',
      serviceDate: 'Yesterday',
      notes: 'O2 Sensor bank 1 error code diagnosed.',
      fee: 2500,
      status: 'COMPLETED'
    }
  ]);

  const updateJobStatus = (id: string, newStatus: Job['status']) => {
    setJobs(jobs.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  const totalEarnings = jobs
    .filter(j => j.status === 'COMPLETED')
    .reduce((acc, j) => acc + j.fee, 124000);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-[80vh] bg-surface">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-[10px] bg-brandDark text-white font-extrabold px-3 py-1 rounded-sm uppercase tracking-wider mb-2 inline-block">
            Mechanic & Garage Workspace
          </span>
          <h1 className="text-3xl font-extrabold text-brandDark">Job Management Center</h1>
          <p className="text-xs text-gray-500">Manage repair bookings, vehicle diagnostics, and client consultations.</p>
        </div>
        <div className="flex space-x-3">
          <span className="bg-green-100 text-green-800 px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Accepting Bookings
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full font-bold text-xs">
            ⭐ 4.9 (142 Jobs)
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Active Booking Requests</p>
          <p className="text-2xl font-black text-yellow-600 mt-1">{jobs.filter(j => j.status === 'PENDING').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Jobs in Workshop</p>
          <p className="text-2xl font-black text-blue-600 mt-1">{jobs.filter(j => j.status === 'IN_PROGRESS' || j.status === 'ACCEPTED').length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Total Revenue (Month)</p>
          <p className="text-2xl font-black text-green-600 mt-1">KES {totalEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-semibold">Trade Discount Saved</p>
          <p className="text-2xl font-black text-primary mt-1">KES 14,800</p>
        </div>
      </div>

      {/* Jobs Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-base font-bold text-brandDark">Assigned Booking Queue</h2>
              <span className="text-xs text-gray-400">Live Client Dispatch</span>
            </div>

            <div className="divide-y divide-gray-100">
              {jobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-gray-50/50 transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-gray-400">{job.id}</span>
                        <h3 className="font-extrabold text-base text-brandDark">{job.customerName}</h3>
                      </div>
                      <p className="text-xs font-semibold text-primary mt-0.5">{job.vehicle}</p>
                    </div>

                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                      job.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      job.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-800' :
                      job.status === 'IN_PROGRESS' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 mb-4 space-y-1">
                    <p><strong>Service:</strong> {job.service}</p>
                    <p><strong>Scheduled:</strong> {job.serviceDate}</p>
                    <p><strong>Customer Notes:</strong> {job.notes}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Labor / Service Fee</span>
                      <span className="font-black text-sm text-brandDark">KES {job.fee.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <a
                        href={`https://wa.me/254${job.phone.replace(/^0/, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-bold hover:bg-green-600 transition flex items-center"
                      >
                        💬 WhatsApp
                      </a>

                      {job.status === 'PENDING' && (
                        <button
                          onClick={() => updateJobStatus(job.id, 'ACCEPTED')}
                          className="px-3 py-1.5 bg-brandDark text-white rounded-lg text-xs font-bold hover:bg-primary transition"
                        >
                          Accept Booking
                        </button>
                      )}

                      {job.status === 'ACCEPTED' && (
                        <button
                          onClick={() => updateJobStatus(job.id, 'IN_PROGRESS')}
                          className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition"
                        >
                          Start Repair
                        </button>
                      )}

                      {job.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => updateJobStatus(job.id, 'COMPLETED')}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition"
                        >
                          Complete Job ✓
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-base text-brandDark mb-2">Trade Parts Discount</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              As a registered PARTSOKO mechanic, you receive <strong>10% trade discount</strong> on all spare parts ordered for client repairs.
            </p>
            <a
              href="/search"
              className="block w-full text-center bg-brandDark text-white hover:bg-brandRed font-bold py-2.5 rounded-xl transition text-xs shadow-sm"
            >
              Order Parts for Workshop
            </a>
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-xs text-gray-600 space-y-2">
            <h4 className="font-bold text-brandDark text-sm mb-1">Mechanic Guidelines</h4>
            <p>1. Always perform pre-repair inspection with the customer.</p>
            <p>2. Use genuine parts sourced from PARTSOKO to maintain warranty.</p>
            <p>3. Mark job as complete once the customer takes test drive.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
