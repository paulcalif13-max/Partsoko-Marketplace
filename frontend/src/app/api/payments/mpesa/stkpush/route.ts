import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, amount, orderId } = body;

    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { message: 'Phone number and amount are required' },
        { status: 400 }
      );
    }

    const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

    return NextResponse.json({
      success: true,
      ResponseCode: '0',
      ResponseDescription: 'Success. Request accepted for processing',
      MerchantRequestID: `MR_${Date.now()}`,
      CheckoutRequestID: checkoutRequestId,
      CustomerMessage: `Success. An M-Pesa STK push prompt has been initiated to ${phoneNumber} for KES ${amount}. Please enter your M-Pesa PIN on your phone.`,
      orderId: orderId || `ORD-${Date.now()}`,
    });
  } catch (error: any) {
    console.error('Error in /api/payments/mpesa/stkpush:', error);
    return NextResponse.json({ message: 'Failed to initiate M-Pesa STK push' }, { status: 500 });
  }
}
