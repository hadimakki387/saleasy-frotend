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
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCartItems } from "../redux/redux";
import { useAppSelector } from "@/providers/StoreWrapper";

type Props = {};

function ItemPage({}: Props) {
  const params = useParams();
  const [image, setImage] = useState(SingleItemData.images[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Red");
  const dispatch = useDispatch();
  const { CartItems } = useAppSelector((state) => state.ItemSlice);

  return (
    <div className="space-y-16 py-8">
      <div className="flex items-start gap-4 justify-center max-lg:flex-col">
        <div className="flex justify-center flex-col items-center w-full">
          <Image src={image} alt="item" width={400} height={400} />
          <div className="flex gap-4">
            {SingleItemData.images.map((img) => (
              <Image
                key={img}
                src={img}
                width={100}
                height={100}
                alt="item"
                onClick={() => setImage(img)}
                className={`cursor-pointer rounded-md border-2 h-20 w-20 transition-all duration-200 ${
                  image === img
                    ? " border-button-color bg-white"
                    : " border-transparent"
                } ${image === img ? "opacity-100" : "opacity-50"}`}
              />
            ))}
          </div>
        </div>
        <div className="w-full space-y-4 pt-12">
          <h1 className="text-4xl font-bold text-primary">
            {SingleItemData.title}
          </h1>
          <p className="flex items-center gap-1">
            Rated:{" "}
            <Rating
              name="read-only"
              value={SingleItemData.rating}
              readOnly
              size="small"
            />
          </p>
          <p className="text-button-color text-3xl font-bold">
            {SingleItemData.price}$
          </p>

          <div>
            <p className="text-primary">Description</p>
            <p className="text-sm text-sub-title-text">
              {SingleItemData.description}
            </p>
          </div>
          <div>
            <p>Size</p>
            <SeToggleButtonGroup
              options={["S", "M", "L", "XL"]}
              selectedOption={selectedSize}
              setSelectedOption={(e) => {
                setSelectedSize(e);
              }}
            />
          </div>
          <div>
            <p>Color</p>
            <SeToggleButtonGroup
              options={["Red", "Green", "Blue", "Yellow"]}
              selectedOption={selectedColor}
              setSelectedOption={(e) => {
                setSelectedColor(e);
              }}
            />
          </div>
          <p>Stock Available: {SingleItemData.stock}</p>
          <SeButton
            variant="contained"
            color="error"
            label={"Add to Cart"}
            size="large"
            rounded
            sx={{
              padding: "10px 20px",
            }}
            onClick={() => {
              // if (CartItems.find((item) => item.id === SingleItemData.id))
              //   return;
              dispatch(
                setCartItems([...CartItems, { ...SingleItemData, quantity: 1 }])
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
