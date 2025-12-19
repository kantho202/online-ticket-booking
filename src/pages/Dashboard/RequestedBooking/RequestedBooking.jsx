import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';
import { FaTicket } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import Loader from '../../../components/Loading/Loading';

const RequestedBooking = () => {
    // const { user: booking } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: bookings = [] ,isLoading} = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings')
            return res.data;
        }
    })
    if(isLoading){
        return <Loader></Loader>
    }
    const updateBookingStatus = (id, status) => {

        Swal.fire({
            title: `Are you sure request booking ${status}?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${status}!`
        }).then((result) => {
            if (result.isConfirmed) {

                const updateInfo = { status }
                axiosSecure.patch(`/bookings/${id}`, updateInfo)
                    .then(res => {
                        console.log(res)
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Requested bookings status is set ${status}`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })


            }
        });

    }
    const handleApproved = (id) => {
        updateBookingStatus(id, 'accepted')
        console.log(id)


    }
    const handleRejection = (id) => {
        updateBookingStatus(id, 'rejected')
    }

    // const handlePayment=async(ticket)=>{
    //     const paymentInfo={
    //         total_price:ticket.total_price,
    //         ticketId:ticket._id,
    //         // email:bookings.email,
    //         ticket_title:ticket.ticket_title
    //     }
    //     const res =await axiosSecure.post('/create-checkout-session',paymentInfo)
    //     console.log(res);
    //     window.location.assign(res.data.url);
    // }
    return (
        // <div>
        //     <h1>bookings{bookings.length}</h1>
        //       <div className='bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100'>

        //     <div className="overflow-x-auto">
        //         <table className="table table-zebra">
        //             {/* head */}
        //             <thead>
        //                 <tr className='text-center'>
        //                     <th>#</th>

        //                     <th>Name</th>
        //                     <th>Email</th>
        //                     <th>Ticket Title</th>
        //                     <th>Quantity</th>
        //                     <th>Amount</th>
        //                     <th>Action</th>
        //                 </tr>
        //             </thead>
        //             <tbody className='text-center'>
        //                 {
        //                     bookings.map((booking, i) => <tr key={booking._id}>
        //                         <th>{i + 1}</th>
        //                         <td className='font-medium text-base'>{user.displayName}</td>
        //                         <td className='font-medium text-base'>{user.email}</td>
        //                         <td className='font-medium text-base'>{booking.ticket_title}</td>
        //                         <td className='font-medium text-base'>{booking.quantity}</td>
        //                         <td className='font-medium text-base'>{booking.total_price}Tk</td>
        //                         <td className='font-medium text-base space-x-3'>
        //                                 <button className="btn btn-primary btn-outline">Accept</button>
        //                                 <button className="btn btn-primary ">Reject</button>

        //                         </td>
        //                     </tr>)
        //                 }
        //                 {/* row 1 */}


        //             </tbody>
        //         </table>
        //     </div>
        // </div>
        // </div>

        <div className=' min-h-screen px-10 pt-4'>
            {/* <h1 className='text-xl font-bold mb-4'>  transaction :{payments.length}</h1> */}
            <div className="hidden md:block overflow-x-auto rounded-lg  ">
                <table className="table table-zebra w-full text-base">
                    {/* head */}
                    <thead className='text-center '>
                        <tr>
                            <th>#</th>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Ticket Title</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            bookings.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td className='font-medium text-base'>{booking.name}</td>
                                <td className='font-medium text-base'>{booking.email}</td>
                                <td className='font-medium text-base'>{booking.ticket_title}</td>
                                <td className='font-medium text-base'>{booking.bookingQuantity}</td>
                                <td className='font-medium text-base'>{booking.total_price}Tk</td>
                                <td className='font-medium text-base space-x-3'>
                                    <button onClick={() => handleApproved(booking._id)} className="btn btn-primary btn-outline">Accept</button>
                                    <button onClick={() => handleRejection(booking._id)} className="btn btn-primary ">Reject</button>
                                </td>
                            </tr>)
                        }
                        {/* row 1 */}


                    </tbody>
                </table>
            </div>

            {/* mobile view  */}
            <div className="grid gap-4 md:hidden mt-4">
                {bookings.map((booking, i) => (
                    <div key={booking._id} className=" p-4 rounded-lg shadow-md">
                        <div className="flex justify-between">
                            <p className="font-bold text-primary text-xl">#{i + 1} </p>
                            <p className="font-semibold text-primary"> <FaTicket size={23}></FaTicket></p>
                        </div>
                        <div className='py-5 '>
                            <p className='text-2xl font-extrabold'><span className='text-primary  font-bold'>Ticket Title:</span> {booking.ticket_title}</p>
                            <p className='font-semibold'><span className='text-primary font-bold'>Name:</span> {booking.displayName}</p>
                            <p className='font-semibold'><span className='text-primary font-bold'>Email:</span> {booking.email}</p>
                            <p className='font-semibold'><span className='text-primary font-bold'>Quantity:</span> <span className="break-all">{booking.quantity}</span></p>
                            <p className='font-semibold'><span className='text-primary font-bold'>Total Price:</span> {booking.total_price}</p>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => handleApproved(booking._id)} className="btn btn-primary">Accept</button>
                            <button onClick={() => handleRejection(booking._id)} className="btn btn-primary">Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RequestedBooking;