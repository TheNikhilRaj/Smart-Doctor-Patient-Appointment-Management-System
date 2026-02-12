import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import doctorModel from '@/models/Doctor';
import userModel from '@/models/User';
import appointmentModel from '@/models/Appointment';

// GET dashboard data (admin only)
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

    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    };

    return NextResponse.json({
      success: true,
      dashData
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
