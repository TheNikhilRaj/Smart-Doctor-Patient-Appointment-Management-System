# 🏥 Smart Doctor Patient Appointment Management System

A comprehensive full-stack healthcare appointment management platform built with the MERN stack. This system enables patients to browse doctors, book appointments, make payments, while providing administrative tools for managing doctors, appointments, and schedules.

![JavaScript](https://img.shields.io/badge/JavaScript-99%25-yellow)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Patient Portal (Frontend)
- 🔍 Browse and search doctors by specialty
- 📅 Book appointments with available doctors
- 💳 Secure payment processing via Razorpay
- 👤 User profile management
- 📜 View appointment history
- ✅ Real-time appointment status updates

### Admin Portal
- 👨‍⚕️ Add, edit, and manage doctor profiles
- 📊 View dashboard with analytics
- 🗓️ Manage appointment schedules
- 🔐 Secure admin authentication
- 📸 Image uploads via Cloudinary
- ⚙️ Doctor availability management

### Backend API
- 🔒 JWT-based authentication
- 🛡️ Secure password hashing with bcrypt
- 📁 File upload handling with Multer
- ☁️ Cloud storage integration (Cloudinary)
- 💰 Payment gateway integration (Razorpay)
- 🗃️ MongoDB database with Mongoose ODM

## 🛠️ Tech Stack

### Frontend & Admin
- **Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Styling:** Tailwind CSS 4.1.8
- **Routing:** React Router DOM 7.6.2
- **HTTP Client:** Axios
- **Notifications:** React Toastify

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.1.0
- **Database:** MongoDB with Mongoose 8.16.0
- **Authentication:** JSON Web Tokens (JWT) 9.0.2
- **Password Security:** bcrypt 6.0.0
- **File Upload:** Multer 2.0.1
- **Cloud Storage:** Cloudinary 2.7.0
- **Payment Gateway:** Razorpay 2.9.6
- **Validation:** Validator 13.15.15

## 📁 Project Structure

```
Smart-Doctor-Patient-Appointment-Management-System/
│
├── frontend/                 # Patient web application
│   ├── src/
│   │   ├── assets/          # Images, icons, static files
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # Context API for state management
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── README.md
│
├── admin/                    # Admin & doctor portal
│   ├── src/
│   │   ├── assets/          # Images, icons, static files
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # Context API for state management
│   │   ├── pages/           # Admin page components
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── README.md
│
├── backend/                  # REST API server
│   ├── config/              # Database & Cloudinary config
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth & validation middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   │   ├── adminRoute.js   # Admin endpoints
│   │   ├── doctorRoute.js  # Doctor endpoints
│   │   └── userRoute.js    # User endpoints
│   ├── Server.js            # Main server file
│   ├── package.json
│   └── README.md
│
└── README.md                 # This file
```

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Cloudinary Account** (for image uploads)
- **Razorpay Account** (for payment processing)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TheNikhilRaj/Smart-Doctor-Patient-Appointment-Management-System.git
cd Smart-Doctor-Patient-Appointment-Management-System
```

### 2. Install Dependencies

Install dependencies for all three applications:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install admin dependencies
cd ../admin
npm install
```

## 🔐 Environment Variables

### Backend Configuration

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=4000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartdoctor

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Admin Credentials
ADMIN_EMAIL=admin@smartdoctorapp.com
ADMIN_PASSWORD=Admin@123

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
```

### Frontend Configuration

Create a `.env` file in the `frontend/` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Admin Configuration

Create a `.env` file in the `admin/` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## ▶️ Running the Application

### Start the Backend Server

```bash
cd backend
npm run server
```

The backend API will start on **http://localhost:4000**

### Start the Frontend (Patient Portal)

```bash
cd frontend
npm run dev
```

The frontend will start on **http://localhost:5173**

### Start the Admin Portal

```bash
cd admin
npm run dev
```

The admin portal will start on **http://localhost:5174**

## 🔗 API Endpoints

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /add-doctor` - Add new doctor
- `GET /appointments` - Get all appointments
- `POST /cancel-appointment` - Cancel appointment
- `GET /dashboard` - Get dashboard statistics

### Doctor Routes (`/api/doctor`)
- `POST /login` - Doctor login
- `GET /appointments` - Get doctor's appointments
- `POST /complete-appointment` - Mark appointment as completed
- `POST /cancel-appointment` - Cancel appointment
- `GET /dashboard` - Get doctor dashboard
- `POST /update-profile` - Update doctor profile

### User Routes (`/api/user`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `POST /update-profile` - Update user profile
- `POST /book-appointment` - Book appointment
- `GET /appointments` - Get user appointments
- `POST /cancel-appointment` - Cancel appointment
- `POST /payment-razorpay` - Process payment

## 🔄 How the Three Apps Connect

```
┌─────────────────┐
│   Frontend      │──┐
│ (Patient App)   │  │
└─────────────────┘  │
                     │    ┌──────────────────┐
                     ├───▶│   Backend API    │
                     │    │  (Port 4000)     │
┌─────────────────┐  │    └──────────────────┘
│   Admin Portal  │──┘            │
│ (Admin & Doc)   │               │
└─────────────────┘               ▼
                          ┌──────────────┐
                          │   MongoDB    │
                          └──────────────┘
```

1. **Backend** exposes REST API endpoints at `http://localhost:4000`
2. **Frontend** and **Admin** apps communicate with backend via Axios
3. All apps use environment variables to configure backend URL
4. Backend handles authentication, database operations, and third-party integrations

## 📝 Key Implementation Details

### Authentication Flow
1. User/Admin/Doctor logs in with credentials
2. Backend validates and returns JWT token
3. Token stored in frontend/admin (localStorage/context)
4. Token sent with subsequent requests in Authorization header
5. Backend middleware validates token for protected routes

### Payment Flow
1. User books appointment
2. Frontend initiates Razorpay payment
3. Payment verified on backend
4. Appointment confirmed upon successful payment

### Image Upload Flow
1. Admin uploads doctor image
2. Multer handles file on backend
3. Image uploaded to Cloudinary
4. Cloudinary URL stored in MongoDB
5. Frontend displays image via URL

## 🎨 Features in Detail

### Patient Features
- **Doctor Search:** Filter doctors by specialty, location, availability
- **Appointment Booking:** Select date and time slots
- **Payment Integration:** Secure Razorpay payment gateway
- **Profile Management:** Update personal information
- **Appointment History:** View past and upcoming appointments

### Admin Features
- **Doctor Management:** CRUD operations for doctor profiles
- **Appointment Overview:** View all appointments system-wide
- **Dashboard Analytics:** Statistics and insights
- **Image Uploads:** Doctor profile pictures via Cloudinary

### Doctor Features
- **Appointment Management:** View and manage patient appointments
- **Profile Updates:** Update availability and profile information
- **Dashboard:** Overview of appointments and earnings

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ CORS protection
- ✅ Input validation
- ✅ Environment variable protection
- ✅ Secure payment processing

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

- GitHub: [@TheNikhilRaj](https://github.com/TheNikhilRaj)

## 🙏 Acknowledgments

- React Team for the amazing framework
- MongoDB for the flexible database
- Cloudinary for image hosting
- Razorpay for payment processing
- All contributors and supporters

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

⭐ If you found this project helpful, please give it a star!

**Made with ❤️ by TheNikhilRaj**
