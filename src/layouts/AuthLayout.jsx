
import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../components/Logo/Logo';
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
