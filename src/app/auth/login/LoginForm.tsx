'use client';

import { useState, FormEvent } from 'react';
import { BsEye } from 'react-icons/bs';
import { IoEyeOff } from 'react-icons/io5';
import api from '@/api/api'; // Import the API service
import { useRouter } from 'next/navigation'; // For Next.js navigation
import Link from 'next/link';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(''); // To display success/error messages
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter(); // For navigation

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setIsLoading(true);
    try {
      const response = await api.login(email, password);
      setMessage(response.message); // Display success message
      console.log('User logged in successfully:', response);

      // Store the token and role in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);

      // Redirect based on the user's role
      if (response.role === 'admin') {
        router.push('/admin/dashboard'); // Redirect to admin dashboard
      } else {
        router.push('/'); // Redirect to user dashboard
      }
    } catch (error: unknown) {
      // Use type assertion to handle the error
      const err = error as { response?: { data?: { error: string } } };
      setMessage(err.response?.data?.error || 'Login failed'); // Display error message
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-20">
      <div className='w-1/2'>
        <div className="bg-white p-8 rounded-2xl border">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Username or Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-primary"
                >
                  {showPassword ? <IoEyeOff size={20} /> : <BsEye size={20} />}
                </button>
              </div>
            </div>

            <div className='flex items-center gap-6'>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                <span className="text-gray-700">Remember me</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/70 transition disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          {/* Display success/error messages */}
          {message && (
            <div className="mt-4 text-center">
              <p className={message.includes('successfully') ? 'text-green-600' : 'text-red-600'}>
                {message}
              </p>
            </div>
          )}

          <div className="mt-4 text-end">
            <a href="#" className="text-primary hover:underline">Lost your password?</a>
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <Link href="/admin/dashboard">
            <button className="bg-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-primary/70 transition">
              Admin Dashboard
            </button>
          </Link>

          <Link href="/">
            <button className="bg-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-primary/70 transition">
              Home page
            </button>
          </Link>
        </div>

      </div>

      <div className='w-1/2 mx-32 text-center space-y-5'>
        <h2 className='text-5xl font-semibold text-primary'>Welcome Back</h2>
        <h4 className='text-3xl text-text'>Login to get a great experience of <span className='text-primary font-semibold'>e-shopping</span></h4>
      </div>
    </div>
  );
};

export default LoginForm;