"use client"

import { useState } from "react";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";

const CheckoutForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        region: "",
        city: "",
        area: "",
        building: "",
        landmark: "",
        address: "",
        label: "HOME",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <div className="w-full mx-0 md:mx-20 p-8 bg-white shadow-lg rounded-xl border border-gray-300 my-12">
            <h2 className="text-3xl font-semibold text-text mb-6">Add new shipping Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="fullName" placeholder="Enter your first and last name" value={formData.fullName} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300" />
                    <select name="region" value={formData.region} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300">
                        <option value="">Please choose your region</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input type="tel" name="phone" placeholder="Please enter your phone number" value={formData.phone} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300" />
                    <select name="city" value={formData.city} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300">
                        <option value="">Please choose your city</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="building" placeholder="Building / House No / Floor / Street" value={formData.building} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300" />
                    <select name="area" value={formData.area} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300">
                        <option value="">Please choose your area</option>
                    </select>
                </div>
                <input type="text" name="landmark" placeholder="Colony / Suburb / Locality / Landmark" value={formData.landmark} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300" />
                <input type="text" name="address" placeholder="For Example: House# 123, Street# 123, ABC Road" value={formData.address} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300" />
                <div className="mt-4">
                    <p className="mb-2">Select a label for effective delivery:</p>
                    <div className="flex space-x-4">
                        <button type="button" className={`px-6 py-2 border rounded-lg  ${formData.label === "OFFICE" ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-700"}`} onClick={() => setFormData({ ...formData, label: "OFFICE" })}>
                            <span className="flex items-center gap-1"><HiMiniBuildingOffice2 /> OFFICE</span>
                        </button>
                        <button type="button" className={`px-6 py-2 border rounded-lg flex items-center ${formData.label === "HOME" ? "border-primary text-primary" : "border-gray-300 text-gray-700"}`} onClick={() => setFormData({ ...formData, label: "HOME" })}>
                            <span className="flex items-center gap-1"><IoHome /> HOME</span>
                        </button>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600">CANCEL</button>
                    <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg">SAVE</button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
