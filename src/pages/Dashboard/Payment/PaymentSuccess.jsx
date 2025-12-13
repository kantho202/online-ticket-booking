import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hook/useAxiosecure';

const PaymentSuccess = () => {
    const  [searchParams]=useSearchParams()
    const axiosSecure =useAxiosSecure()
    const [paymentInfo ,setPaymentInfo]=useState({})
    const sessionId =searchParams.get('session_id')
    console.log(sessionId)

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data)
                setPaymentInfo({transactionId: res.data.transactionId})
            })
        }
    },[sessionId,axiosSecure])
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <h1 className="text-3xl font-bold text-primary">Payment Successfully</h1>
            <h1 className="text-xl font-bold text-primary">TransactionId :{paymentInfo?.transactionId}</h1>
            <Link to="/"><button className="btn btn-primary">Back</button></Link>
            {/* <h2>Trancaction id:{paymentInfo?.transactionId}</h2> */}
        </div>
    );
};

export default PaymentSuccess;