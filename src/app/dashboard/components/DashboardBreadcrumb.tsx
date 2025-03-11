'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const DashboardBreadcrumb = () => {
  const pathname = usePathname();

  return (
    <div className="mb-6 flex justify-between items-center">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary">
              <FaHome className="mr-2" />
              Dashboard
            </Link>
          </li>
          {pathname !== '/dashboard' && (
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm font-medium text-primary">
                  {pathname.split('/').pop()?.charAt(0).toUpperCase() + pathname.split('/').pop()?.slice(1)}
                </span>
              </div>
            </li>
          )}
        </ol>
      </nav>
      
      <Link href="/" className="text-sm text-gray-600 hover:text-primary flex items-center">
        <FaArrowLeft className="mr-1" />
        Back to Home
      </Link>
    </div>
  );
};

export default DashboardBreadcrumb; 