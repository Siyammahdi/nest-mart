"use client"

import Image from "next/image";
import React from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";

const Cart = () => {
    const { cartItems, updateCartItemQuantity, removeFromCart, subtotal } = useCart();

    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`;
    };

    if (cartItems.length === 0) {
        return (
            <div className="p-6">
                <div className="bg-green-100 space-y-5 p-8 rounded-2xl mt-4">
                    <h2 className="text-4xl font-semibold">Shop Cart</h2>
                    <nav className="text-sm flex gap-2">
                        <Link href="/">Home</Link>
                        <span>&gt;</span>
                        <span className="text-primary">Shop Cart</span>
                    </nav>
                </div>
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-medium">Your cart is empty</h3>
                    <p className="mt-2 text-gray-500">Looks like you haven&apos;t added any products to your cart yet.</p>
                    <Link href="/all-products">
                        <button className="mt-6 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="bg-green-100 space-y-5 p-8 rounded-2xl mt-4">
                <h2 className="text-4xl font-semibold">Shop Cart</h2>
                <nav className="text-sm flex gap-2">
                    <Link href="/">Home</Link>
                    <span>&gt;</span>
                    <span className="text-primary">Shop Cart</span>
                </nav>
            </div>
            <div className="mt-6">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 p-4 rounded-full">
                        <tr>
                            <th className="p-2">Product</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => {
                            // Determine if it's a localStorage item or API item
                            const id = item.id || (item.product && item.product._id);
                            const title = item.title || (item.product && item.product.name);
                            const price = item.price || (item.product && item.product.price) || 0;
                            const image = item.image || (item.product && item.product.image);
                            const quantity = item.quantity;

                            return (
                                <tr key={id}>
                                    <td className="p-2 flex items-center gap-2">
                                        <button 
                                            className="text-red-500"
                                            onClick={() => removeFromCart(id as string | number)}
                                        >
                                            ✖
                                        </button>
                                        <Image 
                                            src={image || "/products/product-placeholder.jpg"} 
                                            alt={title || "Product"} 
                                            width={100} 
                                            height={100} 
                                            className="w-12 h-12"
                                        />
                                        <span>{title}</span>
                                    </td>
                                    <td className="p-2">{formatPrice(price)}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => updateCartItemQuantity(id as string | number, quantity - 1)}
                                            className="px-2 border"
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-4">{quantity}</span>
                                        <button
                                            onClick={() => updateCartItemQuantity(id as string | number, quantity + 1)}
                                            className="px-2 border"
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="p-2">{formatPrice(price * quantity)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start mt-8">
                <div className="flex gap-4 mt-4 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Coupon code"
                        className="border p-2 rounded-md"
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-md">
                        Apply Coupon
                    </button>
                </div>
                <div className="mt-8 md:mt-4 w-full md:w-72 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-4">Cart Totals</h3>
                    <div className="flex justify-between border-b pb-2">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between border-b py-2">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between py-2 font-medium">
                        <span>Total</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <Link href="/checkout">
                        <button className="w-full bg-primary text-white py-2 mt-4 rounded-md hover:bg-primary/90 transition-colors">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
