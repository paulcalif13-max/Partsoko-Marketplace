import { NextResponse } from 'next/server';

let settings = {
  commissionPercent: '5',
  importTaxPercent: '16',
  flatDeliveryFee: '500',
  currency: 'KES',
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    settings = { ...settings, ...body };
    return NextResponse.json({ success: true, message: 'Settings saved', settings });
  } catch (err: any) {
    return NextResponse.json({ message: 'Failed to update settings' }, { status: 500 });
  }
}
