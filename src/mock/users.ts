interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "User" | "Editor";
    status: "Active" | "Inactive" | "Pending";
    avatar: string;
    totalBuy: number;
    joinDate: string;
  }
  
  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      avatar: "/user.png",
      totalBuy: 500,
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Inactive",
      avatar: "/user.png",
      totalBuy: 300,
      joinDate: "2022-11-20"
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "Editor",
      status: "Active",
      avatar: "/user.png",
      totalBuy: 150,
      joinDate: "2023-03-10"
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob.brown@example.com",
      role: "User",
      status: "Pending",
      avatar: "/user.png",
      totalBuy: 100,
      joinDate: "2023-05-18"
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie.davis@example.com",
      role: "User",
      status: "Active",
      avatar: "/user.png",
      totalBuy: 700,
      joinDate: "2021-09-30"
    },
    {
      id: 6,
      name: "David Evans",
      email: "david.evans@example.com",
      role: "User",
      status: "Inactive",
      avatar: "/user.png",
      totalBuy: 250,
      joinDate: "2022-08-22"
    },
    {
      id: 7,
      name: "Eve Foster",
      email: "eve.foster@example.com",
      role: "Editor",
      status: "Active",
      avatar: "/user.png",
      totalBuy: 400,
      joinDate: "2023-06-14"
    },
    {
      id: 8,
      name: "Frank Green",
      email: "frank.green@example.com",
      role: "User",
      status: "Pending",
      avatar: "/user.png",
      totalBuy: 200,
      joinDate: "2023-07-19"
    },
    {
      id: 9,
      name: "Grace Harris",
      email: "grace.harris@example.com",
      role: "User",
      status: "Active",
      avatar: "/user.png",
      totalBuy: 800,
      joinDate: "2021-12-01"
    },
    {
      id: 10,
      name: "Hank Irving",
      email: "hank.irving@example.com",
      role: "User",
      status: "Inactive",
      avatar: "/user.png",
      totalBuy: 350,
      joinDate: "2022-10-10"
    }
  ];
  
  export default users;