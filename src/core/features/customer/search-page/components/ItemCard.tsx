"use client";
import SeButton from "@/components/global/SeButton";
import { ProductInterface } from "@/fake-db/products-2";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { ItemInterface } from "../../landing/interfaces/items-interface";
import CustomImage from "@/components/global/CustomImage";

type Props = {
  product: ItemInterface;
};

function ItemCard({ product }: Props) {
  const router = useRouter();
  const params = useParams();
  const { store, item } = params;
  return (
    <div
      className="col-span-1  bg-white cursor-pointer "
      onClick={() => {
        router.push(`/${store}/item/${product.id}`);
      }}
    >
      <div className="flex justify-center bg-item-card-bg">
        <CustomImage
          size={200}
          src={product.images[0]}
          alt="item"
          className="w-56 h-56 max-sm:w-32 max-sm:h-32"
        />
      </div>
      <div className="p-4">
        <h1 className=" font-bold text-primary max-sm:text-sm">
          {product.name}
        </h1>
        <div className="flex items-center justify-between max-sm:gap-2 max-sm:flex-col max-sm:items-start">
          <p className="text-error  font-bold">{product.price}$</p>
          <div className="max-sm:hidden">
            <SeButton
              label={"Add To Cart"}
              variant="contained"
              color="error"
              onClick={() => {
                router.push(`/${store}/item/${product.id}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
