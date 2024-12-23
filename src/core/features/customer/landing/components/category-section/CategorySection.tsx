import SeButton from "@/components/global/SeButton";
import SeCard from "@/components/global/SeCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ICategories } from "../../interfaces/category-interface";
import { useParams } from "next/navigation";
import { getImageById } from "@/hooks/getImageById";
import { useRouter } from "nextjs-toploader/app";
import CustomImage from "@/components/global/CustomImage";
import CategorySectionSkeleton from "./CategorySectionSkeleton";

type Props = {
  product: ICategories;
};

function CategoryItem({ product }: Props) {
  const router = useRouter();
  const { store } = useParams();
  if (!product) return <CategorySectionSkeleton />;
  return (
    <SeCard>
      <CustomImage
        size={100}
        src={product.image}
        alt={product.name}
        className=" object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110 min-w-56 max-sm:min-w-h-32 max-w-56 h-56 max-sm:h-32 max-sm:max-w-32 max-sm:min-w-32"
      />

      <SeButton
        fullWidth
        variant="outlined"
        color="primary"
        label={product.name || ""}
        onClick={() =>
          router.push(`/${store}/search?category=${product.id}`)
        }
      />
    </SeCard>
  );
}

export default CategoryItem;
