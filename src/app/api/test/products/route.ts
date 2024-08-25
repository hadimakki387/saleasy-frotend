// app/api/test/products/route.ts

import { NextResponse } from "next/server";
//GET, POST, PUT, DELETE, PATCH
export async function GET() {
  return NextResponse.json([
    { id: 1, name: "Toys", imageSrc: "/cat-image.jpg" },
    { id: 2, name: "Sports", imageSrc: "/cat-image.jpg" },
    { id: 3, name: "Gaming", imageSrc: "/cat-image.jpg" },
    { id: 4, name: "Furniture", imageSrc: "/cat-image.jpg" },
    { id: 5, name: "Fashion", imageSrc: "/cat-image.jpg" },
    { id: 6, name: "Cameras", imageSrc: "/cat-image.jpg" },
  ]);
}
