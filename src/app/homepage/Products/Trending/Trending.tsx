"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
    _id: string;
    image: string;
    name: string;
    rating: number | { average: number };
    reviews: number | { user: string; rating: number; comment: string; _id: string }[];
    price: string;
    originalPrice: string;
}

const ProductCard: React.FC<ProductProps> = ({ image, name, rating, reviews, price, originalPrice, _id }) => {
    const numericRating = typeof rating === "object" ? rating.average : rating;
    const reviewCount = Array.isArray(reviews) ? reviews.length : reviews;

    return (
        <Link href={`/all-products/${_id}`} passHref>
            <div className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer">
                <div className="w-20 h-20 flex-shrink-0 relative">
                    <Image src={image} alt={name} className="rounded object-cover" fill />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-sm md:text-base lg:text-lg font-medium text-gray-800">{name}</h3>
                    <div className="flex items-center mt-1">
                        <span className="text-yellow-500 text-sm">
                            {"★".repeat(Math.round(numericRating)) + "☆".repeat(5 - Math.round(numericRating))}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">({reviewCount} Reviews)</span>
                    </div>
                    <div className="flex items-center mt-1">
                        <span className="text-lg font-semibold text-primary">${price}</span>
                        <span className="ml-2 text-sm text-gray-400 line-through">${originalPrice}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Trending = () => {
    const [topSelling, setTopSelling] = useState<ProductProps[]>([]);
    const [trendingProducts, setTrendingProducts] = useState<ProductProps[]>([]);
    const [topRated, setTopRated] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://nest-mart-backend.vercel.app/api/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data: ProductProps[] = await response.json();

                setTopSelling(data.slice(0, 3));
                setTrendingProducts(data.slice(3, 6));
                setTopRated(data.slice(6, 9));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-2xl h-96 flex justify-center items-center">Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mt-20 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Top Selling */}
                <div>
                    <h2 className="text-2xl text-gray-900 font-semibold border-b-2 border-primary/30 pb-3">
                        Top Selling
                    </h2>
                    <div className="border-b-2 w-1/4 border-primary/30"></div>
                    {topSelling.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>

                {/* Trending Products */}
                <div>
                    <h2 className="text-2xl text-gray-900 font-semibold border-b-2 border-primary/30 pb-3">
                        Trending Products
                    </h2>
                    <div className="border-b-2 w-1/4 border-primary/30"></div>
                    {trendingProducts.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>

                {/* Top Rated */}
                <div>
                    <h2 className="text-2xl text-gray-900 font-semibold border-b-2 border-primary/30 pb-3">
                        Top Rated
                    </h2>
                    <div className="border-b-2 w-1/4 border-primary/30"></div>
                    {topRated.map((product) => (
                        <ProductCard key={product._id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Trending;
