import { NextResponse } from 'next/server';
import { sendOrderInvoiceEmail, OrderEmailData } from '@/lib/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      orderRef,
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      town,
      paymentMethod,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
    } = body;

    if (!customerEmail || !customerEmail.includes('@')) {
      return NextResponse.json(
        { message: 'A valid customer email is required.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: 'At least one order item is required.' },
        { status: 400 }
      );
    }

    const orderData: OrderEmailData = {
      orderRef: orderRef || `PSK-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customerName || 'Valued Customer',
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone || '',
      deliveryAddress: deliveryAddress || 'Store Pickup',
      town: town || 'Nairobi',
      paymentMethod: paymentMethod || 'mpesa',
      items: items.map((it: any) => ({
        id: it.id,
        name: it.name || it.title || 'Automotive Part',
        price: Number(it.price) || 0,
        quantity: Number(it.quantity) || 1,
      })),
      subtotal: Number(subtotal) || 0,
      deliveryFee: Number(deliveryFee) || 0,
      totalAmount: Number(totalAmount) || 0,
    };

    const result = await sendOrderInvoiceEmail(orderData);

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? `Order invoice dispatched to ${orderData.customerEmail}`
        : `Order created, email status: ${result.error}`,
      orderRef: orderData.orderRef,
      emailSent: result.success,
      messageId: result.messageId,
      previewMode: result.previewMode,
    });
  } catch (error: any) {
    console.error('Error in /api/orders/email:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to dispatch order invoice email' },
      { status: 500 }
    );
  }
}
