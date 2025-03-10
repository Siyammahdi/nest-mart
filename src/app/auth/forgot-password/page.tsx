import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | Nest Mart',
  description: 'Reset your Nest Mart account password.',
};

const ForgotPasswordPage = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage; 