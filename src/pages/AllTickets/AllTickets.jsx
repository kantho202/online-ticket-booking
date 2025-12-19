import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosecure';
import { Link } from 'react-router';
import { LuSearch } from "react-icons/lu";
import styled from 'styled-components';
import Loader from '../../components/Loading/Loading';
import useRole from '../../hook/useRole';


const AllTickets = () => {
    const axiosSecure = useAxiosSecure()
    const [searchText, setSearchText] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [transportType, setTransportType] = useState("")
    const [sort, setSort] = useState('price')
    const [order, setOrder] = useState("asc")
    const itemsPerPage = 6;
    const skip = (currentPage - 1) * itemsPerPage;
    // const hasNextPage = tickets.length === itemsPerPage;

    const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['tickets', searchText, transportType, currentPage, order, sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/sort?status=approved&searchText=${searchText}&transport=${transportType}&limit=${itemsPerPage}&skip=${skip}&sort=${sort}&order=${order}`)
            return res.data;

        },
        keepPreviousData: true,
    })

    const handleSelect = (e) => {
        console.log(e.target.value)
        const sortText = e.target.value;
        setSort(sortText.split("-")[0])
        setOrder(sortText.split("-")[1])
    }

    // if(isLoading){
    //     return <Loader></Loader>
    // }
    // const fraudUser =()=>{
    //     const res =axiosSecure.get('/user')
    //     console.log(res.data)
    //     return res.data;
    // }
//     const {role}=useRole()
//     if (role === 'fraud') {
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center p-10 bg-red-100 rounded-xl">
//         <h2 className="text-2xl font-bold text-red-600">
//           Access Restricted 🚫
//         </h2>
//         <p className="text-gray-700 mt-2">
//           Your account is marked as fraud.  
//           You are not allowed to view tickets.
//         </p>
//       </div>
//     </div>
//   )
// }
    return (
        <div className=' py-10 w-11/12 mx-auto text-base-content'>
            {/* <h1>home ticket {homeTicket.length}</h1> */}
            <div className="p-6 min-h-screen ">
                <h1 className="text-2xl font-bold  mb-8 text-center">All Tickets</h1>

                <div className='flex justify-between items-center py-10'>
                    <div></div>
                    <div className='flex justify-center items-center gap-3'>

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
                            <LuSearch className='text-gray-500' size={24} />

                            <input onChange={(e) => {
                                setSearchText(e.target.value);
                                setCurrentPage(1)
                            }
                            }

                                type="search"
                                className="grow border-0 outline-none border-none " placeholder="Search" />
                            <select
                                className="select  w-40 outline-none border-none font-semibold"
                                value={transportType}
                                onChange={(e) => {
                                    setTransportType(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="">All Transport</option>
                                <option value="Bus">Bus</option>
                                <option value="Train">Train</option>
                                <option value="Plane">Plane</option>
                                <option value="Launch">Launch</option>
                            </select>
                        </label>


                    </div>


                    <form className='flex justify-end '>
                        <select defaultValue="low-asc"
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
                         transform transition hover:-translate-y-1 hover:shadow-2xl  "
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
                                        <h2 className="text-[28px] font-bold logo ">{ticket.ticketTitle}</h2>
                                        <p className=""><span className="font-semibold">Name:</span> {ticket.name}</p>
                                        <p className=""><span className="font-semibold">From:</span> {ticket.from}</p>
                                        <p className=""><span className="font-semibold">To:</span> {ticket.to}</p>
                                        <p className=""><span className="font-semibold">Transport :</span> {ticket.transport}</p>
                                        {/* <p className=""><span className="font-semibold">Time:</span> {ticket.time}</p> */}
                                        <p className=""><span className="font-semibold">Quantity:</span> {ticket.ticketQuantity}</p>
                                        <p className=""><span className="font-semibold">Price:</span> ৳ {ticket.price}</p>
                                        <p className=""><span className="font-semibold"> Date & Time :</span> {ticket.departureDateTime}</p>
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
                                        {/* <p className={`mt-3 font-semibold text-sm ${ticket.status === "approved"
                                            ? "text-green-600"
                                            : ticket.status === "rejected"
                                                ? "text-red-600"
                                                : "text-yellow-500"
                                            }`}>
                                            Status: {ticket.status || "pending"}
                                        </p> */}

                                        {/* Action Buttons */}
                                        <div className="pt-3 flex justify-between">
                                            <Link to={`/seeDetails/${ticket._id}`}
                                                // onClick={handleSeeDetails}
                                               >
                                                  <StyledWrapper>
                                            <button className="learn-more">
                                                <span className="circle" aria-hidden="true">
                                                    <span className="icon arrow" />
                                                </span>
                                                <span className="button-text">See details</span>
                                            </button>
                                        </StyledWrapper>
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

            {/* For TSX uncomment the commented types below */}
            {/* <div className="grid grid-flow-col gap-5 justify-center btn-primary text-center auto-cols-max">
                <TimeBox className="bg-primary" label="days" value={timeLeft.days} />
                <TimeBox label="hours" value={timeLeft.hours} />
                <TimeBox label="min" value={timeLeft.minutes} />
                <TimeBox label="sec" value={timeLeft.seconds} />
            </div> */}

            {/* <div className="grid grid-flow-col gap-5 justify-center text-center auto-cols-max mt-10">
                <TimeBox
                    label="days"
                    value={timeLeft.days}
                    className="bg-primary "
                />
                <TimeBox
                    label="hours"
                    value={timeLeft.hours}
                    className="bg-primary "
                />
                <TimeBox
                    label="min"
                    value={timeLeft.minutes}
                    className="bg-primary "
                />
                <TimeBox
                    label="sec"
                    value={timeLeft.seconds}
                    className="bg-primary "
                />
            </div> */}





        </div>
    );
};

const StyledWrapper = styled.div`
  button {
   position: relative;
   display: inline-block;
   cursor: pointer;
   outline: none;
   border: 0;
   vertical-align: middle;
   text-decoration: none;
   background: transparent;
   padding: 0;
  
  }

  button.learn-more {
   width: 12rem;
   height: auto;
  }

  button.learn-more .circle {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: relative;
   display: block;
   margin: 0;
   width: 3rem;
   height: 3rem;
   background: orange;
   border-radius: 1.625rem;
  }

  button.learn-more .circle .icon {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   bottom: 0;
   margin: auto;
   background: #fff;
  }

  button.learn-more .circle .icon.arrow {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   left: 0.625rem;
   width: 1.125rem;
   height: 0.125rem;
   background: none;
  }

  button.learn-more .circle .icon.arrow::before {
   position: absolute;
   content: "";
   top: -0.29rem;
   right: 0.0625rem;
   width: 0.625rem;
   height: 0.625rem;
   border-top: 0.125rem solid #fff;
   border-right: 0.125rem solid #fff;
   transform: rotate(45deg);
  }

  button.learn-more .button-text {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   padding: 0.75rem 0;
  
   
   font-weight: 700;
   line-height: 1.6;
   text-align: center;
   
  }

  button:hover .circle {
   width: 90%;
  }

  button:hover .circle .icon.arrow {
   background: #fff;
   transform: translate(1rem, 0);
  }

  button:hover .button-text {
   color: #fff;
  }`;


export default AllTickets;