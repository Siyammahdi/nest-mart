// pages/index.tsx
import Image from 'next/image';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import products from '@/mock/products';
import Link from 'next/link';

const Popular = () => {
    return (
        <div className=" py-8 mx-4 md:mx-6">
            <h1 className="text-2xl md:text-4xl font-semibold text-text mb-6">Popular Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {products.map((product) => (
                    <Link key={product.id} href={`/all-products/${product.id}`} passHref>
                        <div
                            className="border rounded-2xl shadow-sm hover:shadow-md transition h-full flex flex-col justify-between overflow-hidden cursor-pointer"
                        >
                            <div className="relative">
                                {product.discount > 0 && (
                                    <div className="absolute top-0 left-0 bg-primary text-white text-[10px] md:text-xs px-3 md:px-5 py-1 md:py-2 rounded-br-[20px]">
                                        {product.discount}%
                                    </div>
                                )}
                                {product.isNew && (
                                    <div className="absolute top-0 right-0 bg-blue-200 text-blue-800 text-[10px] md:text-xs px-3 md:px-5 py-1 md:py-2 rounded-bl-[20px]">
                                        New
                                    </div>
                                )}
                            </div>

                            <div className='p-[6px] md:p-4'>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full object-cover md:mb-4"
                                    width={200}
                                    height={200}
                                />
                                <p className="text-[8px] md:text-xs text-gray-500 md:mb-1">{product.category}</p>
                                <h3 className="text-sm md:text-base lg::text-lg leading-tight font-semibold text-gray-800 md:mb-1">
                                    {product.title}
                                </h3>
                                <p className="text-[8px] md:text-xs lg:text-base text-gray-400 md:mb-2">By <span className='text-primary'>{product.brand}</span></p>
                                <div className="md:flex items-center justify-between ">
                                    <div className='flex gap-2 md:gap-4 items-center'>
                                        <p className="text-primary font-bold text-base md:text-xl">
                                            ${product.price.toFixed(2)}
                                        </p>
                                        {product.price < product.originalPrice && (
                                            <p className="text-gray-400 line-through font-semibold text-xs md:text-base">
                                                ${product.originalPrice.toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                    <button className="bg-primary/20 text-primary font-semibold w-full md:w-fit mt-2 text-sm px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded hover:bg-primary/50 flex justify-center items-center gap-2">
                                        <AiOutlineShoppingCart size={18} />
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};




export default Popular;
