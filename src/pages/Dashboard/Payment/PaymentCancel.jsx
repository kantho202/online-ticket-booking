import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className='flex  flex-col font-bold justify-center items-center min-h-screen'>
            <h1 className="py-2 text-3xl text-primary">Payment Unsuccessfully</h1>
            <Link to="/dashboard/myBookedTickets" className='btn btn-primary'> Try Again</Link>
        </div>
    );
};

export default PaymentCancel;