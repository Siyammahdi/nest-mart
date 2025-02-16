import Image from 'next/image';
import React from 'react';
import welcome from '@/../public/about/spoo.jpg';
import long from '@/../public/about/groclong.jpg'
import about1 from '@/../public/about/about2.png';
import about2 from '@/../public/about/about3.png';
import about3 from '@/../public/about/about4.png';

const Welcome = () => {
    return (
        <div className='flex items-center gap-10 px-6'>
            <div className='w-1/2 flex gap-6'>
                <Image src={welcome} alt='Welcome to Nest Mart' className='rounded-3xl' height={500} width={500} />
                <Image src={long} alt='Welcome to Nest Mart' className='rounded-3xl' height={500} width={150} />
            </div>
            <div className='w-1/2'>
                <div>
                    <h2 className='text-3xl font-semibold mb-4 text-text'>Welcome to Nest Mart</h2>

                    <p className='text-gray-600 mb-4'>
                        Nest Mart is your trusted destination for fresh, high-quality groceries delivered right to your doorstep. 
                        We bring you a wide selection of farm-fresh vegetables, organic produce, dairy products, meats, and pantry essentials, 
                        making grocery shopping easy and convenient.
                    </p>

                    <p className='text-gray-600 mb-4'>
                        Our goal is to provide a seamless shopping experience by ensuring that every product meets the highest quality standards. 
                        We carefully source our groceries from trusted farms and suppliers, ensuring freshness and affordability. 
                        Whether you need daily essentials or specialty items, we have everything to keep your kitchen stocked.
                    </p>

                    <p className='text-gray-600 mb-6'>
                        At Nest Mart, we value your time and convenience. Our efficient delivery service ensures that your groceries arrive fresh and on time. 
                        With easy ordering, secure payment options, and customer-friendly support, we make sure that shopping for groceries is effortless. 
                        Enjoy a hassle-free experience and bring home the best with Nest Mart.
                    </p>
                </div>

                <div className='flex gap-6'>
                    <Image src={about1} alt='Quality Products' height={250} width={200} />
                    <Image src={about2} alt='Fresh Groceries' height={250} width={200} />
                    <Image src={about3} alt='Fast Delivery' height={250} width={200} />
                </div>
            </div>
        </div>
    );
};

export default Welcome;
