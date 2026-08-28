export default function Events() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Upcoming Events</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">Join the PARTSOKO community at our exclusive automotive gatherings.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-500">Event Image Placeholder</div>
          <div className="p-6">
            <p className="text-sm font-semibold text-primary mb-1">Nov 15, 2024 • Nairobi</p>
            <h3 className="text-xl font-bold mb-2">Annual Auto Expo & Swap Meet</h3>
            <p className="text-gray-600 mb-4">The largest gathering of mechanics, spare part vendors, and car enthusiasts in East Africa. Network, trade, and showcase!</p>
            <button className="text-primary font-medium hover:underline">RSVP Now &rarr;</button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-500">Event Image Placeholder</div>
          <div className="p-6">
            <p className="text-sm font-semibold text-primary mb-1">Dec 05, 2024 • Virtual</p>
            <h3 className="text-xl font-bold mb-2">Masterclass: Modern Car Diagnostics</h3>
            <p className="text-gray-600 mb-4">A specialized virtual training session for registered PARTSOKO mechanics covering the latest OBD2 scanning and electronic diagnostics.</p>
            <button className="text-primary font-medium hover:underline">Register for Webinar &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
