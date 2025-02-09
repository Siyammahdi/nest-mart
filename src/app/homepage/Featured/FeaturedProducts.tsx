import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Sample data for the cards
const products = [
    {
        id: 1,
        title: "Everyday Fresh & Clean with Our Products",
        image: "/banner/banner1.png",
        buttonText: "Shop now",
    },
    {
        id: 2,
        title: "Discover the Best Deals on Fresh Items",
        image: "/banner/banner2.png",
        buttonText: "Explore now",
    },
    {
        id: 3,
        title: "Quality Products for Your Everyday Needs",
        image: "/banner/banner3.png",
        buttonText: "Buy now",
    },
];

const FeaturedProducts = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-6">
            {products.map((product) => (
                <div key={product.id} className="relative w-full h-[150px] md:h-[200px] lg:h-[270px]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 rounded-2xl overflow-hidden"
                        style={{
                            backgroundImage: `url('${product.image}')`,
                        }}
                    >
                        <div className="absolute inset-0 flex flex-col justify-center space-y-4 items-start p-4 md:p-6 text-white">
                            <h2 className="text-base md:text-lg lg:text-2xl font-semibold w-3/5 text-text">
                                {product.title}
                            </h2>
                            <button className="p-1 px-3 text-sm bg-primary hover:bg-primary/70 transition-all duration-200 text-white rounded flex items-center gap-1">
                                {product.buttonText} <FaArrowRight size={10} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeaturedProducts;
