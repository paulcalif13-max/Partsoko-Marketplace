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
        <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="PARTSOKO Logo" className="h-10 w-auto rounded-full object-cover" />
            <h1 className="text-2xl font-bold tracking-wider">PARTSOKO</h1>
          </div>
          <div className="space-x-6 flex items-center">
            <a href="/" className="hover:text-blue-200 transition">Home</a>
            <a href="/search" className="hover:text-blue-200 transition">Search Parts</a>
            
            {/* Our Services Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center hover:text-blue-200 transition focus:outline-none">
                Our Services
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {/* Added pt-2 to an invisible wrapper so the mouse never leaves the hover area */}
              <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-50">
                <div className="bg-white rounded-md shadow-lg overflow-hidden border border-gray-100">
                  <a href="/services/finance" className="block px-4 py-3 text-sm font-bold text-gray-900 bg-blue-50 border-b border-gray-100 hover:bg-blue-100 transition">Finance Hub</a>
                  <a href="/services/insure-car" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">Insure Your Car</a>
                  <a href="/services/value-car" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">Value Your Car</a>
                </div>
              </div>
            </div>

            <a href="/events" className="hover:text-blue-200 transition">Events</a>
            <a href="/cart" className="hover:text-blue-200 transition font-bold bg-blue-800 px-3 py-1 rounded-full">Cart (2)</a>
            <a href="/login" className="hover:bg-blue-700 border border-white px-4 py-1 rounded transition ml-4">Login / Register</a>
          </div>
        </nav>
        <main className="min-h-[80vh] bg-gray-50">
          {children}
        </main>

        {/* Dynamic Footer with Defender 90 Background */}
        <footer 
          className="relative bg-black text-white pt-16 pb-8 border-t-4 border-primary bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/defender-bg.jpg')", backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.85)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
              
              {/* Marketplace Column */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-100">Marketplace</h3>
                <ul className="space-y-4 text-gray-300">
                  <li><a href="/search" className="hover:text-primary transition">Parts & Accessories</a></li>
                  <li><a href="#" className="hover:text-primary transition">Brand New</a></li>
                  <li><a href="/services/value-car" className="hover:text-primary transition">Valuation</a></li>
                  <li><a href="/services/insure-car" className="hover:text-primary transition">Insurance</a></li>
                  <li><a href="/services/finance" className="hover:text-primary font-bold text-white transition">Finance Hub</a></li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-100">Company</h3>
                <ul className="space-y-4 text-gray-300">
                  <li><a href="#" className="hover:text-primary transition">About Us</a></li>
                  <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
                  <li><a href="#" className="hover:text-primary transition">FAQs</a></li>
                  <li><a href="#" className="hover:text-primary transition">Billing & Refund Policy</a></li>
                  <li><a href="#" className="hover:text-primary transition">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary transition">Cookie Policy</a></li>
                </ul>
              </div>

              {/* Data Protection Policies Column */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-100">Data Protection Policies</h3>
                <ul className="space-y-4 text-gray-300 leading-tight">
                  <li><a href="#" className="hover:text-primary transition block">Request for Restriction or Objection</a></li>
                  <li><a href="#" className="hover:text-primary transition block">Request for Access to Personal Data</a></li>
                  <li><a href="#" className="hover:text-primary transition block">Request for Rectification</a></li>
                  <li><a href="#" className="hover:text-primary transition block">Request for Data Portability</a></li>
                  <li><a href="#" className="hover:text-primary transition block">Request for Erasure of Personal Data</a></li>
                </ul>
              </div>

              {/* Contact Us Column */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-100">Contact Us</h3>
                <ul className="space-y-6 text-gray-300">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>ruaka near tech driving</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <span>+254702420404</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-[#25D366] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    <span>+254702420404</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span>info@partsoko.co.ke</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} PARTSOKO. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Floating Action Buttons extracted to a Client Component */}
        <FloatingButtons />
      </body>
    </html>
  );
}
