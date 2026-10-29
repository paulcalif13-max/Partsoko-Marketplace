import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ownerName, phone, vehicleReg, makeModel, yearOfManufacture, inspectionLocation } = body;

    if (!ownerName || !phone || !vehicleReg) {
      return NextResponse.json(
        { message: 'Missing required valuation details (name, phone, registration)' },
        { status: 400 }
      );
    }

    const referenceCode = `VAL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const whatsappMessage = encodeURIComponent(
      `🔍 VEHICLE VALUATION BOOKING - PARTSOKO\n\n` +
      `*Reference:* ${referenceCode}\n` +
      `*Owner:* ${ownerName}\n` +
      `*Phone:* ${phone}\n` +
      `*Registration:* ${vehicleReg.toUpperCase()}\n` +
      `*Make & Model:* ${makeModel || 'N/A'}\n` +
      `*Year:* ${yearOfManufacture || 'N/A'}\n` +
      `*Location:* ${inspectionLocation || 'Nairobi'}\n\n` +
      `Please schedule certified valuer inspection.`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Valuation inspection booked',
        referenceCode,
        whatsappUrl: `https://wa.me/254702420404?text=${whatsappMessage}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in /api/valuations/request:', error);
    return NextResponse.json({ message: 'Failed to book valuation' }, { status: 500 });
  }
}
