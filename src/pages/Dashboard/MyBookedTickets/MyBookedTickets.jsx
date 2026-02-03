import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';
import useAuth from '../../../hook/useAuth';
import Countdown from 'react-countdown';
import Loader from '../../../components/Loading/Loading';
import { 
    FaMapMarkerAlt, 
    FaUsers, 
    FaBus, 
    FaTrain, 
    FaPlane, 
    FaShip,
    FaArrowRight,
    FaCalendarAlt,
    FaClock,
    FaStar,
    FaWifi,
    FaCoffee,
    FaParking,
    FaTv,
    FaSnowflake,
    FaCheckCircle,
    FaTimesCircle,
    FaHourglassHalf,
    FaCreditCard,
    FaRoute
} from 'react-icons/fa';

const MyBookedTickets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
            return res.data;
        }
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
        AC: FaSnowflake,
        Breakfast: FaCoffee,
        WiFi: FaWifi,
        TV: FaTv,
        Parking: FaParking,
        'Air Conditioning': FaSnowflake,
        'Free WiFi': FaWifi
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const getStatusInfo = (status, paymentStatus) => {
        if (paymentStatus === 'paid') {
            return { 
                color: 'text-green-600', 
                bg: 'bg-green-100', 
                border: 'border-green-300',
                icon: FaCheckCircle, 
                text: 'Paid' 
            };
        }
        switch (status) {
            case 'accepted':
                return { 
                    color: 'text-green-600', 
                    bg: 'bg-green-100', 
                    border: 'border-green-300',
                    icon: FaCheckCircle, 
                    text: 'Accepted' 
                };
            case 'rejected':
                return { 
                    color: 'text-red-600', 
                    bg: 'bg-red-100', 
                    border: 'border-red-300',
                    icon: FaTimesCircle, 
                    text: 'Rejected' 
                };
            default:
                return { 
                    color: 'text-yellow-600', 
                    bg: 'bg-yellow-100', 
                    border: 'border-yellow-300',
                    icon: FaHourglassHalf, 
                    text: 'Pending' 
                };
        }
    };

    const handlePayment = async (book) => {
        const paymentInfo = {
            total_price: book.total_price,
            ticketId: book.ticketId,
            bookingId: book._id,
            email: book.email,
            ticket_title: book.ticket_title,
            bookingQuantity: book.bookingQuantity,
            ticketQuantity: book.ticketQuantity,
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.assign(res.data.url);
    };

    const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <div className="bg-red-100 border-2 border-red-300 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-lg">
                        <FaClock />
                        Booking Expired
                    </div>
                </div>
            );
        }
        return (
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-4">
                <div className="text-center mb-3">
                    <h3 className="text-sm font-semibold text-orange-800">Payment Due In:</h3>
                </div>
                <div className="flex justify-center gap-2">
                    <div className="text-center">
                        <div className="bg-orange-500 text-white rounded-lg px-2 py-1 font-bold text-lg min-w-[35px]">
                            {days}
                        </div>
                        <div className="text-xs text-orange-600 mt-1 font-medium">Days</div>
                    </div>
                    <div className="text-orange-500 font-bold text-lg">:</div>
                    <div className="text-center">
                        <div className="bg-orange-500 text-white rounded-lg px-2 py-1 font-bold text-lg min-w-[35px]">
                            {hours}
                        </div>
                        <div className="text-xs text-orange-600 mt-1 font-medium">Hours</div>
                    </div>
                    <div className="text-orange-500 font-bold text-lg">:</div>
                    <div className="text-center">
                        <div className="bg-orange-500 text-white rounded-lg px-2 py-1 font-bold text-lg min-w-[35px]">
                            {minutes}
                        </div>
                        <div className="text-xs text-orange-600 mt-1 font-medium">Min</div>
                    </div>
                    <div className="text-orange-500 font-bold text-lg">:</div>
                    <div className="text-center">
                        <div className="bg-orange-500 text-white rounded-lg px-2 py-1 font-bold text-lg min-w-[35px]">
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
                    <div className="text-xl font-semibold text-gray-600">Loading your bookings...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold mb-6 shadow-lg">
                        <FaStar className="text-yellow-300" />
                        My Bookings
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                        My Booked Tickets
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Manage your travel bookings and track payment status
                    </p>
                </div>

                {/* Tickets Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {bookings.map((book, index) => {
                        const isExpired = new Date(book.departureDateTime) < new Date();
                        const isReject = book.status === "rejected";
                        const statusInfo = getStatusInfo(book.status, book.paymentStatus);
                        const TransportIcon = transportIcons[book.transport] || FaBus;
                        
                        return (
                            <div 
                                key={book._id} 
                                className="group"
                                data-aos="fade-up" 
                                data-aos-duration="800" 
                                data-aos-delay={index * 100}
                            >
                                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
                                    {/* Image Section */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={book.image}
                                            alt={book.ticket_title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        
                                        {/* Price Tag */}
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm">
                                            <div className="text-center">
                                                <div className="text-lg font-bold">৳{book.total_price}</div>
                                                <div className="text-xs opacity-90">total price</div>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className={`absolute top-4 left-4 ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border} border-2 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm`}>
                                            <statusInfo.icon size={12} />
                                            {statusInfo.text}
                                        </div>

                                        {/* Transport Badge */}
                                        <div className="absolute bottom-4 left-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 backdrop-blur-sm">
                                            <TransportIcon size={14} />
                                            {book.transport}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 flex-1 flex flex-col gap-4">
                                        {/* Header */}
                                        <div className="flex justify-between items-start gap-3">
                                            <h2 className="text-xl font-bold text-gray-800 leading-tight flex-1 min-h-[3rem] line-clamp-2">
                                                {book.ticket_title}
                                            </h2>
                                            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold flex-shrink-0">
                                                <FaStar size={12} />
                                                4.8
                                            </div>
                                        </div>

                                        {/* Route Info */}
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-orange-500" />
                                                    <span className="font-semibold text-gray-800 text-sm truncate">{book.from}</span>
                                                </div>
                                                <div className="flex-1 flex justify-center">
                                                    <FaRoute className="text-orange-500" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-orange-500" />
                                                    <span className="font-semibold text-gray-800 text-sm truncate">{book.to}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-orange-300 transition-colors duration-300">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-1">
                                                        <FaUsers size={12} />
                                                    </div>
                                                    <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">Booked</div>
                                                </div>
                                                <div className="font-semibold text-gray-800 text-sm">{book.bookingQuantity} seats</div>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-orange-300 transition-colors duration-300">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-1">
                                                        <FaCalendarAlt size={12} />
                                                    </div>
                                                    <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">Date</div>
                                                </div>
                                                <div className="font-semibold text-gray-800 text-sm">{formatDate(book.departureDateTime)}</div>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-orange-300 transition-colors duration-300">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-1">
                                                        <FaClock size={12} />
                                                    </div>
                                                    <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">Time</div>
                                                </div>
                                                <div className="font-semibold text-gray-800 text-sm">{formatTime(book.departureDateTime)}</div>
                                            </div>

                                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 hover:border-orange-300 transition-colors duration-300">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-1">
                                                        <TransportIcon size={12} />
                                                    </div>
                                                    <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">Type</div>
                                                </div>
                                                <div className="font-semibold text-gray-800 text-sm">{book.transport}</div>
                                            </div>
                                        </div>

                                        {/* Traveler Info */}
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                    {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Booked by</div>
                                                    <div className="font-semibold text-gray-800 text-sm truncate">
                                                        {user?.displayName?.length > 15 ? 
                                                            user.displayName.slice(0, 15) + '...' : 
                                                            user?.displayName || 'User'
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Perks Section */}
                                        {book.perks && book.perks.length > 0 && (
                                            <div className="min-h-[4rem]">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Included Amenities</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {book.perks.slice(0, 3).map((perk, index) => {
                                                        const PerkIcon = perkIcons[perk] || FaWifi;
                                                        return (
                                                            <div key={index} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 hover:shadow-lg transition-shadow duration-300">
                                                                <PerkIcon size={10} />
                                                                <span>{perk}</span>
                                                            </div>
                                                        );
                                                    })}
                                                    {book.perks.length > 3 && (
                                                        <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                            +{book.perks.length - 3} more
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Countdown Section */}
                                        {book?.departureDateTime && !isReject && book.paymentStatus !== "paid" && (
                                            <div className="mb-4">
                                                <Countdown
                                                    date={book.departureDateTime}
                                                    renderer={countdownRenderer}
                                                />
                                            </div>
                                        )}

                                        {/* Action Button */}
                                        <div className="mt-auto pt-4">
                                            {book.paymentStatus === 'paid' ? (
                                                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg">
                                                    <FaCheckCircle />
                                                    Paid
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handlePayment(book)}
                                                    disabled={book.status !== "accepted" || isExpired}
                                                    className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                                                        book.status !== "accepted" || isExpired
                                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                            : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                                    }`}
                                                >
                                                    <span>
                                                        {book.status !== 'accepted' ? 'Waiting Approval' : 
                                                         isExpired ? 'Expired' : 'Pay Now'}
                                                    </span>
                                                    <FaCreditCard />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {bookings.length === 0 && (
                    <div className="text-center py-16" data-aos="fade-up">
                        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto border border-gray-100">
                            <div className="text-6xl mb-6">🎫</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Bookings Found</h3>
                            <p className="text-gray-600 text-lg">You haven't booked any tickets yet</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookedTickets;
