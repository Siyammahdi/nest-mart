interface Order {
    id: number;
    item: string;
    image: string;
    customer: string;
    email: string;
    quantity: number;
    price: string;
    payment: string;
    status: string;
    date: string;
}

const orders: Order[] = [
    {
      id: 354,
      item: "Seeds of Change Organic Red Rice",
      image: "/products/product1.jpg",
      customer: "Tokyo Naikra",
      email: "naikra@example.com",
      quantity: 10,
      price: "$280",
      payment: "COD",
      status: "READY TO SHIP",
      date: "2025-01-30",
    },
    {
      id: 355,
      item: "Organic Apple Cider Vinegar",
      image: "/products/product2.jpg",
      customer: "John Doe",
      email: "john@example.com",
      quantity: 5,
      price: "$150",
      payment: "Credit Card",
      status: "SHIPPED",
      date: "2025-01-29",
    },
    {
      id: 356,
      item: "Delicious Organic Avocados",
      image: "/products/product3.jpg",
      customer: "Alice Brown",
      email: "alice@example.com",
      quantity: 2,
      price: "$70",
      payment: "PayPal",
      status: "DELIVERED",
      date: "2025-01-28",
    },
    {
      id: 357,
      item: "Crispy Organic Almonds",
      image: "/products/product4.jpg",
      customer: "Michael Smith",
      email: "michael@example.com",
      quantity: 3,
      price: "$120",
      payment: "COD",
      status: "READY TO SHIP",
      date: "2025-01-27",
    },
    {
      id: 358,
      item: "Gourmet Dark Chocolate Bars",
      image: "/products/product5.jpg",
      customer: "Emma Johnson",
      email: "emma@example.com",
      quantity: 7,
      price: "$90",
      payment: "Credit Card",
      status: "PENDING",
      date: "2025-01-26",
    },
    {
      id: 359,
      item: "Fresh Organic Strawberries",
      image: "/products/product6.jpg",
      customer: "David Wilson",
      email: "david@example.com",
      quantity: 4,
      price: "$200",
      payment: "PayPal",
      status: "DELIVERED",
      date: "2025-01-25",
    },
    {
      id: 360,
      item: "Whole Grain Oats",
      image: "/products/product7.jpg",
      customer: "Sophia Miller",
      email: "sophia@example.com",
      quantity: 8,
      price: "$50",
      payment: "Credit Card",
      status: "SHIPPED",
      date: "2025-01-24",
    },
    {
      id: 361,
      item: "Fresh Organic Kale",
      image: "/products/product8.jpg",
      customer: "James Anderson",
      email: "james@example.com",
      quantity: 1,
      price: "$900",
      payment: "COD",
      status: "READY TO SHIP",
      date: "2025-01-23",
    },
    {
      id: 362,
      item: "Natural Almond Butter",
      image: "/products/product9.jpg",
      customer: "Olivia Thomas",
      email: "olivia@example.com",
      quantity: 2,
      price: "$400",
      payment: "PayPal",
      status: "PENDING",
      date: "2025-01-22",
    },
    {
      id: 363,
      item: "Cold-Pressed Organic Olive Oil",
      image: "/products/product10.jpg",
      customer: "Ethan White",
      email: "ethan@example.com",
      quantity: 1,
      price: "$300",
      payment: "Credit Card",
      status: "DELIVERED",
      date: "2025-01-21",
    }
];

export default orders;
