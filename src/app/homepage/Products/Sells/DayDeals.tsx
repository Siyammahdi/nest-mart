import Image from 'next/image';
import React from 'react';

const products = [
    {
        image: '/banner/banner6.png',
        title: 'Organic Cage Grade A Large Eggs',
        by: 'Hambger Hel',
        currentPrice: 21.0,
        originalPrice: 24.0,
    },
    {
        image: '/banner/banner7.png',
        title: 'Naturally Flavored Cinnamon Vanilla',
        by: 'Hambger Hel',
        currentPrice: 51.0,
        originalPrice: 55.0,
    },
    {
        image: '/banner/banner8.png',
        title: 'Seeds of Change Organic Watermelon',
        by: 'Hambger Hel',
        currentPrice: 61.5,
        originalPrice: 66.0,
    },
    {
        image: '/banner/banner9.png',
        title: 'Nestle Coffee Mate Coffee Creamer',
        by: "Totino's Pizza",
        currentPrice: 52.8,
        originalPrice: 53.8,
    },
];

const DayDeals = () => {
    return (
        <div className="bg-white mx-5 md:mx-0 ">
            <h2 className=" text-2xl lg:text-4xl font-semibold text-text mb-10">Deals Of The Day</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="relative bg-gray-100 rounded-2xl shadow-md mb-20 md:mb-0 ">
                        <div className=''>
                            <Image
                                src={product.image}
                                alt={product.title}
                                className="w-full object-cover "
                                width={500}
                                height={500}

                            />

                        </div>
                        <div className="absolute shadow-lg -bottom-16 bg-white rounded-xl p-4 w-4/5 left-9">
                            <h3 className="text-lg font-semibold mb-2">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">By <span className='text-primary'>{product.by}</span></p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-xl font-bold text-green-600">
                                        ${product.currentPrice.toFixed(2)}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                        ${product.originalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <button className="bg-green-100 text-green-600 py-1 px-4 rounded shadow hover:bg-green-200">
                                    Add
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default DayDeals;
