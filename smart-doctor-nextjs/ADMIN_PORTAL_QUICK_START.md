# Admin Portal Quick Start Guide

## Access Admin Portal

Navigate to: `http://localhost:3000/admin/login`

## Default Credentials

```
Email: admin@smartdoctorapp.com
Password: Admin@123
```

## Admin Portal Routes

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/admin/login` | Admin login page | No |
| `/admin/dashboard` | View statistics and recent appointments | Yes |
| `/admin/add-doctor` | Add new doctor to system | Yes |
| `/admin/doctors` | View all doctors and toggle availability | Yes |
| `/admin/appointments` | View all appointments and cancel if needed | Yes |

## Page Features

### Dashboard (`/admin/dashboard`)
- **Statistics Cards**: Shows count of doctors, appointments, and patients
- **Latest Bookings**: Lists recent appointments with ability to cancel
- **Actions**: Click cancel icon to cancel an active appointment

### Add Doctor (`/admin/add-doctor`)
**Required Fields:**
- Doctor Image (click to upload)
- Name
- Email
- Password
- Experience (dropdown: 1-12 years)
- Fees (number)
- Speciality (dropdown: General physician, Gynecologist, etc.)
- Education/Degree
- Address Line 1
- Address Line 2
- About Doctor (text area)

**Steps:**
1. Click on image placeholder to upload doctor photo
2. Fill in all required fields
3. Click "Add Doctor" button
4. Success message will appear and form will reset

### Doctors List (`/admin/doctors`)
- View all registered doctors in grid layout
- Each card shows: image, name, speciality, availability status
- **Toggle Availability**: Click checkbox to enable/disable doctor
- Hover over cards for visual effect

### All Appointments (`/admin/appointments`)
- Table view of all appointments
- **Columns**: #, Patient (with image), Age, Date & Time, Doctor (with image), Fees, Actions
- **Status Colors**:
  - Red: Cancelled
  - Green: Completed
  - Cancel icon: Active (click to cancel)
- Responsive: Stacks on mobile devices

## Navigation

**Sidebar Menu:**
- 🏠 Dashboard
- 📅 Appointments
- ➕ Add Doctor
- 👥 Doctors List

**Top Bar:**
- Admin logo and badge
- Logout button (right side)

## Protected Routes

All admin pages except login are protected:
- If not logged in → Redirects to `/admin/login`
- Token stored in localStorage
- Token persists across page refreshes

## Logout

Click "Logout" button in top-right corner:
- Clears authentication token
- Redirects to login page
- Must re-login to access admin pages

## API Endpoints Used

The admin portal integrates with these API endpoints:
- `POST /api/admin/login` - Authentication
- `GET /api/admin/dashboard` - Dashboard statistics
- `POST /api/admin/add-doctor` - Add new doctor
- `POST /api/admin/all-doctors` - Get all doctors
- `POST /api/admin/change-availability` - Toggle doctor availability
- `GET /api/admin/appointments` - Get all appointments
- `POST /api/admin/cancel-appointment` - Cancel appointment

## Notifications

Success/Error messages appear as toast notifications:
- ✅ Green: Success (e.g., "Doctor added successfully")
- ❌ Red: Error (e.g., "Image not selected")
- 🔵 Info: Information messages

## Tips

1. **Image Upload**: Click on the circular placeholder to select image
2. **Form Validation**: All fields are required - form won't submit without them
3. **Loading States**: Buttons show loading text during API calls
4. **Responsive Design**: Works on desktop, tablet, and mobile
5. **Keyboard Navigation**: Use Tab to navigate through form fields

## Troubleshooting

### Cannot Login
- Verify backend API is running
- Check network tab for API errors
- Ensure correct credentials

### Images Not Loading
- Check if images are uploaded to server
- Verify image URLs in API responses
- Check browser console for errors

### Data Not Showing
- Ensure you're logged in (check for token)
- Verify backend API endpoints are working
- Check browser console for errors
- Refresh the page

### Protected Route Redirects
- This is normal behavior if not authenticated
- Login first to access admin pages
- Token expires after certain period (configured in backend)

## Development

**Run Development Server:**
```bash
cd smart-doctor-nextjs
npm run dev
```

**Build for Production:**
```bash
npm run build
npm start
```

**Environment Variables:**
- `NEXT_PUBLIC_APP_URL`: Backend API URL
- Configure in `.env.local` file

## File Structure

```
app/(admin)/
├── layout.jsx              # Shared layout with Navbar and Sidebar
└── admin/
    ├── login/page.jsx      # Login page
    ├── dashboard/page.jsx  # Dashboard
    ├── add-doctor/page.jsx # Add doctor form
    ├── doctors/page.jsx    # Doctors list
    └── appointments/page.jsx # Appointments list
```

## State Management

Uses React Context API:
- **AdminContext**: Manages admin authentication and data
- **AppContext**: Provides utility functions (date formatting, age calculation)

## Styling

Built with Tailwind CSS:
- Primary color: Indigo
- Responsive breakpoints
- Custom hover effects
- Shadow and border utilities

## Next Steps

1. Start the development server
2. Navigate to `/admin/login`
3. Login with default credentials
4. Explore the admin dashboard
5. Test adding a doctor
6. View doctors list
7. Check appointments
8. Test canceling an appointment

## Support

For issues or questions:
- Check browser console for errors
- Review API response in Network tab
- Verify backend is running
- Check this documentation

---

**Last Updated**: February 2024  
**Version**: 1.0.0
