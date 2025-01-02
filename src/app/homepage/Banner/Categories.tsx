import Image from "next/image";
import React from "react";

const Categories: React.FC = () => {
  return (
    <div className="border border-primary/50 rounded-2xl p-4">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition"
          >
            <Image
              src={category.image}
              alt={category.name}
              className="w-6 h-6"
              width={50}
              height={50}
            />
            <span className="text-gray-700">{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


export const categories = [
    { id: 1, name: "Milks and Dairies", image: "/categories/category1.png" },
    { id: 2, name: "Clothing & Beauty", image: "/categories/category2.png" },
    { id: 3, name: "Pet Foods & Toy", image: "/categories/category3.png" },
    { id: 4, name: "Baking Material", image: "/categories/category4.png" },
    { id: 5, name: "Wines & Drinks", image: "/categories/category5.png" },
    { id: 6, name: "Fresh Seafood", image: "/categories/category6.png" },
    { id: 7, name: "Fast Food", image: "/categories/category7.png" },
    { id: 8, name: "Vegetables", image: "/categories/category8.png" },
    { id: 9, name: "Fresh Fruit", image: "/categories/category9.png" },
    { id: 10, name: "Bread and Juice", image: "/categories/category10.png" },
];

  
export default Categories;
