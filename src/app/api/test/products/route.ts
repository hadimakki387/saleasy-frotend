// app/api/test/products/route.ts

import { NextResponse } from "next/server";
//GET, POST, PUT, DELETE, PATCH
export async function GET() {
  return NextResponse.json([
    { id: 1, name: "Toys", imageSrc: "/cat-1.jpg" },
    { id: 2, name: "Sports", imageSrc: "/cat-2.jpg" },
    { id: 3, name: "Gaming", imageSrc: "/cat-2.jpg" },
    { id: 4, name: "Furniture", imageSrc: "/cat-4.jpg" },
    { id: 5, name: "Fashion", imageSrc: "/cat-5.jpg" },
    { id: 6, name: "Cameras", imageSrc: "/cat-6.jpg" },
  ]);
}
