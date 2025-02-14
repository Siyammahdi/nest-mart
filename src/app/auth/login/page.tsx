import React from 'react';
import LoginForm from './LoginForm';
import Newsletter from '../../homepage/Subscription/Newsletter';

const LoginPage = () => {
    return (
        <div className='max-w-7xl mx-auto py-20'>
            <h2 className="text-5xl text-text font-semibold mb-4">Login</h2>
            <LoginForm />
            <Newsletter />
        </div>
    );
};

export default LoginPage;