'use client';

import { AppContext } from '@/context/AppContext';
import { AdminContext } from '@/context/AdminContext';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { token, setToken, userData } = useContext(AppContext);
  const { aToken, setAToken } = useContext(AdminContext);

  const [showMenu, setShowMenu] = useState(false);

  const isAdminRoute = pathname?.startsWith('/admin');

  const logout = () => {
    if (isAdminRoute && aToken) {
      setAToken('');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('aToken');
      }
      toast.success("Logout successfully");
      router.push('/admin/login');
    } else {
      setToken(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      toast.success("Logout successfully");
      router.push('/login');
    }
    setShowMenu(false);
  };

  if (isAdminRoute) {
    return (
      <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
          <Image 
            className='w-36 sm:w-40 cursor-pointer' 
            src='/assets/logo.svg' 
            alt='Logo' 
            width={160} 
            height={40}
            onClick={() => router.push('/admin')}
          />
          <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
            Admin
          </p>
        </div>
        {aToken && (
          <button 
            onClick={logout} 
            className='bg-indigo-600 text-white text-sm px-10 py-2 rounded-full cursor-pointer'
          >
            Logout
          </button>
        )}
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>
      <Image 
        onClick={() => router.push('/')} 
        className='w-44 cursor-pointer' 
        src='/assets/logo.svg' 
        alt='Logo' 
        width={176} 
        height={44}
      />
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <Link href='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-indigo-600 w-3/5 m-auto hidden'/>
        </Link>
        <Link href='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-indigo-600 w-3/5 m-auto hidden'/>
        </Link>
        <Link href='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-indigo-600 w-3/5 m-auto hidden'/>
        </Link>
        <Link href='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-indigo-600 w-3/5 m-auto hidden'/>
        </Link>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token && userData
          ? <div className='flex items-center gap-2 cursor-pointer group relative'>
              <Image 
                className='w-8 h-8 rounded-full' 
                src={userData.image} 
                alt='Profile' 
                width={32} 
                height={32}
              />
              <Image 
                className='w-2.5' 
                src='/assets/dropdown_icon.svg' 
                alt='Dropdown' 
                width={10} 
                height={10}
              />
              <div className='absolute top-10 right-0 text-l font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => router.push('/my-profile')} className='hover:text-black cursor-pointer'>
                    My Profile
                  </p>
                  <p onClick={() => router.push('/my-appointments')} className='hover:text-black cursor-pointer'>
                    My Appointments
                  </p>
                  <p onClick={logout} className='hover:text-black cursor-pointer'>
                    Logout
                  </p>
                </div>
              </div>
            </div>
          : <button 
              onClick={() => router.push('/login')} 
              className='bg-indigo-600 text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer'
            >
              Create account
            </button>
        }

        <Image 
          onClick={() => setShowMenu(true)} 
          className='w-6 md:hidden cursor-pointer' 
          src='/assets/menu_icon.svg' 
          alt='Menu' 
          width={24} 
          height={24}
        />

        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between mx-[5%] mt-2'>
            <Image className='w-36' src='/assets/logo.svg' alt='Logo' width={144} height={36} />
            <Image 
              className='w-7 cursor-pointer' 
              onClick={() => setShowMenu(false)} 
              src='/assets/cross_icon.png' 
              alt='Close' 
              width={28} 
              height={28}
            />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-10 px-5 text-lg font-medium'>
            <Link onClick={() => setShowMenu(false)} href='/'>
              <p className='px-4 py-2 rounded inline-block'>HOME</p>
            </Link>
            <Link onClick={() => setShowMenu(false)} href='/doctors'>
              <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p>
            </Link>
            <Link onClick={() => setShowMenu(false)} href='/about'>
              <p className='px-4 py-2 rounded inline-block'>ABOUT</p>
            </Link>
            <Link onClick={() => setShowMenu(false)} href='/contact'>
              <p className='px-4 py-2 rounded inline-block'>CONTACT</p>
            </Link>
            {token && userData && (
              <>
                <Link onClick={() => setShowMenu(false)} href='/my-profile'>
                  <p className='px-4 py-2 rounded inline-block'>My Profile</p>
                </Link>
                <Link onClick={() => setShowMenu(false)} href='/my-appointments'>
                  <p className='px-4 py-2 rounded inline-block'>My Appointments</p>
                </Link>
                <p onClick={logout} className='px-4 py-2 rounded inline-block cursor-pointer'>
                  Logout
                </p>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
