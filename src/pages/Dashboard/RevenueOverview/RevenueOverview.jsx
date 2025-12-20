import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import Loader from '../../../components/Loading/Loading';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RevenueOverview = () => {
    const axiosSecure = useAxiosSecure()
    const { data: revenue = {}, isLoading } = useQuery({
        queryKey: ['bookings-star'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/summary')
            return res.data;
        }
    })
    if (isLoading) {
        return <Loader></Loader>
    }
    const data = [
        {
            name: 'Total Revenue',
            amount: revenue.totalRevenue
        },
        {
            name: 'Total Ticket Sold',
            amount: revenue.totalTicketSold
        },
        {
            name: 'Total Ticket Added',
            amount: revenue.totalTicketAdded
        },
    ]
    // const getChatData=()=>{
    //     return data
    // }
    return (
        <div>

            <div className="stats shadow w-full px-5 lg:px-10 pt-5 text-base-content">
                {/* <h1>{revenue.length}</h1> */}

                <div className="stats shadow flex">
                    <div className="stat place-items-center ">
                        <div className="stat-title text-2xl">Total Revenue</div>
                        <div className="stat-value text-secondary">{revenue.totalRevenue}Tk</div>
                        <div className="stat-desc">↗︎ 50 (20%)</div>
                    </div>

                    <div className="stat place-items-center ">
                        <div className="stat-title text-2xl">Total Ticket Sold</div>
                        <div className="stat-value text-secondary">{revenue.totalTicketSold}</div>
                        <div className="stat-desc ">↗︎ 40 (2%)</div>
                    </div>

                    <div className="stat place-items-center ">
                        <div className="stat-title text-2xl">Total Ticket Added</div>
                        <div className="stat-value text-secondary">{revenue.totalTicketAdded}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>


            </div>
            {/* chat */}
            <div className='pt-15'>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="amount" stroke="orange" fill="orange" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default RevenueOverview;