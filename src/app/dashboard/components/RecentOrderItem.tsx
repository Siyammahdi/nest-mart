import React, { ReactNode } from 'react';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';

interface OrderProps {
  id: string;
  date: string;
  status: string;
  total: number;
  items: number;
  statusIcon: ReactNode;
}

interface RecentOrderItemProps {
  order: OrderProps;
}

const RecentOrderItem = ({ order }: RecentOrderItemProps) => {
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{order.id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="mr-2">{order.statusIcon}</span>
          <span className="text-sm text-gray-900">{order.status}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">${order.total.toFixed(2)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{order.items}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Link 
          href={`/dashboard/orders/${order.id}`}
          className="text-primary hover:text-primary-dark inline-flex items-center"
        >
          <FaEye className="mr-1" />
          <span>View</span>
        </Link>
      </td>
    </tr>
  );
};

export default RecentOrderItem; 