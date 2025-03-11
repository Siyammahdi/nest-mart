'use client';

import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaTrash, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// Mock wishlist data
const wishlistItems = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 59.99,
    image: '/images/placeholder.png',
    inStock: true,
    addedOn: '2023-03-15'
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 299.99,
    image: '/images/placeholder.png',
    inStock: true,
    addedOn: '2023-03-10'
  },
  {
    id: 3,
    name: 'Smartphone Case',
    price: 19.99,
    image: '/images/placeholder.png',
    inStock: false,
    addedOn: '2023-03-05'
  },
  {
    id: 4,
    name: 'Wireless Charger',
    price: 29.99,
    image: '/images/placeholder.png',
    inStock: true,
    addedOn: '2023-02-28'
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: '/images/placeholder.png',
    inStock: true,
    addedOn: '2023-02-20'
  }
];

const WishlistPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState(wishlistItems);

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove item from wishlist
  const removeFromWishlist = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
        <p className="text-gray-600 mt-1">
          {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search wishlist..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Wishlist items */}
      <div className="overflow-hidden">
        {filteredItems.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center">
                {/* Product image */}
                <div className="flex-shrink-0 w-full md:w-24 h-24 bg-gray-200 rounded-md overflow-hidden relative mb-4 md:mb-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Product details */}
                <div className="md:ml-6 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-lg font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Added on {new Date(item.addedOn).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                  <p className={`text-sm mt-2 ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                
                {/* Actions */}
                <div className="mt-4 md:mt-0 flex flex-col md:items-end gap-2">
                  <button
                    className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                      !item.inStock && 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!item.inStock}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <FaTrash className="mr-2 text-red-500" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FaHeart className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'No items match your search.' : 'Save items you\'re interested in for later.'}
            </p>
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Clear Search
              </button>
            ) : (
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Browse Products
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage; 