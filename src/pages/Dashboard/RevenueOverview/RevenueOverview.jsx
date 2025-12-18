import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';

const RevenueOverview = () => {
    const axiosSecure = useAxiosSecure()
    const { data: revenue = [] } = useQuery({
        queryKey: ['bookings-star'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings/status')
            return res.data;
        }
    })
    return (
        <div className="stats shadow w-full px-10 pt-5">
            {/* <h1>{revenue.length}</h1> */}
            {
                revenue.map((rev) => <div key={rev._id} className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title text-2xl">{rev._id}</div>
                    <div className="stat-value">{rev.count}</div>
                   
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>)
            }

        </div>
    );
};

export default RevenueOverview;