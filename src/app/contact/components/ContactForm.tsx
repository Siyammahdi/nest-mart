"use client";
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-gray-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-text mb-3">Get In Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or feedback? Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Order Status">Order Status</option>
                <option value="Returns & Refunds">Returns & Refunds</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm; 