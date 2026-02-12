import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import userModel from '@/models/User';
import { generateToken, comparePassword } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing Details' },
        { status: 400 }
      );
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User does not exist' },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    
    if (isMatch) {
      // Generate token
      const token = generateToken(user._id);
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
