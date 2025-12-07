import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Shares/Navbar';
import Footer from '../pages/Shares/Footer';

const RootLayout = () => {

    return (
        <div className='bg-[#faf7f5]'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
    );
};

export default RootLayout;