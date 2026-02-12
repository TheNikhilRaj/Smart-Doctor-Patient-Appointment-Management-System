import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import doctorModel from '@/models/Doctor';
import { hashPassword } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import validator from 'validator';

// POST add new doctor (admin only)
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

    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const speciality = formData.get('speciality');
    const degree = formData.get('degree');
    const about = formData.get('about');
    const fees = formData.get('fees');
    const experience = formData.get('experience');
    const address = formData.get('address');
    const imageFile = formData.get('image');

    // Validation
    if (!name || !email || !password || !speciality || !degree || !about || !experience || !address) {
      return NextResponse.json(
        { success: false, message: 'Missing Details' },
        { status: 400 }
      );
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email' },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Please enter a strong password' },
        { status: 400 }
      );
    }

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return NextResponse.json(
        { success: false, message: 'Doctor already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Upload image to Cloudinary
    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadToCloudinary(buffer, 'smart-doctor/doctors');
      imageUrl = uploadResult.secure_url;
    }

    // Parse address
    const addressObj = typeof address === 'string' ? JSON.parse(address) : address;

    // Create doctor
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: addressObj,
      date: Date.now()
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return NextResponse.json({
      success: true,
      message: 'Doctor added'
    });

  } catch (error) {
    console.error('Add doctor error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
