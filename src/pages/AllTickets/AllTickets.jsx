import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosecure';
import { Link } from 'react-router';
import { LuSearch } from "react-icons/lu";
import Loader from '../../components/Loading/Loading';
import useRole from '../../hook/useRole';
import { 
    FaBus, 
    FaTrain, 
    FaPlane, 
    FaShip,
    FaArrowRight,
    FaWifi,
    FaCoffee,
    FaParking,
    FaTv,
    FaSnowflake,
    FaSort
} from 'react-icons/fa';
import { LuCalendar, LuClock, LuMapPin, LuUsers } from 'react-icons/lu';

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

    const perks = [
        { name: "AC", icon: FaSnowflake },
        { name: "Breakfast", icon: FaCoffee },
        { name: "WiFi", icon: FaWifi },
        { name: "TV", icon: FaTv },
        { name: "Parking", icon: FaParking },
        { name: "Air Conditioning", icon: FaSnowflake },
        { name: "Free WiFi", icon: FaWifi }
    ];

    const handleSelect = (e) => {
        const sortText = e.target.value;
        setSort(sortText.split("-")[0]);
        setOrder(sortText.split("-")[1]);
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
        <div className="min-h-screen  py-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 "></div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tickets.map((ticket, index) => {
                            const TransportIcon = transportIcons[ticket.transport] || FaBus;
                            
                            return (
                                <div key={ticket._id} data-aos="fade-up" data-aos-duration="800" data-aos-delay={index * 100}>
                                    <div className=" rounded-[10px] overflow-hidden shadow-2xl transition-all duration-500
                                     hover:-translate-y-4 hover:scale-100 hover:shadow-3xl border border-white/20 flex flex-col h-full group">
                                        {/* Image Container */}
                                        <div className="relative h-72 overflow-hidden flex-shrink-0">
                                            <img
                                                src={ticket.image}
                                                alt={ticket.ticketTitle}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60"></div>

                                            {/* Price Tag */}
                                            <div className="absolute top-4 right-4 px-4 py-2 bg-white/95 text-orange-500 rounded-full font-bold text-lg backdrop-blur-md">
                                                ${ticket.price}
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-8">
                                            <h3 className="text-2xl font-bold  mb-4">{ticket.ticketTitle}</h3>

                                            <div className="flex items-center gap-4 mb-6 px-4 py-4  rounded-xl">
                                                <div className="flex items-center gap-2 font-semibold ">
                                                    <LuMapPin className="text-orange-500" />
                                                    <span>{ticket.from}</span>
                                                </div>
                                                <div className="text-orange-500 font-bold text-xl">→ </div>
                                                <div className="flex items-center gap-2 font-semibold ">
                                                    <LuMapPin className="text-orange-500" />
                                                    <span>{ticket.to}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-50 border-2 border-orange-200 rounded-lg flex items-center justify-center text-orange-500 text-lg">
                                                        <TransportIcon />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-xs font-semibold  uppercase  mb-1">Transport</div>
                                                        <div className="tracking-wide text-gray-700 text-sm">{ticket.transport}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-50 border-2 border-orange-200 rounded-lg flex items-center justify-center text-orange-500 text-lg">
                                                        <LuUsers />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-xs font-semibold  uppercase  mb-1">Quantity</div>
                                                        <div className="tracking-wide text-gray-700 text-sm">{ticket.ticketQuantity}</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-50 border-2 border-orange-200 rounded-lg flex items-center justify-center text-orange-500 text-lg">
                                                        <LuCalendar />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-xs font-semibold uppercase mb-1">Departure</div>
                                                        <div className="tracking-wide text-gray-700 text-sm">
                                                            {new Date(ticket.departureDateTime).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-50 border-2 border-orange-200 rounded-lg flex items-center justify-center text-orange-500 text-lg">
                                                        <LuClock />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-xs font-semibold uppercase  mb-1">Time</div>
                                                        <div className="tracking-wide text-gray-700 text-sm">
                                                            {new Date(ticket.departureDateTime).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="flex items-center gap-4 px-4 py-4  rounded-xl  min-h-[70px]">
                                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                                                    {ticket.name?.charAt(0)?.toUpperCase() || 'T'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs  font-semibold uppercase tracking-wide mb-1">Organized by</div>
                                                    <div className="text-sm text-gray-500 font-semibold truncate">
                                                        {ticket.name?.length > 15
                                                            ? ticket.name.slice(0, 15) + '...'
                                                            : ticket.name || 'Travel Agent'
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {ticket.perks && ticket.perks.length > 0 && (
                                                <div className="mb-6">
                                                    <h4 className="text-sm font-semibold  mb-3">Included Perks</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {ticket.perks.map((perk, index) => {
                                                            const PerkIcon = perks.find(p => p.name === perk)?.icon || FaWifi;
                                                            return (
                                                                <div key={index} className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl text-xs font-semibold">
                                                                    <PerkIcon className="text-sm" />
                                                                    {perk}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Button */}
                                            <div className="mt-auto pt-4">
                                                <Link to={`/seeDetails/${ticket._id}`} className="block w-full">
                                                    <button className="relative w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none px-6 py-3 rounded-2xl font-bold text-lg cursor-pointer transition-all duration-500 overflow-hidden shadow-xl hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 group">
                                                        <div className="flex items-center justify-center gap-4 relative z-10">
                                                            <span className="text-lg">Book Now</span>
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
