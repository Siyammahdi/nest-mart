"use client"

import React from "react";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import orders from "@/mock/orders"
import { MdDeleteOutline } from "react-icons/md";

const Orders = () => {
    const handleEdit = (productId: number) => {
        console.log(`Edit product with ID: ${productId}`);
        // Logic to open product edit modal or navigate to edit page
    };

    const handleDelete = (productId: number) => {
        console.log(`Delete product with ID: ${productId}`);
        // Logic to delete product from the database
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
             <div className="flex gap-10 w-2/3 mb-6">
                    <h1 className="text-3xl font-semibold text-admin">Order Management</h1>
                    <div className="w-1/3 relative">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full px-4 py-2 border-2 border-admin/70 rounded-lg"
                        />
                        <button className="bg-admin/90 text-white px-4 py-[6px] absolute right-[4px] bottom-[4px] rounded">Search</button>
                    </div>
                </div>
            <div className="overflow-x-auto bg-white rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Item</th>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Quantity</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Payment</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Order Date</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="p-3">#{order.id}</td>
                                <td className="p-3 flex items-center space-x-3">
                                    <Image
                                        src={order.image}
                                        alt={order.item}
                                        width={40}
                                        height={40}
                                        className="rounded-md"
                                    />
                                    <span>{order.item}</span>
                                </td>
                                <td className="p-3">
                                    <span className="font-semibold">{order.customer}</span>
                                    <br />
                                    <span className="text-gray-500 text-sm">{order.email}</span>
                                </td>
                                <td className="p-3">{order.quantity}</td>
                                <td className="p-3">{order.price}</td>
                                <td className="p-3">{order.payment}</td>
                                <td className="p-3">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-200 text-yellow-800">
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-3">{order.date}</td>
                                <td className="p-3 text-center">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleEdit(order.id)}
                                            className="bg-admin/80 text-white flex justify-center items-center h-8 w-8 rounded-md hover:bg-primary transition"
                                        >
                                            <FiEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="bg-red-500 text-white flex justify-center items-center h-8 w-8 rounded-md hover:bg-red-600 transition"
                                        >
                                            <MdDeleteOutline size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
