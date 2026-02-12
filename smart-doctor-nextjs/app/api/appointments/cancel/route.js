import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import appointmentModel from '@/models/Appointment';
import doctorModel from '@/models/Doctor';
import { getUserFromRequest } from '@/lib/auth';

// POST cancel appointment
export async function POST(request) {
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

    const body = await request.json();
    const { appointmentId } = body;

    // Get appointment data
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    if (!appointmentData) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Verify appointment belongs to user
    if (appointmentData.userId !== user.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized action' },
        { status: 403 }
      );
    }

    // Cancel appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    
    if (doctorData) {
      let slots_booked = doctorData.slots_booked;
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
      }
    }

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
