import React from 'react';
import Categories from './Categories';
import Carousel from './Carousel';
import Ad from './Ad';

const Banner = () => {
    return (
        <div className='w-[100%] my-8 mx-4 flex flex-col lg:flex-row items-center gap-6'>
            <div className='w-[30%]'>
                <Categories />
            </div>
            <div className='w-full flex flex-col md:flex-row items-center gap-6'>
                <div className='w-full md:w-[60%]'>
                    <Carousel />
                </div>
                <div className='w-full md:w-[25%]'>
                    <Ad />
                </div>
            </div>
        </div>
    );
};

export default Banner;