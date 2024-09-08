import LinkArrowAnimation from "@/components/global/link-arrow-animation";
import SeButton from "@/components/global/SeButton";
import SeCard from "@/components/global/SeCard";
import Image from "next/image";
import React from "react";
import {
  useGetCategoryRelatedItemsQuery,
  useGetProductsQuery,
} from "../redux/rtk";
import SeCarousel from "@/components/global/carousel/SeCarousel";
import ProductCard from "./SeProductCard";
import { products } from "@/fake-db/products-2";
import DealsOfTheDay from "./DealsOfTheDay";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

type Props = {};

function CategorySection({}: Props) {
  const { store } = useParams();
  const { data } = useGetCategoryRelatedItemsQuery({ id: store as string });
  const router = useRouter();
  if (!data) return <div>loading</div>;
  return (
    <div className="xl:grid xl:grid-cols-5 gap-4">
      <div className="col-span-1 h-full space-y-4 bg-white p-4 max-xl:hidden">
        <p className="font-bold text-lg">{data.name}</p>

        <div className="space-y-2">
          {data.subCategories.map((subCat, index) => {
            return (
              <div
                className="cursor-pointer"
                key={index}
                onClick={() => {
                  router.push(`/store/${store}/search?category=${subCat.id}`);
                }}
              >
                {subCat.name}
              </div>
            );
          })}
        </div>

        <LinkArrowAnimation text="Browse All" textClassName="text-sm" />
      </div>
      <div className="xl:hidden">
        <DealsOfTheDay />
      </div>
      <div className="col-span-4 ">
        <SeCarousel>
          {data?.items?.map((product, index: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageSrc={product.images[0]}
              title={product.name}
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
