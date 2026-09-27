export default function Home() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/logo.jpg')" }}
    >
      {/* Dark overlay to make text readable over the background image */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="max-w-4xl w-full space-y-8 text-center relative z-10 animate-fade-in-up">
        <h2 className="mt-6 text-5xl font-extrabold text-white tracking-tight drop-shadow-xl">
          Welcome to PARTSOKO
        </h2>
        <p className="mt-2 text-xl text-gray-200 drop-shadow-md font-medium">
          The ultimate marketplace for automotive spare parts, electronics, and mechanics.
        </p>
        <div className="flex justify-center space-x-4 mt-8">
          <a href="/search" className="bg-primary text-white px-8 py-4 rounded-md font-bold shadow-soft hover:shadow-hover hover:bg-blue-700 transition-all">
            Browse Parts
          </a>
          <a href="/mechanics" className="bg-secondary text-white px-8 py-4 rounded-md font-bold shadow-soft hover:shadow-hover hover:bg-purple-700 transition-all">
            Find a Mechanic
          </a>
        </div>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-soft hover:shadow-hover transition-all text-center border border-gray-100 animate-fade-in-up" style={{animationDelay: '100ms'}}>
          <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🛒</div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">For Buyers</h3>
          <p className="text-gray-600 leading-relaxed">Search for the exact part you need and get it delivered straight to you.</p>
        </div>
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-soft hover:shadow-hover transition-all text-center border border-gray-100 animate-fade-in-up" style={{animationDelay: '200ms'}}>
          <div className="w-16 h-16 bg-purple-100 text-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🏪</div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">For Sellers</h3>
          <p className="text-gray-600 leading-relaxed">List your inventory, reach thousands of buyers, and manage orders easily.</p>
        </div>
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-soft hover:shadow-hover transition-all text-center border border-gray-100 animate-fade-in-up" style={{animationDelay: '300ms'}}>
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔧</div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">For Mechanics</h3>
          <p className="text-gray-600 leading-relaxed">Get bookings, earn trade discounts on parts, and upload diagnostic reports.</p>
        </div>
      </div>
    </div>
  );
}
