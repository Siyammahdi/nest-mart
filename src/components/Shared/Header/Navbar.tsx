"use client";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineFire } from "react-icons/ai";
import { FaHeadphonesAlt, FaBars, FaTimes } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";

const Navbar: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current && placeholderRef.current) {
        const navbarTop = placeholderRef.current.getBoundingClientRect().top;
        setIsFixed(navbarTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Placeholder to prevent layout shift */}
      <div
        ref={placeholderRef}
        style={{ height: isFixed ? navbarRef.current?.offsetHeight : 0 }}
      ></div>

      {/* Navbar */}
      <div
        ref={navbarRef}
        className={`border-y py-3 ${isFixed
          ? "fixed top-0 left-0 w-full bg-white shadow-md z-30 text-text"
          : "bg-primary text-white"
          } transition-all duration-300`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Left Side */}
          <div className="flex items-center gap-6 md:gap-12">
            <button className="bg-[#fdc041] px-4 py-2 rounded font-semibold text-white flex items-center gap-2">
              <LuLayoutGrid /> <span className="hidden sm:inline">Browse All Categories</span>
            </button>

            {/* Desktop Navigation (Hidden on Mobile) */}
            <nav className="hidden md:flex space-x-6 font-semibold">
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
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className={`md:hidden ${isFixed? "text-gray-500" : "text-white"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Contact Info */}
            <div className="hidden md:flex items-center gap-2">
              <FaHeadphonesAlt size={32} />
              <div>
                <span
                  className={`text-xl font-semibold ${isFixed ? "text-primary" : "text-white"
                    }`}
                >
                  01774010501
                </span>
                <p
                  className={`text-sm ${isFixed ? "text-gray-600" : "text-white"}`}
                >
                  24/7 Support Center
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu with Tailwind Transition */}
      <div
        className={`fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/70 z-40 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setMobileMenuOpen(false)} // Click outside to close
      >
        <div
          className={`bg-white w-3/4 h-full p-6 shadow-lg transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <button
            className="absolute top-4 right-4 text-black"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaTimes size={24} />
          </button>
          <nav className="flex flex-col space-y-6 text-lg font-semibold mt-12 text-gray-500">
            <a href="#" className="hover:text-primary flex items-center gap-1">
              <AiOutlineFire /> Hot Deals
            </a>
            <a href="#" className="hover:text-primary">Home</a>
            <a href="#" className="hover:text-primary">About</a>
            <a href="#" className="hover:text-primary">Shop</a>
            <a href="#" className="hover:text-primary">Mega Menu</a>
            <a href="#" className="hover:text-primary">Vendors</a>
            <a href="#" className="hover:text-primary">Blog</a>
            <a href="#" className="hover:text-primary">Pages</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
