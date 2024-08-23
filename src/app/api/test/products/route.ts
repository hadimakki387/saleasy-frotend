// app/api/test/products/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, name: "Toys", imageSrc: "/banner-15.jpg" },
    { id: 2, name: "Sports", imageSrc: "/banner-15.jpg" },
    { id: 3, name: "Gaming", imageSrc: "/banner-15.jpg" },
    { id: 4, name: "Furniture", imageSrc: "/banner-15.jpg" },
    { id: 5, name: "Fashion", imageSrc: "/banner-15.jpg" },
    { id: 6, name: "Cameras", imageSrc: "/banner-15.jpg" },
  ];

  return NextResponse.json({ products });
}
