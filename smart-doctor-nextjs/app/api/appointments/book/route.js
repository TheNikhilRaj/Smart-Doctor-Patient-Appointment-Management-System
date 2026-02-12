import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import appointmentModel from '@/models/Appointment';
import doctorModel from '@/models/Doctor';
import userModel from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

// POST book appointment
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
    const { docId, slotDate, slotTime } = body;

    // Get doctor data
    const docData = await doctorModel.findById(docId).select('-password');
    
    if (!docData) {
      return NextResponse.json(
        { success: false, message: 'Doctor not found' },
        { status: 404 }
      );
    }

    if (!docData.available) {
      return NextResponse.json(
        { success: false, message: 'Doctor not available' },
        { status: 400 }
      );
    }

    let slots_booked = docData.slots_booked;

    // Check for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return NextResponse.json(
          { success: false, message: 'Slot not available' },
          { status: 400 }
        );
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    // Get user data
    const userData = await userModel.findById(user.id).select('-password');

    // Prepare appointment data
    const appointmentData = {
      userId: user.id,
      docId,
      userData: userData.toObject(),
      docData: {
        name: docData.name,
        image: docData.image,
        speciality: docData.speciality,
        degree: docData.degree,
        experience: docData.experience,
        about: docData.about,
        fees: docData.fees,
        address: docData.address
      },
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return NextResponse.json({
      success: true,
      message: 'Appointment Booked',
      appointmentId: newAppointment._id
    });

  } catch (error) {
    console.error('Book appointment error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
