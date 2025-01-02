import React from 'react';
import Popular from './Popular/Popular';
import Supplier from './Popular/Supplier';
import BestSell from './Sells/BestSell';
import DayDeals from './Sells/DayDeals';
import Trending from './Trending/Trending';

const Products = () => {
    return (
        <div>
            <Popular />
            <Supplier />
            <BestSell />
            <DayDeals />
            <Trending />
        </div>
    );
};

export default Products;