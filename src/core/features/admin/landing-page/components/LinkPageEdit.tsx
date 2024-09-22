"use client";
import SeLoader from "@/components/global/SeLoader";
import { useGetStoreDataQuery } from "@/core/features/customer/landing/redux/rtk";
import { useParams } from "next/navigation";
import React from "react";
import HeaderEdit from "./HeaderEdit";
import { useGetAdminStoreDataQuery } from "../redux/rtk";
import AdminCategory from "./AdminCategory";
import SeCarousel from "@/components/global/carousel/SeCarousel";
import HeroEdit from "./hero-edit/HeroEdit";
import AdminManuallySelectedItems from "./manually-selected-items/AdminManuallySelectedItems";

import AdminCategorySection from "./category-section/AdminCategorySection";
import AdminDealsOfTheDay from "./deals-of-the-day/AdminDealsOfTheDay";

type Props = {};

function LinkPageEdit({}: Props) {
  const { store } = useParams();
  const {
    data: storeData,
    error: storeError,
    isLoading: storeLoading,
  } = useGetAdminStoreDataQuery(store as string);
  return (
    <div className="px-4">
      <div className="text-2xl text-primary font-semibold my-8">
        Landing page
        <p className="text-sm text-sub-title-text">
          This is an illustration about how your landing page would look
        </p>
      </div>
      <div className="md:px-10">
        {storeLoading && !storeData ? (
          <div className="flex items-center justify-center h-[90vh]">
            <SeLoader />
          </div>
        ) : (
          storeData && (
            <div className="space-y-4">
              <div className="shadow-md shadow-neutral-200 p-4 md:px-12 ">
                <HeaderEdit link={storeData} />
              </div>
              <div className="shadow-md shadow-neutral-200 p-4 md:px-12">
                <HeroEdit data={storeData} />
              </div>
              <div className="shadow-md shadow-neutral-200 p-4 md:px-12">
                <div className="text-xl text-primary font-semibold mb-4">
                  Categories Section
                  <p className="text-error text-xs">Un-editable Section</p>
                </div>
                <SeCarousel options={{}}>
                  {storeData.categories?.map((product, index: any) => (
                    <AdminCategory key={index} product={product} />
                  ))}
                </SeCarousel>
              </div>
              <div className="shadow-md shadow-neutral-200 p-4 md:px-12">
                <AdminDealsOfTheDay />
              </div>
              <div className="shadow-md shadow-neutral-200 p-4 md:px-12">
                <AdminManuallySelectedItems />
              </div>
              <div className="shadow-md shadow-neutral-200 p-4 md:px-12">
                <AdminCategorySection />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default LinkPageEdit;
