import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { applicantName, phone, email, productType, requestedAmount, tenureMonths, vehicleData } = body;

    if (!applicantName || !phone || !requestedAmount) {
      return NextResponse.json(
        { message: 'Missing required financing details (name, phone, amount)' },
        { status: 400 }
      );
    }

    // Generate unique verification & tracking code
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const referenceCode = `FIN-${randomHex}`;

    const applicationRecord = {
      id: `app_${Date.now()}`,
      referenceCode,
      applicantName,
      phone,
      email: email || null,
      productType: productType || 'PARTS_FINANCE',
      requestedAmount: Number(requestedAmount),
      tenureMonths: tenureMonths ? Number(tenureMonths) : 12,
      vehicleData: vehicleData || {},
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    };

    // Pre-composed WhatsApp confirmation message for the applicant
    const whatsappMessage = encodeURIComponent(
      `Habari PARTSOKO, I have submitted a Financing Application.\n\n` +
      `*Reference Code:* ${referenceCode}\n` +
      `*Applicant:* ${applicantName}\n` +
      `*Phone:* ${phone}\n` +
      `*Amount:* KES ${Number(requestedAmount).toLocaleString()}\n` +
      `*Vehicle:* ${vehicleData?.registrationNumber || 'Pending'} (${vehicleData?.makeModel || 'N/A'})\n\n` +
      `Please verify and guide on the next steps.`
    );

    const whatsappUrl = `https://wa.me/254702420404?text=${whatsappMessage}`;

    return NextResponse.json(
      {
        success: true,
        message: 'Financing application received successfully',
        referenceCode,
        application: applicationRecord,
        whatsappUrl,
        adminContact: '+254702420404',
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error in /api/finance/apply:', error);
    return NextResponse.json(
      { message: 'Failed to process finance application', error: error.message },
      { status: 500 }
    );
  }
}
