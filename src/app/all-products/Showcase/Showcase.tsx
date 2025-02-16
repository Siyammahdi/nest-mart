"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

type Product = {
    _id: string; // Change `id` to `_id`
    name: string;
    category: string;
    brand: string;
    image: string;
    price: number;
    originalPrice: number;
    discount: number;
    isNew: boolean;
};

const Showcase = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                const data = await response.json();
                console.log(data); // Debug: Inspect the data
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="text-2xl md:text-3xl text-text text-center my-20 md:my-52">Loading products...</p>;

    return (
        <div className="w-4/5 py-8">
            <h1 className="text-4xl font-semibold text-text mb-6">All Products</h1>
            <div className="grid grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id}> {/* Use `_id` instead of `id` */}
                        <Link href={`/all-products/${product._id}`} passHref> {/* Use `_id` here */}
                            <div className="border rounded-2xl shadow-sm hover:shadow-md transition h-full flex flex-col justify-between overflow-hidden cursor-pointer">
                                <div className="relative">
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

                                <div className="p-4">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full object-cover mb-4"
                                        width={200}
                                        height={200}
                                    />
                                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                                    <h3 className="text-lg leading-tight font-semibold text-gray-800 mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-400 mb-2">
                                        By <span className="text-primary">{product.brand}</span>
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-4 items-center">
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
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Showcase;