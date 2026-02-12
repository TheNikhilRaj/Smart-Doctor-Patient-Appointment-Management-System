'use client';

import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContextProvider from "@/context/AppContext";
import AdminContextProvider from "@/context/AdminContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Smart Doctor - Patient Appointment Management System</title>
        <meta name="description" content="Smart Doctor Patient Appointment Management System helps patients find trusted doctors, book appointments, and manage care with ease." />
      </head>
      <body className="antialiased">
        <AdminContextProvider>
          <AppContextProvider>
            {children}
            <ToastContainer />
          </AppContextProvider>
        </AdminContextProvider>
      </body>
    </html>
  );
}
