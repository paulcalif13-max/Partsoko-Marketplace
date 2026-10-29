import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
    }

    const assignedRole = role || (email === 'partsoko@gmail.com' ? 'ADMIN' : 'BUYER');

    const user = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role: assignedRole,
      token: `jwt_token_${Date.now()}`,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user,
        token: user.token,
        role: user.role,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
  }
}
