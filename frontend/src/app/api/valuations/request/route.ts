import { NextResponse } from 'next/server';
import { sendValuationConfirmationEmail } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      ownerName,
      customerName,
      phone,
      customerPhone,
      email,
      customerEmail,
      vehicleReg,
      makeModel,
      year,
      yearOfManufacture,
      location,
      inspectionLocation,
      purpose,
    } = body;

    const finalName = ownerName || customerName;
    const finalPhone = phone || customerPhone;
    const finalLocation = location || inspectionLocation || 'Nairobi';
    const finalYear = year || yearOfManufacture;
    const finalEmail = (email || customerEmail || '').trim();

    if (!finalName || !finalPhone || !vehicleReg) {
      return NextResponse.json(
        { message: 'Missing required valuation details (name, phone, registration)' },
        { status: 400 }
      );
    }

    const referenceCode = `VAL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    let emailSent = false;
    let transportInfo = '';

    if (finalEmail && finalEmail.includes('@')) {
      const result = await sendValuationConfirmationEmail({
        referenceCode,
        ownerName: finalName,
        ownerEmail: finalEmail,
        phone: finalPhone,
        vehicleReg: vehicleReg.toUpperCase(),
        makeModel: makeModel || 'Vehicle',
        year: finalYear,
        location: finalLocation,
        purpose: purpose || 'general',
      });

      emailSent = result.success;
      transportInfo = result.success
        ? (result.previewMode ? 'Generated in verified preview mode.' : `Dispatched via SMTP (${result.messageId})`)
        : `SMTP fallback: ${result.error}`;
    }

    const whatsappMessage = encodeURIComponent(
      `🔍 VEHICLE VALUATION BOOKING - CALREE\n\n` +
      `*Reference:* ${referenceCode}\n` +
      `*Owner:* ${finalName}\n` +
      `*Phone:* ${finalPhone}\n` +
      (finalEmail ? `*Email:* ${finalEmail}\n` : '') +
      `*Registration:* ${vehicleReg.toUpperCase()}\n` +
      `*Make & Model:* ${makeModel || 'N/A'}\n` +
      `*Year:* ${finalYear || 'N/A'}\n` +
      `*Location:* ${finalLocation}\n` +
      (purpose ? `*Purpose:* ${purpose}\n\n` : `\n`) +
      `Please schedule certified valuer inspection.`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Valuation inspection booked',
        referenceCode,
        emailSent,
        transportInfo,
        whatsappUrl: `https://wa.me/254702420404?text=${whatsappMessage}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in /api/valuations/request:', error);
    return NextResponse.json({ message: 'Failed to book valuation' }, { status: 500 });
  }
}
