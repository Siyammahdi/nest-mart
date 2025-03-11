import React, { ReactNode } from 'react';
import Link from 'next/link';

interface DashboardSummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  linkTo: string;
  linkText: string;
}

const DashboardSummaryCard = ({ 
  title, 
  value, 
  icon, 
  linkTo, 
  linkText 
}: DashboardSummaryCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-gray-100 mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
      <Link 
        href={linkTo}
        className="text-primary hover:text-primary-dark text-sm font-medium hover:underline"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default DashboardSummaryCard; 