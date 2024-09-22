import SeCarousel from "@/components/global/carousel/SeCarousel";
import SeCard from "@/components/global/SeCard";
import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

function LandingCarouselSkeleton({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 max-sm:flex-col gap-4 max-sm:items-start">
        <p className="w-44 h-8 max-sm:h-4">
          <Skeleton variant="rectangular" />
        </p>
        <p className="w-44 h-8 max-sm:h-4">
          <Skeleton variant="rectangular" />
        </p>
      </div>
      <SeCarousel>
        {Array.from({ length: 10 })?.map((_, index) => {
          return (
            <SeCard
              key={index}
              className="relative bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full min-w-[300px] max-w-[300px] h-[400px] justify-between border-2 border-transparent  transition-all group max-sm:min-w-[170px] max-sm:max-w-[170px] max-sm:h-[250px] "
            >
              <div className="w-full h-48 rounded-md mb-4 max-sm:h-32 ">
                <Skeleton
                  width={"100%"}
                  height={"100%"}
                  variant="rectangular"
                />
              </div>
              <h2 className="text-[var(--title-text)] text-sm font-semibold mb-2 text-center truncate">
                <Skeleton height={20} width={100} />
              </h2>
              <p className="text-gray-900 font-bold text-sm mb-2 text-center">
                <Skeleton height={20} width={100} />
              </p>

              <Skeleton height={40} width={"100%"} variant="rectangular" />
            </SeCard>
          );
        })}
      </SeCarousel>
    </div>
  );
}

export default LandingCarouselSkeleton;
