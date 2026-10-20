import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingButtons from '../components/FloatingButtons';
import CartBadge from '../components/CartBadge';
import { CartProvider } from '../context/CartContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PARTSOKO - Automotive Spare Parts Marketplace",
  description: "Your one-stop shop for automotive spare parts and electronics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {/* Tier 1: Top Bar */}
        <div className="bg-brandDark text-gray-300 text-xs py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-brandRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> 
              Nairobi, Kenya
            </span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="hidden sm:inline text-gray-400">Trusted Automotive Parts Marketplace</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition">Help & Support</a>
            <span className="text-gray-500">|</span>
            <a href="#" className="hover:text-white transition">Contact Us</a>
            <span className="text-gray-500">|</span>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-white transition font-bold">f</a>
              <a href="#" className="hover:text-white transition font-bold">𝕏</a>
              <a href="#" className="hover:text-white transition font-bold">📷</a>
            </div>
          </div>
        </div>

        {/* Tier 2: Main Header */}
        <header className="bg-white py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-100 flex justify-between items-center relative z-50">
          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <div className="flex items-center">
              <img src="/partsoko-logo.jpg" alt="PARTSOKO Logo" className="h-10 sm:h-12 w-auto mr-2" />
              <div className="flex flex-col mt-2">
                <span className="text-[10px] font-bold text-gray-500 tracking-widest leading-none">AUTO PARTS MARKETPLACE</span>
              </div>
            </div>
          </a>

          {/* Search Bar */}
          <form action="/search" method="GET" className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full bg-surface rounded-md overflow-hidden border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <div className="pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input 
                type="text" 
                name="q" 
                className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 px-3 outline-none text-gray-800" 
                placeholder="Search genuine parts, part numbers, brands, or car models..." 
              />
              <button type="submit" className="bg-brandDark text-white px-6 hover:bg-brandRed transition flex items-center justify-center font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <a href="/login" className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition group">
              <svg className="w-5 h-5 mr-2 text-gray-500 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Login / Register
            </a>
            <div className="flex items-center border-l pl-6 border-gray-200">
              <CartBadge />
            </div>
          </div>
        </header>

        {/* Tier 3: Navigation Menu */}
        <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 flex items-center shadow-sm relative z-40">
          <div className="relative group py-3 px-4 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition">
            <svg className="w-6 h-6 text-brandDark group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <div className="absolute left-0 top-full w-64 bg-white border border-gray-200 shadow-xl rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
              <div className="px-4 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Browse Categories</div>
              <a href="/search?category=ENGINE" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Engines & Engine Parts</a>
              <a href="/search?category=TRANSMISSION" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Transmission & Drive Terrain</a>
              <a href="/search?category=SUSPENSION" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Suspension & Steering</a>
              <a href="/search?category=ELECTRICAL" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Electrical & Electronics</a>
              <a href="/search?category=LIGHTING" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Lighting & Lamps</a>
              <a href="/search?category=FUEL" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Fuel Systems & Injection</a>
              <a href="/search?category=BODY" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Body & Exterior</a>
            </div>
          </div>
          
          <ul className="flex space-x-6 sm:space-x-10 ml-4 sm:ml-8 text-sm font-medium text-gray-700 h-full items-center">
            <li><a href="/" className="text-brandRed border-b-2 border-brandRed pb-[14px] pt-4 block font-bold">Home</a></li>
            <li><a href="/search" className="hover:text-brandRed transition block py-4 font-bold text-brandDark">Parts</a></li>
            <li><a href="/mechanics" className="hover:text-brandRed transition block py-4 font-bold text-brandDark">Find mechanic</a></li>
            <li className="relative group h-full">
              <span className="hover:text-brandRed transition py-4 flex items-center h-full cursor-pointer font-bold text-brandDark">
                Our Services 
                <svg className="w-4 h-4 ml-1 text-gray-400 group-hover:text-brandRed transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
              <div className="absolute left-0 top-full w-60 bg-white border border-gray-200 shadow-xl rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden py-1">
                <a href="/services/towing" className="block px-4 py-3 hover:bg-red-50 text-sm border-b border-gray-100 flex items-center justify-between font-semibold text-brandDark hover:text-brandRed transition">
                  <span>Towing</span>
                  <span className="bg-brandRed text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold">24/7</span>
                </a>
                <a href="/services/finance" className="block px-4 py-3 hover:bg-red-50 text-sm border-b border-gray-100 font-semibold text-brandDark hover:text-brandRed transition">
                  Parts Financing
                </a>
                <a href="/services/finance" className="block px-4 py-3 hover:bg-red-50 text-sm border-b border-gray-100 font-semibold text-brandDark hover:text-brandRed transition">
                  Repair Financing
                </a>
                <a href="/services/value-car" className="block px-4 py-3 hover:bg-red-50 text-sm border-b border-gray-100 font-semibold text-brandDark hover:text-brandRed transition">
                  Value Your Car
                </a>
                <a href="/services/import" className="block px-4 py-3 hover:bg-red-50 text-sm border-b border-gray-100 flex items-center justify-between font-semibold text-brandDark hover:text-brandRed transition">
                  <span>Global Import</span>
                  <span className="bg-primary text-white text-[9px] px-1.5 py-0.5 rounded-sm font-bold">NEW</span>
                </a>
                <a href="/services/insure-car" className="block px-4 py-3 hover:bg-red-50 text-sm font-semibold text-brandDark hover:text-brandRed transition">
                  Insure Your Car
                </a>
              </div>
            </li>
            <li><a href="/events" className="hover:text-brandRed transition block py-4 font-bold text-brandDark">Events</a></li>
          </ul>
        </nav>
        <main className="min-h-[80vh] bg-gray-50">
          {children}
        </main>

        {/* Dynamic Footer */}
        <footer className="bg-brandDark text-white pt-16 pb-8 border-t-4 border-brandRed">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
              
              {/* Column 1: Logo & Direct Contacts */}
              <div>
                <a href="/" className="flex items-center mb-4">
                  <img src="/partsoko-logo.jpg" alt="PARTSOKO Logo" className="h-10 w-auto bg-white rounded p-1 mr-2" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest leading-none">AUTO PARTS MARKETPLACE</span>
                  </div>
                </a>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">
                  Kenya's verified automotive marketplace and vehicle service hub. Connecting vehicle owners with verified spare parts vendors, certified mechanics, and 24/7 rescue.
                </p>
                <div className="space-y-2 text-xs text-gray-300 mb-5">
                  <p className="flex items-center">
                    <span className="text-brandRed font-bold mr-2">📍</span> Ruaka Town, Limuru Rd, Nairobi
                  </p>
                  <p className="flex items-center">
                    <span className="text-brandRed font-bold mr-2">📞</span> 
                    <a href="tel:+254702420404" className="hover:text-white font-semibold transition">+254 702 420 404</a>
                  </p>
                  <p className="flex items-center">
                    <span className="text-brandRed font-bold mr-2">✉️</span> 
                    <a href="mailto:partsoko@gmail.com" className="hover:text-white transition">partsoko@gmail.com</a>
                  </p>
                </div>
                <div className="flex space-x-3">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brandRed transition">f</a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brandRed transition">𝕏</a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brandRed transition">📷</a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brandRed transition">▶</a>
                  <a href="https://wa.me/254702420404" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center hover:bg-green-600 transition">💬</a>
                </div>
              </div>

              {/* Column 2: Parts Categories */}
              <div>
                <h3 className="text-base font-bold mb-5 text-white border-l-2 border-brandRed pl-3">Parts Categories</h3>
                <ul className="space-y-2.5 text-xs text-gray-400">
                  <li><a href="/search?category=ENGINE" className="hover:text-white hover:underline transition">Engines & Drivetrain</a></li>
                  <li><a href="/search?category=TRANSMISSION" className="hover:text-white hover:underline transition">Transmission & Gearbox</a></li>
                  <li><a href="/search?category=SUSPENSION" className="hover:text-white hover:underline transition">Suspension & Steering</a></li>
                  <li><a href="/search?category=ELECTRICAL" className="hover:text-white hover:underline transition">Electrical & Electronics</a></li>
                  <li><a href="/search?category=LIGHTING" className="hover:text-white hover:underline transition">Lighting & Lamps</a></li>
                  <li><a href="/search?category=FUEL" className="hover:text-white hover:underline transition">Fuel Systems & Injection</a></li>
                  <li><a href="/search?category=BODY" className="hover:text-white hover:underline transition">Body Parts & Exterior</a></li>
                  <li className="pt-1"><a href="/search" className="text-brandRed font-semibold hover:underline">Explore All 15,000+ Parts &rarr;</a></li>
                </ul>
              </div>

              {/* Column 3: Our Services */}
              <div>
                <h3 className="text-base font-bold mb-5 text-white border-l-2 border-brandRed pl-3">Our Services</h3>
                <ul className="space-y-2.5 text-xs text-gray-400">
                  <li><a href="/services/import" className="hover:text-white hover:underline transition flex items-center justify-between"><span>Global Import Concierge</span><span className="text-[9px] bg-primary text-white px-1.5 py-0.5 rounded font-bold">JAPAN/UK/UAE</span></a></li>
                  <li><a href="/services/towing" className="hover:text-white hover:underline transition flex items-center justify-between"><span>24/7 Roadside Towing</span><span className="text-[9px] bg-brandRed text-white px-1.5 py-0.5 rounded font-bold">24/7</span></a></li>
                  <li><a href="/mechanics" className="hover:text-white hover:underline transition">Find Verified Mechanic</a></li>
                  <li><a href="/services/value-car" className="hover:text-white hover:underline transition">Vehicle Valuation & Inspection</a></li>
                  <li><a href="/services/finance" className="hover:text-white hover:underline transition">Auto Parts & Repair Financing</a></li>
                  <li><a href="/services/insure-car" className="hover:text-white hover:underline transition">Motor Vehicle Insurance Connect</a></li>
                  <li><a href="/events" className="hover:text-white hover:underline transition">Automotive Events & Expos</a></li>
                </ul>
              </div>

              {/* Column 4: Portals & Quick Links */}
              <div>
                <h3 className="text-base font-bold mb-5 text-white border-l-2 border-brandRed pl-3">Partner Portals & Company</h3>
                <ul className="space-y-2 text-xs text-gray-400 mb-6">
                  <li><a href="/dashboard/seller" className="hover:text-white transition flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-brandRed mr-2"></span>Seller & Vendor Portal</a></li>
                  <li><a href="/dashboard/mechanic" className="hover:text-white transition flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>Mechanic Workshop Portal</a></li>
                  <li><a href="/dashboard/valuer" className="hover:text-white transition flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-2"></span>Valuer Inspection Portal</a></li>
                  <li><a href="/about" className="hover:text-white transition">About PARTSOKO</a></li>
                  <li><a href="/contact" className="hover:text-white transition">Contact & Customer Support</a></li>
                  <li><a href="/terms" className="hover:text-white transition">Terms & Conditions</a></li>
                  <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                </ul>

                <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">Stay Updated</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter email for deals" 
                    className="bg-gray-800 text-white px-3 py-2 rounded-l-md w-full text-xs focus:outline-none focus:ring-1 focus:ring-brandRed border border-gray-700" 
                  />
                  <button className="bg-brandRed text-white px-3 py-2 rounded-r-md hover:bg-red-600 transition text-xs font-bold">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-4">
              <div className="flex items-center flex-wrap gap-2">
                <p>&copy; {new Date().getFullYear()} PARTSOKO. All rights reserved.</p>
                <span className="hidden md:inline">&bull;</span>
                <span className="text-[10px] bg-green-700 text-white px-2 py-0.5 rounded font-bold">Lipa na M-Pesa Buy Goods & Paybill</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] bg-brandRed text-white px-2 py-0.5 rounded-sm font-bold">Proudly Kenyan 🇰🇪</span>
                <span className="text-gray-400 font-mono">www.partsoko.co.ke</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Action Buttons extracted to a Client Component */}
        <FloatingButtons />
        </CartProvider>
      </body>
    </html>
  );
}
