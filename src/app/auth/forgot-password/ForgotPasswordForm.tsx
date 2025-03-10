'use client';

import { useState, FormEvent } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    // Basic validation
    if (!email.trim()) {
      setMessage('Email is required');
      setMessageType('error');
      setIsLoading(false);
      return;
    }
    
    try {
      // This would be implemented with an actual API call
      // const response = await api.forgotPassword(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage('Password reset instructions have been sent to your email address.');
      setMessageType('success');
      setEmail('');
    } catch (error) {
      setMessage('Failed to send password reset email. Please try again.');
      setMessageType('error');
      console.error('Error sending password reset email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center my-8 gap-8">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 max-w-md mx-auto">
        <div className="bg-white p-8 rounded-2xl border shadow-lg">
          <h3 className="text-2xl font-bold text-text mb-2 text-center">Forgot Your Password?</h3>
          <p className="text-gray-600 text-center mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          
          {/* Message display */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${
              messageType === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 flex justify-center">
            <Link href="/auth/login" className="text-sm text-primary hover:text-primary-dark transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="w-full lg:w-1/2 px-4 lg:px-12 text-center lg:text-left space-y-5">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">Password Recovery</h2>
        <p className="text-xl sm:text-2xl text-gray-700">
          Don't worry, we'll help you get back into your <span className="text-primary font-semibold">Nest Mart</span> account
        </p>
        <div className="hidden lg:block mt-8">
          <Image 
            src="/auth/forgot-password-illustration.svg" 
            alt="Forgot Password Illustration" 
            width={500} 
            height={400}
            className="mx-auto lg:mx-0"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 