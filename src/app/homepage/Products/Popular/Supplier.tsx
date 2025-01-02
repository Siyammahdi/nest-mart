import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Sample data for the cards
const products = [
    {
        id: 1,
        title: "Everyday fresh with our products",
        image: "/banner/banner10.png",
    },
    {
        id: 2,
        title: "100% Garunteed all fresh items",
        image: "/banner/banner11.png",
    },
    {
        id: 3,
        title: "Special grocery sale off this month",
        image: "/banner/banner12.png",
    },
    {
        id: 4,
        title: "Enjoy 15% OFF for all vegetable and fruit",
        image: "/banner/banner13.png",
    },
];

const Supplier = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product.id} className="relative w-full h-[300px] md:h-[150px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 rounded-xl overflow-hidden"
                        style={{
                            backgroundImage: `url('${product.image}')`,
                        }}
                    >
                        <div className="absolute inset-0 ml-[50%] flex flex-col justify-center space-y-4 items-start p-4 md:p-6 text-white">
                            <h2 className="text-lg md:text-base font-semibold text-text">
                                {product.title}
                            </h2>
                            <button className="text-sm transition-all duration-200 text-gray-500 font-semibold flex items-center gap-1">
                               Go to supplier <FaArrowRight size={10} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Supplier;
