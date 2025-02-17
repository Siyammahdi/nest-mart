import Image from "next/image";
import React from "react";

// Define CardData type
interface CardData {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    description: string;
}

// Define Advantage component
const Features: React.FC = () => {
    const cardData: CardData[] = [
        {
            id: 1,
            image: "/icons/icon1.png",
            title: "Best prices and offers",
            subtitle: "Orders $50 or more",
            description:
                "Enjoy unbeatable prices and exclusive discounts on a wide range of products when you shop with us. Get the best deals every day.",
        },
        {
            id: 2,
            image: "/icons/icon2.png",
            title: "Free Delivery",
            subtitle: "24/7 amazing services",
            description:
                "We offer fast and free delivery on all eligible orders, ensuring your groceries arrive fresh and on time, whenever you need them.",
        },
        {
            id: 3,
            image: "/icons/icon3.png",
            title: "Great daily deal",
            subtitle: "When you sign up",
            description:
                "Sign up today and unlock exclusive daily deals on your favorite grocery items, saving you more with every purchase.",
        },
        {
            id: 4,
            image: "/icons/icon4.png",
            title: "Wide assortment",
            subtitle: "Mega discounts",
            description:
                "Choose from a diverse selection of high-quality groceries, fresh produce, and household essentials at unbeatable prices.",
        },
        {
            id: 5,
            image: "/icons/icon5.png",
            title: "Easy returns",
            subtitle: "Within 30 days",
            description:
                "Shop with confidence knowing that if something isn’t right, our hassle-free return policy has you covered within 30 days.",
        },
        {
            id: 6,
            image: "/icons/icon6.png",
            title: "Great Daily Deals",
            subtitle: "Exclusive discounts every day",
            description:
                "Discover fresh deals on groceries and essentials every day. Shop smart and save big with our exciting daily offers.",
        },
    ];

    return (
        <div className="mx-4">
            <h2 className="text-text text-3xl text-center font-semibold ">What we provide</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                {cardData.map((card) => (
                    <div
                        key={card.id}
                        className="border flex flex-col items-center justify-center  rounded-2xl p-10 hover:shadow-lg transition-shadow text-center"
                    >
                        <Image src={card.image} alt={card.title} width={56} height={56} />
                        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-text my-3">{card.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">{card.subtitle}</p>
                        <p className="text-base text-gray-600 mt-2">{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
