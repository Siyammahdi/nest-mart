
const products = [
    {
        id: 1,
        title: 'Seeds of Change Organic Red Rice',
        category: 'Fresh Fruit',
        image: '/products/product1.jpg',
        brand: 'NestFood',
        price: 28.85,
        originalPrice: 33.20,
        discount: 13,
        isNew: false,
        rating: 1,
    },
    {
        id: 2,
        title: 'Organic Apple Cider Vinegar',
        category: 'Beverages',
        image: '/products/product2.jpg',
        brand: 'HealthPlus',
        price: 15.99,
        originalPrice: 20.00,
        discount: 20,
        isNew: true,
        rating: 4,
    },
    {
        id: 3,
        title: 'Delicious Organic Avocados',
        category: 'Fresh Vegetables',
        image: '/products/product3.jpg',
        brand: 'GreenFarm',
        price: 4.50,
        originalPrice: 5.00,
        discount: 10,
        isNew: true,
        rating: 5,
    },
    {
        id: 4,
        title: 'Crispy Organic Almonds',
        category: 'Snacks',
        image: '/products/product4.jpg',
        brand: 'NuttyDelights',
        price: 12.99,
        originalPrice: 14.99,
        discount: 13,
        isNew: false,
        rating: 3,
    },
    {
        id: 5,
        title: 'Gourmet Dark Chocolate Bars',
        category: 'Snacks',
        image: '/products/product5.jpg',
        brand: 'ChocoLuxe',
        price: 8.49,
        originalPrice: 10.00,
        discount: 15,
        isNew: true,
        rating: 4,
    },
    {
        id: 6,
        title: 'Fresh Organic Strawberries',
        category: 'Fresh Fruit',
        image: '/products/product6.jpg',
        brand: 'BerryDelight',
        price: 7.99,
        originalPrice: 9.50,
        discount: 16,
        isNew: true,
        rating: 5,
    },
    {
        id: 7,
        title: 'Whole Grain Oats',
        category: 'Grains & Cereals',
        image: '/products/product7.jpg',
        brand: 'FarmFresh',
        price: 3.99,
        originalPrice: 4.50,
        discount: 11,
        isNew: false,
        rating: 4,
    },
    {
        id: 8,
        title: 'Fresh Organic Kale',
        category: 'Fresh Vegetables',
        image: '/products/product8.jpg',
        brand: 'VeggieLove',
        price: 5.99,
        originalPrice: 7.00,
        discount: 14,
        isNew: true,
        rating: 4,
    },
    {
        id: 9,
        title: 'Natural Almond Butter',
        category: 'Dairy & Alternatives',
        image: '/products/product9.jpg',
        brand: 'NutraBlend',
        price: 6.75,
        originalPrice: 8.00,
        discount: 16,
        isNew: false,
        rating: 3,
    },
    {
        id: 10,
        title: 'Cold-Pressed Organic Olive Oil',
        category: 'Cooking & Baking',
        image: '/products/product10.jpg',
        brand: 'OlivaPure',
        price: 12.49,
        originalPrice: 14.99,
        discount: 17,
        isNew: true,
        rating: 5,
    },
];


export default products;


// data/products.ts
interface ProductData {
    id: number;
    image: string;
    title: string;
    rating: number;
    reviews: number;
    price: string;
    originalPrice: string;
}

export const topSelling: ProductData[] = [
    {
        id: 1,
        image: "/products/product1.jpg",
        title: "All Natural Style Chicken Meatballs",
        rating: 5,
        reviews: 3,
        price: "$52.85",
        originalPrice: "$55.80",
    },
    {
        id: 2,
        image: "/products/product2.jpg",
        title: "Angie’s Sweet & Salty Kettle Corn",
        rating: 4,
        reviews: 1,
        price: "$48.85",
        originalPrice: "$52.80",
    },
    {
        id: 3,
        image: "/products/product3.jpg",
        title: "Gorton’s Beer Battered Fish Fillets",
        rating: 0,
        reviews: 0,
        price: "$23.85",
        originalPrice: "$25.80",
    },
];

export const trendingProducts: ProductData[] = [
    {
        id: 1,
        image: "/products/product4.jpg",
        title: "Seeds of Change Organic Watermelon",
        rating: 3,
        reviews: 1,
        price: "$61.50",
        originalPrice: "$66.00",
    },
    {
        id: 2,
        image: "/products/product5.jpg",
        title: "Frozen vegetables broccoli, spinach",
        rating: 3,
        reviews: 1,
        price: "$71.00",
        originalPrice: "$75.00",
    },
    {
        id: 3,
        image: "/products/product6.jpg",
        title: "Gorton’s Beer Battered Fish Fillets",
        rating: 0,
        reviews: 0,
        price: "$23.85",
        originalPrice: "$25.80",
    },
];

export const recentlyAdded: ProductData[] = [
    {
        id: 1,
        image: "/products/product7.jpg",
        title: "Seeds of Change Organic Red Rice",
        rating: 2,
        reviews: 1,
        price: "$28.85",
        originalPrice: "$32.80",
    },
    {
        id: 2,
        image: "/products/product8.jpg",
        title: "All Natural Style Chicken Meatballs",
        rating: 5,
        reviews: 3,
        price: "$52.85",
        originalPrice: "$55.80",
    },
    {
        id: 3,
        image: "/products/product9.jpg",
        title: "Angie’s Sweet & Salty Kettle Corn",
        rating: 4,
        reviews: 1,
        price: "$48.85",
        originalPrice: "$52.80",
    },
];

export const topRated: ProductData[] = [
    {
        id: 1,
        image: "/products/product10.jpg",
        title: "Organic Cage Grade A Large Eggs",
        rating: 5,
        reviews: 1,
        price: "$21.00",
        originalPrice: "$24.00",
    },
    {
        id: 2,
        image: "/products/product11.jpg",
        title: "All Natural Style Chicken Meatballs",
        rating: 5,
        reviews: 3,
        price: "$52.85",
        originalPrice: "$55.80",
    },
    {
        id: 3,
        image: "/products/product12.jpg",
        title: "Blue Almonds Lightly Salted Vegetables",
        rating: 5,
        reviews: 1,
        price: "$23.85",
        originalPrice: "$25.80",
    },
];
