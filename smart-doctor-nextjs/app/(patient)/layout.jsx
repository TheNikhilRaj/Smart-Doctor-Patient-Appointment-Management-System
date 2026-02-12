'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PatientLayout({ children }) {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
