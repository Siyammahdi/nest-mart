// pages/index.tsx
import Image from 'next/image';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import products from '@/mock/products';

// type Product = {
//   id: number;
//   title: string;
//   category: string;
//   image: string;
//   brand: string;
//   price: number;
//   originalPrice: number;
//   discount: number;
//   isNew: boolean;
//   rating: number;
// };


const Popular = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-semibold text-text mb-6">Popular Products</h1>
            <div className="grid grid-cols-5 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-2xl shadow-sm hover:shadow-md transition  overflow-hidden"
                    >
                        <div className="relative ">
                            {product.discount > 0 && (
                                <div className="absolute top-0 left-0 bg-primary text-white text-xs px-5 py-2 rounded-br-[20px]">
                                    {product.discount}%
                                </div>
                            )}
                            {product.isNew && (
                                <div className="absolute top-0 right-0 bg-blue-200 text-blue-800 text-xs px-5 py-2 rounded-bl-[20px]">
                                    New
                                </div>
                            )}
                        </div>

                        <div className='p-4'>
                            <Image
                                src={product.image}
                                alt={product.title}
                                className="w-full object-cover mb-4"
                                width={200}
                                height={200}
                            />
                            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                            <h3 className="text-lg leading-tight font-semibold text-gray-800 mb-1">
                                {product.title}
                            </h3>
                            <p className=" text-gray-400 mb-2">By <span className='text-primary'>{product.brand}</span></p>
                            <div className="flex items-center justify-between">
                                <div className='flex gap-4 items-center'>
                                    <p className="text-primary font-bold text-xl">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    {product.price < product.originalPrice && (
                                        <p className="text-gray-400 line-through font-semibold text-base">
                                            ${product.originalPrice.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                                <button className="bg-primary/20 text-primary font-semibold text-sm px-4 py-2 rounded hover:bg-primary/50 flex justify-center items-center gap-1">
                                <AiOutlineShoppingCart size={18} />
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




export default Popular;
