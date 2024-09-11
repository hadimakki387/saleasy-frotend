"use client";
import SeButton from "@/components/global/SeButton";
import SeTextField from "@/components/global/SeTextField";
import { faStore, faTruck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Radio } from "@mui/material";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type Props = {};

function CheckoutPage({}: Props) {
  const [value, setValue] = useState("");
  const [delivery, setDelivery] = useState<"ship" | "pick" | "">("");
  const [location, setLocation] = useState("");
  console.log(location);
  return (
    <div className="flex justify-center py-4 flex-col max-sm:px-2 px-4 xl:px-72 space-y-4">
      <p className="font-bold text-lg">Contact</p>

      <div className="space-y-2">
        {" "}
        <PhoneInput
          style={{
            flexDirection: "row-reverse",
            gap: "1rem",
          }}
          placeholder="phone number"
          defaultCountry="LB"
          value={value}
          onChange={(e) => {
            if (e) setValue(e?.toString());
          }}
        />
        <SeTextField
          label="Email"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: "2px",
            },
          }}
        />
        <p className="text-error text-xs">
          NOTE: If the phone number is not valid, the order will not be
          processed
        </p>
      </div>
      <div>
        <p className="font-bold text-lg">Delivery</p>
        <p className="text-sub-title-text text-xs">
          This will also be used as your billing address for this order.
        </p>
        <div className="mt-2">
          <div
            className={`cursor-pointer flex items-center justify-between text-sub-title-text px-4 py-1 border-t-2  border-l-2 border-r-2 rounded-t-md ${
              delivery !== "ship"
                ? " border-neutral-300  "
                : " border-green-600 border-b-2 "
            } ${!delivery && "border-b-2"}`}
            onClick={() => {
              setDelivery("ship");
            }}
          >
            <p>
              <Radio
                color="success"
                size="small"
                checked={delivery === "ship"}
              />
              Ship
            </p>
            <FontAwesomeIcon
              icon={faTruck}
              className={`${delivery === "ship" && "text-green-600"}`}
            />
          </div>
          <div
            className={`cursor-pointer flex items-center justify-between text-sub-title-text px-4 py-1 border-b-2 border-l-2 border-r-2 rounded-b-md ${
              delivery !== "pick"
                ? " border-neutral-300  "
                : " border-green-600 border-t-2 "
            }`}
            onClick={() => setDelivery("pick")}
          >
            <p>
              <Radio
                color="success"
                size="small"
                checked={delivery === "pick"}
              />{" "}
              Pickup in store
            </p>
            <FontAwesomeIcon
              icon={faStore}
              className={`${delivery === "pick" && "text-green-600"}`}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <div>
          <SeTextField
            select
            label="Country"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            options={[
              {
                value: "Lebanon",
                label: "Lebanon",
              },
              {
                value: "USA",
                label: "USA",
              },
            ]}
          />
        </div>

        <SeTextField label="Name" />
        <SeTextField label="Company (optional)" />
        <SeTextField label="Address" />
        <div className="flex items-center gap-4">
          <SeTextField label="City" />
          <SeTextField label="Postal code" />
        </div>
      </div>
      <div className="flex items-center justify-between border  text-title-text border-green-500 bg-[#e9f0e9] rounded-md p-4 text-sm">
        <p>Deliery Fees</p>
        <p>$5</p>
      </div>
      <div className="space-y-2">
        <p className="font-bold text-lg">Payment</p>
        <p className="text-sub-title-text text-xs">
          Your payment method&apos;s billing address must match the shipping
          address. All transactions are secure and encrypted.
        </p>
        <div className="flex items-center justify-between border  text-title-text border-green-500 bg-[#e9f0e9] rounded-md p-4 text-sm">
          <p>Cash on Delivery (COD)</p>
        </div>
      </div>
      <Button
        color="success"
        variant="contained"
        size="large"
        sx={{
          fontWeight: "bold",
        }}
      >
        Complete Order
      </Button>
    </div>
  );
}

export default CheckoutPage;
