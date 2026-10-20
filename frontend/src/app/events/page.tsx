'use client';

import { useState } from 'react';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  badge: string;
  image: string;
  description: string;
  attendees: number;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'ev-1',
    title: 'East Africa Auto Expo & Parts Swap Meet 2026',
    date: 'March 28, 2026',
    time: '9:00 AM - 5:00 PM EAT',
    location: 'KICC Grounds, Nairobi',
    type: 'In-Person',
    badge: 'FLAGSHIP EXPO',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    description: 'The premier automotive showcase uniting over 250 spare part importers, certified mechanics, off-road fabricators, and classic car restorers from Kenya, Uganda, and Tanzania.',
    attendees: 420
  },
  {
    id: 'ev-2',
    title: 'Modern Common-Rail & Hybrid Diagnostics Masterclass',
    date: 'April 14, 2026',
    time: '2:00 PM - 5:30 PM EAT',
    location: 'PARTSOKO Training Hub, Ruaka & Live Stream',
    type: 'Hybrid Workshop',
    badge: 'TECHNICAL TRAINING',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    description: 'Hands-on practical workshop covering OBD2 oscilloscope wave analysis, Toyota/Lexus hybrid inverter troubleshooting, and Bosch common-rail diesel injector coding.',
    attendees: 185
  },
  {
    id: 'ev-3',
    title: 'Great Rift Valley 4x4 Offroad Challenge & Overland Clinic',
    date: 'May 09, 2026',
    time: '7:30 AM - 6:00 PM EAT',
    location: 'Naivasha Track, Nakuru County',
    type: 'Outdoor Event',
    badge: 'MOTORSPORT',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    description: 'Test your Land Cruiser, Patrol, or Defender suspensions on grueling terrain with expert recovery demos, winch clinic, and overland gear displays.',
    attendees: 310
  },
  {
    id: 'ev-4',
    title: 'Automotive Vendors & Fleet Management Summit',
    date: 'June 20, 2026',
    time: '9:30 AM - 4:00 PM EAT',
    location: 'Radisson Blu, Upper Hill, Nairobi',
    type: 'Conference',
    badge: 'B2B NETWORKING',
    image: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=800&q=80',
    description: 'Exclusive B2B forum for fleet operators, matatu SACCOs, and parts retailers exploring digital inventory APIs, credit financing, and bulk sourcing discounts.',
    attendees: 140
  }
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpData, setRsvpData] = useState({ name: '', phone: '', email: '', role: 'Car Owner / Enthusiast' });
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.name || !rsvpData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setSelectedEvent(null);
      setRsvpData({ name: '', phone: '', email: '', role: 'Car Owner / Enthusiast' });
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-brandRed font-bold text-xs uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full">
          Automotive Gatherings & Expos
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-3">
          Upcoming Automotive Events
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Connect with Kenya's leading auto mechanics, parts vendors, restorers, and motorsport enthusiasts at official PARTSOKO conventions.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {EVENTS_DATA.map((event) => (
          <div 
            key={event.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 bg-brandRed text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {event.badge}
                </span>
                <span className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center">
                  📍 {event.location}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-semibold text-brandRed mb-2">
                  <span>📅 {event.date} • {event.time}</span>
                  <span className="text-gray-400 font-normal">{event.attendees} Attending</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brandRed transition">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">{event.type}</span>
              <button 
                onClick={() => setSelectedEvent(event)}
                className="bg-brandDark text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-brandRed transition shadow"
              >
                RSVP / Register Free &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>

            {rsvpSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">RSVP Confirmed!</h3>
                <p className="text-xs text-gray-600">Your badge pass has been registered. We look forward to seeing you at {selectedEvent.title}.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit}>
                <span className="text-xs font-bold text-brandRed uppercase tracking-wider">Free Event Registration</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 mb-1">{selectedEvent.title}</h3>
                <p className="text-xs text-gray-500 mb-5">📅 {selectedEvent.date} • {selectedEvent.location}</p>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dennis Kiprop"
                      value={rsvpData.name}
                      onChange={e => setRsvpData({...rsvpData, name: e.target.value})}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">M-Pesa / Mobile Phone *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 0722000000"
                      value={rsvpData.phone}
                      onChange={e => setRsvpData({...rsvpData, phone: e.target.value})}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. dennis@example.com"
                      value={rsvpData.email}
                      onChange={e => setRsvpData({...rsvpData, email: e.target.value})}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">I am registering as:</label>
                    <select 
                      value={rsvpData.role}
                      onChange={e => setRsvpData({...rsvpData, role: e.target.value})}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white focus:ring-1 focus:ring-brandRed focus:border-brandRed outline-none"
                    >
                      <option>Car Owner / Enthusiast</option>
                      <option>Professional Auto Mechanic / Technician</option>
                      <option>Spare Parts Vendor / Dealer</option>
                      <option>Fleet Operator / SACCO Representative</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brandRed text-white py-3 rounded-lg text-xs font-bold hover:bg-red-700 transition shadow mt-2"
                  >
                    Confirm My Attendance (Free)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
