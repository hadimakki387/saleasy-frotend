"use client";
import SeButton from "@/components/global/SeButton";
import { ProductInterface } from "@/fake-db/products-2";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type Props = {
  product: ProductInterface;
};

function ItemCard({ product }: Props) {
  const router = useRouter();
  const params = useParams();
  const { store, item } = params;
  return (
    <div className="col-span-1  bg-white">
      <div className="flex justify-center bg-item-card-bg">
        <Image
          width={200}
          height={200}
          src={product.imageSrc}
          alt="item"
          className="w-56"
        />
      </div>
      <div className="p-4">
        <h1 className=" font-bold text-primary">{product.title}</h1>
        <Rating name="read-only" value={product.rating} readOnly size="small" />
        <div className="flex items-center justify-between">
          <p className="text-button-color  font-bold">{product.price}$</p>
          <SeButton
            label={"Add To Cart"}
            variant="contained"
            color="error"
            onClick={() => {
              router.push(`/store/${store}/item/${product.id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
