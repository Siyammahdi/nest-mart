'use client';

import React from 'react';
import { FaShoppingBag, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

interface WelcomeBannerProps {
  userName: string;
}

const WelcomeBanner = ({ userName }: WelcomeBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-primary to-teal-800/90 text-white rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back, {userName}!</h2>
          <p className="text-white/80 mb-4 md:mb-0">
            From your account dashboard you can view your recent orders, manage your shipping addresses, and edit your account details.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Link 
            href="/dashboard/orders" 
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <FaShoppingBag className="mr-2" />
            <span>My Orders</span>
          </Link>
          <Link 
            href="/dashboard/profile" 
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <FaUser className="mr-2" />
            <span>Edit Profile</span>
          </Link>
          <Link 
            href="/dashboard/addresses" 
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition-colors flex items-center"
          >
            <FaMapMarkerAlt className="mr-2" />
            <span>Addresses</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner; 