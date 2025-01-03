import React from 'react';
import Banner from './Banner';
import Featured from './Featured';
import Products from './Products';
import Subscription from './Subscription';

const Homepage = () => {
    return (
        <div>
            <Banner />
            <Featured />
            <Products />
            <Subscription />
        </div>
    );
};

export default Homepage;