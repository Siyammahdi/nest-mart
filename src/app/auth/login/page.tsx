import React from 'react';
import LoginForm from './LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Nest Mart',
  description: 'Sign in to your Nest Mart account to access your profile, orders, and more.',
};

const LoginPage = () => {
  return (
    <div className='max-w-7xl h-screen flex flex-col justify-center mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <LoginForm />
    </div>
  );
};

export default LoginPage;