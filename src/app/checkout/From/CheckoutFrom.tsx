"use client"

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";

// Location data structure
interface City {
    id: string;
    name: string;
    areas: string[];
}

interface Region {
    id: string;
    name: string;
    cities: City[];
}

const locationData: Region[] = [
    {
        id: "north",
        name: "North Region",
        cities: [
            {
                id: "city1",
                name: "North City 1",
                areas: ["Area A", "Area B", "Area C"]
            },
            {
                id: "city2",
                name: "North City 2",
                areas: ["Area D", "Area E", "Area F"]
            }
        ]
    },
    {
        id: "south",
        name: "South Region",
        cities: [
            {
                id: "city3",
                name: "South City 1",
                areas: ["Area G", "Area H", "Area I"]
            },
            {
                id: "city4",
                name: "South City 2",
                areas: ["Area J", "Area K", "Area L"]
            }
        ]
    },
    {
        id: "east",
        name: "East Region",
        cities: [
            {
                id: "city5",
                name: "East City 1",
                areas: ["Area M", "Area N", "Area O"]
            },
            {
                id: "city6",
                name: "East City 2",
                areas: ["Area P", "Area Q", "Area R"]
            }
        ]
    },
    {
        id: "west",
        name: "West Region",
        cities: [
            {
                id: "city7",
                name: "West City 1",
                areas: ["Area S", "Area T", "Area U"]
            },
            {
                id: "city8",
                name: "West City 2",
                areas: ["Area V", "Area W", "Area X"]
            }
        ]
    }
];

const CheckoutForm = () => {
    const router = useRouter();
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

    // Get available cities based on selected region
    const availableCities = useMemo(() => {
        if (!formData.region) return [];
        const selectedRegion = locationData.find(region => region.id === formData.region);
        return selectedRegion ? selectedRegion.cities : [];
    }, [formData.region]);

    // Get available areas based on selected city
    const availableAreas = useMemo(() => {
        if (!formData.city || !formData.region) return [];
        const selectedRegion = locationData.find(region => region.id === formData.region);
        if (!selectedRegion) return [];
        const selectedCity = selectedRegion.cities.find(city => city.id === formData.city);
        return selectedCity ? selectedCity.areas : [];
    }, [formData.city, formData.region]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        // Reset dependent fields when parent field changes
        if (name === "region") {
            setFormData({
                ...formData,
                region: value,
                city: "", // Reset city when region changes
                area: "", // Reset area when region changes
            });
        } else if (name === "city") {
            setFormData({
                ...formData,
                city: value,
                area: "", // Reset area when city changes
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
        // Navigate to payment page
        router.push('/payment');
    };

    return (
        <div className="w-full mx-0 md:mx-20 p-8 bg-white shadow-lg rounded-xl border border-gray-300 my-12">
            <h2 className="text-3xl font-semibold text-text mb-6">Add new shipping Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="fullName" placeholder="Enter your first and last name" value={formData.fullName} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    <select name="region" value={formData.region} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option value="">Please choose your region</option>
                        {locationData.map((region) => (
                            <option key={region.id} value={region.id}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="tel" name="phone" placeholder="Please enter your phone number" value={formData.phone} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    <select 
                        name="city" 
                        value={formData.city} 
                        onChange={handleChange} 
                        required 
                        disabled={!formData.region}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">{formData.region ? "Please choose your city" : "Please select a region first"}</option>
                        {availableCities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="building" placeholder="Building / House No / Floor / Street" value={formData.building} onChange={handleChange} required className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    <select 
                        name="area" 
                        value={formData.area} 
                        onChange={handleChange} 
                        required 
                        disabled={!formData.city}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">{formData.city ? "Please choose your area" : "Please select a city first"}</option>
                        {availableAreas.map((area, index) => (
                            <option key={index} value={area}>
                                {area}
                            </option>
                        ))}
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
