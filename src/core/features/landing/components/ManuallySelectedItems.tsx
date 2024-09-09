import React from "react";
import CategorySection from "./category-section";
import Banner from "@/components/global/SeHeroSection";
import { ItemInterface } from "../interfaces/items-interface";
import { SectionInterface, sectionsTypes } from "../interfaces/link-interface";
import { useParams } from "next/navigation";
import { useGetManuallySelectedItemsSectionQuery } from "../redux/rtk";
import { MainInterface } from "@/services/types";
import { ArrowForward } from "@mui/icons-material";
import SeCarousel from "@/components/global/carousel/SeCarousel";
import { EmblaOptionsType } from "embla-carousel";
import ProductCard from "./SeProductCard";

type Props = {};

function ManuallySelectedItems() {
  const { store } = useParams();
  const { data } = useGetManuallySelectedItemsSectionQuery({
    id: store as string,
  });
  const options: EmblaOptionsType = {
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    startIndex: 0,
  };

  if (!data) return <div>loading</div>;
  return (
    <>
      <div className={`relative `}>
        <div className=" flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">{data.sectionName}</h3>
          <a
            href="/"
            className="relative inline-flex items-center gap-2 pb-1 text-[var(--primary)] font-semibold hover:text-[#1F2937] transition-colors"
          >
            <span className="relative group">
              More Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full group-hover:bg-[#1F2937]"></span>
            </span>
            <ArrowForward className="text-base" />
          </a>
        </div>
        <div className=" right-0" style={{ width: `100%` }}>
          <SeCarousel options={options}>
            {data.items.map((product, index) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  imageSrc={product.images[0]}
                  title={product.name}
                  price={product.price}
                  rating={product.rating}
                />
              );
            })}
          </SeCarousel>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full sm:max-h-[15rem] max-sm:flex-col">
        {data.sections.map((ad, index) => {
          console.log("ad", ad);
          return (
            <div className="w-full" key={index}>
              <Banner fullBanner={data.sections.length > 1} data={ad} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ManuallySelectedItems;
