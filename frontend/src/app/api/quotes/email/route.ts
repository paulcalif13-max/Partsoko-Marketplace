import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateQuotationHtml, QuotationData } from '@/lib/quotationEmailTemplate';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clientEmail,
      clientName,
      clientPhone,
      companyName,
      vehicleInfo,
      items,
      subtotal,
      commissionFee,
      taxFee,
      deliveryFee,
      totalAmount,
      notes,
      quoteNumber: customQuoteNumber,
    } = body;

    if (!clientEmail || !clientEmail.includes('@')) {
      return NextResponse.json(
        { message: 'A valid client email address is required.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'Quotation requires at least one automotive part/item.' },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const quoteNumber = customQuoteNumber || `CAL-QT-${currentYear}-${randomHex}`;

    const quotationData: QuotationData = {
      quoteNumber,
      clientEmail,
      clientName: clientName || 'Valued Client',
      clientPhone: clientPhone || '',
      companyName: companyName || '',
      vehicleInfo: vehicleInfo || '',
      items,
      subtotal: Number(subtotal) || items.reduce((acc: number, it: any) => acc + (it.price * (it.quantity || 1)), 0),
      commissionFee: commissionFee !== undefined ? Number(commissionFee) : undefined,
      taxFee: taxFee !== undefined ? Number(taxFee) : undefined,
      deliveryFee: deliveryFee !== undefined ? Number(deliveryFee) : undefined,
      totalAmount: Number(totalAmount) || 0,
      notes: notes || '',
    };

    const quotationHtml = generateQuotationHtml(quotationData);

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromAddress = process.env.SMTP_FROM || smtpUser || 'support@calree.co.ke';

    let emailSent = false;
    let transportInfo = '';

    if (smtpUser && smtpPass && smtpPass !== 'your_gmail_app_password') {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const info = await transporter.sendMail({
          from: `"CALREE Official" <${fromAddress}>`,
          to: clientEmail,
          replyTo: 'support@calree.co.ke',
          subject: `Official CALREE Quotation [${quoteNumber}] - Better parts. Smoother journeys.`,
          text: `Official CALREE Quotation ${quoteNumber}\nTotal Due: KES ${quotationData.totalAmount.toLocaleString()}\nPrepared for: ${quotationData.clientName} (${clientEmail})\nView online or reply to confirm order. Tel: +254 702 420 404`,
          html: quotationHtml,
        });

        emailSent = true;
        transportInfo = `Message dispatched via SMTP: ${info.messageId}`;
        console.log(`[CALREE QUOTES] Email successfully sent to ${clientEmail} (${info.messageId})`);
      } catch (err: any) {
        console.error('[CALREE QUOTES] SMTP error, falling back to verified preview mode:', err.message);
        transportInfo = `SMTP fallback: ${err.message}`;
      }
    } else {
      console.log(`[CALREE QUOTES] SMTP credentials not set or in sandbox. Quotation generated for ${clientEmail}: ${quoteNumber}`);
      transportInfo = 'Generated in verified preview mode (ready for live SMTP).';
    }

    return NextResponse.json(
      {
        success: true,
        message: emailSent
          ? `Official quotation has been sent to ${clientEmail}!`
          : `Official quotation generated for ${clientEmail}.`,
        quoteNumber,
        emailSent,
        transportInfo,
        quotationData,
        htmlPreview: quotationHtml,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in /api/quotes/email:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to generate official quotation' },
      { status: 500 }
    );
  }
}
