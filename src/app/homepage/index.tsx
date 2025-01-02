import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import Products from './Products';

const Homepage = () => {
    return (
        <div>
            <Banner />
            <Featured />
            <Products />
        </div>
    );
};

export default Homepage;