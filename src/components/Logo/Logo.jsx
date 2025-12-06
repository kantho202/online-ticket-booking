
import React from 'react';
import { MdOutlineAirplaneTicket } from 'react-icons/md';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
             <Link to="/" className="flex justify-center items-center font-bold logo text-xl"> 
                <MdOutlineAirplaneTicket color='orange' size={33} />EasyTrip <span className='text-orange-400'>Ticket</span></Link>
        </div>
    );
};

export default Logo;