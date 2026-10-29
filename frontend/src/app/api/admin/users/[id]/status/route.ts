import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    return NextResponse.json({
      success: true,
      message: `User ${params.id} status updated to ${status}`,
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}
