"use client";
import React, { useEffect, useState } from "react";
import Hero from "./Hero";

import Banner from "@/components/global/SeHeroSection";

import SeButton from "@/components/global/SeButton";
import SeCard from "@/components/global/SeCard";
import {
  faAmazon,
  faApple,
  faFacebook,
  faGoogle,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons"; // Add other icons as needed
import Image from "next/image";
import ProductSection from "./ProductSection";
import { useAddProductMutation, useGetProductsQuery } from "../redux/rtk";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/providers/StoreWrapper";
import { setTest } from "../redux/redux";

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  const brandIcons = [
    { icon: faAmazon, alt: "Amazon" },
    { icon: faApple, alt: "Apple" },
    { icon: faGoogle, alt: "Google" },
    { icon: faMicrosoft, alt: "Microsoft" },
    { icon: faFacebook, alt: "Facebook" },
  ];

  return (
    <div className="  bg-primary-bg overflow-x-hidden">
      <main className="flex flex-col gap-8">
        <Hero />
        <div className="flex items-center justify-between gap-4 space-x-4 mt-8 py-4">
          {products?.map((product: any, index: any) => (
            <SeCard key={index}>
              <Image
                height={300}
                width={200}
                src={product.imageSrc}
                alt={product.name}
                className=" object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
              />

              <SeButton
                fullWidth
                variant="contained"
                color="primary"
                label={product.name}
                // onClick={() =>
                //   addProducts({ id: 1, name: "test", imageSrc: "test" })
                // }
              />
            </SeCard>
          ))}
        </div>

        <ProductSection
          visibleCards={5} // Show 5 cards
          containerWidthPercentage={100} // 100% width
        />
        <div className="flex items-center gap-4 w-full ">
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
      </main>
    </div>
  );
};

export default LandingPage;
