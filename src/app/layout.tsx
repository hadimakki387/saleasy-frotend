import StoreWrapper from "@/providers/StoreWrapper";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Affordable E-commerce Platform for Small Businesses | Saleasy",
  description:
    "Launch your own customizable online store for just $20. Empowering small businesses with full control over theme, colors, and content.",
  keywords: [
    "e-commerce",
    "small business",
    "online store",
    "affordable",
    "customizable",
    "products",
    "admin panel",
    "themes",
    "colors",
    "content management",
  ],
  openGraph: {
    title: "Affordable E-commerce Platform for Small Businesses | Saleasy",
    description:
      "Launch your own customizable online store for just $20. Empowering small businesses with full control over theme, colors, and content.",
    url: "https://www.saleasy.store",
    siteName: "YourSiteName",
    images: [
      {
        url: "https://www.saleasy.store/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Affordable E-commerce Platform for Small Businesses",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "Affordable E-commerce Platform for Small Businesses | Saleasy",
    description:
      "Launch your own customizable online store for just $20. Empowering small businesses with full control over theme, colors, and content.",
    images: ["https://www.saleast.store/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.saleasy.store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StoreWrapper>{children}</StoreWrapper>
      </body>
    </html>
  );
}
