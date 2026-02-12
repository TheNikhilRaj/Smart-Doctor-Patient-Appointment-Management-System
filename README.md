# Smart Doctor Patient Appointment Management System

Full-stack appointment platform with three apps:

- Frontend: Patient web app
- Admin: Admin + doctor portal
- Backend: REST API with MongoDB, Cloudinary, Razorpay

## Project Structure

- frontend
- admin
- backend

## Backend Setup

Create backend/.env:

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

Run the backend:

1. cd backend
2. npm install
3. npm run server

## Frontend Setup

Create frontend/.env:

VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

Run the frontend:

1. cd frontend
2. npm install
3. npm run dev

## Admin Setup

Create admin/.env:

VITE_BACKEND_URL=http://localhost:4000

Run the admin panel:

1. cd admin
2. npm install
3. npm run dev

## How The Three Apps Connect

1. Start the backend first. It exposes the API at http://localhost:4000.
2. Set VITE_BACKEND_URL in both frontend and admin to the backend URL.
3. Start frontend and admin in separate terminals. Each app calls the backend API for auth, doctors, and appointments.

## Notes

- Admin login uses ADMIN_EMAIL and ADMIN_PASSWORD from backend/.env.
- Razorpay payment in the frontend uses VITE_RAZORPAY_KEY_ID and the backend uses RAZORPAY_KEY_SECRET.
