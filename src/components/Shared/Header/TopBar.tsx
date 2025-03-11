import React from "react";
import Link from "next/link";

const TopBar: React.FC = () => {
  return (
    <div className="bg-white py-2 text-sm text-gray-600 border-b border-gray-200">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 md:flex-nowrap">
        {/* Left Section */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 text-sm">
          <Link href="/about" className="hover:underline border-r pr-2 md:pr-4">About Us</Link>
          <Link href="/dashboard" className="hover:underline border-r px-2 md:px-4">My Account</Link>
          <Link href="/dashboard/wishlist" className="hover:underline border-r px-2 md:px-4">Wishlist</Link>
          <Link href="/dashboard/orders" className="hover:underline px-2 md:px-4">Order Tracking</Link>
        </div>

        {/* Center Section */}
        <div className="w-full text-center md:w-auto">
          <p className="font-bold text-primary/70 text-xs md:text-sm">
            100% secured delivery without contacting courier
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-4">
          <span className="text-xs md:text-sm">
            Need help? Call Us:{" "}
            <a href="tel:1800900122" className="text-green-600 hover:underline">
              +880 1774010501
            </a>
          </span>
          <a href="#" className="hover:underline border-r px-2 md:px-4">English</a>
          <a href="#" className="hover:underline pl-2 md:pl-4">INR</a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
