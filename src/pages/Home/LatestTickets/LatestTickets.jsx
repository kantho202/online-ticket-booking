import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';
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
    FaSnowflake
} from 'react-icons/fa';

const LatestTickets = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: homeTicket = [] } = useQuery({
        queryKey: ['homeTicket'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets?status=approved&limit=6');
            return res.data;
        }
    });

    const transportIcons = {
        Bus: FaBus,
        Train: FaTrain,
        Plane: FaPlane,
        Launch: FaShip
    };

    const perkIcons = {
        AC: FaSnowflake,
        Breakfast: FaCoffee,
        WiFi: FaWifi,
        TV: FaTv,
        Parking: FaParking
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className="min-h-screen  py-24 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-radial from-white/10 via-transparent to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-8 md:px-4 relative z-10" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="800">
                {/* Header Section */}
                <div className="text-center mb-20 md:mb-12">
                    
                    <h1 className="text-6xl md:text-4xl text-xl font-extrabold  mb-6 tracking-tight leading-tight">
                        Latest Travel Tickets
                    </h1>
                    <p className="text-xl md:text-lg  max-w-3xl mx-auto leading-relaxed font-light">
                        Discover amazing travel experiences and book your next adventure with exclusive deals
                    </p>
                </div>

                {/* Tickets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-6 items-stretch">
                    {homeTicket.map((ticket, index) => {
                        const TransportIcon = transportIcons[ticket.transport] || FaBus;
                        return (
                            <div key={ticket._id} data-aos="fade-up" data-aos-duration="800" data-aos-delay={index * 100} className="h-full flex flex-col">
                                <div className=" rounded-[10px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:scale-105 hover:shadow-3xl border border-white/20 flex flex-col h-full group">
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden flex-shrink-0">
                                        <img 
                                            src={ticket.image}
                                            alt={ticket.ticketTitle}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60"></div>
                                        
                                        {/* Price Tag */}
                                        <div className="absolute top-6 right-6 bg-gradient-to-r
                                         from-orange-500 to-orange-600 text-white px-3 py-2 rounded-[10px] text-center shadow-xl backdrop-blur-md border-2 border-white/20">
                                            <div className="text-[15px] font-bold leading-none">${ticket.price}</div>
                                            <div className="text-[11px] opacity-90 mt-1">per person</div>
                                        </div>
                                        
                                        {/* Status Badge */}
                                        {/* <div className="absolute top-6 left-6 bg-green-500/90 text-white px-3 py-2 rounded-2xl text-xs font-semibold backdrop-blur-md border border-white/20">
                                            Available
                                        </div> */}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-8 flex flex-col flex-1 gap-6">
                                        {/* Title */}
                                        <div className="flex justify-between items-start gap-4">
                                            <h2 className="text-2xl font-bold  leading-tight line-clamp-2 min-h-[3.5rem] flex-1">
                                                {ticket.ticketTitle}
                                            </h2>
                                        </div>

                                        {/* Route Info */}
                                        <div className="flex items-center justify-between px-5 py-5  rounded-2xl border border-gray-200">
                                            <div className="flex items-center gap-2 font-semibold  flex-1 min-w-0">
                                                <FaMapMarkerAlt className="text-orange-500 text-lg flex-shrink-0" />
                                                <span className="text-sm truncate">{ticket.from}</span>
                                            </div>
                                            <div className="flex items-center justify-center w-10 text-orange-500 text-base font-semibold flex-shrink-0">
                                                <FaArrowRight />
                                            </div>
                                            <div className="flex items-center gap-2 font-semibold  flex-1 min-w-0">
                                                <FaMapMarkerAlt className="text-orange-500 text-lg flex-shrink-0" />
                                                <span className="text-sm truncate">{ticket.to}</span>
                                            </div>
                                        </div>

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-3 px-4 py-4  rounded-xl border border-gray-200 transition-all duration-300 hover:bg-orange-50 hover:border-orange-200 hover:-translate-y-1 min-h-[70px]">
                                                <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-base shadow-lg flex-shrink-0">
                                                    <TransportIcon />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Transport</div>
                                                    <div className="text-sm  font-semibold truncate">{ticket.transport}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 px-4 py-4  rounded-xl border border-gray-200 transition-all duration-300 hover:bg-orange-50 hover:border-orange-200 hover:-translate-y-1 min-h-[70px]">
                                                <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-base shadow-lg flex-shrink-0">
                                                    <FaUsers />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Available</div>
                                                    <div className="text-sm  font-semibold truncate">{ticket.ticketQuantity} seats</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 px-4 py-4  rounded-xl border border-gray-200 transition-all duration-300 hover:bg-orange-50 hover:border-orange-200 hover:-translate-y-1 min-h-[70px]">
                                                <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-base shadow-lg flex-shrink-0">
                                                    <FaCalendarAlt />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Date</div>
                                                    <div className="text-sm text-gray-700 font-semibold truncate">{formatDate(ticket.departureDateTime)}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 px-4 py-4  rounded-xl border border-gray-200 transition-all duration-300 hover:bg-orange-50 hover:border-orange-200 hover:-translate-y-1 min-h-[70px]">
                                                <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white text-base shadow-lg flex-shrink-0">
                                                    <FaClock />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Time</div>
                                                    <div className="text-sm text-gray-700 font-semibold truncate">{formatTime(ticket.departureDateTime)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Traveler Info */}
                                        <div className="flex items-center gap-4 px-4 py-4  rounded-xl border border-gray-200 min-h-[70px]">
                                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                                                {ticket.name?.charAt(0)?.toUpperCase() || 'T'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Organized by</div>
                                                <div className="text-sm text-gray-700 font-semibold truncate">
                                                    {ticket.name?.length > 15 
                                                        ? ticket.name.slice(0, 15) + '...' 
                                                        : ticket.name || 'Travel Agent'
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {/* Perks Section */}
                                        <div className="min-h-[80px] flex flex-col">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Included Amenities</h4>
                                            <div className="flex flex-wrap gap-2 flex-1">
                                                {ticket.perks && ticket.perks.length > 0 ? (
                                                    <>
                                                        {ticket.perks.slice(0, 3).map((perk, index) => {
                                                            const PerkIcon = perkIcons[perk] || FaWifi;
                                                            return (
                                                                <div key={index} className="flex items-center gap-2 px-3 py- bg-gradient-to-r from-orange-500 to-orange-600 
                                                                text-white rounded-[10px] text-xs font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 
                                                                hover:shadow-xl">
                                                                    <PerkIcon className="text-sm" />
                                                                    <span>{perk}</span>
                                                                </div>
                                                            );
                                                        })}
                                                        {ticket.perks.length > 3 && (
                                                            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl text-xs font-semibold shadow-lg">
                                                                +{ticket.perks.length - 3} more
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-2xl text-xs font-semibold shadow-lg">
                                                        <FaWifi className="text-sm" />
                                                        <span>Basic Service</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="mt-auto pt-4">
                                            <Link to={`/seeDetails/${ticket._id}`} className="block w-full">
                                                <button className="relative w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none btn rounded-2xl font-bold text-lg cursor-pointer transition-all duration-500 overflow-hidden shadow-xl hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 group">
                                                    <div className="flex items-center justify-center gap-4 relative z-10">
                                                        <span className="text-lg">View Details</span>
                                                        <div className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                                                            <FaArrowRight />
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-full"></div>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {homeTicket.length === 0 && (
                    <div className="text-center p-16 md:p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 mt-8">
                        <div className="text-6xl mb-6">🎫</div>
                        <h3 className="text-2xl font-semibold text-white mb-2">No Tickets Available</h3>
                        <p className="text-white/80 text-base">Check back later for new travel opportunities</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestTickets;
