import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Role identification: admin, seller, mechanic, or buyer
    let role = 'BUYER';
    if (email.includes('admin') || email === 'partsoko@gmail.com') {
      role = 'ADMIN';
    } else if (email.includes('seller') || email.includes('vendor')) {
      role = 'SELLER';
    } else if (email.includes('mechanic') || email.includes('garage')) {
      role = 'MECHANIC';
    }

    const user = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      token: `jwt_token_${Date.now()}`,
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user,
      token: user.token,
      role: user.role,
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Authentication failed' }, { status: 500 });
  }
}
