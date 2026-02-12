# Smart Doctor Backend

REST API for Smart Doctor Patient Appointment Management System. Handles authentication, doctors, appointments, payments, and media uploads.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Cloudinary
- Razorpay

## Environment Variables

Create a .env file in this folder:

PORT=4000
MONGODB_URI=mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@smartdoctorapp.com
ADMIN_PASSWORD=Admin@123
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR

## Run Locally

1. Install dependencies
   npm install
2. Start the API (nodemon)
   npm run server

The API runs on http://localhost:4000 by default.
