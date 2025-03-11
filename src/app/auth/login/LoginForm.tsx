'use client';

import { useState, FormEvent } from 'react';
import { BsEye, BsFacebook, BsApple } from 'react-icons/bs';
import { IoEyeOff } from 'react-icons/io5';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import api from '@/api/api'; // Import the API service
import { useRouter } from 'next/navigation'; // For Next.js navigation
import Link from 'next/link';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(''); // To display success/error messages
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const router = useRouter(); // For navigation

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setIsLoading(true);
    
    // Basic validation
    if (!email.trim()) {
      setMessage('Email is required');
      setMessageType('error');
      setIsLoading(false);
      return;
    }
    
    if (!password.trim()) {
      setMessage('Password is required');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.login(email, password);
      setMessage(response.message || 'Login successful!'); // Display success message
      setMessageType('success');
      console.log('User logged in successfully:', response);

      // Store the token and role in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);

      // Redirect based on the user's role after a short delay to show success message
      setTimeout(() => {
        if (response.role === 'admin') {
          router.push('/admin/dashboard'); // Redirect to admin dashboard
        } else {
          router.push('/'); // Redirect to user dashboard
        }
      }, 1500);
    } catch (error: unknown) {
      // Use type assertion to handle the error
      const err = error as { response?: { data?: { error: string } } };
      setMessage(err.response?.data?.error || 'Login failed. Please check your credentials.'); // Display error message
      setMessageType('error');
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // This would be implemented with actual OAuth providers
    console.log(`Login with ${provider}`);
    setMessage(`${provider} login is not implemented yet.`);
    setMessageType('error');
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center my-8 gap-8">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 max-w-md mx-auto">
        <div className="bg-white p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-text mb-6 text-center">Sign In to Your Account</h3>
          
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

            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 text-sm font-medium">Password</label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary-dark transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-primary"
                >
                  {showPassword ? <IoEyeOff size={20} /> : <BsEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
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
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FcGoogle className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <BsFacebook className="h-5 w-5 text-blue-600" />
              </button>
              <button
                onClick={() => handleSocialLogin('Apple')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <BsApple className="h-5 w-5 text-gray-800" />
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-primary hover:text-primary-dark transition-colors">
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Welcome Message */}
      <div className="w-full lg:w-1/2 px-4 lg:px-12 text-center lg:text-left space-y-5">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">Welcome Back!</h2>
        <p className="text-xl sm:text-2xl text-gray-700">
          Sign in to access your account and enjoy a personalized shopping experience at <span className="text-primary font-semibold">Nest Mart</span>
        </p>
        <div className="hidden lg:block mt-8">
          <Image 
            src="/auth/login-illustration.svg" 
            alt="Login Illustration" 
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

export default LoginForm;