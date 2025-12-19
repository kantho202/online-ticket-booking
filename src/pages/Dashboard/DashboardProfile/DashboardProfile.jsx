import React from 'react';
import useRole from '../../../hook/useRole';
import Loader from '../../../components/Loading/Loading';
import AdminProfile from './AdminProfile';
import VendorProfile from './VendorProfile';
import UserProfile from './UserProfile';

const DashboardProfile = () => {
    const {role, roleLoading}=useRole()
    if(roleLoading){
        return <Loader></Loader>
    }
    if(role === 'admin'){
        return <AdminProfile></AdminProfile>
    }
    else if(role === 'vendor'){
        return <VendorProfile></VendorProfile>
    }
    else {
        return <UserProfile></UserProfile>
    }
  
};

export default DashboardProfile;