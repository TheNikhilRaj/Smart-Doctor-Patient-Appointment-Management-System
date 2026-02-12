'use client';

import { useState, useContext, useEffect } from 'react';
import { AdminContext } from '@/context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@smartdoctorapp.com');
  const [password, setPassword] = useState('Admin@123');
  const [isLoading, setIsLoading] = useState(false);

  const { setAToken, backendUrl, aToken } = useContext(AdminContext);
  const router = useRouter();

  useEffect(() => {
    if (aToken) {
      router.push('/admin/dashboard');
    }
  }, [aToken, router]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
      
      if (data.success) {
        setAToken(data.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('aToken', data.token);
        }
        toast.success('Login successful');
        router.push('/admin/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-indigo-600'>Admin</span> Login
        </p>
        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='bg-indigo-600 text-white w-full py-2 rounded-md text-base cursor-pointer hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default AdminLogin;
