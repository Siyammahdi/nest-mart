'use client';

import React, { useState } from 'react';
import Menubar from "./components/Menubar";
import { FaBars, FaSearch, FaBell, FaUser } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-admin transition-all duration-300 ease-in-out hidden md:block`}>
                <Menubar collapsed={!sidebarOpen} />
            </div>

            {/* Mobile sidebar */}
            {!sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}></div>
            )}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-admin transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <Menubar collapsed={false} />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-3">
                            <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
                                <FaBars className="h-6 w-6" />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-800">Nest Mart Admin</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            </div>

                            {/* Notifications */}
                            <div className="relative">
                                <button 
                                    className="text-gray-500 focus:outline-none"
                                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                                >
                                    <div className="relative">
                                        <FaBell className="h-6 w-6" />
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                            3
                                        </span>
                                    </div>
                                </button>
                                
                                {/* Notifications dropdown */}
                                {notificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10">
                                        <div className="px-4 py-2 border-b border-gray-200">
                                            <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            <a href="#" className="block px-4 py-3 hover:bg-gray-100 transition duration-150 ease-in-out">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 bg-primary rounded-full p-2">
                                                        <FaUser className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">New order received</p>
                                                        <p className="text-xs text-gray-500">Order #12345 - 5 minutes ago</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="block px-4 py-3 hover:bg-gray-100 transition duration-150 ease-in-out">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 bg-yellow-500 rounded-full p-2">
                                                        <FaBell className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                                                        <p className="text-xs text-gray-500">5 products are low in stock</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" className="block px-4 py-3 hover:bg-gray-100 transition duration-150 ease-in-out">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 bg-green-500 rounded-full p-2">
                                                        <FaUser className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">New user registered</p>
                                                        <p className="text-xs text-gray-500">John Doe - 1 hour ago</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="px-4 py-2 border-t border-gray-200">
                                            <a href="#" className="text-sm text-primary hover:underline">View all notifications</a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User menu */}
                            <div className="relative">
                                <button 
                                    className="flex items-center focus:outline-none"
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                                        A
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Admin</span>
                                </button>
                                
                                {/* User dropdown */}
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                                        <Link href="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Your Profile
                                        </Link>
                                        <Link href="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Settings
                                        </Link>
                                        <div className="border-t border-gray-200 my-1"></div>
                                        <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                {children}
                </main>
            </div>
        </div>
    );
}
