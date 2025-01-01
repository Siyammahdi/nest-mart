import React from 'react';
import { AiOutlineFire } from 'react-icons/ai';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { LuLayoutGrid } from 'react-icons/lu';

const Navbar: React.FC = () => {
    return (
        <div className="border-y text-text py-3">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Side - Categories and Links */}
                <div className="flex space-x-12 items-center font-semibold">
                    <button className="bg-[#fdc041] px-4 py-2 rounded font-semibold text-white flex items-center gap-1"><LuLayoutGrid /> Browse All Categories</button>
                    <a href="#" className="hover:text-yellow-400 flex items-center gap-1"><AiOutlineFire /> Hot Deals</a>
                    <a href="#" className="hover:text-yellow-400">Home</a>
                    <a href="#" className="hover:text-yellow-400">About</a>
                    <a href="#" className="hover:text-yellow-400">Shop</a>
                    <a href="#" className="hover:text-yellow-400">Mega Menu</a>
                    <a href="#" className="hover:text-yellow-400">Vendors</a>
                    <a href="#" className="hover:text-yellow-400">Blog</a>
                    <a href="#" className="hover:text-yellow-400">Pages</a>
                    <a href="#" className="hover:text-yellow-400">Contact</a>
                </div>

                {/* Right Side - Support Number */}
                <div className='flex items-center gap-2'>
                    <span><FaHeadphonesAlt size={32} /></span>
                    <div>
                        <span className="text-2xl font-semibold text-primary">01774010501</span>
                        <p className="ml-2 text-sm">24/7 Support Center</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
