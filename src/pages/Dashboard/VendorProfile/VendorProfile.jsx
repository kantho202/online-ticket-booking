import React from 'react';
import useAuth from '../../../hook/useAuth';


const VendorProfile = () => {
    const { user } = useAuth();
   
    return (
        <div className="min-h-screen flex items-center justify-center text-base-content p-6">
            <div className="backdrop-blur-xl  border border-white/40 shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center 
                            transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    <img
                        src={user?.photoURL || user.photo}
                        alt="Vendor"
                        className="w-40 h-40 rounded-full shadow-xl object-cover ring-4 ring-white/70 hover:ring-orange-400 
                                   transition-all duration-300"
                    />
                </div>

                {/* Title */}
                <h2 className="text-4xl font-extrabold  tracking-wide mb-3">
                     Profile
                </h2>

                {/* Divider */}
                <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-500 mx-auto rounded-full mb-6"></div>

                {/* Profile Information */}
                <div className="space-y-3">
                    <p className="text-xl font-semibold ">
                        Name: <span className="font-normal">{user.displayName || user.name}</span>
                    </p>

                    <p className="text-xl font-semibold ">
                        Email: <span className="font-normal">{user.email}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
