'use client';

import { useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const AdminNavbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const router = useRouter();

  const logout = () => {
    setAToken('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('aToken');
    }
    router.push('/admin/login');
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <Image className='w-36 sm:w-40 cursor-pointer' src='/assets/admin/admin_logo.svg' alt='Admin Logo' width={160} height={40} />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Admin</p>
      </div>
      {aToken && (
        <button onClick={logout} className='bg-indigo-600 text-white text-sm px-10 py-2 rounded-full cursor-pointer'>
          Logout
        </button>
      )}
    </div>
  );
};

const AdminSidebar = () => {
  const { aToken } = useContext(AdminContext);
  const pathname = usePathname();

  if (!aToken) return null;

  const isActive = (path) => pathname === path;

  return (
    <div className='min-h-screen bg-white border-r'>
      <ul className='text-[#515151] mt-5'>
        <Link 
          href='/admin/dashboard'
          className={`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
            isActive('/admin/dashboard') ? 'bg-[#F2F3FF] border-r-4 border-indigo-600' : ''
          }`}
        >
          <Image src='/assets/admin/home_icon.svg' alt='Dashboard' width={24} height={24} />
          <p className='hidden md:block'>Dashboard</p>
        </Link>

        <Link 
          href='/admin/appointments'
          className={`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
            isActive('/admin/appointments') ? 'bg-[#F2F3FF] border-r-4 border-indigo-600' : ''
          }`}
        >
          <Image src='/assets/admin/appointment_icon.svg' alt='Appointments' width={24} height={24} />
          <p className='hidden md:block'>Appointments</p>
        </Link>

        <Link 
          href='/admin/add-doctor'
          className={`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
            isActive('/admin/add-doctor') ? 'bg-[#F2F3FF] border-r-4 border-indigo-600' : ''
          }`}
        >
          <Image src='/assets/admin/add_icon.svg' alt='Add Doctor' width={24} height={24} />
          <p className='hidden md:block'>Add Doctor</p>
        </Link>

        <Link 
          href='/admin/doctors'
          className={`flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${
            isActive('/admin/doctors') ? 'bg-[#F2F3FF] border-r-4 border-indigo-600' : ''
          }`}
        >
          <Image src='/assets/admin/people_icon.svg' alt='Doctors List' width={24} height={24} />
          <p className='hidden md:block'>Doctors List</p>
        </Link>
      </ul>
    </div>
  );
};

export default function AdminLayout({ children }) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminNavbar />
      <div className='flex'>
        <AdminSidebar />
        <main className='flex-1'>
          {children}
        </main>
      </div>
    </div>
  );
}
