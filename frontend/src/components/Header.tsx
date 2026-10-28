'use client';

import { useState } from 'react';
import CartBadge from './CartBadge';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Tier 1: Top Bar */}
      <div className="bg-brandDark text-gray-300 text-xs py-2 px-3 sm:px-6 lg:px-8 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="flex items-center text-[11px] sm:text-xs font-medium">
            <svg className="w-3.5 h-3.5 mr-1 text-brandRed flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg> 
            Nairobi, Kenya
          </span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="hidden sm:inline text-gray-400 text-xs">Trusted Automotive Parts Marketplace</span>
        </div>

        {/* Desktop Top Links */}
        <div className="hidden sm:flex items-center space-x-4 text-xs">
          <a href="/about" className="hover:text-white transition">About Us</a>
          <span className="text-gray-600">|</span>
          <a href="/contact" className="hover:text-white transition">Contact Us</a>
          <span className="text-gray-600">|</span>
          <div className="flex items-center space-x-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition font-bold">f</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition font-bold">𝕏</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition font-bold">📷</a>
          </div>
        </div>

        {/* Mobile Quick Action (Help Call / WhatsApp) */}
        <div className="flex sm:hidden items-center space-x-2 text-[11px]">
          <a 
            href="tel:+254702420404" 
            className="flex items-center text-gray-300 hover:text-white transition font-semibold"
          >
            <span className="text-brandRed mr-1">📞</span>
            <span>0702 420 404</span>
          </a>
          <span className="text-gray-600">|</span>
          <a 
            href="https://wa.me/254702420404" 
            target="_blank" 
            rel="noreferrer" 
            className="text-green-400 hover:text-green-300 font-bold"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Tier 2: Main Header */}
      <header className="bg-white py-2.5 sm:py-4 px-3 sm:px-6 lg:px-8 border-b border-gray-100 relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Mobile: Hamburger Button + Logo */}
          <div className="flex items-center space-x-2 sm:space-x-0">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 rounded-md text-gray-700 hover:text-brandDark hover:bg-gray-100 md:hidden focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <a href="/" className="flex items-center flex-shrink-0">
              <img 
                src="/partsoko-logo.jpg" 
                alt="PARTSOKO Logo" 
                className="h-8 sm:h-11 w-auto object-contain" 
              />
              <div className="hidden lg:flex flex-col ml-2 mt-1">
                <span className="text-[10px] font-extrabold text-gray-500 tracking-wider leading-none">
                  AUTO PARTS MARKETPLACE
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Search Bar */}
          <form action="/search" method="GET" className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl mx-6">
            <div className="flex w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-300 focus-within:border-brandRed focus-within:ring-1 focus-within:ring-brandRed transition-all">
              <div className="pl-4 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="text" 
                name="q" 
                className="w-full bg-transparent border-none focus:ring-0 text-sm py-2.5 px-3 outline-none text-gray-800 placeholder-gray-400" 
                placeholder="Search genuine parts, part numbers, brands, or car models..." 
              />
              <button 
                type="submit" 
                className="bg-brandDark text-white px-5 hover:bg-brandRed transition flex items-center justify-center font-medium"
                aria-label="Search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </form>

          {/* Right Actions (Account + Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Account Link */}
            <a 
              href="/login" 
              className="flex items-center text-gray-700 hover:text-brandRed transition group p-1.5 rounded-md"
              title="Account / Login"
            >
              <svg className="w-6 h-6 text-gray-700 group-hover:text-brandRed transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span className="hidden sm:inline ml-2 text-xs md:text-sm font-semibold">
                Login / Register
              </span>
            </a>

            {/* Cart Badge with Count */}
            <div className="flex items-center border-l pl-3 sm:pl-5 border-gray-200">
              <CartBadge />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (Directly below header row) */}
        <div className="mt-2.5 md:hidden">
          <form action="/search" method="GET" className="flex w-full">
            <div className="flex w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-300 focus-within:border-brandRed focus-within:ring-1 focus-within:ring-brandRed transition-all">
              <div className="pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="text" 
                name="q" 
                className="w-full bg-transparent border-none focus:ring-0 text-xs py-2 px-2.5 outline-none text-gray-800 placeholder-gray-500" 
                placeholder="Search genuine parts, Toyota, brake pads..." 
              />
              <button 
                type="submit" 
                className="bg-brandDark text-white px-3.5 hover:bg-brandRed transition flex items-center justify-center text-xs font-semibold"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Tier 3: Desktop Navigation Menu */}
      <nav className="hidden md:flex bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 items-center shadow-sm relative z-30">
        <div className="max-w-7xl mx-auto flex items-center w-full">
          {/* Categories Dropdown */}
          <div className="relative group py-3 px-4 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition">
            <div className="flex items-center space-x-2 text-brandDark group-hover:text-brandRed font-bold text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <span>Browse Categories</span>
            </div>
            
            <div className="absolute left-0 top-full w-64 bg-white border border-gray-200 shadow-xl rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
              <div className="px-4 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Parts Catalog</div>
              <a href="/search?category=ENGINE" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Engines & Engine Parts</a>
              <a href="/search?category=TRANSMISSION" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Transmission & Drive Terrain</a>
              <a href="/search?category=SUSPENSION" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Suspension & Steering</a>
              <a href="/search?category=ELECTRICAL" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Electrical & Electronics</a>
              <a href="/search?category=LIGHTING" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Lighting & Lamps</a>
              <a href="/search?category=FUEL" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Fuel Systems & Injection</a>
              <a href="/search?category=BODY" className="block px-4 py-2 hover:bg-red-50 text-xs font-semibold text-brandDark hover:text-brandRed">Body & Exterior</a>
            </div>
          </div>
          
          {/* Main Desktop Nav Links */}
          <ul className="flex space-x-8 ml-6 text-sm font-medium text-gray-700 h-full items-center">
            <li><a href="/" className="text-brandRed border-b-2 border-brandRed pb-[14px] pt-4 block font-bold">Home</a></li>
            <li><a href="/search" className="hover:text-brandRed transition block py-4 font-bold text-brandDark">Parts</a></li>
            <li><a href="/mechanics" className="hover:text-brandRed transition block py-4 font-bold text-brandDark">Find mechanic</a></li>
            <li className="relative group h-full">
              <span className="hover:text-brandRed transition py-4 flex items-center h-full cursor-pointer font-bold text-brandDark">
                Our Services 
                <svg className="w-4 h-4 ml-1 text-gray-400 group-hover:text-brandRed transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
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
        </div>
      </nav>

      {/* Mobile Horizontal Quick-Action Pill Bar */}
      <div className="md:hidden bg-gray-50 border-b border-gray-200 py-2 px-3 overflow-x-auto no-scrollbar">
        <div className="flex space-x-2 text-xs font-semibold whitespace-nowrap">
          <a href="/search" className="bg-brandRed text-white px-3 py-1 rounded-full shadow-sm">
            ⚡ All Parts
          </a>
          <a href="/mechanics" className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm hover:border-brandRed">
            🔧 Mechanics
          </a>
          <a href="/services/towing" className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm hover:border-brandRed">
            🚜 Towing 24/7
          </a>
          <a href="/services/finance" className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm hover:border-brandRed">
            💳 Financing
          </a>
          <a href="/services/import" className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm hover:border-brandRed">
            🚢 Import
          </a>
          <a href="/services/insure-car" className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm hover:border-brandRed">
            🛡️ Insurance
          </a>
          <a href="/services/value-car" className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm hover:border-brandRed">
            🔍 Valuation
          </a>
          <a href="/events" className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm hover:border-brandRed">
            🏁 Events
          </a>
        </div>
      </div>

      {/* Slide-Out Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={closeMenu}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 bg-brandDark text-white flex items-center justify-between border-b border-gray-800">
              <a href="/" onClick={closeMenu} className="flex items-center">
                <img src="/partsoko-logo.jpg" alt="PARTSOKO Logo" className="h-8 w-auto rounded bg-white p-0.5 mr-2" />
                <span className="text-xs font-bold tracking-widest text-gray-300">PARTSOKO</span>
              </a>
              <button 
                type="button" 
                onClick={closeMenu}
                className="p-1 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* User Greeting / Auth Action */}
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <a 
                href="/login" 
                onClick={closeMenu}
                className="flex items-center justify-between bg-brandRed text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-sm hover:bg-red-700 transition"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Login or Register
                </span>
                <span>&rarr;</span>
              </a>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-3 px-4 space-y-1 text-sm font-medium text-gray-800">
              <a 
                href="/" 
                onClick={closeMenu} 
                className="block py-2.5 px-3 rounded-md hover:bg-red-50 hover:text-brandRed transition font-semibold"
              >
                🏠 Home
              </a>
              <a 
                href="/search" 
                onClick={closeMenu} 
                className="block py-2.5 px-3 rounded-md hover:bg-red-50 hover:text-brandRed transition font-semibold"
              >
                ⚙️ Browse All Spare Parts
              </a>
              <a 
                href="/mechanics" 
                onClick={closeMenu} 
                className="block py-2.5 px-3 rounded-md hover:bg-red-50 hover:text-brandRed transition font-semibold"
              >
                🔧 Find Verified Mechanic
              </a>

              {/* Collapsible Services */}
              <div className="border-t border-b border-gray-100 py-1 my-1">
                <button
                  type="button"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-md hover:bg-red-50 hover:text-brandRed font-semibold text-left"
                >
                  <span>🚗 Specialized Services</span>
                  <svg className={`w-4 h-4 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {isServicesOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-1 text-xs">
                    <a href="/services/towing" onClick={closeMenu} className="block py-2 text-gray-600 hover:text-brandRed">
                      🚜 24/7 Roadside Towing
                    </a>
                    <a href="/services/finance" onClick={closeMenu} className="block py-2 text-gray-600 hover:text-brandRed">
                      💳 Auto Parts & Repair Financing
                    </a>
                    <a href="/services/value-car" onClick={closeMenu} className="block py-2 text-gray-600 hover:text-brandRed">
                      🔍 Vehicle Valuation & Inspection
                    </a>
                    <a href="/services/import" onClick={closeMenu} className="block py-2 text-gray-600 hover:text-brandRed">
                      🚢 Global Import Concierge
                    </a>
                    <a href="/services/insure-car" onClick={closeMenu} className="block py-2 text-gray-600 hover:text-brandRed">
                      🛡️ Motor Insurance Connect
                    </a>
                  </div>
                )}
              </div>

              {/* Collapsible Categories */}
              <div className="border-b border-gray-100 py-1 my-1">
                <button
                  type="button"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-md hover:bg-red-50 hover:text-brandRed font-semibold text-left"
                >
                  <span>📦 Parts Categories</span>
                  <svg className={`w-4 h-4 transform transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {isCategoriesOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-1 text-xs">
                    <a href="/search?category=ENGINE" onClick={closeMenu} className="block py-1.5 text-gray-600 hover:text-brandRed">Engines & Engine Parts</a>
                    <a href="/search?category=TRANSMISSION" onClick={closeMenu} className="block py-1.5 text-gray-600 hover:text-brandRed">Transmission & Drivetrain</a>
                    <a href="/search?category=SUSPENSION" onClick={closeMenu} className="block py-1.5 text-gray-600 hover:text-brandRed">Suspension & Steering</a>
                    <a href="/search?category=ELECTRICAL" onClick={closeMenu} className="block py-1.5 text-gray-600 hover:text-brandRed">Electrical & Electronics</a>
                    <a href="/search?category=LIGHTING" onClick={closeMenu} className="block py-1.5 text-gray-600 hover:text-brandRed">Lighting & Lamps</a>
                    <a href="/search?category=FUEL" onClick={closeMenu} className="block py-1.5 text-gray-600 hover:text-brandRed">Fuel Systems & Injection</a>
                    <a href="/search?category=BODY" onClick={closeMenu} className="block py-1.5 text-gray-600 hover:text-brandRed">Body & Exterior</a>
                  </div>
                )}
              </div>

              <a 
                href="/events" 
                onClick={closeMenu} 
                className="block py-2.5 px-3 rounded-md hover:bg-red-50 hover:text-brandRed transition font-semibold"
              >
                🏁 Events & Auto Expos
              </a>

              <div className="pt-2">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-1">
                  Partner Portals
                </div>
                <a href="/dashboard/seller" onClick={closeMenu} className="block py-2 px-3 text-xs text-gray-700 hover:text-brandRed font-medium">
                  💼 Seller & Vendor Portal
                </a>
                <a href="/dashboard/mechanic" onClick={closeMenu} className="block py-2 px-3 text-xs text-gray-700 hover:text-brandRed font-medium">
                  🛠️ Mechanic Workshop Portal
                </a>
                <a href="/dashboard/valuer" onClick={closeMenu} className="block py-2 px-3 text-xs text-gray-700 hover:text-brandRed font-medium">
                  📋 Valuer Inspection Portal
                </a>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 space-y-2">
              <div className="flex items-center font-semibold text-gray-900">
                <span className="text-brandRed mr-2">📍</span> Ruaka Town, Limuru Rd, Nairobi
              </div>
              <div className="flex items-center">
                <span className="text-brandRed mr-2">📞</span>
                <a href="tel:+254702420404" className="hover:text-brandDark font-bold text-brandRed">
                  +254 702 420 404
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-brandRed mr-2">✉️</span>
                <a href="mailto:partsoko@gmail.com" className="hover:text-brandDark">
                  partsoko@gmail.com
                </a>
              </div>
              <div className="pt-2">
                <a 
                  href="https://wa.me/254702420404" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-green-600 text-white text-center py-2 rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-green-700 transition"
                >
                  <span>💬 Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
