
import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex flex-col space-y-2.5 justify-center items-center min-h-screen'>
            <h2 className="text-2xl">404 page not found</h2>
            <Link to="/" className="btn btn-primary">Home</Link>
        </div>
    );
};

export default Error;