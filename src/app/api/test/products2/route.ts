import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, title: "North Star Blue", price: 110, imageSrc: "/banner-25.jpg", rating: 4 },
    { id: 2, title: "Silver High Neck Sweater", price: 210, imageSrc: "/banner-25.jpg", rating: 3 },
    { id: 3, title: "Yellow Casual Sweater", price: 110, imageSrc: "/banner-25.jpg", rating: 5 },
    { id: 4, title: "Denim Blue Jeans", price: 140, imageSrc: "/banner-25.jpg", rating: 2 },
    { id: 5, title: "Black White Sweater", price: 180, imageSrc: "/banner-25.jpg", rating: 4 },
    { id: 6, title: "najo7", price: 1400, imageSrc: "/banner-25.jpg", rating: 1 },
    { id: 7, title: "fashol", price: 100, imageSrc: "/banner-15.jpg", rating: 5 },
    { id: 8, title: "Black White Sweater", price: 180, imageSrc: "/banner-25.jpg", rating: 3 },
    { id: 9, title: "najo7", price: 1400, imageSrc: "/banner-25.jpg", rating: 2 },
    { id: 10, title: "fashol", price: 100, imageSrc: "/banner-25.jpg", rating: 4 },
  ];

  return NextResponse.json({ products });
}