"use client"

import Image from "next/image";
import React, { useState } from "react";

const Cart = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="p-6">
            <div className="bg-green-100 space-y-5 p-8 rounded-2xl mt-4">
                <h2 className="text-4xl font-semibold">Shop Cart</h2>
                <nav className="text-sm flex gap-2">
                    <span>Home</span>
                    <span>&gt;</span>
                    <span className="text-primary">Shop Cart</span>
                </nav>
            </div>
            <div className="mt-6">
                <table className="w-full text-left">
                    <thead className=" bg-gray-100 p-4 rounded-full">
                        <tr>
                            <th className="p-2">Product</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 flex items-center gap-2">
                                <button className="text-red-500">✖</button>
                                <Image src="/products/product12.jpg" alt="Product" width={100} height={100} className="w-12 h-12" />
                                <span>Angie’s Sweet & Salty Kettle Corn</span>
                            </td>
                            <td className="p-2">$48.85</td>
                            <td className="p-2">
                                <button
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                    className="px-2 border"
                                >
                                    -
                                </button>
                                <span className="px-4">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-2 border"
                                >
                                    +
                                </button>
                            </td>
                            <td className="p-2">${(48.85 * quantity).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="Coupon code"
                        className="border p-2 rounded-md"
                    />
                    <button className="bg-primary text-white px-4 py-2 rounded-md">
                        Apply Coupon
                    </button>
                </div>
                {/* <div className="flex gap-4 mt-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                        Update Cart
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                        Empty Cart
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default Cart;
