import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure()

    const { data: tickets = [], refetch } = useQuery({
        queryKey: ['tickets',],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?status=approved`)
            return res.data;

        }
    })

    const handleToggleAdvertise = (ticket,isAdvertised) => {
        console.log(ticket)
        Swal.fire({
            title: `Are you sure to  ${isAdvertised}?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${isAdvertised}!`
        }).then((result) => {
            if (result.isConfirmed) {
                
                const updateInfo = { isAdvertised }
                axiosSecure.patch(`/tickets/${ticket._id}`, updateInfo)
                    .then(res => {
                        console.log(res.data.modifiedCount)
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Requested bookings status is set `,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })


            }
        });
    }
    const handleAdvertise=(id)=>{
        console.log(id)
        handleToggleAdvertise(id,'advertise')

    }
    const handleUnAdvertise=(id)=>{
        console.log(id)
        handleToggleAdvertise(id, 'unadvertised')
    }
    return (
        <div className='bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100 min-h-screen p-4'>
            {/* <h1 className='text-xl font-bold mb-4'>  transaction :{payments.length}</h1> */}
            <div className="hidden md:block overflow-x-auto rounded-lg  ">
                <table className="table table-zebra w-full text-base ">
                    {/* head */}
                    <thead className=' bg-gray-200'>
                        <tr>
                            <th>#</th>

                            <th>Name</th>
                            <th className=''>Email</th>
                            <th>Date</th>

                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            tickets.map((ticket, i) => <tr key={ticket._id}>
                                <th>{i + 1}</th>
                                <td className='flex items-center font-medium text-base text-center '>
                                    <img src={ticket.image} className='w-12 h-12 rounded-2xl ' alt="" />
                                    <span className='pl-4'>{ticket.ticketTitle}</span>
                                </td>



                                {/* <td className='font-medium text-base'>{user.displayName}</td> */}
                                <td className='font-medium text-base'>{ticket.email}</td>
                                <td className='font-medium text-base'>{ticket.date}</td>
                                {/* <td className='font-medium text-base'>{user.from}</td>
                                       <td className='font-medium text-base'>{user.to}</td> */}
                                <td className='font-medium text-base space-x-3 text-center'>

                                        {
                                            ticket.isAdvertised ==='unadvertised' ?  
                                            <button onClick={()=>handleAdvertise(ticket)} 
                                            className='btn btn-primary'>Advertise</button>
                                             : <button onClick={()=>{handleUnAdvertise(ticket)}}
                                              className='btn btn-primary btn-outline'>Unadvertise</button>
                                        }
                                      
                                       
                                    {/* <button onClick={() => handleToggleAdvertise(ticket)}
                                        className={`btn btn-primary 
                                                ${ticket.isAdvertised ? 'btn-outline' : ''}`}>
                                                    {ticket.isAdvertised ? " Unadvertised" : "Advertise"}</button> */}

                                </td>
                            </tr>)
                        }
                        {/* row 1 */}


                    </tbody>
                </table>
            </div>

            {/* mobile view  */}
            <div className="grid gap-4 md:hidden mt-4">
                {tickets.map((ticket, i) => (
                    <div key={ticket._id} className=" p-4 rounded-lg shadow-md">
                        <div className="flex justify-between">
                            <p className="font-bold text-xl text-primary">#{i + 1} </p>
                            <p className="font-semibold text-primary"> </p>
                        </div>
                        <div className='py-5 '>
                            {/* <p className='text-2xl font-extrabold'><span className='text-primary  font-bold'>Ticket Title:</span> {p.ticket_title}</p> */}
                            <p className='font-semibold'><span className='text-primary font-bold'>Name:</span> {ticket.displayName}</p>
                            <p className='font-semibold'><span className='text-primary font-bold'>Email:</span> {ticket.email}</p>
                            <p className='font-semibold'><span className='text-primary font-bold'>Role:</span> <span className="break-all">{ticket.role}</span></p>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => handleToggleAdvertise(ticket)}
                                className="btn btn-primary btn-outline">Make Admin</button>
                            <button onClick={() => handleUnAdvertise(ticket)} className="btn btn-primary">Make Vendor</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvertiseTickets;