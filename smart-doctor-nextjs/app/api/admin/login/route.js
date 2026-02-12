import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// POST admin login
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@smartdoctorapp.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';
    const JWT_SECRET = process.env.JWT_SECRET;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, JWT_SECRET);
      
      return NextResponse.json({
        success: true,
        token
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
