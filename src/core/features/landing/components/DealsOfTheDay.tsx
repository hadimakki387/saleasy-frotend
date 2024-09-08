import React, { useState } from "react";

import SeCarousel from "@/components/global/carousel/SeCarousel";
import { products } from "@/fake-db/products-2";
import { ArrowForward } from "@mui/icons-material";
import { EmblaOptionsType } from "embla-carousel";
import ProductCard from "./SeProductCard";
import { useGetStoreDealsOfTheDayQuery } from "../redux/rtk";
import { useParams } from "next/navigation";

type Product = {
  id: number;
  imageSrc: string;
  title: string;
  price: number;
  rating: number;
};

interface ProductSectionProps {
  visibleCards?: number;
  containerWidthPercentage?: number;
  className?: string;
}

const DealsOfTheDay: React.FC<ProductSectionProps> = ({
  visibleCards = 5,
  containerWidthPercentage = 100,
  className = "",
}) => {
  const { store } = useParams();
  const { data: dealsOfTheDay } = useGetStoreDealsOfTheDayQuery({
    id: store as string,
  });
  console.log(dealsOfTheDay);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const options: EmblaOptionsType = {
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    startIndex: 0,
  };

  if (!dealsOfTheDay) return <div>loaduing</div>;

  return (
    <div className={`relative ${className}`}>
      <div className=" flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Deals Of The Day</h3>
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
      <div
        className=" right-0"
        style={{ width: `${containerWidthPercentage}%` }}
      >
        <SeCarousel options={options}>
          {dealsOfTheDay.map((product) => (
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
};

export default DealsOfTheDay;
