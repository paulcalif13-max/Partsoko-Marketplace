import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = {
    id: params.id,
    name: 'Toyota Land Cruiser Prado Brake Pads (Front) - Genuine OEM',
    category: 'SUSPENSION',
    price: 12500,
    partNumber: '04465-60320',
    brand: 'Toyota Genuine Parts',
    condition: 'NEW (Factory Sealed)',
    compatibility: 'Toyota Land Cruiser Prado 150/120 Series (2009-2023), Hilux Revo',
    stock: 18,
    seller: 'AutoParts Kenya Ltd',
    image: '/products/brake-pads.png',
    description:
      'High-performance ceramic front brake pad set designed for exceptional stopping power, zero brake dust, and whisper-quiet operation under heavy load and off-road conditions across Kenyan terrains.',
    specifications: {
      material: 'Ceramic Composite',
      position: 'Front Axle (Left & Right)',
      warranty: '6 Months / 20,000 KM',
      origin: 'Japan OEM',
    },
  };

  return NextResponse.json(product);
}
