
import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../components/Logo/Logo';
import useAuth from '../../hook/useAuth';
const Navbar = () => {
    const {user,signOutUser}=useAuth()
    const links=<>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/allTickets">All Tickets</NavLink></li>
    <li><NavLink to="/dashboard/vendorProfile">Dashboard</NavLink></li>
    </>
    const handleLogout=()=>{
            signOutUser()
            .then(res=>{
                console.log(res.data)
            })
            .catch(error=>
                console.log(error)
            )
    }
    return (
        <div className="navbar bg-[#faf7f5] w-11/12 mx-auto ">
               <div className="lg:hidden">
                    <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">


                        <label htmlFor="my-drawer-1" className="">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>

                        </label>
                    </div>
                    <div className="drawer-side flex items-end ">
                        <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 min-h-full text-center w-80 p-4">

                            {links}
                            <Link to="/login" className="btn btn-sm mr-4 mb-3 btn-outline w-full ">LogIn</Link>
                            <Link to="/register" className="btn btn-sm w-full my-btn ">Register</Link>
                        </ul>
                    </div>
                </div>

            <div className="navbar-start">
                {/* <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                       {links}
                    </ul>
                </div> */}
               <Logo></Logo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                   {links}
                </ul>
            </div>
            <div className="navbar-end space-x-2.5">
                {
                    user ?  
                    //  <button onClick={handleLogout} className='btn btn-primary btn-outline'>Logout</button>
                     <div className="flex gap-2 mr-4">

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-md dropdown-content bg-base-100 rounded-box z-2 mt-3 w-70 p-2 shadow">
                                    <li className=''>
                                        <Link to="/dashboard/vendorProfile" className="justify-between mb-3 ">
                                            <h2>My Profile</h2>
                                            {/* {user?.displayName} */}
                                            {/* <span className="badge">New</span> */}
                                        </Link>
                                    </li>
                                    {/* <li><Link to="/dashboard/vendorProfile" className='mb-3 p-2'>{user?.email}</Link></li> */}
                                    <button onClick={handleLogout} className='btn btn-sm btn-outline my-btn '>LogOut</button>

                                </ul>
                            </div>
                        </div>
                    :
                    <>
                        <Link to="/login"><button className='btn btn-primary btn-outline'>Log in</button></Link>
                <Link to="/register"><button className='btn btn-primary'>Register</button></Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;