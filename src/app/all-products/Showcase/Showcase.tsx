"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProductCardSkeleton } from "@/components/ui/ProductSkeleton";

const priceFilters = [5, 10, 15, 20, 25, 30];
const categories = ["Electronics", "Clothing", "Home", "Beauty", "Sports"];
const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony"];

type Product = {
    _id: string;
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
    const [priceRange, setPriceRange] = useState<number>(30);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://nest-mart-backend.vercel.app/api/products");
                const data = await response.json();
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(
        (product) =>
            product.price <= priceRange &&
            (!selectedCategory || product.category === selectedCategory) &&
            (!selectedBrand || product.brand === selectedBrand)
    );

    if (loading) return (
        <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="lg:w-4/5 py-8 mx-4">
                <h1 className="text-4xl font-semibold text-text mb-6">All Products</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            </div>
            <div className="lg:w-1/5 p-4 border-l">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 md:mt-20 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-8 w-16 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mt-6 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mt-6 mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`flex flex-col-reverse lg:flex-row gap-4 ${filteredProducts.length === 0 ? 'border-b' : ''}`}>
            <div className="lg:w-4/5 py-8 mx-4">
                <h1 className="text-4xl font-semibold text-text mb-6">All Products</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length === 0 ? (
                        <p className="text-sm md:text-base lg:text-2xl text-gray-500 text-center col-span-4 flex justify-center items-center h-96">
                            No products found for the selected category or brand.
                        </p>
                    ) : (
                        filteredProducts.map((product) => (
                            <div key={product._id}>
                                <Link href={`/all-products/${product._id}`} passHref>
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
                        ))
                    )}
                </div>
            </div>
            <div className="lg:w-1/5 p-4 border-l">
                <h2 className="text-2xl text-text md:mt-20 font-semibold mb-4">Filter by Price</h2>
                <input
    type="range"
    min="0"
    max="30"
    value={priceRange}
    onChange={(e) => setPriceRange(Number(e.target.value))}
    className="w-full appearance-none bg-transparent relative 
               [&::-webkit-slider-runnable-track]:h-2 
               [&::-webkit-slider-runnable-track]:rounded-full 
               [&::-webkit-slider-runnable-track]:bg-gray-300 
               [&::-webkit-slider-thumb]:bg-white 
               [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none 
               [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_theme(colors.primary)] 
               [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 
               [&::-webkit-slider-thumb]:-mt-1 
               [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full 
               [&::-moz-range-track]:bg-gray-300 
               [&::-moz-range-progress]:bg-primary 
               [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:w-4 
               [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
               [&::-moz-range-thumb]:shadow-[0_0_0_2px_theme(colors.primary)] 
               before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 
               before:h-2 before:bg-primary before:rounded-full 
               before:w-[calc(var(--value)*100%/30-0.5rem)] before:z-0"
    style={{ '--value': priceRange } as React.CSSProperties}
/>

                <p className="text-sm text-gray-600 mt-2">Up to ${priceRange}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {priceFilters.map((price) => (
                        <button
                            key={price}
                            onClick={() => setPriceRange(price)}
                            className={`px-3 py-1 font-semibold border rounded-lg ${priceRange === price ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}
                        >
                            Up to ${price}
                        </button>
                    ))}
                </div>
                <h2 className="text-lg font-semibold mt-6 mb-2">Filter by Category</h2>
                <select
                    className="w-full border rounded-lg p-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <h2 className="text-lg font-semibold mt-6 mb-2">Filter by Brand</h2>
                <select
                    className="w-full border rounded-lg p-2"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Showcase;
