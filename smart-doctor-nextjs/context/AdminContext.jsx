'use client';

import { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
   
    const [aToken, setAToken] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
   
    const backendUrl = process.env.NEXT_PUBLIC_APP_URL || '';

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {
                headers: {aToken}
            });
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {
                headers: {aToken}
            })
            if (data.success) {
                toast.success(data.message);
                getAllDoctors()
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {
                headers: {aToken}
            });
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {
                headers: {aToken}
            })
            
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {
                headers: {aToken}
            })
            
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem('aToken');
            if (storedToken) {
                setAToken(storedToken);
            }
        }
    }, []);

    useEffect(() => {
        if (aToken) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('aToken', aToken);
            }
        } else {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('aToken');
            }
        }
    }, [aToken]);
    
    const value = {
        aToken, 
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        getAllAppointments, 
        appointments, 
        setAppointments,
        cancelAppointment,
        dashData, 
        getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
