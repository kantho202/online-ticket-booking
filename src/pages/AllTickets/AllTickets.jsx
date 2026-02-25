import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosecure';
import { Link } from 'react-router';
import { LuSearch } from "react-icons/lu";
import Loader from '../../components/Loading/Loading';
import useRole from '../../hook/useRole';
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
    FaWifi,
    FaCoffee,
    FaParking,
    FaTv,
    FaSnowflake,
    FaRoute,
    FaSort
} from 'react-icons/fa';

const AllTickets = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [transportType, setTransportType] = useState("");
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState("asc");
    const itemsPerPage = 6;
    const skip = (currentPage - 1) * itemsPerPage;

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['tickets', searchText, transportType, currentPage, order, sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/sort?status=approved&searchText=${searchText}&transport=${transportType}&limit=${itemsPerPage}&skip=${skip}&sort=${sort}&order=${order}`);
            return res.data;
        },
        keepPreviousData: true,
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
        Parking: FaParking,
        'Air Conditioning': FaSnowflake,
        'Free WiFi': FaWifi
    };

    const handleSelect = (e) => {
        const sortText = e.target.value;
        setSort(sortText.split("-")[0]);
        setOrder(sortText.split("-")[1]);
    };

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return { date: 'Available', time: 'Flexible' };
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        return { date, time };
    };

    const { role } = useRole();

    if (role === 'fraud') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800">
                <div className="text-center p-12 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 max-w-lg">
                    <h2 className="text-3xl font-bold text-red-500 mb-4">Access Restricted 🚫</h2>
                    <p className="text-white text-lg leading-relaxed">Your account is marked as fraud. You are not allowed to view tickets.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-8 md:px-4 relative z-10" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1000">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
                        All Available Tickets
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover and book your perfect travel experience
                    </p>
                </div>

                {/* Filter Section */}
                <div className="flex justify-between items-center gap-8 mb-12 bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/20 md:flex-col md:gap-6">
                    <div className="flex-1 w-full">
                        <div className="flex items-center bg-white rounded-full px-2 py-2 shadow-xl border-2 border-transparent transition-all focus-within:border-orange-500 focus-within:shadow-orange">
                            <div className="px-4 text-gray-600 text-xl">
                                <LuSearch />
                            </div>
                            <input
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setCurrentPage(1);
                                }}
                                type="search"
                                placeholder="Search destinations, cities, or ticket names..."
                                className="flex-1 border-none outline-none py-4 text-base bg-transparent placeholder:text-gray-400"
                            />
                            <select
                                value={transportType}
                                onChange={(e) => {
                                    setTransportType(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border-none outline-none px-4 py-4 bg-gray-50 rounded-3xl font-semibold text-gray-700 cursor-pointer mr-2 focus:bg-gray-200"
                            >
                                <option value="">All Transport</option>
                                <option value="Bus">🚌 Bus</option>
                                <option value="Train">🚂 Train</option>
                                <option value="Plane">✈️ Plane</option>
                                <option value="Launch">🚢 Launch</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/80 px-6 py-4 rounded-3xl border border-white/30">
                        <div className="text-gray-700 text-lg">
                            <FaSort />
                        </div>
                        <select
                            defaultValue="price-asc"
                            onChange={handleSelect}
                            className="border-none outline-none bg-transparent text-gray-800 font-semibold cursor-pointer"
                        >
                            <option disabled value="">Sort by price</option>
                            <option value="price-asc">💰 Low to High</option>
                            <option value="price-desc">💎 High to Low</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-16">
                        <Loader />
                    </div>
                ) : tickets.length === 0 ? (
                    <div className="text-center p-16 md:p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                        <div className="text-6xl mb-6">🎫</div>
                        <h3 className="text-2xl font-semibold text-white mb-2">No Tickets Found</h3>
                        <p className="text-white/80 text-base">Try adjusting your search criteria or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-8 items-stretch lg:grid-cols-2 md:grid-cols-1 md:gap-6">
                        {tickets.map((ticket, index) => {
                            const TransportIcon = transportIcons[ticket.transport] || FaBus;
                            const { date, time } = formatDateTime(ticket.departureDateTime);
                            
                            return (
                                <div 
                                    key={ticket._id} 
                                    data-aos="fade-up" 
                                    data-aos-duration="800"
                                    data-aos-delay={index * 100}
                                    className="bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-3xl border border-white/20 flex flex-col h-full group"
                                >
                                    <div className="relative h-52 overflow-hidden flex-shrink-0">
                                        <img src={ticket.image} alt={ticket.ticketTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60"></div>
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-2xl text-center shadow-xl backdrop-blur-md border-2 border-white/20">
                                            <div className="text-xl font-bold leading-none">${ticket.price}</div>
                                            <div className="text-xs opacity-90 mt-1">per person</div>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1 gap-4">
                                        <div className="flex justify-between items-start gap-3">
                                            <h2 className="text-xl font-bold text-gray-900 leading-tight flex-1 min-h-[2.5rem] line-clamp-2">
                                                {ticket.ticketTitle}
                                            </h2>
                                        </div>

                                        <div className="flex items-center justify-between px-4 py-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="flex items-center gap-2 font-semibold text-gray-700 flex-1 min-w-0">
                                                <FaMapMarkerAlt className="text-orange-500 text-sm flex-shrink-0" />
                                                <span className="text-sm truncate">{ticket.from}</span>
                                            </div>
                                            <div className="text-orange-500 text-sm font-semibold w-8 flex justify-center flex-shrink-0">
                                                <FaRoute />
                                            </div>
                                            <div className="flex items-center gap-2 font-semibold text-gray-700 flex-1 min-w-0">
                                                <FaMapMarkerAlt className="text-orange-500 text-sm flex-shrink-0" />
                                                <span className="text-sm truncate">{ticket.to}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center gap-2 px-3 py-3 bg-white rounded-lg border-2 border-gray-100 transition-all hover:border-orange-500 hover:-translate-y-1 hover:shadow-md min-h-[55px]">
                                                <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center text-white text-xs shadow-md flex-shrink-0">
                                                    <FaUsers />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Seats</div>
                                                    <div className="text-xs text-gray-700 font-semibold truncate">{ticket.ticketQuantity}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 px-3 py-3 bg-white rounded-lg border-2 border-gray-100 transition-all hover:border-orange-500 hover:-translate-y-1 hover:shadow-md min-h-[55px]">
                                                <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center text-white text-xs shadow-md flex-shrink-0">
                                                    <FaCalendarAlt />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Date</div>
                                                    <div className="text-xs text-gray-700 font-semibold truncate">{date}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 px-3 py-3 bg-white rounded-lg border-2 border-gray-100 transition-all hover:border-orange-500 hover:-translate-y-1 hover:shadow-md min-h-[55px]">
                                                <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center text-white text-xs shadow-md flex-shrink-0">
                                                    <FaClock />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Time</div>
                                                    <div className="text-xs text-gray-700 font-semibold truncate">{time}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 px-3 py-3 bg-white rounded-lg border-2 border-gray-100 transition-all hover:border-orange-500 hover:-translate-y-1 hover:shadow-md min-h-[55px]">
                                                <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md flex items-center justify-center text-white text-xs shadow-md flex-shrink-0">
                                                    <TransportIcon />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Type</div>
                                                    <div className="text-xs text-gray-700 font-semibold truncate">{ticket.transport}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-xl border border-gray-200 min-h-[60px]">
                                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                {ticket.name?.charAt(0)?.toUpperCase() || 'T'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Organized by</div>
                                                <div className="text-sm text-gray-700 font-semibold truncate">
                                                    {ticket.name?.length > 12 ? 
                                                        ticket.name : 
                                                        ticket.name || 'Travel Agent'
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        {ticket.perks && ticket.perks.length > 0 && (
                                            <div className="min-h-[60px] flex flex-col">
                                                <h4 className="text-xs font-semibold text-gray-700 mb-2">Amenities</h4>
                                                <div className="flex flex-wrap gap-2 flex-1">
                                                    {ticket.perks.slice(0, 3).map((perk, index) => {
                                                        const PerkIcon = perkIcons[perk] || FaWifi;
                                                        return (
                                                            <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-xs font-semibold shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
                                                                <PerkIcon className="text-xs" />
                                                                <span>{perk}</span>
                                                            </div>
                                                        );
                                                    })}
                                                    {ticket.perks.length > 3 && (
                                                        <div className="flex items-center px-2 py-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl text-xs font-semibold shadow-md">
                                                            +{ticket.perks.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-auto pt-3">
                                            <Link to={`/seeDetails/${ticket._id}`} className="block w-full">
                                                <button className="relative w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none px-6 py-4 rounded-xl font-bold text-base cursor-pointer transition-all duration-500 overflow-hidden shadow-xl hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 group">
                                                    <div className="flex items-center justify-center gap-3 relative z-10">
                                                        <span className="text-base">View Details</span>
                                                        <div className="text-base transition-transform duration-300 group-hover:translate-x-1">
                                                            <FaArrowRight />
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-full"></div>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {tickets.length > 0 && (
                    <div className="flex justify-center items-center gap-6 mt-12">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none rounded-xl font-semibold cursor-pointer transition-all shadow-lg hover:not(:disabled):-translate-y-1 hover:not(:disabled):shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            Previous
                        </button>
                        <span className="px-6 py-4 bg-white/20 text-white rounded-xl font-semibold backdrop-blur-md border border-white/30">
                            Page {currentPage}
                        </span>
                        <button
                            disabled={tickets.length < itemsPerPage}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none rounded-xl font-semibold cursor-pointer transition-all shadow-lg hover:not(:disabled):-translate-y-1 hover:not(:disabled):shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .focus-within\\:shadow-orange:focus-within {
                    box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
                }
            `}</style>
        </div>
    );
};

export default AllTickets;
