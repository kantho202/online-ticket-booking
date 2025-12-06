import React from 'react';
import useAuth from '../../../hook/useAuth';

const VendorProfile = () => {
    const { user } = useAuth()
    return (
        <div className='flex items-center shadow-xl max-w-3xl mx-auto border-2 gap-7 p-10 rounded-[5px] border-base-300'>
            {/* image  */}
            <div className='flex-1'>
                <img src={user.photoURL} className='h-100 w- rounded-[10px] ' alt="" />

            </div>
            {/* profile details */}
            <div className='flex-1 text-center space-y-2.5'>
                <h2 className='font-bold text-5xl '>Vendor profile</h2>
                <h1 className='text-2xl font-normal'>Name: {user.displayName}</h1>
                <h1 className='text-2xl font-normal'>Email: {user.email}</h1>
            </div>
        </div>
    );
};

export default VendorProfile;