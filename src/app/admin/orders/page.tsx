"use client"

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import orders from "@/mock/orders"
import { MdDeleteOutline } from "react-icons/md";
import { 
  FaSearch, FaFilter, FaSort, FaEye, 
  FaCheckCircle, FaTruck, FaBox, FaClock, 
  FaBan, FaDownload, FaPrint
} from 'react-icons/fa';
import Link from 'next/link';

const Orders = () => {
    const [orders, setOrders] = useState(orders);
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [paymentStatusFilter, setPaymentStatusFilter] = useState('All');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [sortField, setSortField] = useState('date');
    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    // Filter and sort orders
    useEffect(() => {
        let result = [...orders];
        
        // Apply search filter
        if (searchTerm) {
            result = result.filter(order => 
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply status filter
        if (statusFilter !== 'All') {
            result = result.filter(order => order.status === statusFilter);
        }
        
        // Apply payment status filter
        if (paymentStatusFilter !== 'All') {
            result = result.filter(order => order.paymentStatus === paymentStatusFilter);
        }
        
        // Apply date range filter
        if (dateRange.from) {
            result = result.filter(order => new Date(order.date) >= new Date(dateRange.from));
        }
        if (dateRange.to) {
            result = result.filter(order => new Date(order.date) <= new Date(dateRange.to));
        }
        
        // Apply sorting
        result.sort((a, b) => {
            if (sortField === 'date') {
                return sortDirection === 'asc' 
                    ? new Date(a.date).getTime() - new Date(b.date).getTime()
                    : new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            
            if (sortField === 'total') {
                return sortDirection === 'asc' ? a.total - b.total : b.total - a.total;
            }
            
            if (a[sortField] < b[sortField]) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
        
        setFilteredOrders(result);
    }, [orders, searchTerm, statusFilter, paymentStatusFilter, dateRange, sortField, sortDirection]);

    // Handle sort
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Handle status update
    const handleStatusUpdate = (newStatus) => {
        if (!selectedOrder) return;
        
        const updatedOrders = orders.map(order => 
            order.id === selectedOrder.id ? { ...order, status: newStatus } : order
        );
        
        setOrders(updatedOrders);
        setIsStatusModalOpen(false);
    };

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered':
                return <FaCheckCircle className="text-green-500" />;
            case 'Shipped':
                return <FaTruck className="text-blue-500" />;
            case 'Processing':
                return <FaBox className="text-yellow-500" />;
            case 'Pending':
                return <FaClock className="text-orange-500" />;
            case 'Cancelled':
                return <FaBan className="text-red-500" />;
            default:
                return null;
        }
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'bg-green-100 text-green-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'Pending':
                return 'bg-orange-100 text-orange-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get payment status color
    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'Paid':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-orange-100 text-orange-800';
            case 'Refunded':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Orders Management</h1>
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                        <FaDownload className="mr-2" />
                        Export
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
                        <FaPrint className="mr-2" />
                        Print
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center">
                        <FaFilter className="text-gray-400 mr-2" />
                        <select
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <FaFilter className="text-gray-400 mr-2" />
                        <select
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            value={paymentStatusFilter}
                            onChange={(e) => setPaymentStatusFilter(e.target.value)}
                        >
                            {['All', 'Pending', 'Paid', 'Refunded'].map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="date"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            value={dateRange.from}
                            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                        />
                        <span className="text-gray-500">to</span>
                        <input
                            type="date"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            value={dateRange.to}
                            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('id')}
                                >
                                    <div className="flex items-center">
                                        Order ID
                                        <FaSort className="ml-1" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('customer')}
                                >
                                    <div className="flex items-center">
                                        Customer
                                        <FaSort className="ml-1" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('date')}
                                >
                                    <div className="flex items-center">
                                        Date
                                        <FaSort className="ml-1" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('total')}
                                >
                                    <div className="flex items-center">
                                        Total
                                        <FaSort className="ml-1" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-primary">{order.id}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                                            <div className="text-sm text-gray-500">{order.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">${order.total.toFixed(2)}</div>
                                            <div className="text-sm text-gray-500">{order.items} items</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button 
                                                className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setIsStatusModalOpen(true);
                                                }}
                                            >
                                                <span className="mr-1">{getStatusIcon(order.status)}</span>
                                                {order.status}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                                                {order.paymentStatus}
                                            </span>
                                            <div className="text-xs text-gray-500 mt-1">{order.paymentMethod}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/admin/orders/${order.id}`} className="text-primary hover:text-primary-dark">
                                                <FaEye />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                        No orders found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isStatusModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Order Status</h2>
                        <p className="text-gray-600 mb-6">
                            Change status for order <span className="font-semibold">{selectedOrder.id}</span>
                        </p>
                        <div className="space-y-3 mb-6">
                            {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusUpdate(status)}
                                    className={`w-full flex items-center px-4 py-2 rounded-lg ${
                                        selectedOrder.status === status 
                                            ? getStatusColor(status) 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <span className="mr-2">{getStatusIcon(status)}</span>
                                    {status}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsStatusModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
