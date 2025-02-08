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
        <div className="relative w-full h-[400px] md:h-[500px] rounded-[30px] overflow-hidden"
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
                    <div className="absolute inset-0 flex flex-col justify-center space-y-10 items-start text-start text-white p-16 md:p-28">
                        <h2 className="text-3xl md:text-7xl text-text font-bold">{slide.title}</h2>
                        <p className="text-lg md:text-3xl mt-4 text-gray-500">{slide.description}</p>
                        <div className="relative mt-6 flex items-center"> 
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="p-3 md:p-5 rounded-full w-[250px] md:w-[450px] z-10 text-text focus:outline-none placeholder:text-sm "
                            />
                            <button className="absolute text-sm md:text-base right-0 p-3 md:p-5 px-6 md:px-8 bg-primary hover:bg-primary/70 transition-all duration-200 z-20 text-white rounded-full">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {/* Navigation Buttons */}
            <button
                onClick={handleNext}
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-100 hover:bg-primary hover:text-white text-gray-500 w-10 h-10  rounded-full transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
            >
                <FaChevronRight className="m-auto" />
            </button>
            <button
                onClick={handlePrev}
                className={`absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-100 hover:bg-primary hover:text-white text-gray-500 w-10 h-10 rounded-full transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
            >
                <FaChevronLeft className="m-auto" />
            </button>
            {/* Pagination Dots */}
            <div className="absolute bottom-4 w-full flex justify-center space-x-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? "bg-primary" : "bg-white"
                            }`}
                    ></div>
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


