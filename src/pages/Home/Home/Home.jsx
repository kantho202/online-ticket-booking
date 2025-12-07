import React from 'react';
import Banner from '../Banner/Banner';
import LatestTickets from '../LatestTickets/LatestTickets';
import { PopularRoutes } from '../PopularRoutes/PopularRoutes';
import { WhyChooseUs } from '../WhyChooseUs/WhyChooseUs';
// import PopularRoutes from '../PopularRoutes/PopularRoutes';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto bg-[#faf7f5]'>
            
            <Banner></Banner>
            <LatestTickets></LatestTickets>
          <PopularRoutes></PopularRoutes>
          <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;