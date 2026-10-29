import { NextResponse } from 'next/server';

let usersList = [
  {
    id: 'u-1',
    name: 'Admin Paul',
    email: 'partsoko@gmail.com',
    role: 'ADMIN',
    status: 'ACTIVE',
  },
  {
    id: 'u-2',
    name: 'AutoParts Kenya',
    email: 'autoparts.ke@gmail.com',
    role: 'SELLER',
    status: 'ACTIVE',
  },
  {
    id: 'u-3',
    name: 'Mwangi Motors Ruaka',
    email: 'mwangimotors@gmail.com',
    role: 'MECHANIC',
    status: 'ACTIVE',
  },
  {
    id: 'u-4',
    name: 'AutoValuer Kenya',
    email: 'info@autovaluer.co.ke',
    role: 'VALUER',
    status: 'ACTIVE',
  },
];

export async function GET() {
  return NextResponse.json(usersList);
}
