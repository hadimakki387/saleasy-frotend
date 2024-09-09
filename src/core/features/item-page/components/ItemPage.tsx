"use client";
import SeButton from "@/components/global/SeButton";
import SeToggleButtonGroup from "@/components/global/SeToggleButtonGroup";
import { SingleItemData } from "@/fake-db/single-item-data";
import {
  Divider,
  Rating,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCartItems } from "../redux/redux";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useGetItemDataQuery } from "../redux/rtk";
import DaLoader from "@/components/global/SeLoader";
import SeLoader from "@/components/global/SeLoader";
import CustomImage from "@/components/global/CustomImage";

type Props = {};

function ItemPage({}: Props) {
  const [image, setImage] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<
    { key: string; value: string }[]
  >([]);
  const dispatch = useDispatch();
  const { CartItems } = useAppSelector((state) => state.ItemSlice);
  const { item } = useParams();

  const {
    data: getItem,
    error: getItemError,
    isLoading: getItemLoading,
  } = useGetItemDataQuery(item as string);

  useEffect(() => {
    if (getItem && !getItemLoading) {
      setImage(getItem.images[0]);
    }
  }, [getItem, getItemLoading]);

  const handleOptionChange = (key: string, value: string) => {
    setSelectedOptions((prevOptions) => {
      // Update the specific option by key, or add a new one if it doesn't exist
      const updatedOptions = prevOptions.filter((opt) => opt.key !== key);
      return [...updatedOptions, { key, value }];
    });
  };

  if (getItemLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <SeLoader />
      </div>
    );

  if (!getItem) throw notFound();
  console.log(selectedOptions);

  return (
    <div className="space-y-16 py-8">
      <div className="flex items-start gap-4 justify-center max-lg:flex-col">
        <div className="flex justify-center flex-col items-center w-full">
          <div className="h-[400px]">
            <CustomImage
              src={image}
              alt="item"
              size={400}
              className="rounded-md border-2 border-neutral-200 max-w-[400px] w-full"
            />
          </div>
          <div className="flex gap-4">
            {getItem.images.map((img) => (
              <CustomImage
                key={img}
                src={img}
                size={100}
                alt="item"
                onClick={() => {
                  setImage(img);
                }}
                className={`cursor-pointer rounded-md border-2 h-20 w-20 transition-all duration-200 ${
                  image === img
                    ? " border-button-color bg-white"
                    : " border-neutral-200"
                } ${image === img ? "opacity-100" : "opacity-50"}`}
              />
            ))}
          </div>
        </div>
        <div className="w-full space-y-4 pt-12">
          <h1 className="text-4xl font-bold text-primary">{getItem.name}</h1>
          <p className="flex items-center gap-1">
            Rated:{" "}
            <Rating
              name="read-only"
              value={getItem.rating}
              readOnly
              size="small"
            />
          </p>
          <p className="text-button-color text-3xl font-bold">
            {getItem.price}$
          </p>

          <div>
            <p className="text-primary">Description</p>
            <p className="text-sm text-sub-title-text">{getItem.description}</p>
          </div>

          {/* Iterate over item options and pass them to SeToggleButtonGroup */}
          {getItem.options.map((opt, index) => {
            return (
              <div key={index}>
                <p>{opt.name}</p>
                <SeToggleButtonGroup
                  options={opt.options}
                  selectedOption={
                    selectedOptions.find((o) => o.key === opt.name)?.value || ""
                  }
                  setSelectedOption={(value: string) => {
                    console.log(value);
                    handleOptionChange(opt.name, value);
                  }}
                />
              </div>
            );
          })}

          <p>Stock Available: {getItem.stock}</p>

          <SeButton
            variant="contained"
            color="error"
            label={"Add to Cart"}
            size="large"
            rounded
            sx={{ padding: "10px 20px" }}
            onClick={() => {
              if (CartItems.find((item) => item.id === getItem.id)) return;
              dispatch(
                setCartItems([...CartItems, { ...getItem, quantity: 1 }])
              );
            }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-primary mb-4 text-xl font-semibold">
          Reviews ({SingleItemData.reviews.length})
        </h2>
        <div className="space-y-4">
          {SingleItemData.reviews.map((review) => (
            <div key={review.id} className="space-y-3">
              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-full"
                  style={{
                    backgroundImage: `url(/dummy-profile-image.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="flex  justify-center flex-col">
                  <p>Loerm Ipsum</p>
                  <div className="flex items-center gap-2">
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      size="small"
                    />
                    <p className="text-xs">4 days</p>
                  </div>
                </div>
              </div>
              <p className="text-sub-title-text text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
