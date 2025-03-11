'use client';

import React, { useState } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaHome, 
  FaBuilding, 
  FaCheckCircle, 
  FaSave, 
  FaTimes 
} from 'react-icons/fa';

// Mock address data
const addressesData = [
  {
    id: 1,
    name: 'John Doe',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    isDefault: true,
    type: 'home'
  },
  {
    id: 2,
    name: 'John Doe',
    addressLine1: '456 Market St',
    addressLine2: 'Suite 200',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94103',
    country: 'United States',
    phone: '+1 (555) 987-6543',
    isDefault: false,
    type: 'work'
  }
];

// Initial form state
const initialFormState = {
  id: 0,
  name: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  phone: '',
  isDefault: false,
  type: 'home'
};

const AddressesPage = () => {
  const [addresses, setAddresses] = useState(addressesData);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (editingAddressId) {
        // Update existing address
        setAddresses(addresses.map(address => 
          address.id === editingAddressId ? { ...formData, id: editingAddressId } : address
        ));
        
        // If setting this as default, update other addresses
        if (formData.isDefault) {
          setAddresses(prevAddresses => 
            prevAddresses.map(address => 
              address.id !== editingAddressId ? { ...address, isDefault: false } : address
            )
          );
        }
        
        setEditingAddressId(null);
      } else {
        // Add new address
        const newAddress = {
          ...formData,
          id: Date.now() // Generate a unique ID
        };
        
        // If setting this as default, update other addresses
        if (newAddress.isDefault) {
          setAddresses(prevAddresses => 
            prevAddresses.map(address => ({ ...address, isDefault: false }))
          );
        }
        
        setAddresses([...addresses, newAddress]);
        setIsAddingAddress(false);
      }
      
      // Reset form
      setFormData(initialFormState);
      setErrors({});
    }
  };

  const handleEdit = (address: typeof initialFormState) => {
    setFormData(address);
    setEditingAddressId(address.id);
    setIsAddingAddress(false);
    setErrors({});
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(address => address.id !== id));
    
    // If we're currently editing this address, cancel the edit
    if (editingAddressId === id) {
      setEditingAddressId(null);
      setFormData(initialFormState);
    }
  };

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };

  const handleCancel = () => {
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Addresses</h1>
        <p className="text-gray-600 mt-1">Manage your shipping and billing addresses</p>
      </div>

      {/* Address List */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Saved Addresses</h2>
          {!isAddingAddress && !editingAddressId && (
            <button
              onClick={() => {
                setIsAddingAddress(true);
                setFormData(initialFormState);
              }}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <FaPlus className="mr-2" />
              Add New Address
            </button>
          )}
        </div>

        {addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`border rounded-lg p-4 relative ${
                  address.isDefault ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
              >
                {address.isDefault && (
                  <div className="absolute top-2 right-2 flex items-center text-primary">
                    <FaCheckCircle className="mr-1" />
                    <span className="text-xs font-medium">Default</span>
                  </div>
                )}
                
                <div className="flex items-start mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    address.type === 'home' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {address.type === 'home' ? <FaHome /> : <FaBuilding />}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{address.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{address.type} Address</p>
                  </div>
                </div>
                
                <div className="text-gray-700 mb-4">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>{address.city}, {address.state} {address.postalCode}</p>
                  <p>{address.country}</p>
                  <p className="mt-1">{address.phone}</p>
                </div>
                
                <div className="flex space-x-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(address)}
                    className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You don't have any saved addresses yet.</p>
            <button
              onClick={() => setIsAddingAddress(true)}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <FaPlus className="mr-2" />
              Add New Address
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Address Form */}
      {(isAddingAddress || editingAddressId) && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {editingAddressId ? 'Edit Address' : 'Add New Address'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`px-4 py-2 w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Address Line 1 */}
              <div className="md:col-span-2">
                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className={`px-4 py-2 w-full border ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                />
                {errors.addressLine1 && <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>}
              </div>

              {/* Address Line 2 */}
              <div className="md:col-span-2">
                <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`px-4 py-2 w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>

              {/* State/Province */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`px-4 py-2 w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                />
                {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`px-4 py-2 w-full border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                />
                {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`px-4 py-2 w-full border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                />
                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
              </div>

              {/* Phone */}
              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`px-4 py-2 w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Address Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                </select>
              </div>

              {/* Default Address */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <FaSave className="mr-2" />
                {editingAddressId ? 'Update Address' : 'Save Address'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddressesPage; 