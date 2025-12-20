import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { useQuery } from '@tanstack/react-query';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Loader from '../../../components/Loading/Loading';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch, data: mangeUsers = [] ,isLoading} = useQuery({
        queryKey: ['mangeUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    if(isLoading){
        return <Loader></Loader>
    }
    const handleMakeAdmin = (user) => {

         const roleInfo = { role: 'admin' }
        Swal.fire({
            title: `Are you sure make admin?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make admin!"
        }).then((result) => {
            if (result.isConfirmed) {

               
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                      
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.displayName} marked as a admin`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })

            }
        });





    }

    const handleMakeVendor = (user) => {
        const roleInfo = { role: 'vendor' }
        Swal.fire({
            title: `Are you sure make vendor?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make vendor!"
        }).then((result) => {
            if (result.isConfirmed) {

                
                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.displayName} marked as a vendor`,
                                showConfirmButton: false,
                                timer: 1500
                            });


                        }
                    })

            }
        });



    }
    const handleMakeFraud=(user)=>{
          const roleInfo = { role: 'fraud' }
        Swal.fire({
            title: `Are you sure make fraud?`,
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make fraud!"
        }).then((result) => {
            if (result.isConfirmed) {

                
                axiosSecure.patch(`/users/mark-fraud/${user._id}`, roleInfo)
                    .then(res => {
                       
                        if (res.data.fraudUser.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.displayName} marked as a fraud`,
                                showConfirmButton: false,
                                timer: 1500
                            });


                        }
                    })

            }
        });
    }
    return (
        <div className=' min-h-screen '>
            {/* <h1 className='text-xl font-bold mb-4'>  transaction :{payments.length}</h1> */}
            <div className="hidden md:block overflow-x-auto rounded-lg px-10 pt-5 ">
                <table className="table table-zebra w-full text-base ">
                    {/* head */}
                    <thead className=' '>
                        <tr>
                            <th>#</th>

                            <th>Name</th>
                            <th className=''>Email</th>
                            <th>Role</th>

                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            mangeUsers.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td className='font-medium text-base text-center'>
                                    <div className="flex items-center  gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-left">{user.displayName}</div>
                                            <div className="text-sm opacity-50 text-left">{user.role}</div>
                                        </div>
                                    </div>
                                </td>



                                {/* <td className='font-medium text-base'>{user.displayName}</td> */}
                                <td className='font-medium text-base'>{user.email}</td>
                                <td className='font-medium text-base'>{user.role}</td>
                                {/* <td className='font-medium text-base'>{user.from}</td>
                                <td className='font-medium text-base'>{user.to}</td> */}
                                <td className='font-medium text-base space-x-3 text-center'>
                                    <button onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-primary btn-outline">Make Admin</button>
                                   
                                        {
                                    user?.role=== 'vendor' ? 
                                    <button onClick={()=>handleMakeFraud(user)} className="btn btn-primary ">Make Fraud </button>
                                    : 
                                    <button onClick={()=>handleMakeVendor(user)} className="btn btn-primary">Make Vendor</button>
                                }
                                </td>
                            </tr>)
                        }
                        {/* row 1 */}


                    </tbody>
                </table>
            </div>

            {/* mobile view  */}
            <div className="grid gap-4 md:hidden mt-4 px-10 pt-5">
                {mangeUsers.map((user, i) => (
                    <div key={user._id} className=" p-4 rounded-lg shadow-md">
                        <div className="flex justify-between">
                            <p className="font-bold text-xl text-primary">#{i + 1} </p>
                            {/* <p className="font-semibold text-primary"> 
                                <img src={user.photoURL} className='h-22 w-22' alt="" />
                            </p> */}
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img 
                                            alt=""
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                        </div>
                        <div className='py-5 '>
                            {/* <p className='text-2xl font-extrabold'><span className='text-primary  font-bold'>Ticket Title:</span> {p.ticket_title}</p> */}
                            <p className='font-semibold'><span className='text-primary font-bold'>Name:</span> {user.displayName}</p>
                            <p className='font-semibold'><span className='text-primary font-bold'>Email:</span> {user.email}</p>
                            <p className='font-semibold'><span className='text-primary font-bold'>Role:</span> <span className="break-all">{user.role}</span></p>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={()=>handleMakeAdmin(user)}
                                className="btn btn-primary btn-outline">Make Admin</button>
                                  {
                                    user?.role=== 'vendor' ? 
                                    <button onClick={()=>handleMakeFraud(user)} className="btn btn-primary ">Make Fraud </button>
                                    : 
                                    <button onClick={()=>handleMakeVendor(user)} className="btn btn-primary">Make Vendor</button>
                                }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;