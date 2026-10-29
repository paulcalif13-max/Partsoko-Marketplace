import { NextResponse } from 'next/server';

export async function GET() {
  const sampleOrders = [
    {
      id: 'ord-101',
      totalAmount: 25000,
      status: 'PROCESSING',
      createdAt: new Date().toISOString(),
      user: {
        name: 'James Mwangi',
        email: 'j.mwangi@gmail.com',
      },
      orderItems: [
        {
          quantity: 2,
          price: 12500,
          product: {
            name: 'Toyota Prado Brake Pads (Front)',
          },
        },
      ],
    },
    {
      id: 'ord-102',
      totalAmount: 28000,
      status: 'SHIPPED',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      user: {
        name: 'David Kiprono',
        email: 'dkiprono@gmail.com',
      },
      orderItems: [
        {
          quantity: 1,
          price: 28000,
          product: {
            name: 'Alternator 12V 150A - Denso Genuine',
          },
        },
      ],
    },
  ];

  return NextResponse.json(sampleOrders);
}
