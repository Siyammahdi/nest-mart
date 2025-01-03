"use client"

import React, { useState } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const BestSell = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 4 ? prev + 1 : items.length - 4));
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden my-12">
      <div className="flex justify-between">
        <h2 className="text-4xl font-semibold text-text mb-8">Daily Best Sells</h2>
        <div className="flex gap-2">

          <button
            onClick={handlePrev}
            className="p-2 bg-gray-100 h-10 w-10 rounded-full text-gray-400 hover:bg-gray-300"
          >
            <FaArrowLeft className="m-auto" size={14} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-gray-100 h-10 w-10 rounded-full text-gray-400 hover:bg-gray-300"
          >
            <FaArrowRight className="m-auto" size={14} />
          </button>

        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="w-3/4 relative h-[500px] mb-4 z-20">
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 rounded-2xl overflow-hidden"
            style={{
              backgroundImage: "url('/banner/banner4.png')",
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-start space-y-4 items-start p-4 md:p-12 text-white">
              <h2 className="text-lg md:text-4xl font-semibold mb-12 text-text">
                Bring nature into your home
              </h2>
              <button className="p-2 px-4 text-sm bg-primary hover:bg-primary/70 transition-all duration-200 text-white rounded flex items-center gap-1">
                Shop now <FaArrowRight size={10} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-3/4 flex items-center relative">
          <div
            className="flex transition-transform duration-500 gap-6"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {items.map((item) => {
              const [sold, available] = item.sold.split("/").map(Number);
              const soldPercentage = (sold / available) * 100;

              return (
                <div
                  key={item.id}
                  className="w-[270px] border rounded-2xl overflow-hidden"
                >
                  <div className="mb-2 flex justify-between">
                    {item.discount && (
                      <span className="bg-blue-200 text-blue-800 px-4 py-1 rounded-br-2xl text-xs font-semibold">
                        {item.discount}%
                      </span>
                    )}
                    {item.isNew && (
                      <span className="bg-green-200 text-green-800 px-4 py-1 rounded-bl-2xl text-xs font-semibold ml-2">
                        New
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="object-cover mb-4"
                    />

                    <h3 className="text-sm text-gray-500">{item.category}</h3>
                    <h2 className="font-semibold text-lg truncate">
                      {item.title}
                    </h2>

                    <div className="flex items-center gap-2 my-2">
                      <span className="text-primary font-bold text-xl">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="line-through text-gray-500 text-sm">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500">Sold: {item.sold}</div>

                    <div className="mt-2">
                      <div className="w-full bg-gray-200 h-2 rounded">
                        <div
                          className="bg-primary h-2 rounded"
                          style={{ width: `${soldPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1 block">
                        {sold} sold / {available} available
                      </span>
                    </div>

                    <button className="mt-4 w-full py-2 bg-primary text-white rounded hover:bg-primary/50 transition">
                      {item.rating === 0 ? "Read more" : "Add to cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};




const items = [
  {
    id: 1,
    category: "Bread and Juice",
    title: "All Natural Style Chicken Meatballs",
    price: 52.85,
    originalPrice: 55.80,
    sold: "142/456",
    image: "/products/product1.jpg",
    rating: 3,
    discount: 6,
    isNew: false,
  },
  {
    id: 2,
    category: "Baking material",
    title: "Angie’s Sweet & Salty Kettle Corn",
    price: 48.85,
    originalPrice: 52.80,
    sold: "122/233",
    image: "/products/product2.jpg",
    rating: 1,
    discount: 8,
    isNew: false,
  },
  {
    id: 3,
    category: "Baking material",
    title: "Foster Farms Takeout Crispy Classic",
    price: 17.85,
    originalPrice: 19.80,
    sold: "327/500",
    image: "/products/product3.jpg",
    rating: 0,
    discount: 10,
    isNew: false,
  },
  {
    id: 4,
    category: "Fresh Fruit",
    title: "Blue Almonds Lightly Salted Vegetables",
    price: 23.85,
    originalPrice: 25.80,
    sold: "141/160",
    image: "/products/product4.jpg",
    rating: 1,
    discount: 8,
    isNew: true,
  },
  {
    id: 5,
    category: "Snacks",
    title: "Organic Sea Salt Popcorn",
    price: 12.85,
    originalPrice: 15.80,
    sold: "98/120",
    image: "/products/product5.jpg",
    rating: 2,
    discount: 5,
    isNew: false,
  },
  {
    id: 6,
    category: "Fresh Vegetables",
    title: "Fresh Organic Baby Spinach",
    price: 10.85,
    originalPrice: 12.80,
    sold: "87/150",
    image: "/products/product6.jpg",
    rating: 4,
    discount: 6,
    isNew: true,
  },
  {
    id: 7,
    category: "Dairy Products",
    title: "Organic Whole Milk",
    price: 8.85,
    originalPrice: 9.50,
    sold: "245/300",
    image: "/products/product7.jpg",
    rating: 5,
    discount: 7,
    isNew: false,
  },
  {
    id: 8,
    category: "Snacks",
    title: "Salted Caramel Protein Bars",
    price: 24.85,
    originalPrice: 28.80,
    sold: "142/200",
    image: "/products/product8.jpg",
    rating: 3,
    discount: 10,
    isNew: true,
  },
  {
    id: 9,
    category: "Fresh Fruit",
    title: "Fresh Organic Bananas",
    price: 5.85,
    originalPrice: 6.80,
    sold: "300/500",
    image: "/products/product9.jpg",
    rating: 4,
    discount: 5,
    isNew: false,
  },
  {
    id: 10,
    category: "Beverages",
    title: "Cold Brew Coffee Concentrate",
    price: 16.85,
    originalPrice: 19.00,
    sold: "190/250",
    image: "/products/product10.jpg",
    rating: 5,
    discount: 11,
    isNew: true,
  },
];




export default BestSell;
