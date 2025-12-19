import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import useAuth from '../../../hook/useAuth';
import Loader from '../../../components/Loading/Loading';

const TransactionHistory = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: payments = [] ,isLoading} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })
    if(isLoading){
        return <Loader></Loader>
    }
    return (
        <div className='text-base-content min-h-screen pt-5 px-10'>
            {/* <h1 className='text-xl font-bold mb-4'>  transaction :{payments.length}</h1> */}
            <div className="hidden md:block overflow-x-auto rounded-lg  ">
                <table className="table table-zebra w-full text-base">
                    {/* head */}
                    <thead className='text-center '>
                        <tr>
                            <th>#</th>

                            <th>Ticket Title</th>
                            <th>Email</th>
                            <th>Transaction Id</th>
                            <th>Payment Time</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            payments.map((payment, i) => <tr key={payment._id}>
                                <th>{i + 1}</th>
                                <td className='font-medium text-base'>{payment.ticketName}</td>
                                <td className='font-medium text-base'>{payment.email}</td>
                                <td className='font-medium text-base'>{payment.transactionId}</td>
                                <td className='font-medium text-base'>{payment.paidAt}</td>
                                <td className='font-medium text-base'>{payment.amount}Tk</td>
                            </tr>)
                        }
                        {/* row 1 */}


                    </tbody>
                </table>
            </div>

            {/* mobile view  */}
             <div className="grid gap-4 md:hidden mt-4">
                {payments.map((p, i) => (
                    <div key={p._id} className=" p-4 rounded-lg shadow-md">
                        <div className="flex justify-between">
                            <p className="font-bold text-lg">#{i + 1}</p>
                            <p className="font-semibold text-primary">{p.amount} Tk</p>
                                </div>
                        <p><span className='text-primary font-bold'>Ticket:</span> {p.ticketName}</p>
                        <p><span className='text-primary font-bold'>Email:</span> {p.email}</p>
                        <p><span className='text-primary font-bold'>Txn ID:</span> <span className="break-all">{p.transactionId}</span></p>
                        <p><span className='text-primary font-bold'>Time:</span> {p.paidAt}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionHistory;