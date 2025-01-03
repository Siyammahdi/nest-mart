import Image from 'next/image';
import React from 'react';

const FooterTop: React.FC = () => {
    return (
        <footer className="bg-white py-10">
            <div className="container mx-auto">
                {/* Top section */}
                <div className="grid md:grid-cols-6 gap-8 mb-8">
                    {/* Company Logo and Info */}
                    <div className="">
                        <Image
                            src="/logo.png"
                            alt="Nest Mart & Grocery"
                            className="mb-7"
                            height={100}
                            width={200}
                        />
                        <p className="text-gray-500 font-semibold mb-4">Awesome grocery store website template</p>
                        <ul className="text-gray-700">
                            <li className="mb-2">
                                <span className="font-semibold">Address: </span>5171 W Campbell Ave undefined, Kent, Utah 53127, United States
                            </li>
                            <li className="mb-2">
                                <span className="font-semibold">Email: </span>
                                <a href="mailto:sale@Nest.com" className="text-green-600">sale@Nest.com</a>
                            </li>
                            <li>
                                <span className="font-semibold">Hours: </span>10:00 - 18:00, Mon - Sat
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-2xl font-semibold text-text mb-6">Company</h4>
                        <ul>
                            {['About Us', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions', 'Contact Us', 'Support Center', 'Careers'].map((link) => (
                                <li key={link} className="mb-2">
                                    <a href="#" className="text-gray-700 hover:text-green-600">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account Links */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Account</h4>
                        <ul>
                            {['Sign In', 'View Cart', 'My Wishlist', 'Track My Order', 'Help Ticket', 'Shipping Details', 'Compare products'].map((link) => (
                                <li key={link} className="mb-2">
                                    <a href="#" className="text-gray-700 hover:text-green-600">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Corporate Links */}
                    <div>
                        <h4 className="text-2xl font-semibold text-text mb-6">Corporate</h4>
                        <ul>
                            {['Become a Vendor', 'Affiliate Program', 'Farm Business', 'Farm Careers', 'Our Suppliers', 'Accessibility', 'Promotions'].map((link) => (
                                <li key={link} className="mb-2">
                                    <a href="#" className="text-gray-700 hover:text-green-600">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-2xl font-semibold text-text mb-6">Popular</h4>
                        <ul className="grid">
                            {['Milk & Flavoured Milk', 'Butter and Margarine', 'Eggs Substitutes', 'Marmalades', 'Sour Cream and Dips', 'Tea & Kombucha', 'Cheese'].map((link) => (
                                <li key={link} className="mb-2">
                                    <a href="#" className="text-gray-700 hover:text-green-600">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className=''>
                        <h4 className="text-2xl font-semibold text-text mb-5">Install App</h4>
                        <p className='text-gray-500 font-semibold mb-5'>From App Store or Google Play</p>
                        <div className="flex space-x-4 mb-4">
                            <a href="#">
                                <Image
                                    src="/google-play.jpg"
                                    alt="Google Play"
                                    className=""
                                    width={100}
                                    height={50}
                                />
                            </a>
                            <a href="#">
                                <Image
                                    src="/app-store.jpg"
                                    alt="App Store"
                                    className=""
                                    width={100}
                                    height={50}
                                />
                            </a>
                        </div>
                        <div className='my-10'>
                            <h5 className="font-semibold text-gray-500 mb-5">Secured Payment Gateways</h5>
                            <div className="flex space-x-4">
                                <Image
                                    src="/payment.png"
                                    alt="Visa"
                                    className="h-6"
                                    width={200}
                                    height={50}
                                />
                            </div>
                        </div>
                    </div>


                </div>


            </div>
        </footer>
    );
};

export default FooterTop;
