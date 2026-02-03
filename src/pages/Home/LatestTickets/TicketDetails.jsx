import useAxiosSecure from "../../../hook/useAxiosecure";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { 
    FaArrowLeft, 
    FaBus, 
    FaCalendar, 
    FaMap, 
    FaMapMarkerAlt, 
    FaUser, 
    FaClock, 
    FaTicketAlt, 
    FaStar, 
    FaCheckCircle, 
    FaRoute,
    FaTrain,
    FaPlane,
    FaShip,
    FaWifi,
    FaCoffee,
    FaSnowflake
} from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";
import useAuth from "../../../hook/useAuth";

const TicketDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const ticketModalRef = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const { data: ticket = [], isLoading } = useQuery({
        queryKey: ["ticketDetails", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/${id}`);
            return res.data;
        },
    });

    const transportIcons = {
        Bus: FaBus,
        Train: FaTrain,
        Plane: FaPlane,
        Launch: FaShip,
        Flight: FaPlane,
        Boat: FaShip
    };

    const perkIcons = {
        WiFi: FaWifi,
        'Free WiFi': FaWifi,
        AC: FaSnowflake,
        'Air Conditioning': FaSnowflake,
        Breakfast: FaCoffee,
        Coffee: FaCoffee
    };

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return { date: 'Available', time: 'Flexible' };
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const time = dateTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        return { date, time };
    };

    const handleModalRef = () => {
        ticketModalRef.current.showModal();
    };

    const handleTicketSubmit = (data) => {
        const bookingInfo = {
            ticketId: ticket._id,
            name: user.displayName,
            ticket_title: ticket.ticketTitle,
            image: ticket.image,
            bookingQuantity: Number(data.bookingQuantity),
            ticketQuantity: Number(ticket.ticketQuantity),
            total_price: ticket.price * Number(data.bookingQuantity),
            from: ticket.from,
            to: ticket.to,
            departureDateTime: ticket.departureDateTime,
        };

        axiosSecure.post('/bookings', bookingInfo)
            .then(res => {
                ticketModalRef.current.close();
                navigate('/dashboard/myBookedTickets');
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const isSoldOut = ticket.ticketQuantity === 0;
    const isExpired = new Date(ticket.departureDateTime) < new Date();
    const targetDateTime = ticket.departureDateTime;

    const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-lg">
                        <FaClock />
                        Booking Expired
                    </div>
                </div>
            );
        }
        return (
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
                <div className="text-center mb-3">
                    <h3 className="text-lg font-semibold text-orange-800">Booking Closes In:</h3>
                </div>
                <div className="flex justify-center gap-4">
                    <div className="text-center">
                        <div className="bg-orange-500 text-white rounded-lg px-3 py-2 font-bold text-xl min-w-[50px]">
                            {days}
                        </div>
                        <div className="text-xs text-orange-600 mt-1 font-medium">Days</div>
                    </div>
                    <div className="text-center">
                        <div className="bg-orange-500 text-white rounded-lg px-3 py-2 font-bold text-xl min-w-[50px]">
                            {hours}
                        </div>
                        <div className="text-xs text-orange-600 mt-1 font-medium">Hours</div>
                    </div>
                    <div className="text-center">
                        <div className="bg-orange-500 text-white rounded-lg px-3 py-2 font-bold text-xl min-w-[50px]">
                            {minutes}
                        </div>
                        <div className="text-xs text-orange-600 mt-1 font-medium">Min</div>
                    </div>
                    <div className="text-center">
                        <div className="bg-orange-500 text-white rounded-lg px-3 py-2 font-bold text-xl min-w-[50px]">
                            {seconds}
                        </div>
                        <div className="text-xs text-orange-600 mt-1 font-medium">Sec</div>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <div className="text-xl font-semibold text-gray-600">Loading ticket details...</div>
                </div>
            </div>
        );
    }

    const { date, time } = formatDateTime(ticket.departureDateTime);
    const TransportIcon = transportIcons[ticket.transport] || FaBus;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Back Button */}
                <div className="mb-8" data-aos="fade-down">
                    <Link to="/">
                        <button className="group bg-white hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-300 rounded-2xl px-6 py-3 flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <div className="bg-orange-500 group-hover:bg-orange-600 text-white rounded-xl p-2 transition-colors duration-300">
                                <FaArrowLeft size={16} />
                            </div>
                            <span className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
                                Back to Tickets
                            </span>
                        </button>
                    </Link>
                </div>

                {/* Main Ticket Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay="200">
                    {/* Hero Image Section */}
                    <div className="relative h-80 overflow-hidden">
                        <img
                            src={ticket.image}
                            alt={ticket.ticketTitle}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Transport Badge */}
                        <div className="absolute top-6 left-6 bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg">
                            <TransportIcon size={16} />
                            {ticket.transport}
                        </div>

                        {/* Price Badge */}
                        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm text-orange-600 px-4 py-2 rounded-full shadow-lg">
                            <div className="text-center">
                                <div className="text-2xl font-bold">৳{ticket.price}</div>
                                <div className="text-xs opacity-80">per person</div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute bottom-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold shadow-lg">
                            <FaCheckCircle size={14} />
                            Available
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 space-y-8">
                        {/* Header */}
                        <div className="flex justify-between items-start gap-4">
                            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                                {ticket.ticketTitle}
                            </h1>
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1 font-semibold text-sm">
                                <FaStar size={14} />
                                4.8
                            </div>
                        </div>

                        {/* Route Section */}
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                            <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                                <FaRoute />
                                Journey Route
                            </h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-500 text-white rounded-full p-3">
                                        <FaMap size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-orange-600 font-medium">From</div>
                                        <div className="text-lg font-bold text-gray-800">{ticket.from}</div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 flex justify-center">
                                    <div className="bg-orange-300 h-1 w-20 rounded-full relative">
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-orange-500 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-500 text-white rounded-full p-3">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-orange-600 font-medium">To</div>
                                        <div className="text-lg font-bold text-gray-800">{ticket.to}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-orange-300 transition-colors duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-blue-500 text-white rounded-lg p-2">
                                        <FaUser size={16} />
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Organizer</div>
                                </div>
                                <div className="font-semibold text-gray-800">{ticket.name}</div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-orange-300 transition-colors duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-green-500 text-white rounded-lg p-2">
                                        <FaTicketAlt size={16} />
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Available</div>
                                </div>
                                <div className="font-semibold text-gray-800">{ticket.ticketQuantity} seats</div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-orange-300 transition-colors duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-purple-500 text-white rounded-lg p-2">
                                        <FaCalendar size={16} />
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Date</div>
                                </div>
                                <div className="font-semibold text-gray-800 text-sm">{date}</div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-orange-300 transition-colors duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-red-500 text-white rounded-lg p-2">
                                        <FaClock size={16} />
                                    </div>
                                    <div className="text-sm text-gray-600 font-medium">Time</div>
                                </div>
                                <div className="font-semibold text-gray-800">{time}</div>
                            </div>
                        </div>

                        {/* Perks Section */}
                        {ticket.perks?.length > 0 && (
                            <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                                    <FaCheckCircle />
                                    Included Amenities
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {ticket.perks.map((perk, i) => {
                                        const PerkIcon = perkIcons[perk] || FaCheckCircle;
                                        return (
                                            <div key={i} className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-medium">
                                                <PerkIcon size={14} />
                                                {perk}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Countdown Section */}
                        {targetDateTime && (
                            <div>
                                <Countdown
                                    date={targetDateTime}
                                    renderer={countdownRenderer}
                                />
                            </div>
                        )}

                        {/* Booking Button */}
                        <div className="pt-4">
                            <button
                                disabled={isExpired || isSoldOut}
                                onClick={handleModalRef}
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                                    isExpired || isSoldOut
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                }`}
                            >
                                {isExpired ? 'Booking Expired' : 
                                 isSoldOut ? 'Sold Out' : 
                                 'Book This Ticket'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Enhanced Booking Modal */}
                <dialog ref={ticketModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box max-w-md bg-white rounded-3xl border-0 shadow-2xl">
                        <div className="text-center mb-6">
                            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <FaTicketAlt className="text-orange-500 text-2xl" />
                            </div>
                            <h3 className="font-bold text-2xl text-gray-800 mb-2">Complete Your Booking</h3>
                            <p className="text-gray-600">Select the number of tickets you want to book</p>
                        </div>

                        <form onSubmit={handleSubmit(handleTicketSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Number of Tickets
                                </label>
                                <input
                                    type="number"
                                    {...register('bookingQuantity', {
                                        required: 'Please enter booking quantity',
                                        min: {
                                            value: 1,
                                            message: "Minimum quantity is 1"
                                        },
                                        max: {
                                            value: ticket.ticketQuantity,
                                            message: "Booking quantity can't exceed available tickets"
                                        }
                                    })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors duration-300"
                                    placeholder="Enter quantity"
                                />
                                {errors.bookingQuantity && (
                                    <p className="text-red-500 text-sm mt-2 font-medium">
                                        {errors.bookingQuantity.message}
                                    </p>
                                )}
                            </div>

                            {/* Booking Summary */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Price per ticket:</span>
                                    <span className="font-semibold">৳{ticket.price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Available tickets:</span>
                                    <span className="font-semibold">{ticket.ticketQuantity}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                >
                                    Confirm Booking
                                </button>
                                <button
                                    type="button"
                                    onClick={() => ticketModalRef.current.close()}
                                    className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-semibold transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default TicketDetails;
