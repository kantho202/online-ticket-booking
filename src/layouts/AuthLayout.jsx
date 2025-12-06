
import React from 'react';

import { Outlet } from 'react-router';
import Loading from '../components/Loading/Loading';
import Logo from '../components/Logo/Logo';
import Navbar from '../pages/Shares/Navbar';
const AuthLayout = () => {
   
    return (
       <div className='w-11/12 mx-auto pt-3'>
        <Logo></Logo>
        <div className='flex justify-center items-center'>
        <Outlet></Outlet>
       </div>
       </div>
    );
};

export default AuthLayout;
