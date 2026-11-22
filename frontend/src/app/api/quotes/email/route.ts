import { NextResponse } from 'next/server';
import { generateQuotationHtml, QuotationData } from '@/lib/quotationEmailTemplate';
import { sendQuotationEmail } from '@/lib/emailService';

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

    const result = await sendQuotationEmail(quotationData);
    const emailSent = result.success;
    const transportInfo = result.success
      ? (result.previewMode ? 'Generated in verified preview mode.' : `Message dispatched via SMTP: ${result.messageId}`)
      : `SMTP fallback: ${result.error}`;

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
