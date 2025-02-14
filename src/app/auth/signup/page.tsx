import React from 'react';

import Newsletter from '../../homepage/Subscription/Newsletter';
import SignupForm from './SignupFrom';

const LoginPage = () => {
    return (
        <div className='max-w-7xl mx-auto py-20'>
            <h2 className="text-5xl text-text font-semibold mb-4">Sign Up</h2>
            <SignupForm />
            <Newsletter />
        </div>
    );
};

export default LoginPage;