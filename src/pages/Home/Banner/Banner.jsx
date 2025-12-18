
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../../assets/train.png';
import bannerImg2 from '../../../assets/bus.jpg';
import bannerImg3 from '../../../assets/travel.png';
import { Carousel } from 'react-responsive-carousel';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';

const Banner = () => {
    return (
        <Carousel className=''
            autoPlay={true}
            infiniteLoop={true}
        >
            <div className='relative'>
                <img src={bannerImg1} />
              
            </div>
            <div>
                <img src={bannerImg2} />
            </div>
            <div>
                <img src={bannerImg3} />
            </div>
        </Carousel>
    );
};

export default Banner;
