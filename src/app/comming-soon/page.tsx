import Image from 'next/image';
import React from 'react';
import logo from '@/../public/logo.png'

const CommingSoon = () => {
    return (
        <div>
            <div className='relative'>
                <div
                    className="absolute z-10 inset-x-0 justify-center  ml-auto rounded-lg opacity-50 bg-gradient-to-r from-teal-700 via-green-600 to-green-400 h-42 right-10 md:right-96 top-64 w-44 h-44 md:w-96 md:h-96 blur-3xl">
                </div>
                <div className='h-screen flex flex-col justify-center pb-32 items-center md:w-fit mx-auto'>
                    <div className=''>
                        <Image src={logo} alt='logo' height={200} width={200} />
                    </div>
                    <h1 className='md:text-5xl lg:text-8xl font-semibold text-center  text-admin/60 relative z-20'>We are almost there</h1>
                    <div className="relative md:left-44 z-10 mt-6 flex items-center w-2/5">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="p-1 md:p-3 lg:p-5 rounded-full md:w-[550px] placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base text-black focus:outline-none"
                        />
                        <button className="absolute text-xs md:text-sm lg:text-base -right-20 md:-right-10 lg:right-0 p-2 md:p-3 lg:p-5 px-4 md:px-6 lg:px-8 bg-primary hover:bg-primary/70 transition-all duration-200 z-10 text-white rounded-full">
                            Subscribe
                        </button>
                    </div>
                    <div className='absolute right md:right-40 bottom-40'>
                        <h2 className='text-2xl md:text-3xl lg:text-4xl  font-semibold text-text'>Comming Soon...</h2>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CommingSoon;