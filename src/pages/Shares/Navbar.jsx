
import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../components/Logo/Logo';
import useAuth from '../../hook/useAuth';
const Navbar = () => {
    const {user,signOutUser}=useAuth()
    const links=<>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/allTickets">All Tickets</NavLink></li>
    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
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
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                       {links}
                    </ul>
                </div>
               <Logo></Logo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                   {links}
                </ul>
            </div>
            <div className="navbar-end space-x-2.5">
                {
                    user ?   <button onClick={handleLogout} className='btn btn-primary btn-outline'>Logout</button>
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