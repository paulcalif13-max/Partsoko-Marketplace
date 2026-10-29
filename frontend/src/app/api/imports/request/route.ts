import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, partName, carModel, partNumber, link, originCountry } = body;

    if (!name || !phone || !partName) {
      return NextResponse.json(
        { message: 'Missing required import details (name, phone, part name)' },
        { status: 400 }
      );
    }

    const referenceCode = `IMP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const whatsappMessage = encodeURIComponent(
      `🌐 GLOBAL IMPORT INQUIRY - PARTSOKO\n\n` +
      `*Reference:* ${referenceCode}\n` +
      `*Customer:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Part Requested:* ${partName}\n` +
      `*Vehicle:* ${carModel || 'N/A'}\n` +
      `*OEM Part #:* ${partNumber || 'N/A'}\n` +
      `*Sourcing Country:* ${originCountry || 'Japan/UK/UAE'}\n` +
      (link ? `*Item Link:* ${link}\n\n` : `\n`) +
      `Please provide landed cost estimate.`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Import request received',
        referenceCode,
        whatsappUrl: `https://wa.me/254702420404?text=${whatsappMessage}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in /api/imports/request:', error);
    return NextResponse.json({ message: 'Failed to submit import request' }, { status: 500 });
  }
}
