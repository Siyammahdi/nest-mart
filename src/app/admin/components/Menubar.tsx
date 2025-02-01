"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from '@/../public/logo.png'


type MenuItemProps = {
	label: string;
	href: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const MenuItem: React.FC<MenuItemProps> = ({ label, href, Icon }) => {
	const pathname = usePathname();
	const isActive = pathname === `/admin${href}`;

	return (
		<Link href={`/admin${href}`}>
			<div
				className={`flex items-center space-x-3 py-4 cursor-pointer px-8  ${
					isActive ? "bg-gradient-to-r from-[#215a539a] border-l-4 border-[#215a53] text-primary" : "text-white"
				} transition-all hover:bg-gradient-to-r from-[#215a539a] hover:border-l-4 border-[#215a53]`}
			>
				<Icon className="w-5 h-5" />
				<p>{label}</p>
			</div>
		</Link>
	);
};

const Menubar: React.FC = () => {
	return (
		<div className="w-1/6 h-screen sticky bg-admin py-5 top-0 left-0">
			<div className="flex flex-col justify-between h-full">
				<nav>
					<div className="px-8 py-5">
						<Image src={logo} alt="logo" />
					</div>
					<ul>
						{menuItems.map((item, index) => (
							<li key={index}>
								<MenuItem
									label={item.label}
									href={item.href}
									Icon={item.Icon}
								/>
							</li>
						))}
					</ul>
				</nav>
				<div className="bg-[#215a53] text-center text-white py-8 rounded-lg m-8">
					<h2 className="text-xl">Enterprise Team</h2>
					<p className="text-sm text-gray-300">
						Request to a quate <br /> from our
					</p>
					<button>Request a call</button>
				</div>
			</div>
		</div>
	);
};



import {
	FiHome,
	FiCheckCircle,
	FiBarChart,
	FiTool,
	FiSearch,
	FiGlobe,
    FiUsers,
	FiDollarSign,
} from "react-icons/fi";
import Image from "next/image";

const menuItems = [
	{ label: "Dashboard", href: "/dashboard", Icon: FiHome },
	{ label: "Categories", href: "/categories", Icon: FiCheckCircle },
	{ label: "Products", href: "/products", Icon: FiBarChart },
	{ label: "Orders", href: "/orders", Icon: FiTool },
	{ label: "Reviews", href: "/reviews", Icon: FiSearch },
	{ label: "Brands", href: "/brands", Icon: FiGlobe },
	{ label: "Users", href: "/users", Icon: FiUsers },
	{ label: "Pricing & Plans", href: "/pricing", Icon: FiDollarSign },
];



export default Menubar;
