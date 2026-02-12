'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppContext } from '@/context/AppContext';
import { assets, specialityData } from '@/lib/assets';

export default function Home() {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      {/* Header Section */}
      <div className='flex flex-col md:flex-row flex-wrap bg-indigo-600 rounded-lg px-6 md:px-10 lg:px-20'>
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
          <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br /> With Trusted Doctors
          </p>
          <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
            <Image className='w-28' src={assets.group_profiles} alt="Group profiles" width={112} height={112} />
            <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free</p>
          </div>
          <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 '>
            Book Appointment <Image className='w-3' src={assets.arrow_icon} alt="Arrow" width={12} height={12} />
          </a>
        </div>
        <div className='md:w-1/2 relative'>
          <Image className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="Header" width={600} height={600} priority />
        </div>
      </div>

      {/* Speciality Menu Section */}
      <div className='flex flex-col items-center gap-8 py-16 text-gray-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Find by Speciality</h1>
        <p className='sm:w-1/3 text-center text-sm '>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex sm:justify-center gap-4 w-full pt-6 overflow-scroll'>
          {specialityData.map((item, index) => (
            <Link 
              onClick={() => scrollTo(0,0)} 
              className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 ' 
              key={index} 
              href={`/doctors?speciality=${item.speciality}`}
            >
              <Image className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} width={96} height={96} />
              <p>{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Doctors Section */}
      <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 gap-y-6 px-3 sm:px-0'>
          {doctors.slice(0,10).map((item, index) => (
            <Link 
              href={`/doctors/${item._id}`} 
              onClick={() => scrollTo(0,0)} 
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ' 
              key={index}
            >
              <Image className='bg-blue-50 w-full' src={item.image} alt={item.name} width={200} height={200} />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500' } `}>
                  <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500' }  rounded-full`}></p>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href='/doctors' onClick={() => scrollTo(0,0)} className='bg-blue-100 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer'>
          more
        </Link>
      </div>

      {/* Banner Section */}
      <div className='flex bg-indigo-600 rounded-lg px-8 sm:px-10 md:px-12 my-20 md:mx-10  '>
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
          <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
            <p>Book Appointment</p>
            <p className='mt-4'>With 100+ Trusted Doctors</p>
          </div>
          <Link href='/login' onClick={() => scrollTo(0,0)} className='inline-block bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 cursor-pointer'>
            Create account
          </Link>
        </div>
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
          <Image className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="Appointment" width={370} height={370} />
        </div>
      </div>
    </div>
  );
}
