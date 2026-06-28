import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/Analytics";
import ScrollProgress from "@/components/ScrollProgress";
import MobileCtaBar from "@/components/MobileCtaBar";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  // [CONFIRM DOMAIN] Update to the client's live domain before launch — this is
  // the base for absolute URLs in sitemap, robots and Open Graph tags.
  metadataBase: new URL("https://www.opalcomfort.co.uk"),
  title: "Opal Comfort | Handmade Bespoke Beds & Sofas — West Yorkshire, UK",
  description:
    "Opal Comfort handcrafts bespoke beds, ottoman beds, sleigh beds, divans and sofas in West Yorkshire. Your fabric, your colour, your size — delivered and installed across the UK in as little as 2 weeks.",
  keywords: [
    "bespoke beds UK",
    "handmade beds West Yorkshire",
    "ottoman beds",
    "upholstered beds",
    "custom sofas UK",
    "made to order beds Wakefield",
    "Opal Comfort",
  ],
  openGraph: {
    title: "Opal Comfort | Handmade Bespoke Beds & Sofas",
    description:
      "Crafted for Rest, Designed for Comfort. Handmade in West Yorkshire, delivered across the UK.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-body pb-16 lg:pb-0">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Floating WhatsApp button (desktop) + mobile sticky CTA bar */}
        <WhatsAppButton />
        <MobileCtaBar />
        {/* GA4 — inert until NEXT_PUBLIC_GA_ID is set */}
        <Analytics />
      </body>
    </html>
  );
}
