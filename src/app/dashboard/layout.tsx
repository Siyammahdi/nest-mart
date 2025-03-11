'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaShoppingBag, 
  FaHeart, 
  FaUser, 
  FaMapMarkerAlt, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaHome
} from 'react-icons/fa';
import DashboardBreadcrumb from './components/DashboardBreadcrumb';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('User');
  
  useEffect(() => {
    // In a real app, you would fetch user data from your auth system
    // This is just a placeholder
    const storedUserName = localStorage.getItem('name') || 'User';
    setUserName(storedUserName);
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt className="mr-2" /> },
    { path: '/dashboard/orders', label: 'My Orders', icon: <FaShoppingBag className="mr-2" /> },
    { path: '/dashboard/wishlist', label: 'Wishlist', icon: <FaHeart className="mr-2" /> },
    { path: '/dashboard/profile', label: 'Profile', icon: <FaUser className="mr-2" /> },
    { path: '/dashboard/addresses', label: 'Addresses', icon: <FaMapMarkerAlt className="mr-2" /> },
  ];

  const handleLogout = () => {
    // In a real app, you would implement proper logout logic
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside 
          className={`
            ${isMobileMenuOpen ? 'block' : 'hidden'} 
            lg:block lg:w-64 transition-all duration-300 ease-in-out
            bg-white shadow-md z-20 fixed lg:sticky top-0 left-0 h-screen overflow-y-auto
          `}
        >
          <div className="p-6">
            <div className="mb-6">
              <Link href="/" className="flex items-center mb-8">
                <FaHome className="text-primary mr-2" size={24} />
                <span className="text-xl font-bold text-primary">Nest Mart</span>
              </Link>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">Welcome, {userName}</h2>
              </div>
            </div>
            
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`
                      flex items-center px-4 py-3 rounded-lg transition-colors
                      ${pathname === item.path 
                        ? 'bg-primary text-white' 
                        : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {/* Mobile menu button */}
          <div className="lg:hidden sticky top-0 z-30 bg-white p-4 shadow-md flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Nest Mart</span>
            </Link>
            <button 
              onClick={toggleMobileMenu}
              className="bg-primary text-white p-2 rounded-md"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          <div className="p-4 lg:p-8">
            <DashboardBreadcrumb />
            <div className="bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 