"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); 
  const isAdminRoute = pathname.startsWith("/admin"); 

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!isAdminRoute && <Header />}
        
        <main className={`${isAdminRoute ? "w-full bg-gray-100" : "max-w-[1540px] mx-auto "}`}>
          {children}
        </main>

        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
