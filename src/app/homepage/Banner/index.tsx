import React from 'react';
import Categories from './Categories';
import Carousel from './Carousel';
import Ad from './Ad';

const Banner = () => {
    return (
        <div className='my-8 flex items-center gap-6'>
            <div className='w-[15%]'>
                <Categories />
            </div>
            <div className='w-[60%]'>
                <Carousel />
            </div>
            <div className='w-[25%]'>
                <Ad />
            </div>
        </div>
    );
};

export default Banner;