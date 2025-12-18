import React from 'react';
import Banner from '../Banner/Banner';
import LatestTickets from '../LatestTickets/LatestTickets';
import { PopularRoutes } from '../PopularRoutes/PopularRoutes';
import { WhyChooseUs } from '../WhyChooseUs/WhyChooseUs';
import Advertisement from '../Advertisement/Advertisement';
// import PopularRoutes from '../PopularRoutes/PopularRoutes';

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Advertisement ></Advertisement>
            <LatestTickets ></LatestTickets>
          <PopularRoutes ></PopularRoutes>
          <WhyChooseUs ></WhyChooseUs>
        </div>
    );
};

export default Home;