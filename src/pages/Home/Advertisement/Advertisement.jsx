import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosecure';
import { Link } from 'react-router';
import Loader from '../../../components/Loading/Loading';
import styled from 'styled-components';

const Advertisement = () => {
    const axiosSecure = useAxiosSecure()
    const { data: advertise = [], isLoading } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tickets?isAdvertised=advertise')
            return res.data
        }
    })
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className=' py-10 w-11/12 mx-auto text-base-content'>
            {/* <h1>home ticket {homeTicket.length}</h1> */}
            <div className="p-0 lg:p-6 min-h-screen ">
                <h1 className="text-2xl font-bold  text-base-content mb-8 text-center">Advertisement</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {advertise.map(ticket => (
                        <div
                            key={ticket._id}
                            className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden
                         transform transition hover:-translate-y-1 hover:shadow-2xl  "
                        >
                            {/* Ticket Image */}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={ticket.image}
                                    alt={ticket.ticketTitle}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>

                            {/* Ticket Content */}
                            <div className="p-5 space-y-3">
                                <h2 className="text-[28px] font-bold logo ">{ticket.ticketTitle}</h2>
                                <p><span className="font-semibold">Name:</span> {ticket.name}</p>
                                <p><span className="font-semibold">Transport:</span> {ticket.transport}</p>
                                <p><span className="font-semibold">Quantity:</span> {ticket.ticketQuantity}</p>
                                <p><span className="font-semibold">Price:</span> ৳ {ticket.price}</p>
                               

                                {/* Perks */}
                                {ticket.perks && ticket.perks?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {ticket.perks.map((perk, index) => (
                                            <span
                                                key={index}
                                                className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium"
                                            >
                                                {perk}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="pt-3 flex justify-between">
                                    <Link to={`/seeDetails/${ticket._id}`}
                                    
                                    >
                                        <StyledWrapper>
                                            <div className="learn-more">
                                                <span className="circle" aria-hidden="true">
                                                    <span className="icon arrow" />
                                                </span>
                                                <span className="button-text">See details</span>
                                            </div>
                                        </StyledWrapper>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};
const StyledWrapper = styled.div`
  button {
   position: relative;
   display: inline-block;
   cursor: pointer;
   outline: none;
   border: 0;
   vertical-align: middle;
   text-decoration: none;
   background: transparent;
   padding: 0;
  
  }

  button.learn-more {
   width: 12rem;
   height: auto;
  }

  button.learn-more .circle {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: relative;
   display: block;
   margin: 0;
   width: 3rem;
   height: 3rem;
   background: orange;
   border-radius: 1.625rem;
  }

  button.learn-more .circle .icon {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   bottom: 0;
   margin: auto;
   background: #fff;
  }

  button.learn-more .circle .icon.arrow {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   left: 0.625rem;
   width: 1.125rem;
   height: 0.125rem;
   background: none;
  }

  button.learn-more .circle .icon.arrow::before {
   position: absolute;
   content: "";
   top: -0.29rem;
   right: 0.0625rem;
   width: 0.625rem;
   height: 0.625rem;
   border-top: 0.125rem solid #fff;
   border-right: 0.125rem solid #fff;
   transform: rotate(45deg);
  }

  button.learn-more .button-text {
   transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   padding: 0.75rem 0;
  
   
   font-weight: 700;
   line-height: 1.6;
   text-align: center;
   
  }

  button:hover .circle {
   width: 90%;
  }

  button:hover .circle .icon.arrow {
   background: #fff;
   transform: translate(1rem, 0);
  }

  button:hover .button-text {
   color: #fff;
  }`;
export default Advertisement;