'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        <div>
          <Image className='mb-5 w-40' src='/assets/logo.svg' alt='Logo' width={160} height={40} />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Smart Doctor Patient Appointment Management System helps patients find trusted doctors, 
            book appointments, and manage care with ease. Doctors and admins can keep schedules accurate, 
            handle appointments, and deliver better outcomes.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li 
              onClick={() => { router.push('/'); scrollToTop(); }} 
              className='cursor-pointer hover:text-black'
            >
              Home
            </li>
            <li 
              onClick={() => { router.push('/about'); scrollToTop(); }} 
              className='cursor-pointer hover:text-black'
            >
              About us
            </li>
            <li 
              onClick={() => { router.push('/contact'); scrollToTop(); }} 
              className='cursor-pointer hover:text-black'
            >
              Contact us
            </li>
            <li className='cursor-pointer hover:text-black'>
              Privacy policy
            </li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-98765-43210</li>
            <li>support@smartdoctorapp.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright © 2026 - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
