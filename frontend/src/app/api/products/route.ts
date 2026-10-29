import { NextResponse } from 'next/server';

const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Toyota Land Cruiser Prado Brake Pads (Front)',
    category: 'SUSPENSION',
    price: 12500,
    partNumber: '04465-60320',
    brand: 'Toyota Genuine',
    condition: 'NEW',
    compatibility: 'Toyota Land Cruiser Prado 150/120 (2009-2022)',
    stock: 18,
    seller: 'AutoParts Kenya',
    image: '/products/brake-pads.png',
  },
  {
    id: 'prod-2',
    name: 'Alternator 12V 150A - Denso Genuine',
    category: 'ELECTRICAL',
    price: 28000,
    partNumber: '104210-4990',
    brand: 'Denso',
    condition: 'NEW',
    compatibility: 'Toyota Hilux, Fortuner, Prado 1KD/2KD Engine',
    stock: 9,
    seller: 'PowerParts Ltd',
    image: '/products/alternator.png',
  },
  {
    id: 'prod-3',
    name: 'Android Car Multimedia Unit (Universal 9" IPS Touchscreen)',
    category: 'ACCESSORIES',
    price: 18500,
    partNumber: 'UNV-AND-901',
    brand: 'CarPlay Pro',
    condition: 'NEW',
    compatibility: 'Universal 2-DIN (Toyota, Nissan, Subaru, Honda, Mazda)',
    stock: 14,
    seller: 'TechAuto Solutions',
    image: '/products/multimedia.png',
  },
  {
    id: 'prod-4',
    name: 'LED Headlight Bulbs H11 / H8 (6000K Pure White 120W)',
    category: 'LIGHTING',
    price: 4200,
    partNumber: 'LED-H11-6K',
    brand: 'NightRider',
    condition: 'NEW',
    compatibility: 'Fits H11/H8 sockets on most modern SUVs and Sedans',
    stock: 45,
    seller: 'AutoLED Kenya',
    image: '/products/led-bulbs.png',
  },
  {
    id: 'prod-5',
    name: 'Denso Fuel Injector Set (4-Cylinder Common Rail)',
    category: 'FUEL',
    price: 42000,
    partNumber: '23670-30050',
    brand: 'Denso',
    condition: 'NEW',
    compatibility: 'Toyota HiAce, Hilux, Prado 1KD-FTV 3.0L',
    stock: 7,
    seller: 'Diesel Tech Kenya',
    image: '/products/fuel-injector.png',
  },
  {
    id: 'prod-6',
    name: 'Front Shock Absorber Strut Assembly (KYB Excel-G)',
    category: 'SUSPENSION',
    price: 16500,
    partNumber: '339114',
    brand: 'KYB',
    condition: 'NEW',
    compatibility: 'Subaru Forester SH/SJ (2008-2018), Outback',
    stock: 12,
    seller: 'Speedy Spares Nairobi',
    image: '/products/shock-absorber.png',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toUpperCase() || '';

  let filtered = [...PRODUCTS];

  if (category && category !== 'ALL') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (keyword) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(keyword) ||
        p.partNumber.toLowerCase().includes(keyword) ||
        p.brand.toLowerCase().includes(keyword) ||
        p.compatibility.toLowerCase().includes(keyword)
    );
  }

  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...body,
      image: body.image || '/products/brake-pads.png',
      createdAt: new Date().toISOString(),
    };
    PRODUCTS.unshift(newProduct);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: 'Failed to create product' }, { status: 500 });
  }
}
