"use client";
import React, { useEffect } from "react";
import Hero from "./hero/Hero";

import Banner from "@/components/global/SeHeroSection";

import SeCarousel from "@/components/global/carousel/SeCarousel";
import { useAppSelector } from "@/providers/StoreWrapper";
import {
  faAmazon,
  faApple,
  faFacebook,
  faGoogle,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons"; // Add other icons as needed
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useDispatch } from "react-redux";
import { sectionsTypes } from "../interfaces/link-interface";
import { setTest } from "../redux/redux";
import { useGetStoreDataQuery } from "../redux/rtk";
import CategorySection from "./category-section";
import CategoryItem from "./category-section/CategorySection";
import DealsOfTheDay from "./DealsOfTheDay";
import ManuallySelectedItems from "./ManuallySelectedItems";
import { setIsLandingPageLoading } from "@/components/global-slice";
import LandingCarouselSkeleton from "./skeletons/LandingCarouselSkeleton";

export interface Product {
  id: number;
  name: string;
  imageSrc: string;
}

const LandingPage: React.FC = () => {
  // example usage of redux state management
  const dispatch = useDispatch();
  const { test } = useAppSelector((state) => state.landingPage);
  const { store } = useParams();

  const {
    data: storeData,
    error: storeError,
    isLoading: storeLoading,
  } = useGetStoreDataQuery({ id: store as string });

  const changeState = () => {
    dispatch(setTest("change"));
  };
  useEffect(() => {
    setTimeout(() => {
      changeState();
    }, 3000);
  }, []);
  // example usage of redux state management

  const brandIcons = [
    { icon: faAmazon, alt: "Amazon" },
    { icon: faApple, alt: "Apple" },
    { icon: faGoogle, alt: "Google" },
    { icon: faMicrosoft, alt: "Microsoft" },
    { icon: faFacebook, alt: "Facebook" },
  ];
  const router = useRouter();

  if (storeLoading) return <div>Loading...</div>;
  if (storeError) return <div>Error fetching data</div>;
  if (!storeData) return <div>No data</div>;
  return (
    <div className="">
      <main className="flex flex-col gap-8">
        <Hero data={storeData} />
        <SeCarousel options={{}}>
          {storeData.categories?.map((product, index: any) => (
            <CategoryItem key={index} product={product} />
          ))}
        </SeCarousel>

        {storeData.link.sections?.map((item, index) => {
          switch (item.type) {
            case sectionsTypes.deals_of_the_day:
              return (
                <>
                  {" "}
                  <DealsOfTheDay
                    visibleCards={5} // Show 5 cards
                    containerWidthPercentage={100} // 100% width
                  />
                  <div className="flex items-center gap-4 w-full sm:max-h-[15rem] max-sm:flex-col max-sm:hidden">
                    {item.advertisementSection?.map((ad, index) => {
                      return (
                        <div className="w-full" key={index}>
                          <Banner
                            data={ad}
                            fullBanner={item.advertisementSection.length > 1}
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            case sectionsTypes.manually_selected: {
              return <ManuallySelectedItems />;
            }
            case sectionsTypes.category_related:
              return (
                <>
                  <CategorySection />
                  <div className="flex items-center gap-4 w-full sm:max-h-[15rem] max-sm:flex-col max-sm:hidden">
                    {item.advertisementSection?.map((ad, index) => {
                      return (
                        <div className="w-full" key={index}>
                          <Banner
                            data={ad}
                            fullBanner={item.advertisementSection.length > 1}
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              );
          }
        })}
      </main>
    </div>
  );
};

export default LandingPage;
