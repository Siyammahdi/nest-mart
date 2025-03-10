import React from 'react';
import SignupForm from './SignupFrom';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Nest Mart',
  description: 'Create a new account at Nest Mart to start shopping and enjoy exclusive benefits.',
};

const SignupPage = () => {
  return (
    <div className='max-w-7xl h-screen flex flex-col justify-center mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <SignupForm />
    </div>
  );
};

export default SignupPage;