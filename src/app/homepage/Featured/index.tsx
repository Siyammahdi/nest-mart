import React from 'react';
import CategorySlider from './CategorySlider';
import FeaturedProducts from './FeaturedProducts';

const Featured = () => {
    return (
        <div className='mx-4'>
            <CategorySlider />
            <FeaturedProducts />
        </div>
    );
};

export default Featured;