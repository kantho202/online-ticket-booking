import React from 'react';
import useAuth from '../../../hook/useAuth';
import useRole from '../../../hook/useRole';
import { NavLink, Outlet } from 'react-router';
import { FaHistory, FaTicketAlt, FaUsersCog, FaUserTie } from 'react-icons/fa';
import { BsTicketPerforated } from 'react-icons/bs';
import { IoMegaphone, IoTicket } from 'react-icons/io5';
import { LuTicketsPlane } from 'react-icons/lu';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { RiLineChartLine } from 'react-icons/ri';

const MobileDashboardSidebar = () => {
    const { role } = useRole()
    const {user}=useAuth()
    return (
        <div>

        <input id="my-drawer-4" type="checkbox" className="drawer-toggle " />
                <div className="drawer-content  ">
                    {/* Navbar */}

                    {/* Page content here */}
                    {/* <div className=""><Outlet></Outlet></div> */}
        <div className=" ">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay "></label>
                    <div className="flex shadow min-h-full flex-col items-start bg-base-200  is-drawer-close:w-20
                     is-drawer-open:w-64 ">
                        {/* Sidebar content here */}
                        {/* <h1 className='text-gray-400 font-medium text-2xl'>Dashboard</h1> */}


                        <div className="p-4 is-drawer-close:tooltip is-drawer-close:tooltip-right 
                                        flex items-center   justify-center w-full  rounded-xl " data-tip="">


                            <span className="is-drawer-close:hidden text-2xl font-bold block w-full 
                                                 text-center">Dashboard</span>
                        </div>



                        <ul className="menu w-full grow drop-shadow-sm space-y-2.5">
                            <div className='flex justify-center items-center'>
                                {/* <h1 className='text-gray-400 font-medium '>MAIN MENU</h1> */}
                                {/* <Logo></Logo> */}
                            </div>
                            {/* List item */}
                            {/* <li>
                            <Link to="/dashboard">
                                <button className="is-drawer-close:tooltip 
                                is-drawer-close:tooltip-right flex items-center justify-center " data-tip="Homepage">
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden pl-2">Homepage</span>
                                </button>
                            </Link>
                            </li> */}

                            {
                                role === 'user' && <>
                                    <li>
                                        <NavLink to="/dashboard/userProfile" className={({ isActive }) =>
                                            `flex items-center justify-center w-full p-2 rounded-xl 
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                        }>
                                            <button className=" is-drawer-close:tooltip is-drawer-close:tooltip-right 
                                        flex items-center justify-center py-1.5 cursor-pointer" data-tip="User Profile">
                                                {/* Home icon */}
                                                <FaUserTie />
                                                <span className="is-drawer-close:hidden pl-2">User Profile</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/myBookedTickets"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2  rounded-xl 
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className="is-drawer-close:tooltip
                                 is-drawer-close:tooltip-right flex items-center justify-center py-1.5 cursor-pointer"
                                                data-tip="My Booked Tickets">
                                                {/* Home icon */}
                                                <BsTicketPerforated />
                                                <span className="is-drawer-close:hidden pl-2">My Booked Tickets</span>
                                            </button>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/transactionHistory"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl 
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className="is-drawer-close:tooltip py-1.5 cursor-pointer
                                is-drawer-close:tooltip-right flex items-center justify-center "
                                                data-tip="Transaction History">
                                                {/* Home icon */}
                                                <FaHistory />
                                                <span className="is-drawer-close:hidden pl-2">Transaction History</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                </>
                            }


                            {
                                role === 'vendor' && <>
                                    <li>
                                        <NavLink to="/dashboard/vendorProfile"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className=" is-drawer-close:tooltip is-drawer-close:tooltip-right
                                             flex items-center justify-center py-1.5" data-tip="Vendor Profile">
                                                {/* Home icon */}
                                                <FaUserTie />
                                                <span className="is-drawer-close:hidden pl-2">Vendor Profile</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addTicket"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right
                                             flex items-center justify-center py-1.5 " data-tip="Add Ticket">
                                                {/* Home icon */}
                                                <IoTicket />
                                                <span className="is-drawer-close:hidden pl-2">Add Ticket</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/myAddedTickets"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right 
                                            flex items-center justify-center py-1.5" data-tip="My Added Ticket">
                                                {/* Home icon */}
                                                <LuTicketsPlane />
                                                <span className="is-drawer-close:hidden pl-2">My Added Tickets</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/requestedBooking"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right
                                             flex items-center justify-center py-1.5" data-tip="Requested Booking">
                                                {/* Home icon */}
                                                <HiOutlineDocumentSearch />
                                                <span className="is-drawer-close:hidden pl-2">Requested Booking</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/revenueOverview"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right 
                                            flex items-center justify-center py-1.5" data-tip="Revenue Overview">
                                                {/* Home icon */}
                                                <RiLineChartLine />
                                                <span className="is-drawer-close:hidden pl-2">Revenue Overview</span>
                                            </button>
                                        </NavLink>
                                    </li>

                                </>
                            }





                            {/* admin list */}
                            {
                                role === 'admin' && <>
                                    <li>
                                        <NavLink to="/dashboard/adminProfile"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200 '}`
                                            }
                                        >
                                            <button className=" is-drawer-close:tooltip is-drawer-close:tooltip-right 
                                        flex items-center justify-center py-1.5" data-tip="Admin Profile">
                                                {/* Home icon */}
                                                <FaUserTie />
                                                <span className="is-drawer-close:hidden pl-2">Admin Profile</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manageTickets"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className="is-drawer-close:tooltip
                                 is-drawer-close:tooltip-right flex items-center justify-center py-1.5"
                                                data-tip="Manage Tickets">
                                                {/* Home icon */}
                                                <FaTicketAlt />
                                                <span className="is-drawer-close:hidden pl-2">Manage Tickets</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/mangeUsers"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className="is-drawer-close:tooltip
                                 is-drawer-close:tooltip-right flex items-center justify-center py-1.5"
                                                data-tip="Manage Users">
                                                {/* Home icon */}
                                                <FaUsersCog/>
                                                <span className="is-drawer-close:hidden pl-2">Manage Users</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/advertiseTickets"
                                            className={({ isActive }) =>
                                                `flex items-center justify-center w-full p-2 rounded-xl
     ${isActive ? 'bg-primary text-white' : ' hover:bg-orange-200'}`
                                            }
                                        >
                                            <button className="is-drawer-close:tooltip
                                 is-drawer-close:tooltip-right flex items-center justify-center py-1.5"
                                                data-tip="Advertise Tickets">
                                                {/* Home icon */}
                                                <IoMegaphone />
                                                <span className="is-drawer-close:hidden pl-2">Advertise Tickets</span>
                                            </button>
                                        </NavLink>
                                    </li>
                                </>
                            }


                            {/* List item */}

                        </ul>

                        {/* dashboard footer */}
                        <div
                            className=" flex items-center justify-center w-full p-2 rounded-xl "


                        >
                            <button className="is-drawer-close:tooltip  
                                 is-drawer-close:tooltip-right is-drawer-close:hidden
                                 bg-primary/50 px-12 flex items-center justify-center py-5 rounded-xl"
                                data-tip="">
                                {/* Home icon */}

                                <div className="is-drawer-close:hidden font-bold flex items-center gap-2">
                                    <div>
                                        <img src={user?.photoURL || user.photo} className='w-12 rounded-full' alt="" />
                                    </div>
                                    <div className='text-xs'>
                                        <h1>Welcome Back</h1>
                                     <span className='text-primary'>{role} </span>
                                    </div>
                                     </div>

                            </button>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    );
};

export default MobileDashboardSidebar;