import Image from "next/image";
import React from "react";
import logo from "@/../public/logo.png";
import { BsArrowRepeat } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

const SearchBar: React.FC = () => {
  return (
    <div className="bg-white md:py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 md:flex-nowrap">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Nest Mart & Grocery"
              className="w-32 md:w-44" // Adjusted width for better responsiveness
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
          <button className="flex items-center gap-2 text-primary border px-4 py-2 rounded shadow-xl shadow-gray-200">
            Become a vendor <FaArrowRightLong className="mt-1" />
          </button>
          <button className="relative hover:text-primary flex items-center gap-2">
            <BsArrowRepeat size={22} /> Compare
          </button>
          <button className="relative hover:text-primary flex items-center gap-2">
            <FaRegHeart size={20} /> Wishlist
          </button>
          <button className="relative hover:text-primary flex items-center gap-2">
            <AiOutlineShoppingCart size={22} /> Cart
          </button>
          <button className="relative hover:text-primary flex items-center gap-2">
            <RiUser3Line size={20} /> Account
          </button>
        </div>

        {/* Mobile Icons (Visible only on Small Screens) */}
        <div className="flex md:hidden justify-between w-full text-gray-500">
          <button className="relative hover:text-primary flex items-center gap-2">
            <BsArrowRepeat size={26} />
          </button>
          <button className="hover:text-primary">
            <AiOutlineShoppingCart size={24} />
          </button>
          <button className="hover:text-primary">
            <FaRegHeart size={24} />
          </button>
          <button className="hover:text-primary">
            <RiUser3Line size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
