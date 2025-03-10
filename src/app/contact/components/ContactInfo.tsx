import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions or feedback? Were here to help! Reach out to our friendly team through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Address */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-white p-4 rounded-full">
              <FaMapMarkerAlt size={24} />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">Our Location</h3>
          <p className="text-gray-600">
            123 Main Street, New York, NY 10001, United States
          </p>
        </div>

        {/* Phone */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-white p-4 rounded-full">
              <FaPhoneAlt size={24} />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">Phone Number</h3>
          <p className="text-gray-600">
            Customer Service: +1 (800) 123-4567
          </p>
          <p className="text-gray-600">
            Support: +1 (800) 765-4321
          </p>
        </div>

        {/* Email */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-white p-4 rounded-full">
              <FaEnvelope size={24} />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">Email Address</h3>
          <p className="text-gray-600">
            Customer Service: support@nestmart.com
          </p>
          <p className="text-gray-600">
            Vendor Relations: vendors@nestmart.com
          </p>
        </div>

        {/* Hours */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-white p-4 rounded-full">
              <FaClock size={24} />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">Working Hours</h3>
          <p className="text-gray-600">
            Monday - Friday: 8:00 AM - 8:00 PM
          </p>
          <p className="text-gray-600">
            Saturday - Sunday: 10:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 