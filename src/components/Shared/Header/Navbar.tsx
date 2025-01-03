"use client"
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineFire } from 'react-icons/ai';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { LuLayoutGrid } from 'react-icons/lu';

const Navbar: React.FC = () => {
    const [isFixed, setIsFixed] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (navbarRef.current && placeholderRef.current) {
                const navbarTop = placeholderRef.current.getBoundingClientRect().top;
                setIsFixed(navbarTop <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            {/* Placeholder to maintain layout when navbar becomes fixed */}
            <div
                ref={placeholderRef}
                style={{ height: isFixed ? navbarRef.current?.offsetHeight : 0 }}
            ></div>

            {/* Navbar */}
            <div
                ref={navbarRef}
                className={`border-y py-3 ${
                    isFixed
                        ? 'fixed top-0 left-0 w-full bg-white shadow-md z-30 text-text'
                        : 'bg-primary text-white'
                } transition-all duration-300`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left Side */}
                    <div className="flex space-x-12 items-center font-semibold">
                        <button className="bg-[#fdc041] px-4 py-2 rounded font-semibold text-white flex items-center gap-1">
                            <LuLayoutGrid /> Browse All Categories
                        </button>
                        <a href="#" className="hover:text-yellow-400 flex items-center gap-1">
                            <AiOutlineFire /> Hot Deals
                        </a>
                        <a href="#" className="hover:text-yellow-400">Home</a>
                        <a href="#" className="hover:text-yellow-400">About</a>
                        <a href="#" className="hover:text-yellow-400">Shop</a>
                        <a href="#" className="hover:text-yellow-400">Mega Menu</a>
                        <a href="#" className="hover:text-yellow-400">Vendors</a>
                        <a href="#" className="hover:text-yellow-400">Blog</a>
                        <a href="#" className="hover:text-yellow-400">Pages</a>
                        <a href="#" className="hover:text-yellow-400">Contact</a>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        <span>
                            <FaHeadphonesAlt size={32} />
                        </span>
                        <div>
                            <span
                                className={`text-2xl font-semibold ${
                                    isFixed ? 'text-primary' : 'text-white'
                                }`}
                            >
                                01774010501
                            </span>
                            <p
                                className={`ml-2 text-sm ${
                                    isFixed ? 'text-gray-600' : 'text-white'
                                }`}
                            >
                                24/7 Support Center
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
