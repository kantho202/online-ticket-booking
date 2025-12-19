import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosecure';
import Swal from 'sweetalert2';
import { FaTicket } from 'react-icons/fa6';
import Loader from '../../../components/Loading/Loading';

const ManageTickets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: tickets = [] ,refetch ,isLoading} = useQuery({
        queryKey: ['tickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets`)
            return res.data;

        }
    })
    if(isLoading){
        return <Loader></Loader>
    }
    const updateTicketStatus=(id,status)=>{
      
        
         Swal.fire({
                    title: `Are you sure manage ticket ${status}?`,
                    text: "",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: `${status}!`
                }).then((result) => {
                    if (result.isConfirmed) {
                        refetch()
                        const updateInfo = { status }
                        axiosSecure.patch(`/tickets/${id}`, updateInfo)
                            .then(res => {
                             
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


    const handleApprovedTicket=(id)=>{
      
        updateTicketStatus(id,'approved')
    }

    const handleRejectionTicket=(id)=>{
        updateTicketStatus(id,'reject')
    }
    
    return (
             <div className=' min-h-screen pt-5 text-base-content px-10 '>
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
                            <th>From</th>
                            <th>To</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            tickets.map((ticket, i) => <tr key={ticket._id}>
                                <th>{i + 1}</th>
                                <td className='font-medium text-base'>{ticket.name}</td>
                                <td className='font-medium text-base'>{ticket.email}</td>
                                <td className='font-medium text-base'>{ticket.ticketTitle}</td>
                                <td className='font-medium text-base'>{ticket.from}</td>
                                <td className='font-medium text-base'>{ticket.to}</td>
                                <td className='font-medium text-base space-x-3'>
                                    <button onClick={()=>handleApprovedTicket(ticket._id)}
                                     className="btn btn-primary btn-outline">Approved</button>
                                    <button onClick={()=>handleRejectionTicket(ticket._id)} className="btn btn-primary">Reject</button>
                                </td>
                            </tr>)
                        }
                        {/* row 1 */}


                    </tbody>
                </table>
            </div>

            {/* mobile view  */}
              <div className="grid gap-4 md:hidden mt-4">
                            {tickets.map((p, i) => (
                                <div key={p._id} className=" p-4 rounded-lg shadow-md">
                                    <div className="flex justify-between">
                                        <p className="font-bold text-xl">#{i + 1} </p>
                                        <p className="font-semibold text-primary"> <FaTicket size={23}></FaTicket></p>
                                    </div>
                                   <div className='py-5 '>
                                     <p className='text-2xl font-extrabold'><span className='text-primary  font-bold'>Ticket Title:</span> {p.ticketTitle}</p>
                                    <p className='font-semibold'><span className='text-primary font-bold'>Name:</span> {user.displayName}</p>
                                    <p className='font-semibold'><span className='text-primary font-bold'>Email:</span> {user.email}</p>
                                    <p className='font-semibold'><span className='text-primary font-bold'>From:</span> <span className="break-all">{p.from}</span></p>
                                    <p className='font-semibold'><span className='text-primary font-bold'>To:</span> {p.to}</p>
                                   </div>
                                     <div className="flex justify-between">
                                       <button
                                       onClick={handleApprovedTicket}
                                       className="btn btn-primary">Accept</button>
                                       <button onClick={handleRejectionTicket}
                                       className="btn btn-primary">Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
        </div>

    );
};

export default ManageTickets;