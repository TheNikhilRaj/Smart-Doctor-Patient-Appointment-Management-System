import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import appointmentModel from '@/models/Appointment';

// GET all appointments (admin only)
export async function GET(request) {
  try {
    await connectDB();
    
    // Check admin authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const appointments = await appointmentModel.find({});

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

// POST cancel appointment (admin only)
export async function POST(request) {
  try {
    await connectDB();
    
    // Check admin authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { appointmentId } = body;

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    return NextResponse.json({
      success: true,
      message: 'Appointment Cancelled'
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
