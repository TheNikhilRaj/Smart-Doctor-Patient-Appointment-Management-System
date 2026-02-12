import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import userModel from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

// GET user profile
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

    // Get user data
    const userData = await userModel.findById(user.id).select('-password');
    
    if (!userData) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      userData
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT update user profile
export async function PUT(request) {
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

    const formData = await request.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const dob = formData.get('dob');
    const gender = formData.get('gender');
    const addressLine1 = formData.get('address[line1]') || formData.get('addressLine1');
    const addressLine2 = formData.get('address[line2]') || formData.get('addressLine2');
    const imageFile = formData.get('image');

    const updateData = { name, phone, dob, gender };

    // Handle address
    if (addressLine1 || addressLine2) {
      updateData.address = {
        line1: addressLine1 || '',
        line2: addressLine2 || ''
      };
    }

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadResult = await uploadToCloudinary(buffer, 'smart-doctor/users');
      updateData.image = uploadResult.secure_url;
    }

    // Update user
    await userModel.findByIdAndUpdate(user.id, updateData);

    return NextResponse.json({
      success: true,
      message: 'Profile Updated'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
