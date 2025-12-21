import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';
import useAuth from '../../../hook/useAuth';
import Countdown from 'react-countdown';
import Loader from '../../../components/Loading/Loading';

const MyBookedTickets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: bookings = [],isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`)
            return res.data;
        }
    })

    if(isLoading){
        return <Loader></Loader>
    }
    const handlePayment = async (book) => {
        const paymentInfo = {
            total_price: book.total_price,
            ticketId: book.ticketId,
            bookingId: book._id,
            email:book.email,
            ticket_title: book.ticket_title,
            bookingQuantity:book.bookingQuantity,
            ticketQuantity:book.ticketQuantity,
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        // console.log(res.data,paymentInfo);
        window.location.assign(res.data.url);
    }

    // countdown 
   
    //   const isExpired=new Date(book.departureDateTime) < new Date();
    
    //   const targetDateTime=bookings.departureDateTime
    const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span className="text-red-500 text-center font-bold">Expired</span>;
        }

        return (
            <div className="flex gap-3 text-3xl font-bold justify-center">
                <div>{days}d</div>
                <div>{hours}h</div>
                <div>{minutes}m</div>
                <div>{seconds}s</div>
            </div>
        );
    };
    return (
        <div>
            {/* <h1>bookings{bookings.length}</h1> */}
            <div className="pt-5  min-h-screen px-5 lg:px-10 text-base-content">
                <h1 className="text-2xl font-bold  mb-8 text-center">My Booked Tickets</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookings.map(book => {
                        const isExpired=new Date(book.departureDateTime) < new Date();
                        const isReject =book.status === "rejected"
                        return(
                            <div
                            key={book._id}
                            className=" rounded-2xl shadow-lg border border-gray-200 overflow-hidden
                         transform transition hover:-translate-y-1 hover:shadow-2xl "
                            >
                            {/* Ticket Image */}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={book.image}
                                    alt={book.ticketTitle}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>

                            {/* Ticket Content */}
                            <div className="p-5 space-y-3">
                                <h2 className="text-[28px] font-bold logo ">{book.ticket_title}</h2>
                                <p className=""><span className="font-semibold">From:</span> {book.from}</p>
                                <p className=""><span className="font-semibold">To:</span> {book.to}</p>
                                <p className=""><span className="font-semibold">Quantity:</span> {book.bookingQuantity}</p>
                                <p className=""><span className="font-semibold">Total Price:</span> ৳ {book.total_price}Tk</p>
                                <p className=""><span className="font-semibold">Date & Time:</span> {book.departureDateTime}</p>

                                {/* Perks */}
                                {book.perks && book.perks.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {book.perks.map((perk, index) => (
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
                                <p disabled={book.status === 'paid'} className={`mt-3 font-semibold text-sm 
                                ${book.status === "paid"
                                        ? "text-green-600"
                                        : book.status === "accepted"
                                            ? "text-green-600"
                                            : book.status === "rejected"
                                                ? "text-red-600"
                                                : "text-yellow-500"} 
                                       
                                    }`}>
                                    Status: {book.status || "pending"}
                                </p>

                                {book?.departureDateTime && !isReject && book.paymentStatus !== "paid" && (
                                    <Countdown
                                        date={book.departureDateTime}
                                        renderer={countdownRenderer}
                                        className={`font-bold text-2xl `}
                                    />
                                )}
                                
                                {/* Action Buttons */}
                                <div className="pt-3 flex justify-between">
                                    {
                                        book.paymentStatus === 'paid' ?
                                            <button className="px-4 py-2 border btn border-primary text-primary 
                                            rounded-lg hover:bg-primary hover:text-white transition">
                                                Paid
                                            </button> :
                                            <button

                                                onClick={() => handlePayment(book)}
                                                disabled={book.status !== "accepted" || isExpired }
                                                className={`px-4 py-2 btn bg-primary text-white rounded-lg 
                                                hover:bg-primary/80 transition
                                                 ${(book.status !== 'accepted' || isExpired) ? 
                                                 "opacity-50 cursor-not-allowed" : ""}`}>
                                                Pay now
                                            </button>
                                    }


                                </div>
                            </div>
                        </div>
                        )
                        
})}
                </div>
            </div>
        </div>
    );
};

export default MyBookedTickets;