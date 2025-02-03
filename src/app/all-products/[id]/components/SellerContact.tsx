
import React from 'react';

const SellerContact: React.FC = () => {
  const seller = {
    name: 'Siyam Mahdi',
    title: 'Web Developer',
    email: 'siyammadhi1@gmail.com',
    phone: '+880 1774010501',
  };

  return (
    <div className="bg-green-100 ml-10 rounded-lg overflow-hidden ">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{seller.name}</h2>
        <p className="text-gray-600">{seller.title}</p>
        <div className="mt-4">
          <p className="text-gray-800 font-medium">Contact Info:</p>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Email:</span> {seller.email}
          </p>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Phone:</span> {seller.phone}
          </p>
        </div>
        <button className="mt-4 bg-primary font-semibold text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-300">
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default SellerContact;
