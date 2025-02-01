'use client';

import { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { IoEyeOff } from 'react-icons/io5';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="bg-white p-8 rounded-2xl border w-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username or Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/70 transition"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-primary hover:underline">Lost your password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
