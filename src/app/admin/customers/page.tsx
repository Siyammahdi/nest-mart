'use client';

import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaFilter, FaSort, FaEye, 
  FaUserEdit, FaEnvelope, FaPhone, 
  FaMapMarkerAlt, FaShoppingBag, FaCalendarAlt,
  FaDownload, FaUserPlus
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

// Sample customer data
const initialCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    joinDate: '2023-01-15',
    totalOrders: 12,
    totalSpent: 1245.99,
    lastPurchase: '2023-03-01',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Park Ave, Boston, MA 02115',
    joinDate: '2023-02-10',
    totalOrders: 8,
    totalSpent: 879.50,
    lastPurchase: '2023-02-28',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Oak St, Chicago, IL 60007',
    joinDate: '2023-01-05',
    totalOrders: 5,
    totalSpent: 432.25,
    lastPurchase: '2023-02-15',
    status: 'Inactive',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 234-5678',
    address: '321 Pine St, San Francisco, CA 94101',
    joinDate: '2023-02-20',
    totalOrders: 3,
    totalSpent: 210.75,
    lastPurchase: '2023-02-25',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: 5,
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    phone: '+1 (555) 876-5432',
    address: '654 Maple Ave, Seattle, WA 98101',
    joinDate: '2023-01-25',
    totalOrders: 7,
    totalSpent: 645.30,
    lastPurchase: '2023-02-20',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
];

// Status options
const statusOptions = ['All', 'Active', 'Inactive'];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortField, setSortField] = useState('joinDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filter and sort customers
  useEffect(() => {
    let result = [...customers];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(customer => customer.status === statusFilter);
    }
    
    // Apply date range filter for join date
    if (dateRange.from) {
      result = result.filter(customer => new Date(customer.joinDate) >= new Date(dateRange.from));
    }
    if (dateRange.to) {
      result = result.filter(customer => new Date(customer.joinDate) <= new Date(dateRange.to));
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortField === 'joinDate' || sortField === 'lastPurchase') {
        return sortDirection === 'asc' 
          ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
          : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
      }
      
      if (sortField === 'totalOrders' || sortField === 'totalSpent') {
        return sortDirection === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
      }
      
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredCustomers(result);
  }, [customers, searchTerm, statusFilter, dateRange, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Customers Management</h1>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center">
            <FaUserPlus className="mr-2" />
            Add Customer
          </button>
          <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center">
            <FaDownload className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-primary/50 focus:border-primary"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Date range for join date */}
          <div className="flex items-center space-x-2 col-span-2">
            <div className="flex items-center">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <span className="text-gray-500 mr-2">Join Date:</span>
            </div>
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

      {/* Customers table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('joinDate')}
                >
                  <div className="flex items-center">
                    Join Date
                    <FaSort className="ml-1" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalOrders')}
                >
                  <div className="flex items-center">
                    Orders
                    <FaSort className="ml-1" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalSpent')}
                >
                  <div className="flex items-center">
                    Total Spent
                    <FaSort className="ml-1" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('lastPurchase')}
                >
                  <div className="flex items-center">
                    Last Purchase
                    <FaSort className="ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={customer.avatar}
                            alt={customer.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(customer.lastPurchase).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button 
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsDetailsModalOpen(true);
                          }}
                          className="text-primary hover:text-primary-dark"
                        >
                          <FaEye />
                        </button>
                        <Link href={`/admin/customers/${customer.id}/edit`} className="text-blue-500 hover:text-blue-700">
                          <FaUserEdit />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No customers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {isDetailsModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Customer Details</h2>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row mb-6">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <Image
                  className="h-24 w-24 rounded-full"
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  width={96}
                  height={96}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedCustomer.name}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-2" />
                    {selectedCustomer.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaPhone className="mr-2" />
                    {selectedCustomer.phone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    {selectedCustomer.address}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Join Date</div>
                <div className="mt-1 flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
                  {new Date(selectedCustomer.joinDate).toLocaleDateString()}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Status</div>
                <div className="mt-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Total Orders</div>
                <div className="mt-1 flex items-center">
                  <FaShoppingBag className="mr-2 text-gray-400" />
                  {selectedCustomer.totalOrders} orders
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Total Spent</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">
                  ${selectedCustomer.totalSpent.toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Link 
                href={`/admin/customers/${selectedCustomer.id}/orders`}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
              >
                <FaShoppingBag className="mr-2" />
                View Orders
              </Link>
              <Link 
                href={`/admin/customers/${selectedCustomer.id}/edit`}
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
              >
                <FaUserEdit className="mr-2" />
                Edit Customer
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage; 