import Image from 'next/image';
import React from 'react';
import logo from '@/../public/logo.png'
import { BsArrowRepeat } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiUser3Line } from 'react-icons/ri';
import { FaArrowRightLong } from 'react-icons/fa6';

const SearchBar: React.FC = () => {
  return (
    <div className="bg-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image src={logo} alt="Nest Mart & Grocery" className="h-12" height={100} width={170} />
        </div>


        
        {/* Search Bar */}
        <div className="w-1/3 relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-3 border-2 border-primary/50 rounded"
          />
          <button className="bg-primary text-white px-4 py-2 absolute right-[6px] bottom-[6px] rounded">Search</button>
        </div>


        
        {/* Account Icons */}
        <div className="flex space-x-6 items-center text-text">
        <button className='flex items-center gap-2 text-primary border px-4 py-2 rounded shadow-md'>Become a vendor <FaArrowRightLong className='mt-1' /> </button>
          <button className="relative hover:text-primary flex items-center gap-2"><BsArrowRepeat size={24} /> Compare</button>
          <button className="relative hover:text-primary flex items-center gap-2"><FaRegHeart size={22} /> Wishlist</button>
          <button className="relative hover:text-primary flex items-center gap-2"><AiOutlineShoppingCart size={24} /> Cart</button>
          <button className="relative hover:text-primary flex items-center gap-2"><RiUser3Line size={22} /> Account</button>

        </div>
      </div>
    </div>
  );
};

export default SearchBar;
