'use client';

import { useEffect, useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const router = useRouter();

  useEffect(() => {
    if (!aToken) {
      router.push('/admin/login');
    } else {
      getAllDoctors();
    }
  }, [aToken, router]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'
              key={index}
            >
              <Image
                className='bg-indigo-50 group-hover:bg-indigo-600 transition-all duration-500 w-full h-48 object-cover'
                src={item.image}
                alt={item.name}
                width={224}
                height={192}
              />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='flex mt-2 items-center gap-1 text-sm'>
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type='checkbox'
                    checked={item.available}
                    className='cursor-pointer'
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='w-full text-center py-10 text-gray-500'>
            {aToken ? 'No doctors found' : 'Loading...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
