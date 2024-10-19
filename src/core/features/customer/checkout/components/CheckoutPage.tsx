"use client";
import { setIsAuthecationDialogOpen } from "@/components/global-slice";
import SeButton from "@/components/global/SeButton";
import SeTextField from "@/components/global/SeTextField";
import { useAppSelector } from "@/providers/StoreWrapper";
import { faStore, faTruck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Radio } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
import { useCreateOrderMutation } from "../redux/rtk";
import { useParams, useSearchParams } from "next/navigation";
import { setCartItems } from "../../item-page/redux/redux";
import { useRouter } from "nextjs-toploader/app";

type Props = {};

function CheckoutPage({}: Props) {
  const [delivery, setDelivery] = useState<"ship" | "pick">("ship");
  const [location, setLocation] = useState("lebanon");
  const { user } = useAppSelector((state) => state.GlobalSlice);
  const { CartItems } = useAppSelector((state) => state.ItemSlice);
  const dispatch = useDispatch();
  const total = CartItems?.map((item) => {
    return item.price * item.quantity;
  }).reduce((a, b) => a + b, 0);
  const router = useRouter();
  const [
    createOrder,
    {
      data: orderData,
      isLoading: orderLoading,
      isSuccess: orderSuccess,
      isError: orderError,
      error: orderErrorData,
    },
  ] = useCreateOrderMutation();
  const { store } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
      country: "lebanon",
      company: "",
      address: "",
      city: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      company: Yup.string(),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const data = CartItems?.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          options: item.selectedOptions,
        };
      });
      const toastId = toast.loading("Creating order...");
      createOrder({
        items: data,
        shippingInfo: { method: delivery, ...values },
        storeId: store as string,
      })
        .unwrap()
        .then((data) => {
          toast.dismiss(toastId);
          toast.success("Thanks! Your order has been placed successfully");
          dispatch(setCartItems([]));
          localStorage.setItem("cart_items", JSON.stringify([]));
          router.push(`/${store}/search`);
          dispatch(setIsAuthecationDialogOpen(false));
        })
        .catch((err) => {
          toast.dismiss(toastId);
          toast.error(err.data.message);
        });
    },
  });

  return (
    <div className="flex justify-center py-4 flex-col max-sm:px-2 px-4 xl:px-72 space-y-4">
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
            name="country"
            value={location}
            formik={formik}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            options={[
              {
                label: "Lebanon",
                value: "lebanon",
              },
            ]}
          />
        </div>

        <SeTextField label="Name" name="name" formik={formik} />
        <SeTextField
          label="Company (optional)"
          name="company"
          formik={formik}
        />
        <SeTextField label="Address" name="address" formik={formik} />
        {/* <div className="flex items-center gap-4"> */}
        <SeTextField label="City" name="city" formik={formik} />
        {/* <SeTextField label="Postal code" name="postal" /> */}
        {/* </div> */}
      </div>
      <div className="flex items-center justify-between border  text-title-text border-green-500 bg-[#e9f0e9] rounded-md p-4 text-sm">
        <p>Deliery Fees</p>
        <p>${total}</p>
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
        onClick={() => {
          if (!user) {
            toast.error("Please login to complete your order");
            dispatch(setIsAuthecationDialogOpen(true));
            return;
          }
          formik.handleSubmit();
        }}
      >
        Complete Order
      </Button>
    </div>
  );
}

export default CheckoutPage;
