import React from 'react';
import TopBar from './TopBar';
import SearchBar from './SearchBar';
import Navbar from './Navbar';


const Header = () => {
    return (
        <div className='space-y-4'>
            <TopBar />
            <SearchBar />
            <Navbar />
        </div>
    );
};

export default Header;