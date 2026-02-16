import React from 'react';
import Banner from '../Banner/Banner';
import LatestTickets from '../LatestTickets/LatestTickets';
import { PopularRoutes } from '../PopularRoutes/PopularRoutes';
import { WhyChooseUs } from '../WhyChooseUs/WhyChooseUs';
import Advertisement from '../Advertisement/Advertisement';
import BookingProcess from '../BookingProcess/BookingProcess';
import TicketingFeatures from '../TicketingFeatures/TicketingFeatures';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Advertisement></Advertisement>
            <BookingProcess></BookingProcess>
            <LatestTickets></LatestTickets>
            <TicketingFeatures></TicketingFeatures>
            <PopularRoutes></PopularRoutes>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;