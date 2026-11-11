import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name || body.customerName || 'Valued Client';
    const phone = body.phone || body.customerPhone;
    const email = body.email || body.customerEmail || '';
    const carModel = body.carModel || `${body.vehicleMake || ''} ${body.vehicleModel || ''} ${body.vehicleYear || ''}`.trim() || 'N/A';
    const partName = body.partName || (carModel !== 'N/A' ? `Spare Parts for ${carModel}` : 'Import Automotive Part');
    const partNumber = body.partNumber || 'N/A';
    const link = body.link || body.url || '';
    const originCountry = body.originCountry || 'Japan/UK/UAE/China';

    if (!phone) {
      return NextResponse.json(
        { message: 'A valid customer phone/WhatsApp number is required.' },
        { status: 400 }
      );
    }

    const referenceCode = `CAL-IMP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const whatsappMessage = encodeURIComponent(
      `🌐 GLOBAL IMPORT QUOTATION INQUIRY - CALREE\n\n` +
      `*Reference:* ${referenceCode}\n` +
      `*Customer:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      (email ? `*Email:* ${email}\n` : '') +
      `*Part Requested:* ${partName}\n` +
      `*Vehicle:* ${carModel}\n` +
      (partNumber !== 'N/A' ? `*OEM Part #:* ${partNumber}\n` : '') +
      `*Sourcing Route:* ${originCountry}\n` +
      (link ? `*Item URL:* ${link}\n\n` : `\n`) +
      `Please provide consolidated landed quote with CALREE official details.`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Import quotation request received',
        referenceCode,
        email,
        whatsappUrl: `https://wa.me/254702420404?text=${whatsappMessage}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in /api/imports/request:', error);
    return NextResponse.json({ message: 'Failed to submit import quotation request' }, { status: 500 });
  }
}
