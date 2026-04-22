import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Opal Comfort | Luxury Beds, Mattresses & Storage Solutions UK",
  description:
    "Opal Comfort crafts high-quality beds, mattresses and ottoman storage solutions for modern UK homes. Free white-glove delivery, 10-year guarantee, made for real life.",
  keywords: [
    "luxury beds UK",
    "ottoman storage beds",
    "mattresses UK",
    "bespoke beds",
    "upholstered beds",
    "Opal Comfort",
    "London bed showroom",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-light text-charcoal">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
