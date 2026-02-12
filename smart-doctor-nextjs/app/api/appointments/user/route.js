import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import appointmentModel from '@/models/Appointment';
import { getUserFromRequest } from '@/lib/auth';

// GET user appointments
export async function GET(request) {
  try {
    await connectDB();
    
    // Get user from token
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const appointments = await appointmentModel.find({ userId: user.id });

    return NextResponse.json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
