// components/NewsletterSection.tsx
import Image from 'next/image';
import bg1 from "@/../public/banner/banner5.png";

const Newsletter = () => {
    return (
        <section className="relative bg-green-50 rounded-3xl p-8 sm:p-16 overflow-hidden">
            {/* Background image positioned at the bottom-right */}
            <div className="absolute bottom-0 right-0 z-10">
                <Image
                    src={bg1}
                    alt="Background"
                    width={600} // Adjust size as needed
                    height={500} // Adjust size as needed
                    className="object-contain"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto text-start space-y-10">
                <h1 className="text-3xl md:text-6xl font-bold text-text w-2/3">
                    Stay home & get your daily needs from our shop
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Start Your Daily Shopping with <span className="text-primary">Nest Mart</span>
                </p>
                <div className="relative mt-6 flex items-center w-full md:w-2/5">
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

            {/* Optional Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/20 z-0 rounded-lg" />
        </section>
    );
};

export default Newsletter;
