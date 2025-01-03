import React from 'react';
import { FaFacebook, FaInstagram, FaSkype, FaTwitter } from 'react-icons/fa';
import { PiPhoneCall } from 'react-icons/pi';

const FooterBottom = () => {
    return (
        <div className='border-t py-8'>
            <div className="container mx-auto">
                <div className="flex justify-between items-center gap-8">
                    <div>
                        <p className="text-gray-500">&copy; 2022, Nest – WordPress Ecommerce Template. <br /> All rights reserved</p>

                    </div>

                    <div className="mt-2 flex items-center gap-2">
                        <PiPhoneCall className='text-gray-400' size={40} />
                        <div>
                            <a href="tel:1900646666" className="text-primary font-bold text-2xl">01774010501</a>
                            <p className='text-xs text-gray-500'>Working 8:00 - 22:00</p>
                        </div>
                    </div>


                    <div className="mt-2 flex items-center gap-2">
                        <PiPhoneCall className='text-gray-400' size={40} />
                        <div>
                            <a href="tel:1900648888" className="text-primary font-bold text-2xl">01605872622</a>
                            <p className='text-xs text-gray-500'>24/7 Support Center</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex gap-2 justify-end text-primary">
                            <h5 className='text-text font-semibold'>Follow Us</h5>
                            <a href="#" className=" hover:text-green-600">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className=" hover:text-green-600">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className=" hover:text-green-600">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className=" hover:text-green-600">
                                <FaSkype size={24} />
                            </a>
                        </div>
                        <p className='text-gray-500'>Up to 15% discount on your first subscribe</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;