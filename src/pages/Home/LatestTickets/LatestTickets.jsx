import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';

const LatestTickets = () => {
    const axiosSecure = useAxiosSecure()
    const { data: homeTicket = [] } = useQuery({
        queryKey: ['homeTicket'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets-home');
            return res.data;
        }
    })

    const handleSeeDetails=()=>{
        console.log('clicked')
    }
    return (
        <div className='bg-[#faf7f5] py-10'>
            {/* <h1>home ticket {homeTicket.length}</h1> */}
            <div className="p-6 min-h-screen bg-[#faf7f5]">
                <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Latest Tickets</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {homeTicket.map(ticket => (
                        <div
                            key={ticket._id}
                            className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden
                         transform transition hover:-translate-y-1 hover:shadow-2xl bg-[#faf7f5] "
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
                                
                                {/* <p className="text-gray-700"><span className="font-semibold">To:</span> {ticket.to}</p> */}
                                <p className="text-gray-700"><span className="font-semibold">Transport:</span> {ticket.transport}</p>
                                {/* <p className="text-gray-700"><span className="font-semibold">Date:</span> {ticket.date}</p> */}
                                {/* <p className="text-gray-700"><span className="font-semibold">Time:</span> {ticket.time}</p> */}
                                <p className="text-gray-700"><span className="font-semibold">Quantity:</span> {ticket.ticketQuantity}</p>
                                <p className="text-gray-700"><span className="font-semibold">Price:</span> ৳ {ticket.price}</p>
                                {/* <p className="text-gray-700"><span className="font-semibold">Email:</span> {ticket.email}</p> */}

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
                                {/* <p className={`mt-3 font-semibold text-sm ${ticket.verificationStatus === "approved"
                                    ? "text-green-600"
                                    : ticket.verificationStatus === "rejected"
                                        ? "text-red-600"
                                        : "text-yellow-500"
                                    }`}>
                                    Status: {ticket.verificationStatus || "pending"}
                                </p> */}

                                {/* Action Buttons */}
                                <div className="pt-3 flex justify-between">
                                    <Link to={`/seeDetails/${ticket._id}`}
                                        onClick={handleSeeDetails}
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition">
                                        SeeDetails
                                    </Link>
                                    {/* <button
                                        // onClick={() => handleTicketRemove(ticket._id)}
                                        className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">
                                        Delete
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestTickets;