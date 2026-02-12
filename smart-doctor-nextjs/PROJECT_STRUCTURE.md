# Smart Doctor Next.js - Project Structure

```
smart-doctor-nextjs/
├── 📁 app/
│   │
│   ├── 📂 (patient)/                    # Patient Portal Routes
│   │   ├── layout.jsx                   # Patient layout with Navbar/Footer
│   │   ├── page.jsx                     # 🏠 Home page
│   │   ├── login/
│   │   │   └── page.jsx                 # 🔐 Login/Register
│   │   ├── doctors/
│   │   │   ├── page.jsx                 # 👨‍⚕️ Doctors list
│   │   │   └── [id]/
│   │   │       └── page.jsx             # 📋 Doctor details & booking
│   │   ├── appointments/
│   │   │   └── page.jsx                 # 📅 My appointments
│   │   └── profile/
│   │       └── page.jsx                 # 👤 User profile
│   │
│   ├── 📂 (admin)/                      # Admin Portal Routes
│   │   ├── layout.jsx                   # Admin layout with sidebar
│   │   └── admin/
│   │       ├── login/
│   │       │   └── page.jsx             # 🔒 Admin login
│   │       ├── dashboard/
│   │       │   └── page.jsx             # 📊 Dashboard
│   │       ├── add-doctor/
│   │       │   └── page.jsx             # ➕ Add doctor form
│   │       ├── doctors/
│   │       │   └── page.jsx             # 📝 Manage doctors
│   │       └── appointments/
│   │           └── page.jsx             # 📅 Manage appointments
│   │
│   ├── 📂 api/                          # API Routes (Backend)
│   │   ├── user/
│   │   │   ├── register/route.js        # POST /api/user/register
│   │   │   ├── login/route.js           # POST /api/user/login
│   │   │   └── profile/route.js         # GET/PUT /api/user/profile
│   │   ├── doctors/
│   │   │   ├── route.js                 # GET /api/doctors
│   │   │   └── [id]/route.js            # GET /api/doctors/:id
│   │   ├── appointments/
│   │   │   ├── book/route.js            # POST /api/appointments/book
│   │   │   ├── user/route.js            # GET /api/appointments/user
│   │   │   └── cancel/route.js          # POST /api/appointments/cancel
│   │   └── admin/
│   │       ├── login/route.js           # POST /api/admin/login
│   │       ├── dashboard/route.js       # GET /api/admin/dashboard
│   │       ├── appointments/route.js    # GET/POST /api/admin/appointments
│   │       └── doctors/
│   │           └── add/route.js         # POST /api/admin/doctors/add
│   │
│   ├── layout.jsx                       # 🌐 Root layout
│   ├── page.jsx                         # Root redirect page
│   └── globals.css                      # 🎨 Global styles
│
├── 📁 components/                       # Reusable Components
│   ├── Navbar.jsx                       # 🧭 Navigation bar
│   ├── Footer.jsx                       # 📍 Footer
│   └── DoctorCard.jsx                   # 👨‍⚕️ Doctor card component
│
├── 📁 context/                          # State Management
│   ├── AppContext.jsx                   # 🔄 Patient portal context
│   └── AdminContext.jsx                 # 🔄 Admin portal context
│
├── 📁 lib/                              # Utilities & Configs
│   ├── db.js                            # 🗄️ MongoDB connection
│   ├── auth.js                          # 🔐 JWT helpers
│   ├── cloudinary.js                    # ☁️ Cloudinary config
│   └── assets.js                        # 🖼️ Asset paths
│
├── 📁 models/                           # Database Models
│   ├── User.js                          # 👤 User schema
│   ├── Doctor.js                        # 👨‍⚕️ Doctor schema
│   └── Appointment.js                   # 📅 Appointment schema
│
├── 📁 public/                           # Static Assets
│   └── assets/                          # 🖼️ Images, icons, logos
│       ├── logo.svg
│       ├── doc1.png - doc15.png
│       ├── header_img.png
│       └── ...more assets
│
├── 📄 .env.local                        # 🔒 Environment variables
├── 📄 next.config.mjs                   # ⚙️ Next.js config
├── 📄 tailwind.config.js                # 🎨 Tailwind config
├── 📄 package.json                      # 📦 Dependencies
├── 📄 README.md                         # 📖 Documentation
├── 📄 CONVERSION_SUMMARY.md             # 📊 Conversion details
└── 📄 PROJECT_STRUCTURE.md              # 🗂️ This file
```

## 📊 Statistics

### Files Created
- **Pages**: 13 (7 patient + 6 admin)
- **API Routes**: 16 endpoints
- **Components**: 3 reusable
- **Context Providers**: 2
- **Models**: 3 Mongoose schemas
- **Utilities**: 4 helper modules
- **Config**: 5 configuration files

### Routes Overview

#### Patient Portal (7 routes)
```
/                    → Home page
/login               → Login/Register
/doctors             → Doctor listing
/doctors/[id]        → Doctor details
/appointments        → My appointments
/profile             → User profile
```

#### Admin Portal (6 routes)
```
/admin/login         → Admin login
/admin/dashboard     → Dashboard
/admin/add-doctor    → Add doctor
/admin/doctors       → Manage doctors
/admin/appointments  → Manage appointments
```

#### API Endpoints (16 endpoints)
```
User (4):
  POST   /api/user/register
  POST   /api/user/login
  GET    /api/user/profile
  PUT    /api/user/profile

Doctors (2):
  GET    /api/doctors
  GET    /api/doctors/[id]

Appointments (3):
  POST   /api/appointments/book
  GET    /api/appointments/user
  POST   /api/appointments/cancel

Admin (4):
  POST   /api/admin/login
  GET    /api/admin/dashboard
  POST   /api/admin/doctors/add
  GET    /api/admin/appointments
```

## 🎯 Key Features

✅ Server-Side Rendering (SSR)
✅ API Routes (Serverless)
✅ JWT Authentication
✅ MongoDB Integration
✅ Cloudinary Image Upload
✅ Razorpay Payment Gateway
✅ Responsive Design
✅ Toast Notifications
✅ Form Validation
✅ Protected Routes

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3.4
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **File Upload**: Cloudinary
- **Payment**: Razorpay
- **HTTP**: Axios
- **Notifications**: React Toastify
