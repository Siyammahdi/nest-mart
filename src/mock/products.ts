type NutritionalInfo = {
    calories: number;
    protein: string;
    fat: string;
    carbohydrates: string;
    fiber: string;
};

type Review = {
    user: string;
    rating: number;
    comment: string;
};

type Product = {
    id: number;
    title: string;
    category: string;
    image: string;
    brand: string;
    price: number;
    originalPrice: number;
    discount: number;
    isNew: boolean;
    rating: number;
    stock: number;
    weight: string;
    sku: string;
    description: string;
    ingredients: string[];
    nutritionalInfo: NutritionalInfo;
    reviews: Review[];
};




const products: Product[] = [
    {
        id: 1,
        title: 'Seeds of Organic Red Rice',
        category: 'Fresh Fruit',
        image: '/products/product1.jpg',
        brand: 'NestFood',
        price: 28.85,
        originalPrice: 33.20,
        discount: 13,
        isNew: false,
        rating: 1,
        stock: 50,
        weight: '1kg',
        sku: 'NF-REDRICE-001',
        description: 'Our Seeds of Organic Red Rice are a premium selection of high-quality, organic grains packed with nutrients. This rice variety is known for its rich fiber content and natural antioxidants, promoting a healthy diet and lifestyle. Grown without chemicals or pesticides, it retains its authentic flavor and texture. Perfect for preparing wholesome meals, it offers a nutty taste and chewy consistency. Whether cooked as a side dish, added to salads, or used in rice bowls, it enhances the nutritional value of any meal. Enjoy a delicious, healthy alternative with our organic red rice.',
        ingredients: ['Organic Red Rice'],
        nutritionalInfo: {
            calories: 160,
            protein: '3g',
            fat: '1g',
            carbohydrates: '35g',
            fiber: '2g'
        },
        reviews: [
            { user: 'John Doe', rating: 4, comment: 'Great quality and taste!' },
            { user: 'Emily Smith', rating: 5, comment: 'Very fresh and healthy.' }
        ]
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
        stock: 100,
        weight: '500ml',
        sku: 'HP-ACV-002',
        description: 'Our Organic Apple Cider Vinegar is raw, unfiltered, and infused with the goodness of the mother. It is naturally fermented to preserve its health benefits, making it an excellent choice for digestion, detoxification, and weight management. With no added preservatives, colors, or artificial flavors, it provides a pure and tangy taste. Ideal for salad dressings, marinades, or as a daily health tonic, it helps balance pH levels and boost immunity. Incorporate this versatile vinegar into your diet to enhance overall well-being and experience the benefits of nature’s purest ingredients.',
        ingredients: ['Organic Apple Cider Vinegar'],
        nutritionalInfo: {
            calories: 5,
            protein: '0g',
            fat: '0g',
            carbohydrates: '1g',
            fiber: '0g'
        },
        reviews: [
            { user: 'Sarah Johnson', rating: 5, comment: 'Excellent for digestion and weight loss!' },
            { user: 'Mike Lee', rating: 4, comment: 'Good taste and quality, but a bit pricey.' }
        ]
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
        stock: 30,
        weight: '3 pieces',
        sku: 'GF-AVOCADO-003',
        description: 'Fresh and creamy organic avocados, perfect for salads and smoothies.',
        ingredients: ['Organic Avocados'],
        nutritionalInfo: {
            calories: 240,
            protein: '3g',
            fat: '22g',
            carbohydrates: '12g',
            fiber: '10g'
        },
        reviews: [
            { user: 'Jane Wilson', rating: 5, comment: 'Very fresh and delicious!' },
            { user: 'Robert Brown', rating: 5, comment: 'Perfect ripeness and texture.' }
        ]
    },
    {
        id: 4,
        title: 'Organic Almonds',
        category: 'Nuts & Seeds',
        image: '/products/product4.jpg',
        brand: 'NutriFoods',
        price: 12.99,
        originalPrice: 15.00,
        discount: 13,
        isNew: false,
        rating: 4,
        stock: 75,
        weight: '200g',
        sku: 'NF-ALMOND-004',
        description: 'Organic almonds, high in protein, perfect for snacking or adding to recipes for an extra crunch.',
        ingredients: ['Organic Almonds'],
        nutritionalInfo: {
            calories: 160,
            protein: '6g',
            fat: '14g',
            carbohydrates: '6g',
            fiber: '3g'
        },
        reviews: [
            { user: 'Alice Davis', rating: 5, comment: 'These almonds are perfect for my diet!' },
            { user: 'Mark Green', rating: 4, comment: 'Fresh and crunchy, but a little too expensive.' }
        ]
    },
    {
        id: 5,
        title: 'Organic Extra Virgin Olive Oil',
        category: 'Oils & Vinegars',
        image: '/products/product5.jpg',
        brand: 'PureOlive',
        price: 18.50,
        originalPrice: 22.00,
        discount: 16,
        isNew: true,
        rating: 5,
        stock: 60,
        weight: '500ml',
        sku: 'PO-OLIVEOIL-005',
        description: 'Cold-pressed, organic extra virgin olive oil, perfect for cooking or as a salad dressing.',
        ingredients: ['Organic Extra Virgin Olive Oil'],
        nutritionalInfo: {
            calories: 120,
            protein: '0g',
            fat: '14g',
            carbohydrates: '0g',
            fiber: '0g'
        },
        reviews: [
            { user: 'Nina White', rating: 5, comment: 'Rich flavor, perfect for my salads!' },
            { user: 'Chris Martin', rating: 5, comment: 'Best olive oil I have ever tasted.' }
        ]
    },
    {
        id: 6,
        title: 'Fresh Organic Bananas',
        category: 'Fresh Fruit',
        image: '/products/product6.jpg',
        brand: 'FruitLand',
        price: 2.99,
        originalPrice: 3.50,
        discount: 14,
        isNew: false,
        rating: 4,
        stock: 100,
        weight: '6 pieces',
        sku: 'FL-BANANA-006',
        description: 'Sweet, fresh organic bananas, ideal for snacking, smoothies, or baking.',
        ingredients: ['Organic Bananas'],
        nutritionalInfo: {
            calories: 105,
            protein: '1g',
            fat: '0g',
            carbohydrates: '27g',
            fiber: '3g'
        },
        reviews: [
            { user: 'Sam Lee', rating: 5, comment: 'Perfectly ripe and sweet.' },
            { user: 'Anna Black', rating: 4, comment: 'Good quality but a bit small.' }
        ]
    },
    {
        id: 7,
        title: 'Organic Cacao Powder',
        category: 'Baking Ingredients',
        image: '/products/product7.jpg',
        brand: 'CocoLife',
        price: 10.99,
        originalPrice: 13.00,
        discount: 15,
        isNew: true,
        rating: 4,
        stock: 50,
        weight: '200g',
        sku: 'CL-COCOA-007',
        description: 'Raw, organic cacao powder, perfect for baking, smoothies, or homemade chocolate.',
        ingredients: ['Organic Cacao Powder'],
        nutritionalInfo: {
            calories: 50,
            protein: '3g',
            fat: '3g',
            carbohydrates: '12g',
            fiber: '8g'
        },
        reviews: [
            { user: 'Laura Davis', rating: 5, comment: 'Great for smoothies and baking!' },
            { user: 'Peter Evans', rating: 4, comment: 'Good quality but a little bitter.' }
        ]
    },
    {
        id: 8,
        title: 'Organic Spinach',
        category: 'Fresh Vegetables',
        image: '/products/product8.jpg',
        brand: 'GreenFarm',
        price: 3.00,
        originalPrice: 3.50,
        discount: 14,
        isNew: false,
        rating: 5,
        stock: 40,
        weight: '300g',
        sku: 'GF-SPINACH-008',
        description: 'Fresh, tender organic spinach, perfect for salads, smoothies, or cooking.',
        ingredients: ['Organic Spinach'],
        nutritionalInfo: {
            calories: 23,
            protein: '3g',
            fat: '0g',
            carbohydrates: '4g',
            fiber: '2g'
        },
        reviews: [
            { user: 'David White', rating: 5, comment: 'Very fresh and delicious!' },
            { user: 'Lena Clark', rating: 5, comment: 'Perfect for my salads.' }
        ]
    },
    {
        id: 9,
        title: 'Organic Quinoa',
        category: 'Grains & Cereals',
        image: '/products/product9.jpg',
        brand: 'EcoGrains',
        price: 8.99,
        originalPrice: 10.00,
        discount: 10,
        isNew: true,
        rating: 4,
        stock: 60,
        weight: '500g',
        sku: 'EG-QUINOA-009',
        description: 'High-quality, organic quinoa, a great gluten-free option for a nutritious meal.',
        ingredients: ['Organic Quinoa'],
        nutritionalInfo: {
            calories: 120,
            protein: '4g',
            fat: '2g',
            carbohydrates: '21g',
            fiber: '3g'
        },
        reviews: [
            { user: 'George Baker', rating: 5, comment: 'Great for salads and bowls!' },
            { user: 'Tina Martin', rating: 4, comment: 'Tastes great but a little expensive.' }
        ]
    },
    {
        id: 10,
        title: 'Organic Coconut Oil',
        category: 'Oils & Vinegars',
        image: '/products/product10.jpg',
        brand: 'CocoPure',
        price: 14.50,
        originalPrice: 18.00,
        discount: 19,
        isNew: false,
        rating: 5,
        stock: 80,
        weight: '500ml',
        sku: 'CP-COCONUTOIL-010',
        description: 'Pure, organic coconut oil, great for cooking, skincare, or haircare.',
        ingredients: ['Organic Coconut Oil'],
        nutritionalInfo: {
            calories: 120,
            protein: '0g',
            fat: '14g',
            carbohydrates: '0g',
            fiber: '0g'
        },
        reviews: [
            { user: 'Julia Foster', rating: 5, comment: 'Great for cooking and skincare!' },
            { user: 'Nick Harris', rating: 5, comment: 'The best coconut oil I have used!' }
        ]
    }
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
        id: 4,
        image: "/products/product4.jpg",
        title: "Seeds of Change Organic Watermelon",
        rating: 3,
        reviews: 1,
        price: "$61.50",
        originalPrice: "$66.00",
    },
    {
        id: 5,
        image: "/products/product5.jpg",
        title: "Frozen vegetables broccoli, spinach",
        rating: 3,
        reviews: 1,
        price: "$71.00",
        originalPrice: "$75.00",
    },
    {
        id: 6,
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
        id: 7,
        image: "/products/product7.jpg",
        title: "Seeds of Change Organic Red Rice",
        rating: 2,
        reviews: 1,
        price: "$28.85",
        originalPrice: "$32.80",
    },
    {
        id: 8,
        image: "/products/product8.jpg",
        title: "All Natural Style Chicken Meatballs",
        rating: 5,
        reviews: 3,
        price: "$52.85",
        originalPrice: "$55.80",
    },
    {
        id: 9,
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
        id: 10,
        image: "/products/product10.jpg",
        title: "Organic Cage Grade A Large Eggs",
        rating: 5,
        reviews: 1,
        price: "$21.00",
        originalPrice: "$24.00",
    },
    {
        id: 1,
        image: "/products/product11.jpg",
        title: "All Natural Style Chicken Meatballs",
        rating: 5,
        reviews: 3,
        price: "$52.85",
        originalPrice: "$55.80",
    },
    {
        id: 2,
        image: "/products/product12.jpg",
        title: "Blue Almonds Lightly Salted Vegetables",
        rating: 5,
        reviews: 1,
        price: "$23.85",
        originalPrice: "$25.80",
    },
];


