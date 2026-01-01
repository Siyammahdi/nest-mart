"use client"
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] rounded-[20px] md:rounded-[30px] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        backgroundImage: `url(${slide.background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-10 items-start text-start text-white p-4 sm:p-6 md:p-10 lg:p-28">
                        <h2 className="text-2xl md:text-4xl lg:text-7xl text-text font-bold leading-tight">{slide.title}</h2>
                        <p className="text-sm sm:text-base md:text-xl lg:text-3xl mt-2 md:mt-4 text-gray-200 md:text-gray-500">{slide.description}</p>
                        <div className="relative mt-4 md:mt-6 w-full max-w-full"> 
                            <div className="flex items-center w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px]">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 p-2 sm:p-3 md:p-5 rounded-full z-10 text-text text-xs sm:text-sm md:text-base focus:outline-none placeholder:text-xs sm:placeholder:text-sm pr-20 sm:pr-24 md:pr-28"
                                />
                                <button className="absolute right-0 text-xs sm:text-sm md:text-base p-2 sm:p-3 md:p-5 px-4 sm:px-6 md:px-8 bg-primary hover:bg-primary/70 transition-all duration-200 z-20 text-white rounded-full whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {/* Navigation Buttons */}
            <button
                onClick={handleNext}
                className={`absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 hover:bg-primary hover:text-white text-gray-500 w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 flex items-center justify-center ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                aria-label="Next slide"
            >
                <FaChevronRight className="text-sm sm:text-base" />
            </button>
            <button
                onClick={handlePrev}
                className={`absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 hover:bg-primary hover:text-white text-gray-500 w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 flex items-center justify-center ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                aria-label="Previous slide"
            >
                <FaChevronLeft className="text-sm sm:text-base" />
            </button>
            {/* Pagination Dots */}
            <div className="absolute bottom-2 sm:bottom-4 w-full flex justify-center space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all ${index === currentIndex ? "bg-primary" : "bg-white/70 hover:bg-white"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export const slides = [
    {
        id: 1,
        title: "Fresh Vegetables Big Discount",
        description: "Save up to 50% off on your first order",
        background: "/slider/slider1.png", 
    },
    {
        id: 2,
        title: "Fresh Fruits",
        description: "Get fresh fruits delivered to your doorsteps",
        background: "/slider/slider2.png", 
    },
    {
        id: 3,
        title: "Organic Products Best Quality",
        description: "Explore our range of organic products",
        background: "/slider/slider4.png", 
    },
];


export default Carousel;


