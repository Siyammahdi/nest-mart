'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaShoppingBag, 
  FaHeart, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaUser
} from 'react-icons/fa';
import Link from 'next/link';
import DashboardSummaryCard from './components/DashboardSummaryCard';
import RecentOrderItem from './components/RecentOrderItem';

// Mock data for recent orders
const recentOrders = [
  {
    id: 'ORD-12345',
    date: '2023-03-08',
    status: 'Delivered',
    total: 125.99,
    items: 3,
    statusIcon: <FaCheckCircle className="text-green-500" />
  },
  {
    id: 'ORD-12344',
    date: '2023-03-01',
    status: 'Shipped',
    total: 89.99,
    items: 2,
    statusIcon: <FaTruck className="text-blue-500" />
  },
  {
    id: 'ORD-12343',
    date: '2023-02-25',
    status: 'Processing',
    total: 45.50,
    items: 1,
    statusIcon: <FaBox className="text-yellow-500" />
  }
];

export default function Dashboard() {
  const [userName, setUserName] = useState('User');
  
  useEffect(() => {
    // In a real app, you would fetch user data from your auth system
    const storedUserName = localStorage.getItem('name') || 'User';
    setUserName(storedUserName);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Hello {userName}, welcome to your dashboard!</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardSummaryCard 
          title="Total Orders"
          value="12"
          icon={<FaShoppingBag className="text-primary" size={24} />}
          linkTo="/dashboard/orders"
          linkText="View All Orders"
        />
        <DashboardSummaryCard 
          title="Wishlist Items"
          value="8"
          icon={<FaHeart className="text-red-500" size={24} />}
          linkTo="/dashboard/wishlist"
          linkText="View Wishlist"
        />
        <DashboardSummaryCard 
          title="Saved Addresses"
          value="3"
          icon={<FaMapMarkerAlt className="text-blue-500" size={24} />}
          linkTo="/dashboard/addresses"
          linkText="Manage Addresses"
        />
        <DashboardSummaryCard 
          title="Member Since"
          value="Mar 2023"
          icon={<FaCalendarAlt className="text-green-500" size={24} />}
          linkTo="/dashboard/profile"
          linkText="View Profile"
        />
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <RecentOrderItem key={order.id} order={order} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
              <FaUser className="text-blue-500" size={16} />
            </div>
            <div>
              <p className="text-gray-800">You updated your profile information</p>
              <p className="text-sm text-gray-500">2 days ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-4">
              <FaShoppingBag className="text-green-500" size={16} />
            </div>
            <div>
              <p className="text-gray-800">You placed order #ORD-12345</p>
              <p className="text-sm text-gray-500">1 week ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-purple-100 rounded-full p-2 mr-4">
              <FaHeart className="text-purple-500" size={16} />
            </div>
            <div>
              <p className="text-gray-800">You added 3 items to your wishlist</p>
              <p className="text-sm text-gray-500">2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 