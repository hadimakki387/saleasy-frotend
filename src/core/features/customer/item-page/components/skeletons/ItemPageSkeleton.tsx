import LandingCarouselSkeleton from "@/core/features/customer/landing/components/skeletons/LandingCarouselSkeleton";
import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

function ItemPageSkeleton({}: Props) {
  return (
    <div className="space-y-16 ">
      <div className="flex items-start gap-4 justify-center max-lg:flex-col">
        <div className="flex justify-center flex-col items-center w-full">
          <div className="h-[400px]  max-w-[400px] w-[400px] max-sm:w-full">
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </div>
          <div className="flex gap-4 mt-4">
            {Array.from({ length: 3 })?.map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={80}
                height={80}
              />
            ))}
          </div>
        </div>
        <div className="w-full space-y-4 pt-12">
          <h1 className="text-4xl font-bold text-primary">
            <Skeleton variant="rectangular" width={200} height={40} />
          </h1>
          <p className="text-button-color text-3xl font-bold">
            <Skeleton variant="rectangular" width={100} height={30} />
          </p>

          <div>
            <p className="text-primary mb-2">
              <Skeleton variant="rectangular" width={100} height={20} />
            </p>
            <p className="text-sm text-sub-title-text">
              <Skeleton variant="rectangular" width={"100%"} height={100} />
            </p>
          </div>

          {/* Iterate over item options and pass them to SeToggleButtonGroup */}
          {Array.from({ length: 2 })?.map((opt, index) => {
            return (
              <div key={index} className="space-y-2">
                <p>
                  <Skeleton variant="rectangular" width={100} height={20} />
                </p>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 3 })?.map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      width={100}
                      height={40}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          <p>
            <Skeleton variant="rectangular" width={200} height={20} />
          </p>
          <Skeleton variant="rectangular" width={200} height={40} />
        </div>
      </div>
      <LandingCarouselSkeleton />
    </div>
  );
}

export default ItemPageSkeleton;
