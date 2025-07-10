"use client"; // Ensure this is a client component

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/../public/logo.png";
import { BsArrowRepeat } from "react-icons/bs";
import { FaRegHeart, FaUser, FaShoppingBag, FaMapMarkerAlt, FaSignOutAlt, FaTachometerAlt, FaHeart } from 'react-icons/fa';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";

const SearchBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const { totalItems } = useCart();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setUserName(null);
    router.push("/auth/login"); // Redirect to the login page
  };

  // Enhanced dropdown menu items with icons
  const userMenuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt className="mr-2" /> },
    { href: '/dashboard/profile', label: 'My Profile', icon: <FaUser className="mr-2" /> },
    { href: '/dashboard/orders', label: 'My Orders', icon: <FaShoppingBag className="mr-2" /> },
    { href: '/dashboard/wishlist', label: 'My Wishlist', icon: <FaHeart className="mr-2" /> },
    { href: '/dashboard/addresses', label: 'My Addresses', icon: <FaMapMarkerAlt className="mr-2" /> },
  ];

  return (
    <div className="bg-white md:py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 md:flex-nowrap">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Nest Mart & Grocery"
              className="w-32 md:w-44"
              height={100}
              width={170}
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 md:py-3 border-2 border-primary/50 rounded"
          />
          <button className="bg-primary text-white px-4 py-[6px] md:py-2 absolute right-[4px] md:right-[6px] bottom-[4px] md:bottom-[6px] rounded">
            Search
          </button>
        </div>

        {/* Account Icons (Hidden on Small Screens) */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center text-text">
          <Link href="/comming-soon">
            <button className="flex items-center gap-2 text-primary border px-4 py-2 rounded shadow-xl shadow-gray-200">
              Become a vendor <FaArrowRightLong className="mt-1" />
            </button>
          </Link>
          <Link href="/comming-soon">
            <button className="relative hover:text-primary flex items-center gap-2">
              <BsArrowRepeat size={22} /> Compare
            </button>
          </Link>
          <Link href="/dashboard/wishlist">
            <button className="relative hover:text-primary flex items-center gap-2">
              <FaRegHeart size={20} /> Wishlist
            </button>
          </Link>
          <Link href="/cart">
            <button className="relative hover:text-primary flex items-center gap-2">
              <div className="relative">
                <AiOutlineShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </button>
          </Link>

          {/* Conditionally render login/logout */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="relative group">
                <span className="text-gray-700 cursor-pointer flex items-center gap-1 hover:text-primary">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="ml-1">Hi, {userName || 'User'}</span>
                </span>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
                  {userMenuItems.map((item, index) => (
                    <Link 
                      key={index}
                      href={item.href} 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="relative hover:text-primary flex items-center gap-2">
                <RiUser3Line size={20} /> Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Icons (Visible only on Small Screens) */}
        <div className="flex md:hidden justify-between w-full text-gray-500">
          <button className="relative hover:text-primary flex items-center gap-2">
            <BsArrowRepeat size={26} />
          </button>
          <Link href="/cart">
            <button className="hover:text-primary relative">
              <AiOutlineShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>
          <Link href="/dashboard/wishlist">
            <button className="hover:text-primary">
              <FaRegHeart size={24} />
            </button>
          </Link>
          {isLoggedIn ? (
            <div className="relative group">
              <button className="hover:text-primary">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block border border-gray-100">
                {userMenuItems.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link href="/auth/login">
              <button className="hover:text-primary">
                <RiUser3Line size={24} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;