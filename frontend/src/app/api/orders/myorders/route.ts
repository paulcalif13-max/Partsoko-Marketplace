import { NextResponse } from 'next/server';

export async function GET() {
  const samplePurchases = [
    {
      id: 'ord-891',
      totalAmount: 18500,
      status: 'DELIVERED',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      orderItems: [
        {
          quantity: 1,
          price: 18500,
          product: {
            name: 'Android Car Multimedia Unit (Universal 9" IPS Touchscreen)',
          },
        },
      ],
    },
  ];

  return NextResponse.json(samplePurchases);
}
