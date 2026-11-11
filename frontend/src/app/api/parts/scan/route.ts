import { NextResponse } from 'next/server';
import { checkVehicleCompatibility, VehicleSelection } from '@/lib/vehicleData';

// Extended catalog of verified parts for scanning & fitment lookup
const CATALOG_PARTS = [
  {
    id: 'prod-1',
    name: 'Toyota Land Cruiser Prado Brake Pads (Front) - Genuine',
    category: 'SUSPENSION',
    price: 12500,
    partNumber: '04465-60320',
    brand: 'Toyota Genuine',
    condition: 'NEW',
    compatibility: 'Toyota Land Cruiser Prado 150/120 (2009-2022), Hilux Revo',
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
    compatibility: 'Toyota Hilux, Fortuner, Prado 1KD/2KD Engine (2005-2020)',
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
    compatibility: 'Universal 2-DIN (Toyota, Nissan, Subaru, Honda, Mazda, Mitsubishi)',
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
    compatibility: 'Fits H11/H8 sockets on most modern SUVs and Sedans (Toyota, Nissan, Subaru, Honda)',
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
    compatibility: 'Toyota HiAce, Hilux, Prado 1KD-FTV 3.0L (2005-2017)',
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
    compatibility: 'Subaru Forester SH/SJ (2008-2018), Outback BS (2014-2020)',
    stock: 12,
    seller: 'Speedy Spares Nairobi',
    image: '/products/shock-absorber.png',
  },
  {
    id: 'prod-7',
    name: 'Nissan X-Trail T32 Front Wheel Hub & Bearing Assembly',
    category: 'SUSPENSION',
    price: 14500,
    partNumber: '40202-4BA0A',
    brand: 'NTN Japan',
    condition: 'NEW',
    compatibility: 'Nissan X-Trail T32 (2013-2021), Qashqai J11, Renault Kadjar',
    stock: 8,
    seller: 'Nissan Genuine Hub Ruaka',
    image: '/categories/suspension.png',
  },
  {
    id: 'prod-8',
    name: 'Subaru Turbocharger TD04L / IHI VF52',
    category: 'ENGINE',
    price: 48000,
    partNumber: '14411AA800',
    brand: 'IHI Turbo',
    condition: 'REFURBISHED',
    compatibility: 'Subaru Forester XT SJ (2013-2018), WRX FA20/EJ25, Legacy GT',
    stock: 4,
    seller: 'Subaru Pros KE',
    image: '/categories/engine.png',
  },
  {
    id: 'prod-9',
    name: 'Mercedes-Benz W205 C-Class Front Brake Rotors (Pair)',
    category: 'SUSPENSION',
    price: 26000,
    partNumber: '0004212512',
    brand: 'Brembo',
    condition: 'NEW',
    compatibility: 'Mercedes-Benz C-Class W205 (2014-2021) C180, C200, C250, C300',
    stock: 6,
    seller: 'EuroParts Kenya',
    image: '/products/brake-pads.png',
  },
  {
    id: 'prod-10',
    name: 'Isuzu D-Max Oil Filter & Fuel Filter Service Kit',
    category: 'FUEL',
    price: 6800,
    partNumber: '8-98165071-0',
    brand: 'Isuzu Genuine',
    condition: 'NEW',
    compatibility: 'Isuzu D-Max 2.5L / 3.0L (2012-2023), mu-X 4JJ1 / 4JK1',
    stock: 22,
    seller: 'AutoParts Kenya',
    image: '/categories/fuel.png',
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      imageBase64,
      partNumber,
      make,
      model,
      year,
      engineTrim,
      vinNumber,
      notes,
    } = body;

    // 1. Analyze / Normalize Part Number
    let detectedPartNumber = (partNumber || '').trim().toUpperCase();

    // If part number was not typed, check if any common OEM pattern is present in notes or base64 metadata
    if (!detectedPartNumber && notes) {
      const match = notes.match(/\b([0-9]{5}-[0-9]{5}|[0-9A-Z]{6,12})\b/i);
      if (match) {
        detectedPartNumber = match[1].toUpperCase();
      }
    }

    // 2. Vehicle Selection
    const vehicle: VehicleSelection = {
      make: (make || '').trim(),
      model: (model || '').trim(),
      year: (year || '').trim(),
      engineTrim: (engineTrim || '').trim(),
      vinNumber: (vinNumber || '').trim(),
    };

    const hasVehicle = !!vehicle.make;
    const vehicleLabel = hasVehicle
      ? `${vehicle.year || ''} ${vehicle.make} ${vehicle.model} ${vehicle.engineTrim || ''}`.trim()
      : 'General Vehicles';

    // 3. Search and Match Against Catalog
    const cleanSearchPart = detectedPartNumber.replace(/[^A-Z0-9]/g, '');

    const scoredProducts = CATALOG_PARTS.map((prod) => {
      let score = 0;
      let fitmentStatus: 'EXACT_FIT' | 'PARTIAL_FIT' | 'UNIVERSAL' | 'UNVERIFIED' = 'UNVERIFIED';
      let matchReason = '';

      const prodCleanPart = prod.partNumber.replace(/[^A-Z0-9]/g, '');

      // Check Part Number match
      if (cleanSearchPart && (prodCleanPart === cleanSearchPart || prod.partNumber.toUpperCase().includes(detectedPartNumber))) {
        score += 80;
        matchReason = 'Exact Part Number Match';
      } else if (cleanSearchPart && (prodCleanPart.includes(cleanSearchPart) || cleanSearchPart.includes(prodCleanPart))) {
        score += 40;
        matchReason = 'Partial Part Number Match';
      }

      // Check Vehicle Compatibility
      if (hasVehicle) {
        const fitment = checkVehicleCompatibility(vehicle, prod.compatibility);
        if (fitment.matchLevel === 'EXACT') {
          score += 50;
          fitmentStatus = 'EXACT_FIT';
          if (!matchReason) matchReason = `Verified fit for ${vehicle.make} ${vehicle.model}`;
        } else if (fitment.matchLevel === 'PARTIAL') {
          score += 25;
          fitmentStatus = prod.compatibility.toLowerCase().includes('universal') ? 'UNIVERSAL' : 'PARTIAL_FIT';
          if (!matchReason) matchReason = `Compatible with ${vehicle.make}`;
        }
      }

      // Check category / keyword in name if notes provided
      if (notes) {
        const notesLower = notes.toLowerCase();
        if (prod.name.toLowerCase().includes(notesLower) || prod.category.toLowerCase().includes(notesLower)) {
          score += 20;
        }
      }

      return {
        ...prod,
        score,
        fitmentStatus,
        matchReason,
      };
    });

    // Filter to items with a meaningful score or return top recommendations
    let matches = scoredProducts.filter((p) => p.score > 0).sort((a, b) => b.score - a.score);

    // If no direct query score matched (e.g., rare or custom part), provide top relevant alternatives
    if (matches.length === 0 && hasVehicle) {
      matches = scoredProducts
        .filter((p) => p.compatibility.toLowerCase().includes(vehicle.make.toLowerCase()))
        .map((p) => ({ ...p, fitmentStatus: 'PARTIAL_FIT' as const, matchReason: `Available for ${vehicle.make}` }));
    }

    // Sourcing suggestion if no exact part number match was found
    const hasExactPartMatch = matches.some((m) => m.partNumber.toUpperCase() === detectedPartNumber);

    return NextResponse.json({
      success: true,
      detectedPartNumber: detectedPartNumber || null,
      vehicleSummary: vehicleLabel,
      vehicleSpecs: vehicle,
      totalMatches: matches.length,
      hasExactPartMatch,
      matches,
      // If rare or unstocked, pre-construct sourcing inquiry details
      sourcingInquiry: {
        recommended: !hasExactPartMatch,
        partNumber: detectedPartNumber || 'Unspecified Part #',
        vehicleLabel,
        estimatedDeliveryDays: '2 - 5 Days',
        supportWhatsApp: '+254 702 420 404',
      },
    });
  } catch (error: any) {
    console.error('Part scan error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process part scan', error: error?.message },
      { status: 500 }
    );
  }
}
