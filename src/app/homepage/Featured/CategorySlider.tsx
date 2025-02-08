"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Category {
  name: string;
  itemsCount: number;
  imageUrl: string;
}

const categories: Category[] = [
  { name: "Peach", itemsCount: 6, imageUrl: "/featured/cat1.png" },
  { name: "Read Apple", itemsCount: 10, imageUrl: "/featured/cat2.png" },
  { name: "Snacks", itemsCount: 11, imageUrl: "/featured/cat3.png" },
  { name: "Vegetables", itemsCount: 6, imageUrl: "/featured/cat4.png" },
  { name: "Strawberry", itemsCount: 10, imageUrl: "/featured/cat5.png" },
  { name: "Black plum", itemsCount: 10, imageUrl: "/featured/cat6.png" },
  { name: "Custard apple", itemsCount: 10, imageUrl: "/featured/cat7.png" },
  { name: "Coffee & Tea", itemsCount: 11, imageUrl: "/featured/cat8.png" },
  { name: "Headphone", itemsCount: 4, imageUrl: "/featured/cat9.png" },
  { name: "Cake & Milk", itemsCount: 11, imageUrl: "/featured/cat10.png" },
];

const bgColors = [
  "bg-red-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-pink-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-teal-100",
];

const CustomSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(250);
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    const updateSlideWidth = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1);
        setSlideWidth(180);
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2);
        setSlideWidth(200);
      } else if (window.innerWidth < 1280) {
        setVisibleSlides(3);
        setSlideWidth(220);
      } else {
        setVisibleSlides(4);
        setSlideWidth(250);
      }
    };

    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);
    return () => window.removeEventListener("resize", updateSlideWidth);
  }, []);

  const infiniteCategories = [...categories, ...categories, ...categories];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? infiniteCategories.length - visibleSlides : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= infiniteCategories.length - visibleSlides ? 0 : prev + 1
    );
  };

  return (
    <section className="my-8">
      <div className="flex flex-col lg:flex-row justify-between items-center my-10">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-20 items-start lg:items-end text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-text">
            Featured Categories
          </h2>
          <div className="flex flex-wrap justify-center lg:justify-start space-x-4 lg:space-x-8 font-semibold text-sm sm:text-base text-gray-500">
            <a href="#" className="hover:text-yellow-400">Cake & Milk</a>
            <a href="#" className="hover:text-yellow-400">Coffes & Teas</a>
            <a href="#" className="hover:text-yellow-400">Pet Foods</a>
            <a href="#" className="hover:text-yellow-400">Vegetables</a>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-2">
          <button
            onClick={handlePrev}
            className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-100 text-gray-400 p-2 rounded-full hover:bg-gray-200"
          >
            <FaArrowLeft className="m-auto" size={16} />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-100 text-gray-400 p-2 rounded-full hover:bg-gray-200"
          >
            <FaArrowRight className="m-auto" size={16} />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * slideWidth}px)`,
          }}
        >
          {infiniteCategories.map((category, index) => {
            const bgColor = bgColors[index % bgColors.length];
            return (
              <div
                key={index}
                className={`min-w-[100px] md:min-w-[150px] p-4 py-6 sm:py-8 rounded-xl mr-4 flex-shrink-0 ${bgColor}`}
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-14 sm:w-16 h-14 sm:h-16 mb-3 sm:mb-4"
                    width={100}
                    height={100}
                  />
                  <h3 className="text-sm sm:text-lg font-semibold">{category.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {category.itemsCount} items
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomSlider;
