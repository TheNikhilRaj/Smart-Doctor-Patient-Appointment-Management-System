import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/*   ********* Left Section ****** */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Smart Doctor Patient Appointment Management System helps patients find trusted doctors, book appointments, and manage care with ease. Doctors and admins can keep schedules accurate, handle appointments, and deliver better outcomes.</p>
            </div>

            {/*   ********* Center Section ****** */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li onClick={() =>{navigate('/'); scrollTo(0,0)}} className='cursor-pointer'>Home</li>
                    <li onClick={() =>{navigate('/about'); scrollTo(0,0)}} className='cursor-pointer'>About us</li>
                    <li onClick={() =>{navigate('/contact'); scrollTo(0,0)}} className='cursor-pointer'>Contact us</li>
                    <li className='cursor-pointer'>Privacy policy</li>
                </ul>

            </div>

            {/*   ********* Right Section ****** */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-98765-43210</li>
                    <li>support@smartdoctorapp.com</li>
                </ul>
                
            </div>
        </div>

        {/* ******* Copyright Section *********  */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright © 2026 - All Right Reserved.</p>
        </div>
      
    </div>
  )
}

export default Footer;
