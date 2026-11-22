import { NextResponse } from 'next/server';
import { sendTowingConfirmationEmail } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      phone,
      customerPhone,
      email,
      customerEmail,
      pickupLocation,
      destination,
      vehicleDetails,
      vehicleReg,
      providerName,
      fare,
      urgency,
    } = body;

    const finalName = customerName || 'Valued Motorist';
    const finalPhone = phone || customerPhone;
    const finalEmail = (email || customerEmail || '').trim();

    if (!finalName || !finalPhone || !pickupLocation) {
      return NextResponse.json(
        { message: 'Missing required towing details (name, phone, pickup location)' },
        { status: 400 }
      );
    }

    const referenceCode = `TOW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    let emailSent = false;
    let transportInfo = '';

    if (finalEmail && finalEmail.includes('@')) {
      const result = await sendTowingConfirmationEmail({
        referenceCode,
        customerName: finalName,
        customerEmail: finalEmail,
        phone: finalPhone,
        pickupLocation,
        destination: destination || 'Nearest Garage',
        vehicleDetails: vehicleDetails || vehicleReg || '',
        providerName: providerName || 'Rapid Response Recovery',
        fare: fare ? Number(fare) : undefined,
      });

      emailSent = result.success;
      transportInfo = result.success
        ? (result.previewMode ? 'Generated in verified preview mode.' : `Dispatched via SMTP (${result.messageId})`)
        : `SMTP fallback: ${result.error}`;
    }

    const whatsappMessage = encodeURIComponent(
      `🚨 EMERGENCY TOWING REQUEST - CALREE\n\n` +
      `*Reference:* ${referenceCode}\n` +
      `*Customer:* ${finalName}\n` +
      `*Phone:* ${finalPhone}\n` +
      (finalEmail ? `*Email:* ${finalEmail}\n` : '') +
      `*Pickup Location:* ${pickupLocation}\n` +
      `*Destination:* ${destination || 'Nearest Garage'}\n` +
      (providerName ? `*Assigned Provider:* ${providerName}\n` : '') +
      (fare ? `*Fare Est.:* KES ${Number(fare).toLocaleString()}\n` : '') +
      `*Urgency:* ${urgency || 'Immediate (24/7)'}\n\n` +
      `Please dispatch recovery vehicle immediately.`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Towing dispatch request received',
        referenceCode,
        emailSent,
        transportInfo,
        whatsappUrl: `https://wa.me/254702420404?text=${whatsappMessage}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in /api/towing/request:', error);
    return NextResponse.json({ message: 'Failed to request towing' }, { status: 500 });
  }
}
