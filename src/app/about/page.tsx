import React from 'react';
import Welcome from './components/Welcome';
import Features from './components/Features';

const AboutPage = () => {
    return (
        <div className='my-20 space-y-20'>
            <Welcome />
            <Features />
        </div>
    );
};

export default AboutPage;