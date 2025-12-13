import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { useParams } from 'react-router';
import Loading from '../../../components/Loading/Loading';


const Payment = () => {
    const {ticketId}=useParams()
    const axiosSecure =useAxiosSecure()
    const { isLoading,data: bookings=[]}=useQuery({
        queryKey:['bookings',ticketId],
        queryFn:async()=>{
            const res =await axiosSecure.get(`/bookings/${ticketId}`)
            return res.data;
        }
    })

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h2>Please pay  ৳{bookings.total_price} for : {bookings.ticket_title}</h2>

            <h2>name {bookings.from}</h2>
        </div>
    );
};

export default Payment;