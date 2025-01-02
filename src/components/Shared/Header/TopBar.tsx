import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-white py-2 text-sm text-gray-600 border-b border-gray-200">
      <div className="container mx-auto flex justify-between text-gray-500">
        <div className="flex ">
          <a href="#" className="hover:underline border-r pr-4">About Us</a>
          <a href="#" className="hover:underline border-r px-4">My Account</a>
          <a href="#" className="hover:underline border-r px-4">Wishlist</a>
          <a href="#" className="hover:underline px-4">Order Tracking</a>
        </div>
        <div>
          <p className='font-bold text-primary/70'>100% secured delevery without contacting courier</p>
        </div>
        <div className="flex">
          <span>Need help? Call Us: <a href="tel:1800900122" className="text-green-600 hover:underline">+880 1774010501</a></span>
          <a href="#" className="hover:underline border-r px-4">English</a>
          <a href="#" className="hover:underline pl-4">INR</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
