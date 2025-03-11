"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Newsletter from '@/app/homepage/Subscription/Newsletter';
import { FaCheck } from 'react-icons/fa6';
import BestSell from '@/app/homepage/Products/Sells/BestSell';
import Link from 'next/link';
import SellerContact from './SellerContact';
import { ProductDetailSkeleton } from "@/components/ui/ProductSkeleton";

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
    description: string;
    nutritionalInfo: {
        calories: number;
        protein: string;
        fat: string;
        carbohydrates: string;
        fiber: string;
    };
    ingredients: string[];
    sku: string;
    stock: number;
    weight: string;
    reviews: {
        user: string;
        rating: number;
        comment: string;
    }[];
};

const ProductDetail = () => {
    const pathname = usePathname();
    const productId = pathname?.split('/').pop();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;

            try {
                const response = await fetch(`https://nest-mart-backend.vercel.app/api/products/${productId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <ProductDetailSkeleton />;

    if (!product) {
        return <div className="text-2xl md:text-3xl text-text my-20 md:my-48 text-center">Product not found!</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row  lg:gap-12">
                <div className="lg:w-1/2 flex justify-start items-center">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="object-cover border rounded-3xl"
                    />
                </div>
                <div className="lg:w-1/2">
                    <h1 className="text-4xl text-text font-bold mt-10 md:mt-0">{product.name}</h1>
                    <p className="text-lg text-gray-600 my-4">{product.category}</p>
                    <p className="text-3xl text-[#fdc041] font-semibold mt-2">
                        ${product.price.toFixed(2)}{' '}
                        <span className="text-sm line-through text-gray-500">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-green-500 ml-2">({product.discount}% off)</span>
                    </p>
                    <p className="mt-4 text-gray-500 ">{product.description}</p>

                    <div className="mt-4">
                        <h3 className="font-semibold text-xl text-text">Nutritional Info:</h3>
                        <ul className="list-disc pl-6 mt-2 ">
                            <li>Calories: {product.nutritionalInfo.calories}</li>
                            <li>Protein: {product.nutritionalInfo.protein}</li>
                            <li>Fat: {product.nutritionalInfo.fat}</li>
                            <li>Carbohydrates: {product.nutritionalInfo.carbohydrates}</li>
                            <li>Fiber: {product.nutritionalInfo.fiber}</li>
                        </ul>
                    </div>

                    <div className='flex gap-4'>
                        <Link href="/checkout">
                            <button className="bg-primary text-white font-semibold px-6 py-2 mt-4 rounded hover:bg-[#fdc041] transition">
                                Checkout
                            </button>
                        </Link>

                        <Link href="/">
                            <button className="border-2 border-primary text-primary font-semibold px-6 py-2 mt-4 rounded hover:bg-[#fdc041] hover:text-white hover:border-[#fdc041] transition">
                                Add to Wishlist
                            </button>
                        </Link>
                        <Link href="/">
                            <button className="border-2 border-primary text-primary font-semibold px-6 py-2 mt-4 rounded hover:bg-[#fdc041] hover:text-white hover:border-[#fdc041] transition">
                                Add to Cart
                            </button>
                        </Link>
                    </div>

                    <div className='flex justify-between'>
                        <div>
                            <div className="mt-4">
                                <h3 className="font-semibold text-xl text-text">Ingredients:</h3>
                                <ul className="list-disc pl-6 mt-2">
                                    {product.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-semibold text-xl text-text">Product Details:</h3>
                                <ul className="list-none pl-6 mt-2">
                                    <li><strong>SKU:</strong> {product.sku}</li>
                                    <li><strong>Stock:</strong> {product.stock} units available</li>
                                    <li><strong>Weight:</strong> {product.weight}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='bg-green-100 p-5 m-10 mr-0 rounded-xl'>
                            <h3 className='text-xl font-semibold text-text mb-4'>Free worldwide shipping for orders over $70</h3>
                            <p className='flex items-center gap-2 text-gray-500'> <FaCheck /> 7 days easy returns</p>
                            <p className='flex items-center gap-2 text-gray-500'> <FaCheck /> Order will dispatch with in 2 Hours</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='space-y-4 mb-8 mt-10 md:mt-0'>
                <h2 className='text-2xl font-semibold text-text' >Description</h2>
                <p className='text-gray-500'>{product.description}</p>
            </div>
            <div className='space-y-4 mb-8'>
                <h2 className='text-2xl font-semibold text-text' >Packaging and Delivery</h2>
                <p className='text-gray-500'>Laconic overheard dear woodchuck wow this outrageously taut beaver hey hello far meadowlark imitatively egregiously hugged that yikes minimally unanimous pouted flirtatiously as beaver beheld above forward energetic across this jeepers beneficently cockily less a the raucously that magic upheld far so the this where crud then below after jeez enchanting drunkenly more much wow callously irrespective limpet.</p>
            </div>
            <div className='space-y-4 mb-8'>
                <h2 className='text-2xl font-semibold text-text' >Suggested Use</h2>
                <p className='text-gray-500'>Refrigeration not necessary.</p>
                <p className='text-gray-500'>Stir before serving</p>
            </div>
            <div className='space-y-4'>
                <h2 className='text-2xl font-semibold text-text' >Warnings</h2>
                <p className='text-gray-500'>Oil separation occurs naturally. May contain pieces of shell.</p>
                <p className='text-gray-500'>Made in machinery that processes tree nuts but does not process peanuts, gluten, dairy or soy</p>
            </div>
            <div className='flex flex-col lg:flex-row my-12 '>
                <div className="lg:w-3/4">
                    <h3 className="font-semibold text-2xl text-text">Reviews:</h3>
                    {product.reviews.map((review, index) => (
                        <div key={index} className="border-t border-gray-300 pt-4">
                            <p className="font-semibold">{review.user}</p>
                            <div className="flex items-center">
                                {[...Array(review.rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-500 text-xl">★</span>
                                ))}
                            </div>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                    ))}
                </div>
                <div className='lg:w-1/4'>
                    <SellerContact />
                </div>
            </div>

            <Newsletter />
            <BestSell />
        </div>
    );
};

export default ProductDetail;