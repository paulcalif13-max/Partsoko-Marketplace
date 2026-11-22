import nodemailer, { Transporter } from 'nodemailer';
import { generateQuotationHtml, QuotationData, generateImportAcknowledgmentHtml } from './quotationEmailTemplate';

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  previewMode?: boolean;
}

export interface BaseEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  category?: string;
}

/**
 * Normalizes email address header into RFC 5322 compliant syntax.
 * Avoids malformed double-nested headers like `"CALREE" <"CALREE" <email>>`.
 */
export function formatFromHeader(displayName: string, rawFrom?: string): string {
  const email = (rawFrom || process.env.SMTP_USER || 'paulcalif13@gmail.com').trim();
  const emailMatch = email.match(/<([^>]+)>/);
  const cleanEmail = emailMatch ? emailMatch[1].trim() : email.replace(/^"|"$/g, '').trim();
  return `"${displayName}" <${cleanEmail}>`;
}

/**
 * Creates a configured Nodemailer transporter using sanitized environment variables.
 */
export function getMailTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER?.trim();
  const rawPass = process.env.SMTP_PASS || '';
  const pass = rawPass.replace(/\s+/g, '').trim();

  if (!user || !pass || pass === 'your_gmail_app_password') {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Core email dispatcher with verified fallback and consistent logging.
 */
export async function sendCalreeEmail(options: BaseEmailOptions): Promise<EmailSendResult> {
  const defaultReplyTo = process.env.SMTP_USER || 'paulcalif13@gmail.com';
  const { to, subject, html, text, replyTo = defaultReplyTo, category = 'GENERAL' } = options;

  if (!to || !to.includes('@')) {
    console.warn(`[CALREE EMAIL - ${category}] Invalid recipient email address: "${to}"`);
    return { success: false, error: 'Invalid recipient email address' };
  }

  const transporter = getMailTransporter();

  if (!transporter) {
    console.log(`[CALREE EMAIL - ${category}] SMTP credentials not set or in sandbox. Email prepared for ${to}: "${subject}"`);
    return {
      success: true,
      previewMode: true,
      messageId: `PREVIEW-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
  }

  try {
    const from = formatFromHeader('CALREE Official', process.env.SMTP_FROM);
    const info = await transporter.sendMail({
      from,
      to,
      replyTo,
      subject,
      text: text || subject,
      html,
    });

    console.log(`[CALREE EMAIL - ${category}] Dispatched successfully to ${to} (MessageID: ${info.messageId})`);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error(`[CALREE EMAIL - ${category}] Failed delivery to ${to}:`, error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ============================================================================
// 1. OFFICIAL QUOTATIONS
// ============================================================================
export async function sendQuotationEmail(data: QuotationData): Promise<EmailSendResult> {
  const html = generateQuotationHtml(data);
  const subject = `Official CALREE Quotation [${data.quoteNumber}] - Better parts. Smoother journeys.`;
  const text = `Official CALREE Quotation ${data.quoteNumber}\nTotal Due: KES ${data.totalAmount.toLocaleString()}\nPrepared for: ${data.clientName || 'Valued Client'} (${data.clientEmail})\nView online or reply to confirm order. Tel: +254 702 420 404`;

  return sendCalreeEmail({
    to: data.clientEmail,
    subject,
    html,
    text,
    category: 'QUOTATION',
  });
}

// ============================================================================
// 2. GLOBAL IMPORT SOURCING ACKNOWLEDGMENT
// ============================================================================
export interface ImportEmailData {
  referenceCode: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicle: string;
  partUrl?: string;
  notes?: string;
}

export async function sendImportRequestEmail(data: ImportEmailData): Promise<EmailSendResult> {
  const html = generateImportAcknowledgmentHtml(data);
  const subject = `Import Sourcing Request Received [${data.referenceCode}] - CALREE Kenya`;
  const text = `Hello ${data.customerName},\nWe have received your global sourcing request for ${data.vehicle}.\nReference: ${data.referenceCode}\nOur sourcing desk is computing landed costs. Tel/WhatsApp: +254 702 420 404`;

  return sendCalreeEmail({
    to: data.customerEmail,
    subject,
    html,
    text,
    category: 'IMPORT_REQUEST',
  });
}

// ============================================================================
// 3. ORDER INVOICE & PURCHASE CONFIRMATION
// ============================================================================
export interface OrderItem {
  id?: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderEmailData {
  orderRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  town: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
}

export function generateOrderInvoiceHtml(data: OrderEmailData): string {
  const itemsRows = data.items.map((item, idx) => `
    <tr style="border-bottom: 1px solid #E2E8F0;">
      <td style="padding: 12px 14px; font-size: 13px; color: #475569; text-align: center;">${idx + 1}</td>
      <td style="padding: 12px 14px; font-size: 13px; font-weight: 700; color: #0F172A;">${escapeHtml(item.name)}</td>
      <td style="padding: 12px 14px; font-size: 13px; color: #334155; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 14px; font-size: 13px; color: #334155; text-align: right; white-space: nowrap;">KES ${item.price.toLocaleString()}</td>
      <td style="padding: 12px 14px; font-size: 13px; font-weight: 700; color: #0F172A; text-align: right; white-space: nowrap;">KES ${(item.price * item.quantity).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CALREE Order Invoice - ${escapeHtml(data.orderRef)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #F8FAFC; color: #0F172A; }
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 12px !important; }
      .mobile-padding { padding: 16px !important; }
    }
  </style>
</head>
<body style="background-color: #F8FAFC; padding: 24px 0; margin: 0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" class="container" width="640" cellspacing="0" cellpadding="0" border="0" style="max-width: 640px; width: 100%; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05); margin: 0 auto;">
          <!-- Top Accent -->
          <tr><td style="height: 6px; background: linear-gradient(90deg, #00D066 0%, #059669 100%);"></td></tr>

          <!-- Header -->
          <tr>
            <td class="mobile-padding" style="padding: 30px 36px 20px; background-color: #0B1120;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <div style="color: #FFFFFF; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">CALREE</div>
                    <div style="color: #94A3B8; font-size: 11px; margin-top: 2px;">Automotive Marketplace Kenya</div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: rgba(0, 208, 102, 0.15); border: 1px solid #00D066; color: #00D066; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                      Order Confirmed
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Strip -->
          <tr>
            <td style="padding: 24px 36px 16px; background-color: #F1F5F9; border-bottom: 1px solid #E2E8F0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-size: 13px; color: #64748B;">Order Reference: <strong style="color: #0F172A;">${escapeHtml(data.orderRef)}</strong></td>
                  <td align="right" style="font-size: 13px; color: #64748B;">Total: <strong style="color: #00D066; font-size: 16px;">KES ${data.totalAmount.toLocaleString()}</strong></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer & Delivery -->
          <tr>
            <td class="mobile-padding" style="padding: 24px 36px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="50%" valign="top">
                    <div style="font-size: 11px; font-weight: 800; color: #94A3B8; text-transform: uppercase; margin-bottom: 6px;">Customer Details</div>
                    <div style="font-size: 14px; font-weight: 700; color: #0F172A;">${escapeHtml(data.customerName)}</div>
                    <div style="font-size: 13px; color: #475569;">${escapeHtml(data.customerPhone)}</div>
                    <div style="font-size: 13px; color: #475569;">${escapeHtml(data.customerEmail)}</div>
                  </td>
                  <td width="50%" valign="top">
                    <div style="font-size: 11px; font-weight: 800; color: #94A3B8; text-transform: uppercase; margin-bottom: 6px;">Delivery Destination</div>
                    <div style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.deliveryAddress)}</div>
                    <div style="font-size: 13px; color: #475569;">${escapeHtml(data.town)}, Kenya</div>
                    <div style="font-size: 12px; color: #059669; margin-top: 4px;">Payment: ${escapeHtml(data.paymentMethod.toUpperCase())}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #0F172A; color: #FFFFFF;">
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-align: center; width: 36px;">#</th>
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-align: left;">Part Description</th>
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-align: center; width: 48px;">Qty</th>
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-align: right; width: 90px;">Price</th>
                    <th style="padding: 10px 14px; font-size: 11px; font-weight: 700; text-align: right; width: 100px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Totals -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="60%"></td>
                  <td width="40%">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="4" border="0">
                      <tr>
                        <td style="font-size: 12px; color: #64748B;">Subtotal:</td>
                        <td align="right" style="font-size: 12px; font-weight: 600; color: #0F172A;">KES ${data.subtotal.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 12px; color: #64748B;">Delivery Fee:</td>
                        <td align="right" style="font-size: 12px; font-weight: 600; color: #0F172A;">KES ${data.deliveryFee.toLocaleString()}</td>
                      </tr>
                      <tr style="border-top: 2px solid #00D066;">
                        <td style="font-size: 14px; font-weight: 800; color: #0F172A; padding-top: 8px;">Total Due:</td>
                        <td align="right" style="font-size: 16px; font-weight: 800; color: #00D066; padding-top: 8px;">KES ${data.totalAmount.toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Help & Support -->
          <tr>
            <td class="mobile-padding" style="padding: 20px 36px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0;">
              <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin-bottom: 4px;">Need assistance or real-time dispatch updates?</div>
              <div style="font-size: 12px; color: #64748B;">
                Call / WhatsApp: <a href="https://wa.me/254702420404" style="color: #00D066; font-weight: 700; text-decoration: none;">+254 702 420 404</a> | Email: <a href="mailto:support@calree.co.ke" style="color: #00D066; text-decoration: none;">support@calree.co.ke</a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #0B1120; text-align: center; color: #94A3B8; font-size: 11px;">
              CALREE Kenya • Nairobi, Kenya • Better parts. Smoother journeys.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendOrderInvoiceEmail(data: OrderEmailData): Promise<EmailSendResult> {
  const html = generateOrderInvoiceHtml(data);
  const subject = `Official Order Invoice [${data.orderRef}] - CALREE Kenya`;
  const text = `Official CALREE Order Invoice ${data.orderRef}\nCustomer: ${data.customerName}\nTotal Paid: KES ${data.totalAmount.toLocaleString()}\nDestination: ${data.deliveryAddress}, ${data.town}\nHelpline: +254 702 420 404`;

  return sendCalreeEmail({
    to: data.customerEmail,
    subject,
    html,
    text,
    category: 'ORDER_INVOICE',
  });
}

// ============================================================================
// 4. TOWING & EMERGENCY RECOVERY DISPATCH
// ============================================================================
export interface TowingEmailData {
  referenceCode: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  pickupLocation: string;
  destination: string;
  vehicleDetails?: string;
  providerName?: string;
  fare?: number;
}

export function generateTowingConfirmationHtml(data: TowingEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Emergency Towing Dispatched - ${escapeHtml(data.referenceCode)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; padding: 24px 0; margin: 0; color: #0F172A;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);">
          <tr><td style="height: 6px; background: linear-gradient(90deg, #EF4444 0%, #DC2626 100%);"></td></tr>
          <tr>
            <td style="padding: 28px 32px; background-color: #0B1120; color: #FFFFFF;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 22px; font-weight: 800;">CALREE 24/7 Roadside Rescue</div>
                    <div style="color: #94A3B8; font-size: 11px; margin-top: 3px;">Rapid Vehicle Recovery Dispatch</div>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(239, 68, 68, 0.2); border: 1px solid #EF4444; color: #FCA5A5; padding: 6px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700;">
                      DISPATCH ACTIVE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 32px;">
              <h2 style="font-size: 18px; margin: 0 0 12px; color: #0F172A;">Emergency Towing Request Received</h2>
              <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 20px;">
                Hello <strong>${escapeHtml(data.customerName)}</strong>, your roadside recovery request has been logged and our dispatch controller has alerted the nearest recovery vehicle.
              </p>

              <div style="background-color: #FEF2F2; border: 1px solid #FECACA; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="6">
                  <tr>
                    <td style="font-size: 12px; color: #991B1B; font-weight: 700;">Rescue Ticket Ref:</td>
                    <td align="right" style="font-size: 14px; font-weight: 800; color: #DC2626;">${escapeHtml(data.referenceCode)}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Stranded Location:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.pickupLocation)}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Drop-off Destination:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.destination || 'Nearest Certified Garage')}</td>
                  </tr>
                  ${data.vehicleDetails ? `
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Vehicle:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.vehicleDetails)}</td>
                  </tr>` : ''}
                  ${data.providerName ? `
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Assigned Provider:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.providerName)}</td>
                  </tr>` : ''}
                  ${data.fare ? `
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Estimated Base Fare:</td>
                    <td align="right" style="font-size: 13px; font-weight: 700; color: #00D066;">KES ${data.fare.toLocaleString()}</td>
                  </tr>` : ''}
                </table>
              </div>

              <div style="background-color: #0F172A; border-radius: 12px; padding: 18px; text-align: center; color: #FFFFFF;">
                <div style="font-size: 12px; color: #94A3B8; margin-bottom: 4px;">24/7 Rapid Emergency Response Line</div>
                <a href="tel:+254702420404" style="color: #00D066; font-size: 18px; font-weight: 800; text-decoration: none;">+254 702 420 404</a>
                <div style="font-size: 11px; color: #CBD5E1; margin-top: 6px;">Our recovery driver will contact you at <strong>${escapeHtml(data.phone)}</strong> shortly.</div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 18px 32px; background-color: #F1F5F9; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0;">
              CALREE Rescue • Nairobi & Major Kenya Highways • Tel: +254 702 420 404
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendTowingConfirmationEmail(data: TowingEmailData): Promise<EmailSendResult> {
  const html = generateTowingConfirmationHtml(data);
  const subject = `🚨 Emergency Towing Dispatch [${data.referenceCode}] - CALREE 24/7 Rescue`;
  const text = `CALREE Emergency Towing Dispatch ${data.referenceCode}\nCustomer: ${data.customerName}\nPickup: ${data.pickupLocation}\nDropoff: ${data.destination}\nHelpline: +254 702 420 404`;

  return sendCalreeEmail({
    to: data.customerEmail,
    subject,
    html,
    text,
    category: 'TOWING_DISPATCH',
  });
}

// ============================================================================
// 5. FINANCING APPLICATION CONFIRMATION
// ============================================================================
export interface FinanceEmailData {
  referenceCode: string;
  applicantName: string;
  applicantEmail: string;
  phone: string;
  productType: string;
  requestedAmount: number;
  tenureMonths: number;
  vehicleReg?: string;
  monthlyInstallment?: number;
}

export function generateFinanceConfirmationHtml(data: FinanceEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Financing Application Received - ${escapeHtml(data.referenceCode)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; padding: 24px 0; margin: 0; color: #0F172A;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);">
          <tr><td style="height: 6px; background: linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%);"></td></tr>
          <tr>
            <td style="padding: 28px 32px; background-color: #0B1120; color: #FFFFFF;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 22px; font-weight: 800;">CALREE Auto Finance</div>
                    <div style="color: #94A3B8; font-size: 11px; margin-top: 3px;">Parts, Repairs & Logbook Financing</div>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(59, 130, 246, 0.2); border: 1px solid #3B82F6; color: #93C5FD; padding: 6px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700;">
                      IN REVIEW
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 32px;">
              <h2 style="font-size: 18px; margin: 0 0 12px; color: #0F172A;">Financing Application Submitted</h2>
              <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 20px;">
                Hello <strong>${escapeHtml(data.applicantName)}</strong>, thank you for applying for CALREE Automotive Financing. Your application is under credit underwriting assessment.
              </p>

              <div style="background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="6">
                  <tr>
                    <td style="font-size: 12px; color: #1E40AF; font-weight: 700;">Application Ref:</td>
                    <td align="right" style="font-size: 14px; font-weight: 800; color: #1D4ED8;">${escapeHtml(data.referenceCode)}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Facility Type:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.productType)}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Requested Amount:</td>
                    <td align="right" style="font-size: 13px; font-weight: 700; color: #00D066;">KES ${data.requestedAmount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Tenure:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${data.tenureMonths} Months</td>
                  </tr>
                  ${data.monthlyInstallment ? `
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Est. Monthly Installment:</td>
                    <td align="right" style="font-size: 13px; font-weight: 700; color: #1D4ED8;">KES ${data.monthlyInstallment.toLocaleString()} / mo</td>
                  </tr>` : ''}
                  ${data.vehicleReg ? `
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Vehicle Registration:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.vehicleReg)}</td>
                  </tr>` : ''}
                </table>
              </div>

              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <div style="font-size: 12px; font-weight: 700; color: #0F172A; margin-bottom: 6px;">Next Steps:</div>
                <ol style="margin: 0; padding-left: 20px; font-size: 12px; color: #475569; line-height: 1.6;">
                  <li>A CALREE finance specialist will review your M-Pesa statement & vehicle details.</li>
                  <li>We will reach out to <strong>${escapeHtml(data.phone)}</strong> within 2 business hours.</li>
                  <li>Upon approval, funds are disbursed directly or paid to your certified workshop.</li>
                </ol>
              </div>

              <div style="text-align: center;">
                <a href="https://wa.me/254702420404?text=Habari%20CALREE,%20my%20finance%20app%20ref%20is%20${data.referenceCode}" style="display: inline-block; background-color: #00D066; color: #0B1120; font-weight: 800; font-size: 13px; padding: 12px 24px; border-radius: 9999px; text-decoration: none;">
                  Chat with Finance Officer on WhatsApp
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 18px 32px; background-color: #F1F5F9; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0;">
              CALREE Finance Desk • Tel: +254 702 420 404 • Nairobi, Kenya
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendFinanceApplicationEmail(data: FinanceEmailData): Promise<EmailSendResult> {
  const html = generateFinanceConfirmationHtml(data);
  const subject = `Financing Application Received [${data.referenceCode}] - CALREE Auto Finance`;
  const text = `CALREE Finance Application ${data.referenceCode}\nApplicant: ${data.applicantName}\nFacility: ${data.productType}\nAmount: KES ${data.requestedAmount.toLocaleString()}\nHelpline: +254 702 420 404`;

  return sendCalreeEmail({
    to: data.applicantEmail,
    subject,
    html,
    text,
    category: 'FINANCE_APPLICATION',
  });
}

// ============================================================================
// 6. VEHICLE VALUATION BOOKING CONFIRMATION
// ============================================================================
export interface ValuationEmailData {
  referenceCode: string;
  ownerName: string;
  ownerEmail: string;
  phone: string;
  vehicleReg: string;
  makeModel: string;
  year?: number | string;
  location: string;
  purpose?: string;
}

export function generateValuationConfirmationHtml(data: ValuationEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Certified Valuation Inspection Booked - ${escapeHtml(data.referenceCode)}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; padding: 24px 0; margin: 0; color: #0F172A;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);">
          <tr><td style="height: 6px; background: linear-gradient(90deg, #8B5CF6 0%, #6D28D9 100%);"></td></tr>
          <tr>
            <td style="padding: 28px 32px; background-color: #0B1120; color: #FFFFFF;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 22px; font-weight: 800;">CALREE Vehicle Valuations</div>
                    <div style="color: #94A3B8; font-size: 11px; margin-top: 3px;">Certified Automotive Assessment & Inspection</div>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(139, 92, 246, 0.2); border: 1px solid #8B5CF6; color: #C4B5FD; padding: 6px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700;">
                      BOOKED
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 32px;">
              <h2 style="font-size: 18px; margin: 0 0 12px; color: #0F172A;">Inspection File Opened</h2>
              <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 20px;">
                Hello <strong>${escapeHtml(data.ownerName)}</strong>, your inspection booking for <strong>${escapeHtml(data.vehicleReg)} (${escapeHtml(data.makeModel)})</strong> has been scheduled.
              </p>

              <div style="background-color: #F5F3FF; border: 1px solid #DDD6FE; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="6">
                  <tr>
                    <td style="font-size: 12px; color: #6D28D9; font-weight: 700;">Inspection Ref:</td>
                    <td align="right" style="font-size: 14px; font-weight: 800; color: #6D28D9;">${escapeHtml(data.referenceCode)}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Vehicle Registration:</td>
                    <td align="right" style="font-size: 13px; font-weight: 700; color: #0F172A;">${escapeHtml(data.vehicleReg)}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Make & Model:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.makeModel)} ${data.year ? `(${data.year})` : ''}</td>
                  </tr>
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Inspection Location:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.location)}</td>
                  </tr>
                  ${data.purpose ? `
                  <tr>
                    <td style="font-size: 12px; color: #64748B;">Valuation Purpose:</td>
                    <td align="right" style="font-size: 13px; font-weight: 600; color: #0F172A;">${escapeHtml(data.purpose.toUpperCase())}</td>
                  </tr>` : ''}
                </table>
              </div>

              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin-bottom: 20px; font-size: 12px; color: #475569; line-height: 1.6;">
                A certified valuer will call <strong>${escapeHtml(data.phone)}</strong> to align on the exact time and physical location for inspection. The official report will be generated and issued within 24 hours of inspection.
              </div>

              <div style="text-align: center;">
                <a href="https://wa.me/254702420404?text=Habari%20CALREE,%20my%20valuation%20ref%20is%20${data.referenceCode}" style="display: inline-block; background-color: #00D066; color: #0B1120; font-weight: 800; font-size: 13px; padding: 12px 24px; border-radius: 9999px; text-decoration: none;">
                  Confirm Timeslot via WhatsApp
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 18px 32px; background-color: #F1F5F9; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0;">
              CALREE Certified Automotive Inspections • Tel: +254 702 420 404 • Nairobi, Kenya
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendValuationConfirmationEmail(data: ValuationEmailData): Promise<EmailSendResult> {
  const html = generateValuationConfirmationHtml(data);
  const subject = `Vehicle Valuation Inspection Booked [${data.referenceCode}] - CALREE Kenya`;
  const text = `CALREE Valuation Booking ${data.referenceCode}\nOwner: ${data.ownerName}\nVehicle: ${data.vehicleReg} (${data.makeModel})\nLocation: ${data.location}\nHelpline: +254 702 420 404`;

  return sendCalreeEmail({
    to: data.ownerEmail,
    subject,
    html,
    text,
    category: 'VALUATION_BOOKING',
  });
}

// ============================================================================
// 7. BUG & SYSTEM REPORT NOTIFICATION
// ============================================================================
export interface BugEmailData {
  reportId: string;
  title: string;
  description: string;
  url: string;
  browserInfo?: string;
}

export async function sendBugReportEmail(data: BugEmailData): Promise<EmailSendResult> {
  const supportEmail = process.env.SUPPORT_EMAIL || 'support@calree.co.ke';
  const html = `
    <div style="font-family: sans-serif; padding: 20px; background-color: #0B1120; color: #FFFFFF; border-radius: 12px;">
      <h2 style="color: #00D066; margin-top: 0;">🚨 New CALREE Issue Reported</h2>
      <p><strong>Report ID:</strong> ${escapeHtml(data.reportId)}</p>
      <p><strong>Title:</strong> ${escapeHtml(data.title)}</p>
      <p><strong>Page URL:</strong> <a href="${escapeHtml(data.url)}" style="color: #00D066;">${escapeHtml(data.url)}</a></p>
      <div style="background-color: #1E293B; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <strong>Description:</strong>
        <p style="white-space: pre-wrap; margin-top: 6px; color: #E2E8F0;">${escapeHtml(data.description)}</p>
      </div>
      <p style="font-size: 11px; color: #94A3B8;"><strong>Browser:</strong> ${escapeHtml(data.browserInfo || 'N/A')}</p>
    </div>
  `;

  return sendCalreeEmail({
    to: supportEmail,
    subject: `🚨 [CALREE BUG REPORT ${data.reportId}] ${data.title}`,
    html,
    text: `CALREE Bug Report ${data.reportId}\nTitle: ${data.title}\nURL: ${data.url}\n\n${data.description}`,
    category: 'BUG_REPORT',
  });
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
