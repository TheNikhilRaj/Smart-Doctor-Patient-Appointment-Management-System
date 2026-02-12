# Next.js Frontend Structure

This document describes the frontend structure created for the Smart Doctor Next.js application.

## Created Files

### 1. Context Providers

#### `context/AppContext.jsx`
- **Purpose**: Client-side context provider for patient/user functionality
- **Features**:
  - User authentication state management
  - Doctors data fetching and caching
  - User profile data loading
  - Token management with localStorage
  - API calls using axios
  - Toast notifications for user feedback
- **Exports**: `AppContext`, `AppContextProvider`

#### `context/AdminContext.jsx`
- **Purpose**: Client-side context provider for admin functionality
- **Features**:
  - Admin authentication (aToken)
  - Doctor management (get all, change availability)
  - Appointment management (get all, cancel)
  - Dashboard data fetching
  - Token management with localStorage
- **Exports**: `AdminContext`, `AdminContextProvider`

### 2. Layout

#### `app/layout.jsx`
- **Purpose**: Root layout component for the entire application
- **Features**:
  - Wraps app with both AdminContextProvider and AppContextProvider
  - Includes ToastContainer for notifications
  - Sets up HTML metadata (title, description)
  - Uses Tailwind's antialiased class for better fonts
- **Note**: Client component due to context usage

### 3. Components

#### `components/Navbar.jsx`
- **Purpose**: Responsive navigation bar that adapts for patient and admin routes
- **Features**:
  - Detects admin routes using pathname
  - Different UI for admin vs patient areas
  - User dropdown menu (My Profile, My Appointments, Logout)
  - Mobile menu with hamburger icon
  - Uses Next.js Image and Link components
  - Context-aware (AppContext for users, AdminContext for admins)

#### `components/Footer.jsx`
- **Purpose**: Application footer with links and contact info
- **Features**:
  - Three-column responsive layout
  - Company information and description
  - Navigation links (Home, About, Contact, Privacy Policy)
  - Contact information
  - Copyright notice
  - Uses Next.js router for navigation

#### `components/DoctorCard.jsx`
- **Purpose**: Reusable card component for displaying doctor information
- **Features**:
  - Doctor image, name, and speciality
  - Availability indicator (green/gray dot)
  - Hover animation (translate-y effect)
  - Click navigation to appointment booking
  - Uses Next.js Image component
  - Responsive design

## Key Design Decisions

### 1. Next.js 14 App Router
- Uses App Router conventions (not Pages Router)
- Client components marked with 'use client' directive
- Server-side API routes in `/app/api/*`

### 2. State Management
- Context API for global state (no Redux)
- Two separate contexts (AppContext, AdminContext)
- localStorage for token persistence

### 3. Styling
- Tailwind CSS utility classes
- Responsive design (mobile-first)
- Consistent color scheme (indigo primary)

### 4. API Integration
- Axios for HTTP requests
- Environment variable for backend URL: `NEXT_PUBLIC_APP_URL`
- Error handling with toast notifications

### 5. Image Handling
- Next.js Image component for optimization
- Assets in `/public/assets/` directory
- SVG for icons, PNG for photos

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_APP_URL=http://localhost:5000
```

## Usage Example

### Using AppContext in a component:
```jsx
'use client';
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

export default function MyComponent() {
  const { doctors, token, userData } = useContext(AppContext);
  // Use context values...
}
```

### Using DoctorCard component:
```jsx
import DoctorCard from '@/components/DoctorCard';

export default function DoctorsList() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {doctors.map(doctor => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
}
```

## Dependencies

- `next`: 14.1.0
- `react`: ^18
- `react-dom`: ^18
- `axios`: ^1.13.5
- `react-toastify`: ^11.0.5
- `tailwindcss`: 3.4

## Build & Development

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Security Considerations

1. **Token Storage**: Tokens stored in localStorage (client-side only)
2. **Server-Side Checks**: Always verify tokens on server
3. **Environment Variables**: Backend URL from environment variable
4. **XSS Protection**: React escapes values by default
5. **CSRF**: API routes should implement CSRF protection

## Future Enhancements

1. Add loading states to contexts
2. Implement error boundaries
3. Add request caching/SWR
4. Add TypeScript types
5. Implement optimistic UI updates
6. Add unit tests for components
7. Add E2E tests
