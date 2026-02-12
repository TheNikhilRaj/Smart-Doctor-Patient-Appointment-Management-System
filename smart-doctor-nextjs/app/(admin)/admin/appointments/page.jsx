'use client';

import { useEffect, useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!aToken) {
      router.push('/admin/login');
    } else {
      getAllAppointments();
    }
  }, [aToken, router]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments && appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100'
              key={item._id}
            >
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <Image
                  className='w-8 h-8 rounded-full object-cover'
                  src={item.userData.image}
                  alt={item.userData.name}
                  width={32}
                  height={32}
                />
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <div className='flex items-center gap-2'>
                <Image
                  className='w-8 h-8 rounded-full bg-gray-200 object-cover'
                  src={item.docData.image}
                  alt={item.docData.name}
                  width={32}
                  height={32}
                />
                <p>{item.docData.name}</p>
              </div>
              <p>
                {currencySymbol}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              ) : item.isCompleted ? (
                <p className='text-green-500 text-xs font-medium'>Completed</p>
              ) : (
                <Image
                  onClick={() => cancelAppointment(item._id)}
                  className='w-10 cursor-pointer'
                  src='/assets/admin/cancel_icon.svg'
                  alt='Cancel'
                  width={40}
                  height={40}
                />
              )}
            </div>
          ))
        ) : (
          <div className='w-full text-center py-10 text-gray-500'>
            {aToken ? 'No appointments found' : 'Loading...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
