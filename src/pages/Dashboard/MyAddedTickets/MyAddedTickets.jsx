import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosecure';
import Swal from 'sweetalert2';

const MyAddedTickets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: tickets = [] ,refetch } = useQuery({
        queryKey: ['tickets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets?email=${user?.email}`)
            return res.data;

        }
    })

    const handleTicketUpdate=(id)=>{
        console.log(id)
          Swal.fire({
            title: "Are you sure want to update this ticket?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/tickets/${id}`)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.modifiedCount){
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your ticket has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        });

    }

    const handleTicketRemove = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure want to delete this ticket?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.deletedCount){
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your ticket has been deleted.",
                            icon: "success"
                        });
                    }
                })
            }
        });

    }
    return (
        <div className="p-6 bg-gray-50 min-h-screen  bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">My Added Tickets</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tickets.map(ticket => (
                    <div
                        key={ticket._id}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden
                         transform transition hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100"
                         >
                        {/* Ticket Image */}
                        <div className="h-48 overflow-hidden">
                            <img
                                src={ticket.image}
                                alt={ticket.ticketTitle}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Ticket Content */}
                        <div className="p-5 space-y-3">
                            <h2 className="text-[28px] font-bold logo text-gray-900">{ticket.ticketTitle}</h2>
                            <p className="text-gray-700"><span className="font-semibold">Name:</span> {ticket.name}</p>
                            <p className="text-gray-700"><span className="font-semibold">From:</span> {ticket.from}</p>
                            <p className="text-gray-700"><span className="font-semibold">To:</span> {ticket.to}</p>
                            <p className="text-gray-700"><span className="font-semibold">Transport:</span> {ticket.transport}</p>
                            <p className="text-gray-700"><span className="font-semibold">Date:</span> {ticket.date}</p>
                            <p className="text-gray-700"><span className="font-semibold">Time:</span> {ticket.time}</p>
                            <p className="text-gray-700"><span className="font-semibold">Quantity:</span> {ticket.ticketQuantity}</p>
                            <p className="text-gray-700"><span className="font-semibold">Price:</span> ৳ {ticket.price}</p>
                            <p className="text-gray-700"><span className="font-semibold">Email:</span> {ticket.email}</p>

                            {/* Perks */}
                            {ticket.perks && ticket.perks.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {ticket.perks.map((perk, index) => (
                                        <span
                                            key={index}
                                            className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium"
                                        >
                                            {perk}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Verification Status */}
                            <p className={`mt-3 font-semibold text-sm ${ticket.verificationStatus === "approved"
                                    ? "text-green-600"
                                    : ticket.verificationStatus === "rejected"
                                        ? "text-red-600"
                                        : "text-yellow-500"
                                }`}>
                                Status: {ticket.verificationStatus || "pending"}
                            </p>

                            {/* Action Buttons */}
                            <div className="pt-3 flex justify-between">
                                <button 
                                onClick={()=>handleTicketUpdate(ticket._id)}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition">
                                    Update
                                </button>
                                <button
                                    onClick={() => handleTicketRemove(ticket._id)}
                                    className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default MyAddedTickets;