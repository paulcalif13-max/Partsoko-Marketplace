import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'OK',
    platform: 'PARTSOKO Cloud API',
    region: 'Nairobi, Kenya',
    timestamp: new Date().toISOString(),
  });
}
