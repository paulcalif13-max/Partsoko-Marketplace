'use client';

import { useState } from 'react';

interface Mechanic {
  id: string;
  name: string;
  garageName: string;
  location: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  hourlyRate: number;
  phone: string;
  experienceYears: number;
  verified: boolean;
  image: string;
}

const MOCK_MECHANICS: Mechanic[] = [
  {
    id: 'm1',
    name: 'Joseph Mwangi',
    garageName: 'Apex Precision Auto Lab',
    location: 'Ruaka, Kiambu Road',
    rating: 4.9,
    reviewsCount: 142,
    specialties: ['Diagnostics & Electrical', 'German / European', 'ECU Remapping'],
    hourlyRate: 2500,
    phone: '+254702420404',
    experienceYears: 12,
    verified: true,
    image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'm2',
    name: 'Brian Otieno',
    garageName: 'ProAuto Japanese Specialists',
    location: 'Industrial Area, Commercial St, Nairobi',
    rating: 4.8,
    reviewsCount: 98,
    specialties: ['Engine Overhaul', 'Japanese', 'Gearbox & Transmission'],
    hourlyRate: 2000,
    phone: '+254711223344',
    experienceYears: 9,
    verified: true,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'm3',
    name: 'Samuel Kipkorir',
    garageName: 'Trackside Suspension & Brakes',
    location: 'Westlands, Muthithi Road, Nairobi',
    rating: 4.7,
    reviewsCount: 76,
    specialties: ['Suspension & Brakes', '4x4 Offroad Tuning', 'Wheel Alignment'],
    hourlyRate: 1800,
    phone: '+254722334455',
    experienceYears: 8,
    verified: true,
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'm4',
    name: 'David Kamau',
    garageName: 'Elite Car Care & Paint Works',
    location: 'Ngong Road, Adams Arcade, Nairobi',
    rating: 4.9,
    reviewsCount: 110,
    specialties: ['Bodywork & Painting', 'Accident Repairs', 'Panel Beating'],
    hourlyRate: 2200,
    phone: '+254733445566',
    experienceYears: 15,
    verified: true,
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'm5',
    name: 'Hassan Noor',
    garageName: 'Coast Diesel & Turbo Clinic',
    location: 'Mombasa Island, Jomo Kenyatta Ave',
    rating: 4.6,
    reviewsCount: 64,
    specialties: ['Diesel Injectors', 'Turbochargers', 'Heavy Commercial'],
    hourlyRate: 2400,
    phone: '+254744556677',
    experienceYears: 11,
    verified: true,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  }
];

export default function MechanicsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [bookingMechanic, setBookingMechanic] = useState<Mechanic | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Filter logic
  const filteredMechanics = MOCK_MECHANICS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.garageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation =
      selectedLocation === 'ALL' || m.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'ALL' || m.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingMechanic(null);
    }, 2500);
  };

  return (
    <div className="bg-surface min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="bg-brandDark text-white rounded-2xl p-8 md:p-12 mb-10 shadow-soft relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="bg-brandRed text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mb-3">
              Verified Auto Technicians
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Find Trusted Mechanics & Garages Near You
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              Book certified mechanics with verified customer reviews, clear transparent pricing, and guaranteed genuine parts delivery from PARTSOKO.
            </p>
            
            {/* Search Input */}
            <div className="flex bg-white rounded-lg p-1 max-w-lg shadow-lg">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by specialty, car model, or garage name..." 
                className="w-full px-4 py-2 text-gray-800 text-sm outline-none rounded-l-md"
              />
              <button className="bg-brandRed text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-red-700 transition flex items-center">
                Search
              </button>
            </div>
          </div>
          
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <span className="text-9xl font-black">⚙️</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location:</span>
            {['ALL', 'Ruaka', 'Industrial Area', 'Westlands', 'Ngong Road', 'Mombasa'].map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition ${
                  selectedLocation === loc
                    ? 'bg-brandDark text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <label className="text-xs font-bold text-gray-500 whitespace-nowrap">Specialty:</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg text-xs py-2 px-3 font-semibold text-gray-700 outline-none focus:border-primary"
            >
              <option value="ALL">All Specialties</option>
              <option value="Diagnostics & Electrical">Diagnostics & Electrical</option>
              <option value="Engine Overhaul">Engine Overhaul</option>
              <option value="Suspension & Brakes">Suspension & Brakes</option>
              <option value="German / European">German / European</option>
              <option value="Japanese">Japanese</option>
              <option value="Bodywork & Painting">Bodywork & Painting</option>
              <option value="Diesel Injectors">Diesel Injectors</option>
            </select>
          </div>
        </div>

        {/* Mechanics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMechanics.map((mechanic) => (
            <div
              key={mechanic.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-hover transition overflow-hidden flex flex-col group"
            >
              <div className="p-6 flex-grow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={mechanic.image}
                      alt={mechanic.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-brandRed/20"
                    />
                    <div>
                      <h3 className="font-extrabold text-base text-brandDark group-hover:text-primary transition">
                        {mechanic.name}
                      </h3>
                      <p className="text-xs font-semibold text-gray-500">{mechanic.garageName}</p>
                    </div>
                  </div>
                  {mechanic.verified && (
                    <span className="bg-blue-50 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center text-xs text-gray-600 mb-3">
                  <svg className="w-4 h-4 mr-1 text-brandRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">{mechanic.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-xs mb-4">
                  <div className="flex items-center text-yellow-500 font-bold">
                    ⭐ {mechanic.rating}
                  </div>
                  <span className="text-gray-400">({mechanic.reviewsCount} jobs)</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 font-medium">{mechanic.experienceYears} yrs experience</span>
                </div>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mechanic.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Rate / Hour</span>
                  <span className="font-extrabold text-sm text-brandDark">KES {mechanic.hourlyRate.toLocaleString()}</span>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`https://wa.me/${mechanic.phone.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    title="WhatsApp Mechanic"
                  >
                    💬
                  </a>
                  <button
                    onClick={() => setBookingMechanic(mechanic)}
                    className="bg-brandDark text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-brandRed transition shadow-sm"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMechanics.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-lg font-bold text-brandDark mb-2">No mechanics matched your filter</h3>
            <p className="text-sm text-gray-500 mb-6">Try broadening your search keyword or clearing the filters.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('ALL');
                setSelectedSpecialty('ALL');
              }}
              className="bg-brandDark text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-primary transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingMechanic && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
            <div className="bg-brandDark px-6 py-4 flex justify-between items-center text-white">
              <div>
                <h3 className="font-extrabold text-lg">Book Service Appointment</h3>
                <p className="text-xs text-gray-300">With {bookingMechanic.name} ({bookingMechanic.garageName})</p>
              </div>
              <button
                onClick={() => setBookingMechanic(null)}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              {bookingSubmitted ? (
                <div className="text-center py-8 text-green-600">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    ✓
                  </div>
                  <h4 className="font-extrabold text-xl text-brandDark mb-2">Booking Confirmed!</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {bookingMechanic.name} has been notified and will reach out via WhatsApp/Phone shortly.
                  </p>
                  <span className="text-xs text-gray-400">Booking Ref: PRT-MC-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                      <input required type="text" placeholder="0702420404" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Vehicle Make & Model</label>
                      <input required type="text" placeholder="Toyota Prado 2018" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Preferred Date</label>
                      <input required type="date" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Description of Issue / Service Required</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Brakes grinding, periodic 50,000km major service, check engine light diagnostics..."
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                    ></textarea>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-center justify-between text-xs text-blue-900">
                    <span>Base Diagnostics / Consultation Fee:</span>
                    <span className="font-bold">KES {bookingMechanic.hourlyRate.toLocaleString()}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brandRed text-white font-bold py-3 rounded-xl hover:bg-red-700 transition shadow-soft"
                  >
                    Confirm Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
