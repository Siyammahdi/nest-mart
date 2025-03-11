"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from '@/../public/logo.png';
import {
	FiHome,
	FiCheckCircle,
	FiBarChart,
	FiTool,
	FiSearch,
	FiGlobe,
	FiUsers,
	FiDollarSign,
	FiSettings,
	FiHelpCircle,
	FiLogOut
} from "react-icons/fi";

type MenuItemProps = {
	label: string;
	href: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
	collapsed?: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ label, href, Icon, collapsed = false }) => {
	const pathname = usePathname();
	const isActive = pathname === `/admin${href}` || (href === '/dashboard' && pathname === '/admin');

	return (
		<Link href={`/admin${href}`}>
			<div
				className={`flex items-center ${collapsed ? 'justify-center' : 'px-6'} py-3 cursor-pointer ${
					isActive 
						? "bg-[#215a5333] border-l-4 border-[#215a53] text-white" 
						: "text-gray-300 hover:bg-[#215a5333] hover:border-l-4 border-[#215a53]"
				} transition-all duration-200`}
			>
				<Icon className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
				{!collapsed && <span>{label}</span>}
			</div>
		</Link>
	);
};

interface MenubarProps {
	collapsed?: boolean;
}

const Menubar: React.FC<MenubarProps> = ({ collapsed = false }) => {
	return (
		<div className="h-full flex flex-col justify-between py-5">
			<nav>
				<div className={`${collapsed ? 'px-4' : 'px-6'} py-4 flex ${collapsed ? 'justify-center' : ''}`}>
					{collapsed ? (
						<div className="w-10 h-10 relative">
							<Image src={logo} alt="logo" fill className="object-contain" />
						</div>
					) : (
						<Image src={logo} alt="logo" width={120} height={40} className="object-contain" />
					)}
				</div>
				<ul className="mt-6 space-y-1">
					{menuItems.map((item, index) => (
						<li key={index}>
							<MenuItem
								label={item.label}
								href={item.href}
								Icon={item.Icon}
								collapsed={collapsed}
							/>
						</li>
					))}
				</ul>
			</nav>
			
			<div className="mt-auto">
				<div className={`${collapsed ? 'mx-2' : 'mx-4'} mb-4 ${collapsed ? 'p-2' : 'p-4'} bg-[#215a53] rounded-lg ${collapsed ? 'text-center' : ''}`}>
					{!collapsed && (
						<>
							<h2 className="text-lg font-medium text-white">Need Help?</h2>
							<p className="text-xs text-gray-300 mt-1 mb-3">
								Contact our support team
							</p>
						</>
					)}
					<button className={`${collapsed ? 'p-2' : 'px-4 py-2'} bg-white text-[#215a53] rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors w-full flex items-center justify-center`}>
						<FiHelpCircle className={collapsed ? 'w-5 h-5' : 'w-4 h-4 mr-2'} />
						{!collapsed && <span>Get Support</span>}
					</button>
				</div>
				
				<div className="border-t border-[#215a5333] pt-4 pb-2">
					<MenuItem
						label="Settings"
						href="/settings"
						Icon={FiSettings}
						collapsed={collapsed}
					/>
					<button 
						className={`w-full flex items-center ${collapsed ? 'justify-center' : 'px-6'} py-3 text-gray-300 hover:bg-[#215a5333] hover:border-l-4 border-[#215a53] transition-all duration-200`}
						onClick={() => console.log('Logout')}
					>
						<FiLogOut className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
						{!collapsed && <span>Logout</span>}
					</button>
				</div>
			</div>
		</div>
	);
};

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
