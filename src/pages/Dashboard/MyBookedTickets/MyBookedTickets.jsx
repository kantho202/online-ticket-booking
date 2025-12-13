import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';

const MyBookedTickets = () => {
    const axiosSecure = useAxiosSecure()
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings')
            return res.data;
        }
    })

   
    const handlePayment=async(ticket)=>{
        const paymentInfo={
            total_price:ticket.total_price,
            ticketId:ticket._id,
            // email:bookings.email,
            ticket_title:ticket.ticket_title
        }
        const res =await axiosSecure.post('/create-checkout-session',paymentInfo)
        console.log(res);
        window.location.assign(res.data.url);
    }
    return (
        <div>
            <h1>bookings{bookings.length}</h1>
            <div className="p-6 bg-gray-50 min-h-screen  bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">My Booked Tickets</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookings.map(ticket => (
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
                                <h2 className="text-[28px] font-bold logo text-gray-900">{ticket.ticket_title}</h2>
                                {/* <p className="text-gray-700"><span className="font-semibold">Name:</span> {ticket.name}</p> */}
                                <p className="text-gray-700"><span className="font-semibold">From:</span> {ticket.from}</p>
                                <p className="text-gray-700"><span className="font-semibold">To:</span> {ticket.to}</p>
                                {/* <p className="text-gray-700"><span className="font-semibold">Transport:</span> {ticket.transport}</p> */}
                                <p className="text-gray-700"><span className="font-semibold">Date:</span> {ticket.date}</p>
                                <p className="text-gray-700"><span className="font-semibold">Time:</span> {ticket.time}</p>
                                <p className="text-gray-700"><span className="font-semibold">Quantity:</span> {ticket.quantity}</p>
                                <p className="text-gray-700"><span className="font-semibold">Total Price:</span> ৳ {ticket.total_price}Tk</p>
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
                                <p disabled={ticket.status==='paid'} className={`mt-3 font-semibold text-sm 
                                ${ticket.status === "paid"
                                    ? "text-green-600"
                                    : ticket.status === "accepted"
                                    ? "text-green-600"
                                    : ticket.status === "rejected"
                                        ? "text-red-600"
                                        : "text-yellow-500" } 
                                       
                                    }`}>
                                    Status: {ticket.status || "pending"}
                                </p>

                                {/* Action Buttons */}
                                <div className="pt-3 flex justify-between">
                                    {
                                        ticket.paymentStatus === 'paid' ?
                                            <button className="px-4 py-2 border btn border-primary text-primary 
                                            rounded-lg hover:bg-primary hover:text-white transition">
                                                Paid
                                            </button> :
                                            <button 
                                                onClick={()=>handlePayment(ticket)}
                                                disabled={ticket.status !=="accepted"}
                                                className={`px-4 py-2 btn bg-primary text-white rounded-lg 
                                                hover:bg-primary/80 transition
                                                 ${ticket.status !=='accepted' ? "opacity-50 " : ""}`}>
                                                Pay now
                                            </button>
                                    }


                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBookedTickets;