import Image from "next/image";
import React from "react";

// Define CardData type
interface CardData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

// Define Advantage component
const Advantage: React.FC = () => {
  const cardData: CardData[] = [
    {
      id: 1,
      image: "/icons/icon1.png",
      title: "Best prices and offers",
      subtitle: "Orders $30 or more",
    },
    {
      id: 2,
      image: "/icons/icon2.png",
      title: "Free Delevery",
      subtitle: "24/7 amazing services",
    },
    {
      id: 3,
      image: "/icons/icon3.png",
      title: "Great daily deal",
      subtitle: "When you sign up",
    },
    {
      id: 4,
      image: "/icons/icon4.png",
      title: "Wide assortment",
      subtitle: "Mega discounts",
    },
    {
      id: 5,
      image: "/icons/icon5.png",
      title: "Easy returns",
      subtitle: "Within 30 days",
    },
    {
      id: 6,
      image: "/icons/icon6.png",
      title: "Great Daily Deals",
      subtitle: "Exclusive discounts",
  },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
    {cardData.map((card) => (
      <div
        key={card.id}
        className="flex items-start w-full bg-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow"
      >
        <Image
          src={card.image}
          alt={card.title}
          className="rounded-lg mr-3 sm:mr-4"
          width={56} // Slightly smaller on small screens
          height={56}
        />
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-semibold text-text">
            {card.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">{card.subtitle}</p>
        </div>
      </div>
    ))}
  </div>
  );
};

export default Advantage;
