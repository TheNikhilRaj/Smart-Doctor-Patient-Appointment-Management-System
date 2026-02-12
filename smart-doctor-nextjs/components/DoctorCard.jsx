'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DoctorCard = ({ doctor }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/appointment/${doctor._id}`);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div 
      onClick={handleClick} 
      className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
    >
      <Image 
        className='bg-blue-50 w-full' 
        src={doctor.image} 
        alt={doctor.name}
        width={200}
        height={200}
      />
      <div className='p-4'>
        <div className={`flex items-center gap-2 text-sm text-center ${doctor.available ? 'text-green-500' : 'text-gray-500'}`}>
          <p className={`w-2 h-2 ${doctor.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
          <p>{doctor.available ? 'Available' : 'Not Available'}</p>
        </div>
        <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
        <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
