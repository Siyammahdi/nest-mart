"use client";

import React from "react";
import products from "@/mock/products"; // Importing mock data
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

const ProductShowcase = () => {
    const handleEdit = (productId: number) => {
        console.log(`Edit product with ID: ${productId}`);
        // Logic to open product edit modal or navigate to edit page
    };

    const handleDelete = (productId: number) => {
        console.log(`Delete product with ID: ${productId}`);
        // Logic to delete product from the database
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="p-8 flex justify-between">
                <div className="flex gap-10 w-2/3">
                    <h1 className="text-3xl font-semibold text-admin">Product Showcase</h1>
                    <div className="w-1/3 relative">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full px-4 py-2 border-2 border-admin/70 rounded-lg"
                        />
                        <button className="bg-admin/90 text-white px-4 py-[6px] absolute right-[4px] bottom-[4px] rounded">Search</button>
                    </div>
                </div>
                <button className="flex gap-2 bg-admin/90 px-4 py-2 text-white rounded-lg font-medium items-center ">Add new <IoAdd size={20} /></button>
            </header>

            <main className="p-6">
                <section>
                    <div className="overflow-x-auto bg-white rounded-lg">
                        <table className="w-full table-auto text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2">Image</th>
                                    <th className="px-4 py-2">Product Name</th>
                                    <th className="px-4 py-2">Category</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Purchased</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-t">
                                        <td className="px-4 py-2">
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                className="w-16 h-16 object-cover rounded-md"
                                                width={64}
                                                height={64}
                                            />
                                        </td>
                                        <td className="px-4 py-2">{product.title}</td>
                                        <td className="px-4 py-2">{product.category}</td>
                                        <td className="px-4 py-2">{product.price}</td>
                                        <td className="px-4 py-2">95</td>
                                        <td className="px-4 py-2">Active</td>
                                        <td className="px-4 py-2">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(product.id)}
                                                    className="bg-admin/80 text-white flex justify-center items-center h-8 w-8 rounded-md hover:bg-primary transition"
                                                >
                                                    <FiEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
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
                </section>
            </main>

            <footer className="bg-gray-200 text-gray-700 text-center p-4 mt-8">
                <p>&copy; 2025 Grocery Shop Admin Panel</p>
            </footer>
        </div>
    );
};

export default ProductShowcase;
