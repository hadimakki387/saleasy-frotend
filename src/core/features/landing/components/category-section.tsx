import LinkArrowAnimation from "@/components/global/link-arrow-animation";
import SeButton from "@/components/global/SeButton";
import SeCard from "@/components/global/SeCard";
import Image from "next/image";
import React from "react";
import { useGetProductsQuery } from "../redux/rtk";
import SeCarousel from "@/components/global/carousel/SeCarousel";
import ProductCard from "./SeProductCard";
import { products } from "@/fake-db/products-2";
import DealsOfTheDay from "./DealsOfTheDay";

type Props = {};

function CategorySection({}: Props) {
  return (
    <div className="xl:grid xl:grid-cols-5 gap-4">
      <div className="col-span-1 h-full space-y-4 bg-white p-4 max-xl:hidden">
        <p className="font-bold text-lg">Electronic</p>

        <div className="space-y-3">
          <div>Mobile</div>
          <div>Tablet</div>
          <div>Computer</div>
          <div>Camera</div>
        </div>

        <LinkArrowAnimation text="Browse All" textClassName="text-sm" />
      </div>
      <div className="xl:hidden">
        <DealsOfTheDay />
      </div>
      <div className="col-span-4 ">
        <SeCarousel>
          {products?.map((product: any, index: any) => (
            <ProductCard
              key={product.id}
              imageSrc={product.imageSrc}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </SeCarousel>
      </div>
    </div>
  );
}

export default CategorySection;
