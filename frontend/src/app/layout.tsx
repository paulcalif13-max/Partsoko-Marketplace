import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingButtons from '../components/FloatingButtons';

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
        {/* Tier 1: Top Bar */}
        <div className="bg-brandDark text-gray-300 text-xs py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><svg className="w-4 h-4 mr-1 text-brandRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Nairobi, Kenya</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition">Help & Support</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">Contact Us</a>
            <span>|</span>
            <div className="flex space-x-2">
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
              <img src="/partsoko-logo.jpg" alt="PARTSOKO Logo" className="h-12 w-auto mr-2" />
              <div className="flex flex-col mt-2">
                <span className="text-[10px] font-bold text-gray-500 tracking-widest leading-none">AUTO PARTS MARKETPLACE</span>
              </div>
            </div>
          </a>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="flex w-full bg-surface rounded-md overflow-hidden border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              <div className="pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 px-3 outline-none" placeholder="Search for parts, brands, or vehicles..." />
              <button className="bg-brandDark text-white px-6 hover:bg-primary transition flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <a href="/login" className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition group">
              <svg className="w-5 h-5 mr-2 text-gray-400 group-hover:text-primary transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Login / Register
            </a>
            <div className="flex items-center space-x-4 border-l pl-6 border-gray-200">
              <a href="#" className="relative text-gray-600 hover:text-brandRed transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                <span className="absolute -top-1 -right-2 bg-brandRed text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">0</span>
              </a>
              <a href="/cart" className="relative text-gray-600 hover:text-primary transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">2</span>
              </a>
            </div>
          </div>
        </header>

        {/* Tier 3: Navigation Menu */}
        <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 hidden md:flex items-center shadow-sm relative z-40">
          <ul className="flex space-x-10 text-sm font-medium text-gray-700 h-full items-center mx-auto">
            <li><a href="/" className="text-primary border-b-2 border-primary pb-[14px] pt-4 block font-bold">Home</a></li>
            <li><a href="/search" className="hover:text-primary transition block py-4">Parts</a></li>
            <li><a href="/mechanics" className="hover:text-primary transition block py-4">Find mechanic</a></li>
            <li className="relative group h-full">
              <span className="hover:text-primary transition py-4 flex items-center h-full cursor-pointer">Our Services <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></span>
              <div className="absolute left-0 top-full w-56 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                <a href="/services/towing" className="block px-4 py-3 hover:bg-surface text-sm border-b border-gray-50 flex items-center justify-between">Towing <span className="bg-brandRed text-white text-[9px] px-1.5 py-0.5 rounded-sm">24/7</span></a>
                <a href="/services/finance" className="block px-4 py-3 hover:bg-surface text-sm border-b border-gray-50">Parts Financing</a>
                <a href="/services/finance" className="block px-4 py-3 hover:bg-surface text-sm border-b border-gray-50">Repair Financing</a>
                <a href="/services/value-car" className="block px-4 py-3 hover:bg-surface text-sm">Value your car</a>
              </div>
            </li>
          </ul>
        </nav>
        <main className="min-h-[80vh] bg-gray-50">
          {children}
        </main>

        {/* Dynamic Footer */}
        <footer className="bg-brandDark text-white pt-16 pb-8 border-t-4 border-brandRed">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
              
              {/* Column 1: Logo & Socials */}
              <div>
                <a href="/" className="flex items-center mb-6">
                  <img src="/partsoko-logo.jpg" alt="PARTSOKO Logo" className="h-10 w-auto bg-white rounded p-1 mr-2" />
                  <div className="flex flex-col mt-2">
                    <span className="text-[9px] font-bold text-gray-400 tracking-widest leading-none">AUTO PARTS MARKETPLACE</span>
                  </div>
                </a>
                <div className="flex space-x-4 mb-6">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition">f</a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition">𝕏</a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition">📷</a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition">▶</a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition">in</a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition">♪</a>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="/" className="hover:text-white transition">Home</a></li>
                  <li><a href="#" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Help & Support</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                </ul>
              </div>

              {/* Column 3: Categories */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Categories</h3>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="/search" className="hover:text-white transition">Automotive Parts</a></li>
                  <li><a href="/search" className="hover:text-white transition">Automotive Electronics</a></li>
                  <li><a href="/search" className="hover:text-white transition">Electronic Components</a></li>
                  <li><a href="/search" className="hover:text-white transition">Maker Products</a></li>
                  <li><a href="/search" className="hover:text-white transition">Consumer Electronics</a></li>
                </ul>
              </div>

              {/* Column 4: Stay Connected */}
              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Stay Connected</h3>
                <p className="text-gray-400 mb-4 text-xs">Get the latest deals, offers and updates.</p>
                <div className="flex mb-6">
                  <input type="email" placeholder="Enter your email address" className="bg-white text-gray-900 px-3 py-2 rounded-l-md w-full focus:outline-none" />
                  <button className="bg-brandRed text-white px-4 py-2 rounded-r-md hover:bg-red-600 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-black border border-gray-700 px-3 py-2 rounded-md flex items-center hover:bg-gray-900 transition">
                    <span className="text-xs mr-2">▶</span>
                    <div className="text-left leading-none">
                      <span className="text-[8px] text-gray-400">GET IT ON</span><br/>
                      <span className="text-xs font-bold">Google Play</span>
                    </div>
                  </button>
                  <button className="bg-black border border-gray-700 px-3 py-2 rounded-md flex items-center hover:bg-gray-900 transition">
                    <span className="text-xs mr-2">🍎</span>
                    <div className="text-left leading-none">
                      <span className="text-[8px] text-gray-400">Download on the</span><br/>
                      <span className="text-xs font-bold">App Store</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex justify-between items-center text-gray-500 text-xs">
              <p>&copy; {new Date().getFullYear()} PARTSOKO. All rights reserved.</p>
              <div className="flex items-center">
                <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-sm mr-2 font-bold">Proudly Kenyan</span>
                <a href="#" className="hover:text-white transition">www.partsoko.co.ke</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Action Buttons extracted to a Client Component */}
        <FloatingButtons />
      </body>
    </html>
  );
}
