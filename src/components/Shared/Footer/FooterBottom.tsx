import React from 'react';
import { FaFacebook, FaInstagram, FaSkype, FaTwitter } from 'react-icons/fa';
import { PiPhoneCall } from 'react-icons/pi';

const FooterBottom = () => {
    return (
        <div className='border-t py-6 bg-gray-50'>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    
                    {/* Copyright Section */}
                    <div className="flex-1">
                        <p className="text-gray-500 text-sm md:text-base">
                            &copy; {new Date().getFullYear()}, Nest – WordPress Ecommerce Template. <br className="hidden md:block"/> All rights reserved.
                        </p>
                    </div>

                    {/* Contact Info - Mobile: Stacked, Desktop: Side by Side */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-2">
                            <PiPhoneCall className='text-gray-400' size={30} />
                            <div>
                                <a href="tel:01774010501" className="text-primary font-bold text-lg md:text-xl">01774010501</a>
                                <p className='text-xs text-gray-500'>Working 8:00 - 22:00</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <PiPhoneCall className='text-gray-400' size={30} />
                            <div>
                                <a href="tel:01605872622" className="text-primary font-bold text-lg md:text-xl">01605872622</a>
                                <p className='text-xs text-gray-500'>24/7 Support Center</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <h5 className='text-text font-semibold'>Follow Us</h5>
                        <div className="flex gap-3 text-primary">
                            <a href="#" className="hover:text-green-600">
                                <FaFacebook size={22} />
                            </a>
                            <a href="#" className="hover:text-green-600">
                                <FaTwitter size={22} />
                            </a>
                            <a href="#" className="hover:text-green-600">
                                <FaInstagram size={22} />
                            </a>
                            <a href="#" className="hover:text-green-600">
                                <FaSkype size={22} />
                            </a>
                        </div>
                        <p className='text-gray-500 text-sm'>Up to 15% discount on your first subscribe</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;
