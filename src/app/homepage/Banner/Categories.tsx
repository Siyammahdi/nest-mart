"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";

const Categories: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-primary/50 rounded-2xl p-2 md:p-4">
      {/* Toggle Button (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-gray-700 font-semibold lg:hidden"
      >
        <span className="flex gap-1 items-center"><BiCategory /> Categories</span>
        <span className={`transition-all ${isOpen ? "rotate-180" : ""}`}> <FaChevronDown /> </span>
      </button>

      {/* Category List */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } lg:max-h-none lg:opacity-100`}
      >
        <ul className="space-y-2 mt-2 lg:mt-0">
          {categories.map((category) => (
            <li
              key={category.id}
              className=" hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition"
            >
              <Link href="/all-products" className="flex items-center space-x-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="w-6 h-6"
                  width={50}
                  height={50}
                />
                <span className="text-base md:text-sm lg:text-base text-gray-700">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const categories = [
  { id: 1, name: "Milks and Dairies", image: "/categories/category1.png" },
  { id: 2, name: "Clothing & Beauty", image: "/categories/category2.png" },
  { id: 3, name: "Pet Foods & Toy", image: "/categories/category3.png" },
  { id: 4, name: "Baking Material", image: "/categories/category4.png" },
  { id: 5, name: "Drinks and Teas", image: "/categories/category5.png" },
  { id: 6, name: "Nuts & Seeds", image: "/categories/category6.png" },
  { id: 7, name: "Fast Food", image: "/categories/category7.png" },
  { id: 8, name: "Fresh Vegetables", image: "/categories/category8.png" },
  { id: 9, name: "Fresh Fruit", image: "/categories/category9.png" },
  { id: 10, name: "Bread and Juice", image: "/categories/category10.png" },
];

export default Categories;
