"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/auth") || pathname.startsWith("/comming-soon");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const hideHeaderFooter = isAdminRoute || isDashboardRoute;

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className={`${hideHeaderFooter ? "w-full bg-gray-100" : "max-w-[1540px] mx-auto"}`}>
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}