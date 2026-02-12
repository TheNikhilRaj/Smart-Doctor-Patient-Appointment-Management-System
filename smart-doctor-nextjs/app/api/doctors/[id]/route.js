import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import doctorModel from '@/models/Doctor';

// GET doctor by ID
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    const doctor = await doctorModel.findById(id).select('-password -email');
    
    if (!doctor) {
      return NextResponse.json(
        { success: false, message: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      doctor
    });

  } catch (error) {
    console.error('Get doctor error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
