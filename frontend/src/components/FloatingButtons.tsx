'use client';

import { useState } from 'react';

export default function FloatingButtons() {
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const [bugTitle, setBugTitle] = useState('');
  const [bugDesc, setBugDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [ticketId, setTicketId] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBugReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/bugs/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: bugTitle,
          description: bugDesc,
          url: window.location.href,
          browserInfo: navigator.userAgent
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTicketId(data.reportId || `BUG-${Date.now().toString().slice(-6)}`);
        setSubmitStatus('success');
        setBugTitle('');
        setBugDesc('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 flex flex-col space-y-2.5 sm:space-y-4 z-40">
        <button 
          onClick={() => setIsBugModalOpen(true)}
          className="bg-brandDark text-white p-2.5 sm:p-4 rounded-full shadow-xl hover:bg-gray-800 transition-transform transform hover:scale-110 flex items-center justify-center" 
          aria-label="Report Bug"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </button>

        <a 
          href="https://wa.me/254702420404" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-[#25D366] text-white p-2.5 sm:p-4 rounded-full shadow-xl hover:bg-green-600 transition-transform transform hover:scale-110 flex items-center justify-center" 
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <button 
          onClick={scrollToTop} 
          className="bg-calreeGreen text-slate-950 p-2.5 sm:p-3 rounded-full shadow-xl hover:bg-emerald-400 transition-transform transform hover:scale-110 flex items-center justify-center font-bold" 
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </button>
      </div>

      {isBugModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="bg-brandDark px-6 py-4 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg flex items-center">
                <svg className="w-5 h-5 mr-2 text-brandRed" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                Report an Issue
              </h3>
              <button onClick={() => setIsBugModalOpen(false)} className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6">
              {submitStatus === 'success' ? (
                <div className="text-center py-6 text-emerald-600 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-extrabold text-base text-slate-900">Issue Logged Successfully!</p>
                    {ticketId && (
                      <p className="text-xs font-mono font-bold bg-slate-100 text-slate-800 py-1 px-3 rounded-full inline-block mt-1">
                        Ticket: {ticketId}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Your issue has been logged in the CALREE Command Center for engineering review.
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={`https://wa.me/254702420404?text=Habari%20CALREE%2C%20following%20up%20on%20issue%20ticket%20${ticketId || ''}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#25D366] hover:bg-green-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>💬 Chat with Support on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsBugModalOpen(false);
                        setSubmitStatus('idle');
                      }}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded-xl transition"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBugReport} className="space-y-4">
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 text-brandRed p-3 rounded-md text-sm">Failed to send report. Please try again.</div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Issue Summary</label>
                    <input 
                      type="text" 
                      required 
                      value={bugTitle}
                      onChange={(e) => setBugTitle(e.target.value)}
                      placeholder="e.g., Cannot add item to cart" 
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Detailed Description</label>
                    <textarea 
                      required
                      value={bugDesc}
                      onChange={(e) => setBugDesc(e.target.value)}
                      rows={4} 
                      placeholder="What were you trying to do? What went wrong?" 
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Bug Report'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
