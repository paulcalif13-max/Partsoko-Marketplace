export interface QuotationItem {
  id?: string;
  name: string;
  seller?: string;
  price: number;
  quantity?: number;
  image?: string;
}

export interface QuotationData {
  quoteNumber: string;
  dateIssued?: string;
  validUntil?: string;
  clientName?: string;
  clientEmail: string;
  clientPhone?: string;
  companyName?: string;
  vehicleInfo?: string;
  items: QuotationItem[];
  subtotal: number;
  commissionFee?: number;
  taxFee?: number;
  deliveryFee?: number;
  totalAmount: number;
  notes?: string;
}

export function generateQuotationHtml(data: QuotationData): string {
  const issueDate = data.dateIssued || new Date().toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const validUntil = data.validUntil || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const itemsHtml = data.items.map((item, index) => {
    const qty = item.quantity || 1;
    const lineTotal = item.price * qty;
    return `
      <tr style="border-bottom: 1px solid #E2E8F0;">
        <td style="padding: 12px 14px; font-size: 13px; color: #475569; text-align: center;">${index + 1}</td>
        <td style="padding: 12px 14px;">
          <div style="font-size: 13px; font-weight: 700; color: #0F172A;">${escapeHtml(item.name)}</div>
          ${item.seller ? `<div style="font-size: 11px; color: #64748B; margin-top: 2px;">Vendor: ${escapeHtml(item.seller)}</div>` : ''}
        </td>
        <td style="padding: 12px 14px; font-size: 13px; color: #334155; text-align: center;">${qty}</td>
        <td style="padding: 12px 14px; font-size: 13px; color: #334155; text-align: right; white-space: nowrap;">KES ${item.price.toLocaleString()}</td>
        <td style="padding: 12px 14px; font-size: 13px; font-weight: 700; color: #0F172A; text-align: right; white-space: nowrap;">KES ${lineTotal.toLocaleString()}</td>
      </tr>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Official CALREE Quotation - ${escapeHtml(data.quoteNumber)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #F8FAFC; color: #0F172A; -webkit-font-smoothing: antialiased; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 12px !important; }
      .stack-col { display: block !important; width: 100% !important; margin-bottom: 16px !important; }
      .mobile-padding { padding: 16px !important; }
    }
  </style>
</head>
<body style="background-color: #F8FAFC; padding: 24px 0; margin: 0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #F8FAFC;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" class="container" width="640" cellspacing="0" cellpadding="0" border="0" style="max-width: 640px; width: 100%; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05); margin: 0 auto;">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #00D066 0%, #059669 100%);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td class="mobile-padding" style="padding: 32px 36px 24px; background-color: #0B1120;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <!-- Brand Identity -->
                  <td valign="top" style="vertical-align: top;">
                    <div style="display: inline-block;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="vertical-align: middle; padding-right: 12px;">
                            <div style="width: 36px; height: 36px; background-color: #00D066; border-radius: 8px; display: inline-block; text-align: center; line-height: 36px; color: #0B1120; font-weight: 900; font-size: 22px; font-family: monospace;">
                              C
                            </div>
                          </td>
                          <td style="vertical-align: middle;">
                            <div style="font-size: 20px; font-weight: 900; letter-spacing: 0.5px; color: #FFFFFF; line-height: 1.1;">
                              CALREE
                            </div>
                            <div style="font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.8px; color: #00D066; margin-top: 3px;">
                              AUTOMOTIVE MARKETPLACE
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div style="font-size: 11px; color: #94A3B8; margin-top: 10px; font-style: italic;">
                      &ldquo;Better parts. Smoother journeys.&rdquo;
                    </div>
                  </td>

                  <!-- Quotation Label & Number -->
                  <td valign="top" align="right" style="vertical-align: top; text-align: right;">
                    <span style="display: inline-block; background-color: rgba(0, 208, 102, 0.15); border: 1px solid rgba(0, 208, 102, 0.4); color: #00D066; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 4px 10px; border-radius: 6px;">
                      OFFICIAL QUOTATION
                    </span>
                    <div style="font-size: 15px; font-weight: 800; color: #FFFFFF; font-family: monospace; margin-top: 8px; letter-spacing: 0.5px;">
                      ${escapeHtml(data.quoteNumber)}
                    </div>
                    <div style="font-size: 11px; color: #94A3B8; margin-top: 4px;">
                      Date: <strong style="color: #CBD5E1;">${escapeHtml(issueDate)}</strong>
                    </div>
                    <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">
                      Valid Until: <strong style="color: #00D066;">${escapeHtml(validUntil)}</strong>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Company & Client Details Banner -->
          <tr>
            <td class="mobile-padding" style="padding: 24px 36px; background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <!-- Company Contact -->
                  <td class="stack-col" width="50%" valign="top" style="vertical-align: top; font-size: 12px; line-height: 1.6; color: #475569; padding-right: 16px;">
                    <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">
                      ISSUED BY
                    </div>
                    <div style="font-weight: 800; color: #0F172A; font-size: 13px;">CALREE Automotive Ltd</div>
                    <div>Ruaka Square, Limuru Road</div>
                    <div>Nairobi & Kiambu, Kenya</div>
                    <div>Tel / WhatsApp: <strong style="color: #0F172A;">+254 702 420 404</strong></div>
                    <div>Email: <a href="mailto:support@calree.co.ke" style="color: #059669; text-decoration: none;">support@calree.co.ke</a></div>
                    <div>Web: <a href="https://www.partsoko.co.ke" style="color: #059669; text-decoration: none;">www.partsoko.co.ke</a></div>
                  </td>

                  <!-- Client Information -->
                  <td class="stack-col" width="50%" valign="top" style="vertical-align: top; font-size: 12px; line-height: 1.6; color: #475569; padding-left: 16px;">
                    <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">
                      PREPARED FOR
                    </div>
                    <div style="font-weight: 800; color: #0F172A; font-size: 13px;">
                      ${escapeHtml(data.clientName || 'Valued Client')}
                    </div>
                    ${data.companyName ? `<div style="font-weight: 600; color: #334155;">${escapeHtml(data.companyName)}</div>` : ''}
                    <div>Email: <a href="mailto:${escapeHtml(data.clientEmail)}" style="color: #059669; text-decoration: none;">${escapeHtml(data.clientEmail)}</a></div>
                    ${data.clientPhone ? `<div>Phone: <strong>${escapeHtml(data.clientPhone)}</strong></div>` : ''}
                    ${data.vehicleInfo ? `<div style="margin-top: 4px; background-color: #E2E8F0; padding: 3px 8px; border-radius: 4px; display: inline-block; font-size: 11px; font-weight: 700; color: #0F172A;">&#128663; ${escapeHtml(data.vehicleInfo)}</div>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td class="mobile-padding" style="padding: 28px 36px 12px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; width: 100%;">
                <thead>
                  <tr style="background-color: #F1F5F9; border-bottom: 2px solid #CBD5E1;">
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; text-align: center; width: 36px;">#</th>
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; text-align: left;">Item Description</th>
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; text-align: center; width: 48px;">Qty</th>
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; text-align: right; width: 110px;">Unit Price</th>
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; text-align: right; width: 110px;">Total (KES)</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Summary & Totals Block -->
          <tr>
            <td class="mobile-padding" style="padding: 8px 36px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <!-- Left side notes -->
                  <td class="stack-col" width="55%" valign="top" style="vertical-align: top; padding-right: 20px;">
                    ${data.notes ? `
                      <div style="background-color: #F1F5F9; border-left: 3px solid #00D066; padding: 12px 14px; border-radius: 6px; font-size: 12px; color: #334155; margin-bottom: 12px;">
                        <strong style="color: #0F172A; display: block; margin-bottom: 3px;">Special Client Notes:</strong>
                        ${escapeHtml(data.notes)}
                      </div>
                    ` : ''}

                    <!-- Official Verification Badge -->
                    <div style="border: 1px dashed #CBD5E1; padding: 12px 14px; border-radius: 8px; font-size: 11px; color: #64748B; line-height: 1.5;">
                      <strong style="color: #059669; display: block; margin-bottom: 2px;">&#10003; CALREE Genuine Parts Warranty</strong>
                      All quoted items undergo multi-point inspection before dispatch to ensure 100% genuine specifications and fitment.
                    </div>
                  </td>

                  <!-- Right side financial summary -->
                  <td class="stack-col" width="45%" valign="top" style="vertical-align: top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 13px; color: #475569;">
                      <tr>
                        <td style="padding: 6px 0;">Parts Subtotal:</td>
                        <td style="padding: 6px 0; text-align: right; font-weight: 700; color: #0F172A;">KES ${data.subtotal.toLocaleString()}</td>
                      </tr>
                      ${data.commissionFee ? `
                        <tr>
                          <td style="padding: 6px 0; font-size: 12px;">Marketplace Fee (5%):</td>
                          <td style="padding: 6px 0; text-align: right;">KES ${data.commissionFee.toLocaleString()}</td>
                        </tr>
                      ` : ''}
                      ${data.taxFee ? `
                        <tr>
                          <td style="padding: 6px 0; font-size: 12px;">Local VAT (16%):</td>
                          <td style="padding: 6px 0; text-align: right;">KES ${data.taxFee.toLocaleString()}</td>
                        </tr>
                      ` : ''}
                      ${data.deliveryFee ? `
                        <tr>
                          <td style="padding: 6px 0; font-size: 12px;">Standard Delivery:</td>
                          <td style="padding: 6px 0; text-align: right;">KES ${data.deliveryFee.toLocaleString()}</td>
                        </tr>
                      ` : ''}
                      <tr style="border-top: 2px solid #0F172A;">
                        <td style="padding: 12px 0; font-size: 15px; font-weight: 900; color: #0B1120;">Total Due:</td>
                        <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: 900; color: #059669;">KES ${data.totalAmount.toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Settlement & M-Pesa Instructions -->
          <tr>
            <td class="mobile-padding" style="padding: 24px 36px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size: 12px; color: #334155; line-height: 1.6;">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #059669; margin-bottom: 6px;">
                      OFFICIAL SETTLEMENT & ORDER CONFIRMATION
                    </div>
                    <div>To confirm this quotation and initiate fulfillment or dispatch:</div>
                    <ul style="margin: 6px 0 0 0; padding-left: 20px;">
                      <li><strong>M-Pesa Buy Goods Till / Paybill:</strong> Available on automated checkout via <a href="https://www.partsoko.co.ke/cart" style="color: #059669; text-decoration: none;">partsoko.co.ke/cart</a>.</li>
                      <li><strong>Direct Assistance:</strong> Reply to this email or chat with our desk on WhatsApp: <a href="https://wa.me/254702420404?text=Habari%20CALREE%2C%20confirming%20quotation%20${encodeURIComponent(data.quoteNumber)}" style="color: #059669; font-weight: 800; text-decoration: none;">+254 702 420 404</a> with reference <strong>${escapeHtml(data.quoteNumber)}</strong>.</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td class="mobile-padding" style="padding: 24px 36px; text-align: center; background-color: #FFFFFF; font-size: 11px; color: #94A3B8; line-height: 1.6;">
              <div style="font-weight: 700; color: #64748B;">CALREE AUTOMOTIVE MARKETPLACE KENYA</div>
              <div>Better parts. Smoother journeys. &bull; Genuine automotive parts, electronics & components</div>
              <div style="margin-top: 8px; color: #CBD5E1;">
                This quotation is an official electronic estimate generated by CALREE Marketplace. Prices valid for 14 days.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
