export default function TermsPage() {
  return (
    <div className="bg-surface min-h-[80vh] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-soft border border-gray-100">
          <h1 className="text-3xl font-extrabold text-brandDark mb-6">Terms and Conditions</h1>
          <p className="text-xs text-gray-400 mb-8">Last Updated: October 2026 • Republic of Kenya</p>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-brandDark mb-2">1. Introduction & Overview</h2>
              <p>Welcome to PARTSOKO ("we", "our", or "us"). By accessing or using our marketplace platform at www.partsoko.co.ke, purchasing spare parts, requesting auto services, or utilizing our import concierge, you agree to comply with and be bound by these Terms and Conditions.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brandDark mb-2">2. Genuine Parts Policy & Fitment Guarantee</h2>
              <p>All distributors on PARTSOKO guarantee the authenticity and condition of their parts. Customers are advised to provide their accurate vehicle registration and 17-digit Chassis / VIN number during purchase to ensure 100% fitment.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brandDark mb-2">3. Global Import Concierge Terms</h2>
              <p>When requesting an overseas part quotation (Alibaba, eBay, Japan, USA, Europe), PARTSOKO verifies supplier legitimacy, customs tariffs, and landed costs. Quotations issued are valid for 7 calendar days due to currency and freight fluctuations.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brandDark mb-2">4. Payments, Escrow & M-Pesa Transactions</h2>
              <p>All payments made via Safaricom M-Pesa, card, or direct bank transfer are protected. For marketplace orders, funds are disbursed to sellers and mechanics only upon customer verification or successful tracking delivery.</p>
            </section>

            <section>
              <h2 className="text-base font-bold text-brandDark mb-2">5. Returns, Refunds & Dispute Resolution</h2>
              <p>Damaged or mismatched components must be reported within 48 hours of delivery. In the event of an unresolvable dispute, the PARTSOKO Arbitration Committee reviews vehicle fitment data and provides a binding resolution.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
