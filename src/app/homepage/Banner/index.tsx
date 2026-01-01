import React from 'react';
import Categories from './Categories';
import Carousel from './Carousel';
import Ad from './Ad';

const Banner = () => {
    return (
        <div className='w-full px-4 my-8 max-w-9xl mx-auto'>
            <div className='flex flex-col lg:flex-row items-start gap-4 lg:gap-6'>
                <div className='w-full lg:w-[20%] lg:min-w-[200px] lg:max-w-[250px]'>
                    <Categories />
                </div>
                <div className='w-full lg:flex-1 flex flex-col md:flex-row items-stretch gap-4 lg:gap-6'>
                    <div className='w-full md:w-[60%] lg:flex-1'>
                        <Carousel />
                    </div>
                    <div className='w-full md:w-[35%] lg:w-[30%] md:max-w-[400px]'>
                        <Ad />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;