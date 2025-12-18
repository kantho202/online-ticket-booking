import React from 'react';
import useAuth from '../hook/useAuth';
import useRole from '../hook/useRole';
import Loader from '../components/Loading/Loading';
import Forbidden from '../components/Forbidden/Forbidden';


const UserRoute = ({children}) => {
     const {user,loading}=useAuth()
       const {role,roleLoading}=useRole()
        if(loading || !user || roleLoading){
           return <Loader></Loader>
       }
   
       if(role!=='user'){
           return <Forbidden></Forbidden>
       }
       return children;
};

export default UserRoute;
