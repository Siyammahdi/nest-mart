import { Poppins } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/utils/metadata";
import LayoutWrapper from "./LayoutWrapper";
import { CartProvider } from "@/lib/CartContext";

// ✅ Server-only metadata
export const metadata = defaultMetadata;

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
