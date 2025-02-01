import React from 'react';
import LoginForm from './LoginForm';
import Newsletter from '../homepage/Subscription/Newsletter';

const LoginPage = () => {
    return (
        <div>
            <h2 className="text-5xl text-text font-semibold mt-28 mb-4">Login</h2>
            <LoginForm />
            <Newsletter />
        </div>
    );
};

export default LoginPage;