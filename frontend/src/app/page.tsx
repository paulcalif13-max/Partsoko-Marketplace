export default function Home() {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/logo.jpg')" }}
    >
      {/* Dark overlay to make text readable over the background image */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="max-w-4xl w-full space-y-8 text-center relative z-10">
        <h2 className="mt-6 text-4xl font-extrabold text-white drop-shadow-md">
          Welcome to PARTSOKO
        </h2>
        <p className="mt-2 text-xl text-gray-200 drop-shadow-md">
          The ultimate marketplace for automotive spare parts, electronics, and mechanics.
        </p>
        <div className="flex justify-center space-x-4 mt-8">
          <a href="/search" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition">
            Browse Parts
          </a>
          <a href="/mechanics" className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition">
            Find a Mechanic
          </a>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl text-center border border-white/20">
          <h3 className="text-xl font-bold mb-2">For Buyers</h3>
          <p className="text-gray-600">Search for the exact part you need and get it delivered straight to you.</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl text-center border border-white/20">
          <h3 className="text-xl font-bold mb-2">For Sellers</h3>
          <p className="text-gray-600">Reach thousands of buyers by listing your inventory on our platform.</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-xl text-center border border-white/20">
          <h3 className="text-xl font-bold mb-2">For Mechanics</h3>
          <p className="text-gray-600">Get booked by clients and receive exclusive trade discounts on parts.</p>
        </div>
      </div>
    </div>
  );
}
