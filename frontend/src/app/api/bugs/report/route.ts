import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, url, browserInfo } = body;

    const reportId = `BUG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: 'Bug report received. Thank you for helping us improve PARTSOKO!',
      reportId,
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to submit report' }, { status: 500 });
  }
}
