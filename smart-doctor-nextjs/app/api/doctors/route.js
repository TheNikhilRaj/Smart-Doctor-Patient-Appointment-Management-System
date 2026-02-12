import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import doctorModel from '@/models/Doctor';

// GET all doctors or filter by speciality
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const speciality = searchParams.get('speciality');

    let query = {};
    if (speciality) {
      query.speciality = speciality;
    }

    const doctors = await doctorModel.find(query).select('-password -email');

    return NextResponse.json({
      success: true,
      doctors
    });

  } catch (error) {
    console.error('Get doctors error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
