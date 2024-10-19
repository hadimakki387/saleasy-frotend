import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

function ItemCardSkeleton({}: Props) {
  return (
    <div className="col-span-1  bg-white cursor-pointer ">
      <div className="flex justify-center bg-item-card-bg  h-56  max-sm:h-32">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      </div>
      <div className="space-y-4 pt-4">
        <h1 className=" font-bold text-primary max-sm:text-sm w-36">
          <Skeleton variant="rectangular" width="100%" animation="wave" />
        </h1>
        <div className="flex items-center justify-between max-sm:gap-2 max-sm:flex-col max-sm:items-start">
          <p className="text-error  font-bold w-36">
            <Skeleton variant="rectangular" width="100%" animation="wave" />
          </p>
          <div className="max-sm:hidden w-36">
            <Skeleton variant="rectangular" width="100%" animation="wave" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCardSkeleton;
