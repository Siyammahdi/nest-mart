import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Ad: React.FC = () => {
    return (
        <div>
            <div className="relative w-full h-[150px] md:h-[270px] mb-4">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 rounded-2xl overflow-hidden"
                    style={{
                        backgroundImage: "url('/slider/slider3.png')",
                    }}
                >
                    <div className="absolute inset-0  flex flex-col justify-center space-y-4 items-start p-4 md:p-6 text-white">
                        <h2 className="text-lg md:text-2xl font-semibold w-3/5 text-text">
                            Everyday Fresh & Clean with Our Products
                        </h2>
                        <Link href="/all-products">
                            <button className="p-1 px-3 text-sm bg-primary hover:bg-primary/70 transition-all duration-200 text-white rounded flex items-center gap-1">
                                Shop now <FaArrowRight size={10} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-[100px] md:h-[210px]">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 rounded-2xl overflow-hidden"
                    style={{
                        backgroundImage: "url('/slider/slider4.png')", 
                    }}
                >
                    <div className="absolute inset-0 flex flex-col justify-center space-y-4 items-start p-4 md:pl-36 text-white">
                        <h2 className="text-lg md:text-2xl font-semibold text-text">
                            The best organic products online
                        </h2>
                        <Link href="/all-products">
                            <button className="p-1 px-3 text-sm bg-primary hover:bg-primary/70 transition-all duration-200 text-white rounded flex items-center gap-1">
                                Shop now <FaArrowRight size={10} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ad;
