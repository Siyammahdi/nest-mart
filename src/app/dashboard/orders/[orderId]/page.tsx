'use client';

import React from 'react';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaTruck, 
  FaBox, 
  FaClock,
  FaMapMarkerAlt,
  FaCreditCard
} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// Mock order data - in a real app, this would be fetched from an API
const getOrderById = (orderId: string) => {
  // This is mock data - in a real app, you would fetch this from an API
  const statusIcons = {
    'Delivered': <FaCheckCircle className="text-green-500" />,
    'Shipped': <FaTruck className="text-blue-500" />,
    'Processing': <FaBox className="text-yellow-500" />,
    'Pending': <FaClock className="text-orange-500" />
  };

  const orders = {
    'ORD-12345': {
      id: 'ORD-12345',
      date: '2023-03-08',
      status: 'Delivered',
      statusIcon: statusIcons['Delivered'],
      total: 125.99,
      subtotal: 115.99,
      shipping: 5.00,
      tax: 5.00,
      paymentMethod: 'Credit Card (**** 1234)',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      },
      items: [
        {
          id: 1,
          name: 'Wireless Bluetooth Headphones',
          price: 59.99,
          quantity: 1,
          image: '/images/placeholder.png'
        },
        {
          id: 2,
          name: 'Smart Watch Series 5',
          price: 28.00,
          quantity: 2,
          image: '/images/placeholder.png'
        }
      ],
      timeline: [
        { date: '2023-03-08', status: 'Delivered', description: 'Package delivered' },
        { date: '2023-03-06', status: 'Shipped', description: 'Package in transit' },
        { date: '2023-03-05', status: 'Processing', description: 'Order processed' },
        { date: '2023-03-04', status: 'Pending', description: 'Payment confirmed' },
        { date: '2023-03-04', status: 'Pending', description: 'Order placed' }
      ]
    },
    'ORD-12344': {
      id: 'ORD-12344',
      date: '2023-03-01',
      status: 'Shipped',
      statusIcon: statusIcons['Shipped'],
      total: 89.99,
      subtotal: 79.99,
      shipping: 5.00,
      tax: 5.00,
      paymentMethod: 'PayPal',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      },
      items: [
        {
          id: 3,
          name: 'Smartphone Case',
          price: 19.99,
          quantity: 1,
          image: '/images/placeholder.png'
        },
        {
          id: 4,
          name: 'Wireless Charger',
          price: 30.00,
          quantity: 2,
          image: '/images/placeholder.png'
        }
      ],
      timeline: [
        { date: '2023-03-06', status: 'Shipped', description: 'Package in transit' },
        { date: '2023-03-05', status: 'Processing', description: 'Order processed' },
        { date: '2023-03-02', status: 'Pending', description: 'Payment confirmed' },
        { date: '2023-03-01', status: 'Pending', description: 'Order placed' }
      ]
    }
  };

  return orders[orderId as keyof typeof orders] || null;
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const order = getOrderById(orderId as string);

  if (!order) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/dashboard/orders" 
          className="inline-flex items-center text-primary hover:text-primary-dark"
        >
          <FaArrowLeft className="mr-2" />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <Link 
            href="/dashboard/orders" 
            className="inline-flex items-center text-primary hover:text-primary-dark mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Order {order.id}</h1>
          <p className="text-gray-600 mt-1">
            Placed on {new Date(order.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center bg-gray-100 px-4 py-2 rounded-lg">
          <span className="mr-2">{order.statusIcon}</span>
          <span className="font-medium">{order.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
            <div className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <div key={item.id} className="py-4 flex items-start">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    <p className="text-gray-500 mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Timeline</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3.5 top-0 h-full w-0.5 bg-gray-200"></div>
              
              {/* Timeline events */}
              <div className="space-y-6">
                {order.timeline.map((event, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className={`absolute left-0 mt-1 w-7 h-7 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}>
                      {index === 0 && <FaCheckCircle />}
                    </div>
                    <div className="ml-10">
                      <p className="font-medium text-gray-900">{event.status}</p>
                      <p className="text-sm text-gray-500">{event.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Information</h2>
            <div className="flex items-center">
              <FaCreditCard className="text-gray-400 mr-2" />
              <span className="text-gray-600">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-gray-400 mr-2 mt-1" />
              <div>
                <p className="text-gray-900 font-medium">{order.shippingAddress.name}</p>
                <p className="text-gray-600">{order.shippingAddress.street}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 