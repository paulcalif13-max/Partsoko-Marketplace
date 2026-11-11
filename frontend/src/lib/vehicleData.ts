export interface VehicleMake {
  make: string;
  popularModels: string[];
}

export const POPULAR_VEHICLE_MAKES: VehicleMake[] = [
  {
    make: 'Toyota',
    popularModels: [
      'Land Cruiser Prado (150/120/90)',
      'Land Cruiser (V8 / 200 / 300 / 79)',
      'Hilux (Revo / Vigo / GD-6)',
      'Harrier',
      'RAV4',
      'Premio',
      'Allion',
      'Fielder / Axio',
      'Vitz / Yaris',
      'HiAce (Shark / Box)',
      'Noah / Voxy',
      'Probox / Succeed',
      'Corolla Cross',
      'Fortuner',
      'Crown',
      'Mark X',
      'Rush',
      'Passo'
    ]
  },
  {
    make: 'Nissan',
    popularModels: [
      'X-Trail (T32 / T31 / T30)',
      'Navara / NP300',
      'Note',
      'Juke',
      'Tiida / Latio',
      'Serena',
      'Sylphy',
      'Dualis / Qashqai',
      'Patrol (Y62 / Y61)',
      'Teana',
      'March',
      'Caravan / NV350'
    ]
  },
  {
    make: 'Subaru',
    popularModels: [
      'Forester (SK / SJ / SH / SG)',
      'Outback (BT / BS / BR / BP)',
      'XV / Crosstrek',
      'Impreza',
      'Legacy B4 / Touring Wagon',
      'Levorg',
      'Exiga'
    ]
  },
  {
    make: 'Mercedes-Benz',
    popularModels: [
      'C-Class (W206 / W205 / W204)',
      'E-Class (W213 / W212)',
      'S-Class (W222 / W223)',
      'GLC-Class (X253)',
      'GLE-Class / ML (W166 / V167)',
      'GLA-Class',
      'GLS / GL-Class',
      'A-Class',
      'G-Wagon (W463)'
    ]
  },
  {
    make: 'BMW',
    popularModels: [
      '3 Series (G20 / F30 / E90)',
      '5 Series (G30 / F10 / E60)',
      'X3 (G01 / F25)',
      'X5 (G05 / F15 / E70)',
      '1 Series (F20 / F40)',
      'X1 (F48 / E84)',
      'X6 (F16 / E71)',
      '7 Series (G11 / F01)'
    ]
  },
  {
    make: 'Isuzu',
    popularModels: [
      'D-Max (RT50 / RG01 / TFS)',
      'mu-X',
      'NPR / NQR / Forward Trucks',
      'FRR'
    ]
  },
  {
    make: 'Mitsubishi',
    popularModels: [
      'Pajero / Shogun',
      'Pajero Sport / Challenger',
      'Outlander',
      'L200 / Triton',
      'RVR / ASX',
      'Delica D:5'
    ]
  },
  {
    make: 'Honda',
    popularModels: [
      'CR-V',
      'Fit / Jazz',
      'Vezel / HR-V',
      'Civic',
      'Accord',
      'Stepwgn',
      'Stream',
      'Freed'
    ]
  },
  {
    make: 'Mazda',
    popularModels: [
      'CX-5 (KF / KE)',
      'Demio / Mazda2',
      'Axela / Mazda3',
      'Atenza / Mazda6',
      'CX-3',
      'CX-8',
      'BT-50'
    ]
  },
  {
    make: 'Volkswagen',
    popularModels: [
      'Golf (Mk7 / Mk8 / Mk6)',
      'Tiguan',
      'Touareg',
      'Passat',
      'Polo',
      'Amarok',
      'Transporter / Caravelle'
    ]
  },
  {
    make: 'Land Rover',
    popularModels: [
      'Range Rover (L405 / L460)',
      'Range Rover Sport (L494 / L461)',
      'Range Rover Vogue',
      'Range Rover Velar',
      'Range Rover Evoque',
      'Discovery 4 / 5',
      'Defender (L663 / Classic TD5/Puma)',
      'Freelander 2'
    ]
  },
  {
    make: 'Ford',
    popularModels: [
      'Ranger (T6 / Next-Gen)',
      'Everest',
      'Escape / Kuga',
      'Explorer',
      'F-150',
      'Focus'
    ]
  },
  {
    make: 'Suzuki',
    popularModels: [
      'Jimny (JB74 / JB43)',
      'Grand Vitara / Vitara',
      'Swift',
      'Alto',
      'Ertiga',
      'Baleno'
    ]
  },
  {
    make: 'Audi',
    popularModels: [
      'A4',
      'A6',
      'Q5',
      'Q7',
      'Q3',
      'A3',
      'A5'
    ]
  }
];

export const VEHICLE_YEARS = Array.from({ length: 27 }, (_, i) => 2026 - i); // 2026 down to 2000

export interface VehicleSelection {
  make: string;
  model: string;
  year?: string;
  engineTrim?: string;
  vinNumber?: string;
}

/**
 * Checks if a vehicle selection matches a product compatibility string.
 */
export function checkVehicleCompatibility(
  vehicle: VehicleSelection,
  compatibilityText?: string
): { isCompatible: boolean; matchLevel: 'EXACT' | 'PARTIAL' | 'UNKNOWN' } {
  if (!compatibilityText || !vehicle.make) {
    return { isCompatible: false, matchLevel: 'UNKNOWN' };
  }

  const compLower = compatibilityText.toLowerCase();
  const makeLower = vehicle.make.toLowerCase();
  const modelClean = vehicle.model ? vehicle.model.replace(/\s*\([^)]*\)/g, '').trim().toLowerCase() : '';

  const makeMatches = compLower.includes(makeLower);
  const modelMatches = modelClean ? compLower.includes(modelClean) : false;

  let yearMatches = true;
  if (vehicle.year) {
    const yearNum = parseInt(vehicle.year, 10);
    // Check for ranges like 2009-2022 or individual years
    const rangeMatch = compLower.match(/(\d{4})\s*[-–to]+\s*(\d{4})/);
    if (rangeMatch) {
      const startYear = parseInt(rangeMatch[1], 10);
      const endYear = parseInt(rangeMatch[2], 10);
      yearMatches = yearNum >= startYear && yearNum <= endYear;
    } else if (compLower.includes(vehicle.year)) {
      yearMatches = true;
    }
  }

  if (makeMatches && modelMatches && yearMatches) {
    return { isCompatible: true, matchLevel: 'EXACT' };
  }

  if (makeMatches && (modelMatches || compLower.includes('universal'))) {
    return { isCompatible: true, matchLevel: 'PARTIAL' };
  }

  if (compLower.includes('universal')) {
    return { isCompatible: true, matchLevel: 'PARTIAL' };
  }

  return { isCompatible: false, matchLevel: 'UNKNOWN' };
}
