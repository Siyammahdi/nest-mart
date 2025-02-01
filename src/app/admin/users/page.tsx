"use client";

import React from "react";
import users from "@/mock/users"; // Importing mock user data
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

const Users = () => {
    const handleEdit = (userId: number) => {
        console.log(`Edit user with ID: ${userId}`);
        // Logic to open user edit modal or navigate to edit page
    };

    const handleDelete = (userId: number) => {
        console.log(`Delete user with ID: ${userId}`);
        // Logic to delete user from the database
    };

    return (
        <div className="h-screen bg-gray-100">
            <header className="p-8 flex justify-between">
                <div className="flex gap-10 w-2/3">
                    <h1 className="text-3xl font-semibold text-admin">User Management</h1>
                    <div className="w-1/3 relative">
                        <input
                            type="text"
                            placeholder="Search for users..."
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
                                    <th className="px-4 py-2">Avatar</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Role</th>
                                    <th className="px-4 py-2">Total Buy</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Join Date</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="px-4 py-2">
                                            <Image
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-8 h-8 object-cover rounded-md"
                                                width={64}
                                                height={64}
                                            />
                                        </td>
                                        <td className="px-4 py-2">{user.name}</td>
                                        <td className="px-4 py-2">{user.email}</td>
                                        <td className="px-4 py-2">{user.role}</td>
                                        <td className="px-4 py-2">{user.totalBuy}</td>
                                        <td className="px-4 py-2">{user.status}</td>
                                        <td className="px-4 py-2">{user.joinDate}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(user.id)}
                                                    className="bg-admin/70 text-white flex justify-center items-center px-2 py-2 rounded-md hover:bg-primary transition"
                                                >
                                                    <MdRemoveRedEye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(user.id)}
                                                    className="bg-admin/80 text-white flex justify-center items-center px-2 py-2 rounded-md hover:bg-primary transition"
                                                >
                                                    <FiEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="bg-red-500 text-white flex justify-center items-center px-2 py-2 rounded-md hover:bg-red-600 transition"
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

            <footer className="bg-gray-200 sticky bottom-0 text-gray-700 text-center p-4 mt-8">
                <p>&copy; 2025 User Management Panel</p>
            </footer>
        </div>
    );
};

export default Users;