import { Skeleton } from "@mui/material";
import React from "react";

type Props = {};

function CategorySectionSkeleton({}: Props) {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        minWidth: 250,
        minHeight: 250,
      }}
      className="rounded-sm"
    />
  );
}

export default CategorySectionSkeleton;
