import Image from 'next/image';
import React from 'react';
import logo from '@/../public/logo.png'

const Categories = () => {
    return (
        <div className='relative'>
            <div
                className="absolute z-10 inset-x-0 justify-center w-32 ml-auto rounded-lg opacity-50 bg-gradient-to-r from-teal-700 via-green-600 to-green-400 h-42 right-96 top-64 lg:w-96 lg:h-96 blur-3xl">
            </div>
            <div className='h-screen flex flex-col justify-center pb-32 items-center w-fit mx-auto'>
                <div className=''>
                    <Image src={logo} alt='logo' height={200} width={200} />
                </div>
                <h1 className='text-8xl font-semibold text-center  text-admin/60 relative z-20'>We are almost there</h1>
                <div className="relative left-44 z-10 mt-6 flex items-center w-full md:w-2/5">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="p-5 rounded-full w-[250px] md:w-[450px] text-black focus:outline-none"
                    />
                    <button className="absolute right-0 p-5 px-8 bg-primary hover:bg-primary/70 transition-all duration-200 z-10 text-white rounded-full">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Categories;