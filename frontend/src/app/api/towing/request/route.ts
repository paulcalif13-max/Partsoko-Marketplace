import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, pickupLocation, destination, vehicleDetails, urgency } = body;

    if (!customerName || !phone || !pickupLocation) {
      return NextResponse.json(
        { message: 'Missing required towing details (name, phone, pickup location)' },
        { status: 400 }
      );
    }

    const referenceCode = `TOW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const whatsappMessage = encodeURIComponent(
      `🚨 EMERGENCY TOWING REQUEST - PARTSOKO\n\n` +
      `*Reference:* ${referenceCode}\n` +
      `*Customer:* ${customerName}\n` +
      `*Phone:* ${phone}\n` +
      `*Pickup Location:* ${pickupLocation}\n` +
      `*Destination:* ${destination || 'Nearest Garage'}\n` +
      `*Urgency:* ${urgency || 'Immediate (24/7)'}\n\n` +
      `Please dispatch recovery vehicle immediately.`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Towing dispatch request received',
        referenceCode,
        whatsappUrl: `https://wa.me/254702420404?text=${whatsappMessage}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in /api/towing/request:', error);
    return NextResponse.json({ message: 'Failed to request towing' }, { status: 500 });
  }
}
