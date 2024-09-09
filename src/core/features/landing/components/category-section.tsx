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
import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";

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
        <div className=" flex items-center justify-between mb-6 max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:items-start">
          <h3 className="text-2xl font-bold text-primary ">{data.name}</h3>
          <Link
            href={`/store/${store}/search?category=${data.id}`}
            className="relative inline-flex items-center gap-2 pb-1 text-[var(--primary)] font-semibold hover:text-[#1F2937] transition-colors"
          >
            <span className="relative group">
              More Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full group-hover:bg-[#1F2937]"></span>
            </span>
            <ArrowForward className="text-base" />
          </Link>
        </div>
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
