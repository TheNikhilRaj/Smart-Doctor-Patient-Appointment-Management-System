import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import userModel from '@/models/User';
import { generateToken, hashPassword } from '@/lib/auth';
import validator from 'validator';

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !password || !email) {
      return NextResponse.json(
        { success: false, message: 'Missing Details' },
        { status: 400 }
      );
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Enter a valid Email' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Enter a strong password' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate token
    const token = generateToken(user._id);

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
