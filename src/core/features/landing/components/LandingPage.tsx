"use client";
import React, { useEffect } from "react";
import Hero from "./Hero";

import Banner from "@/components/global/SeHeroSection";

import SeCarousel from "@/components/global/carousel/SeCarousel";
import SeButton from "@/components/global/SeButton";
import SeCard from "@/components/global/SeCard";
import { useAppSelector } from "@/providers/StoreWrapper";
import {
  faAmazon,
  faApple,
  faFacebook,
  faGoogle,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons"; // Add other icons as needed
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setTest } from "../redux/redux";
import { useAddProductMutation, useGetProductsQuery } from "../redux/rtk";
import ProductSection from "./ProductSection";
import CategorySection from "./category-section";
import { products1 } from "@/fake-db/products-1";
import { useRouter } from "nextjs-toploader/app";

export interface Product {
  id: number;
  name: string;
  imageSrc: string;
}

const LandingPage: React.FC = () => {
  // example usage of redux state management
  const dispatch = useDispatch();
  const { test } = useAppSelector((state) => state.landingPage);
  const changeState = () => {
    dispatch(setTest("change"));
  };
  useEffect(() => {
    setTimeout(() => {
      changeState();
    }, 3000);
  }, []);
  // example usage of redux state management

  //example usage of rtk query
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery(
    { id: "1" },
    {
      //another options
    }
  );

  //example usage of rtk mustations
  const [
    addProducts,
    {
      isLoading: addingProduct,
      data: addedProduct,
      isError: errorAddingProducts,
    },
  ] = useAddProductMutation();
  //example usage of rtk query

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.toString()}</div>;

  const brandIcons = [
    { icon: faAmazon, alt: "Amazon" },
    { icon: faApple, alt: "Apple" },
    { icon: faGoogle, alt: "Google" },
    { icon: faMicrosoft, alt: "Microsoft" },
    { icon: faFacebook, alt: "Facebook" },
  ];
  const router = useRouter();

  return (
    <div className="">
      <main className="flex flex-col gap-8">
        <Hero />
        <SeCarousel options={{}}>
          {products1?.map((product, index: any) => (
            <SeCard key={index}>
              <Image
                height={300}
                width={200}
                src={product.imageSrc}
                alt={product.title}
                className=" object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110 min-w-56 max-sm:min-w-40"
              />

              <SeButton
                fullWidth
                variant="outlined"
                color="primary"
                label={product.title}
                onClick={() =>
                  router.push(
                    `/store/${product.id}/search?category=${product.title}`
                  )
                }
              />
            </SeCard>
          ))}
        </SeCarousel>

        <ProductSection
          visibleCards={5} // Show 5 cards
          containerWidthPercentage={100} // 100% width
        />
        <div className="flex items-center gap-4 w-full sm:max-h-[15rem] max-sm:flex-col">
          <div className="w-full">
            <Banner />
          </div>
          <div className="w-full">
            <Banner />
          </div>
          <div className="w-full">
            <Banner />
          </div>
        </div>
        <CategorySection />
        <div className="flex items-center gap-4 w-full sm:max-h-[15rem] max-sm:flex-col">
          <div className="w-full">
            <Banner />
          </div>
          <div className="w-full">
            <Banner />
          </div>
        </div>
        <CategorySection />
        <div className="flex items-center gap-4 w-full sm:max-h-[15rem] max-sm:flex-col">
          <div className="w-full">
            <Banner />
          </div>
        </div>
        <CategorySection />
      </main>
    </div>
  );
};

export default LandingPage;
