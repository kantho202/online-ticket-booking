import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosecure';
import { Link } from 'react-router';
import { LuSearch } from "react-icons/lu";

const AllTickets = () => {
    const axiosSecure = useAxiosSecure()
    const [searchText, setSearchText] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sort,setSort]=useState('price')
    const [order,setOrder]=useState("asc")
    const itemsPerPage = 6;
    const skip = (currentPage - 1) * itemsPerPage;
    // const hasNextPage = tickets.length === itemsPerPage;

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['tickets', searchText, currentPage,order,sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/sort?status=approved&searchText=${searchText}&limit=${itemsPerPage}&skip=${skip}&sort=${sort}&order=${order}`)
            return res.data;

        },
        keepPreviousData: true,
    })
    const handleSelect=(e)=>{
        console.log(e.target.value)
        const sortText=e.target.value;
        setSort(sortText.split("-")[0])
        setOrder(sortText.split("-")[1])
    }
    return (
        <div className='bg-[#faf7f5] py-10 w-11/12 mx-auto'>
            {/* <h1>home ticket {homeTicket.length}</h1> */}
            <div className="p-6 min-h-screen bg-[#faf7f5]">
                <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">All Tickets</h1>

                <div className='flex justify-between py-10'>
                    <div></div>
                    <label className="input input-bordered w-2xl rounded-full h-14
                    focus-within:border-primary focus-within:ring-1 focus-within:ring-primary outline-0  ">
                        {/* <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg> */}
                        <LuSearch className='text-gray-500' size={24}/>

                        <input onChange={(e) => {
                            setSearchText(e.target.value);
                            setCurrentPage(1)
                        }
                        }
                            type="search"
                            className="grow border-0 outline-none border-none " placeholder="Search" />

                    </label>

                    <form className='flex justify-end '>
                        <select  defaultValue="low-asc"
                        onChange={handleSelect} className="select outline-0 border-0 font-semibold
                         focus-within:border-primary focus-within:ring-1 focus-within:ring-primary " required>
                            <option disabled selected value="">Sort by price:</option>
                            <option value={"low-asc"}>Low to High</option>
                            <option value={"high-desc"}>High to Low</option>
                        </select>

                    </form>
                </div>
                {
                    isLoading ? (
                        <div className='text-center py-20 text-lg font-semibold'>Loading...</div>
                    ) : tickets.length === 0 ? (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold text-gray-600">
                                No data found
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Try searching with a different keyword
                            </p>
                        </div>
                    ) :


                        (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tickets.map(ticket => (
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
                                        <p className="text-gray-700"><span className="font-semibold">From:</span> {ticket.from}</p>
                                        <p className="text-gray-700"><span className="font-semibold">To:</span> {ticket.to}</p>
                                        <p className="text-gray-700"><span className="font-semibold">Transport :</span> {ticket.transport}</p>
                                        <p className="text-gray-700"><span className="font-semibold">Date:</span> {ticket.date}</p>
                                        <p className="text-gray-700"><span className="font-semibold">Time:</span> {ticket.time}</p>
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
                                            <Link to={`/seeDetails/${ticket._id}`}
                                                // onClick={handleSeeDetails}
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
                        </div>)
                }

                {/* <div className="join flex justify-center pt-10">
                    {[1, 2, 3, 4].map(page => (
                        <button
                            key={page}
                            className={`join-item btn btn-square 
        ${currentPage === page ? 'btn-active btn-primary' : ''}`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div> */}


                {
                    tickets.length > 0 && (


                        <div className="flex justify-center gap-3 mt-10">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-4 py-2 border btn-primary btn rounded disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <span className="px-4 py-2 font-semibold">
                                Page {currentPage}
                            </span>

                            <button
                                disabled={tickets.length < itemsPerPage}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-4 py-2 btn btn-primary border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default AllTickets;