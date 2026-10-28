import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingButtons from '../components/FloatingButtons';
import Header from '../components/Header';
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
          <Header />
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
