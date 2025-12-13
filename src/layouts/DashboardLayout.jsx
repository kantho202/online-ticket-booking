import React from 'react';
import { Link, Outlet } from 'react-router';
import Logo from '../components/Logo/Logo';
import { FaHistory, FaTicketAlt, FaUsersCog, FaUserTie } from 'react-icons/fa';
import { IoMegaphone, IoTicket } from 'react-icons/io5';
import { LuTicketsPlane } from 'react-icons/lu';
import { HiOutlineDocumentSearch, HiTicket } from 'react-icons/hi';
import { RiLineChartLine } from 'react-icons/ri';
import { BsTicketPerforated } from 'react-icons/bs';
import useRole from '../hook/useRole';

const DashboardLayout = () => {
    const { role } = useRole()
    // console.log('role in dashboard',role)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <Link to="/" className="px-4"><Logo></Logo></Link>
                </nav>
                {/* Page content here */}
                <div className=""><Outlet></Outlet></div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <li>
                            <Link to="/dashboard">
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center justify-center " data-tip="Homepage">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden pl-2">Homepage</span>
                                </button>
                            </Link>
                        </li>
                        {
                            role === 'user' && <>
                                <li>
                                    <Link to="/dashboard/userProfile">
                                        <button className=" is-drawer-close:tooltip is-drawer-close:tooltip-right 
                                        flex items-center justify-center " data-tip="User Profile">
                                            {/* Home icon */}
                                            <FaUserTie />
                                            <span className="is-drawer-close:hidden pl-2">User Profile</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/myBookedTickets">
                                        <button className="is-drawer-close:tooltip
                                 is-drawer-close:tooltip-right flex items-center justify-center "
                                            data-tip="My Booked Tickets">
                                            {/* Home icon */}
                                            <BsTicketPerforated />
                                            <span className="is-drawer-close:hidden pl-2">My Booked Tickets</span>
                                        </button>
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/dashboard/transactionHistory">
                                        <button className="is-drawer-close:tooltip 
                                is-drawer-close:tooltip-right flex items-center justify-center "
                                            data-tip="Transaction History">
                                            {/* Home icon */}
                                            <FaHistory />
                                            <span className="is-drawer-close:hidden pl-2">Transaction History</span>
                                        </button>
                                    </Link>
                                </li>
                            </>
                        }


                        {
                            role === 'vendor' && <>
                                <li>
                                    <Link to="/dashboard/vendorProfile">
                                        <button className=" is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center justify-center " data-tip="Vendor Profile">
                                            {/* Home icon */}
                                            <FaUserTie />
                                            <span className="is-drawer-close:hidden pl-2">Vendor Profile</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/addTicket">
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center justify-center " data-tip="Add Ticket">
                                            {/* Home icon */}
                                            <IoTicket />
                                            <span className="is-drawer-close:hidden pl-2">Add Ticket</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/myAddedTickets">
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center justify-center " data-tip="My Added Ticket">
                                            {/* Home icon */}
                                            <LuTicketsPlane />
                                            <span className="is-drawer-close:hidden pl-2">My Added Tickets</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/requestedBooking">
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center justify-center " data-tip="Requested Booking">
                                            {/* Home icon */}
                                            <HiOutlineDocumentSearch />
                                            <span className="is-drawer-close:hidden pl-2">Requested Booking</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/revenueOverview">
                                        <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center justify-center" data-tip="Revenue Overview">
                                            {/* Home icon */}
                                            <RiLineChartLine />
                                            <span className="is-drawer-close:hidden pl-2">Revenue Overview</span>
                                        </button>
                                    </Link>
                                </li>

                            </>
                        }





                        {/* admin list */}
                        {
                            role === 'admin' && <>
                                <li>
                                    <Link to="/dashboard/adminProfile">
                                        <button className=" is-drawer-close:tooltip is-drawer-close:tooltip-right 
                                        flex items-center justify-center " data-tip="Admin Profile">
                                            {/* Home icon */}
                                            <FaUserTie />
                                            <span className="is-drawer-close:hidden pl-2">Admin Profile</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/manageTickets">
                                        <button className="is-drawer-close:tooltip
                                 is-drawer-close:tooltip-right flex items-center justify-center"
                                            data-tip="Manage Tickets">
                                            {/* Home icon */}
                                            <FaTicketAlt />
                                            <span className="is-drawer-close:hidden pl-2">Manage Tickets</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/mangeUsers">
                                        <button className="is-drawer-close:tooltip
                                 is-drawer-close:tooltip-right flex items-center justify-center"
                                            data-tip="Manage Users">
                                            {/* Home icon */}
                                            <FaUsersCog />
                                            <span className="is-drawer-close:hidden pl-2">Manage Users</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/dashboard/advertiseTickets">
                                        <button className="is-drawer-close:tooltip
                                 is-drawer-close:tooltip-right flex items-center justify-center"
                                            data-tip="Advertise Tickets">
                                            {/* Home icon */}
                                            <IoMegaphone />
                                            <span className="is-drawer-close:hidden pl-2">Advertise Tickets</span>
                                        </button>
                                    </Link>
                                </li>
                            </>
                        }


                        {/* List item */}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;