"use client";
import CustomImage from "@/components/global/CustomImage";
import SeCard from "@/components/global/SeCard";
import SeLoader from "@/components/global/SeLoader";
import SeTextField from "@/components/global/SeTextField";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { OrderStatus } from "../interfaces/order-entity";
import {
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} from "../redux/rtk";
import BackButton from "@/components/global/BackButton";
import SeButton from "@/components/global/SeButton";
import { useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/providers/StoreWrapper";

type Props = {};

function ViewOrder({}: Props) {
  const { orderId } = useParams();
  const { status: orderStatus } = useAppSelector(
    (state) => state.AdminOrdersSlice
  );
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  const {
    data: order,
    isLoading: loadingOrder,
    isError: errorOrder,
    isSuccess: successOrder,
  } = useGetSingleOrderQuery({ orderId: orderId as string });
  const [status, setStatus] = useState(order?.status);
  const router = useRouter();
  const [
    updateOrderStatus,
    { isLoading: loadingUpdateOrder, isSuccess: successUpdateOrder },
  ] = useUpdateOrderStatusMutation();
  console.log("this is the old status", status);
  if (loadingOrder) {
    return (
      <div className="h-[85vh] flex items-center justify-center w-full">
        <SeLoader />
      </div>
    );
  }
  return (
    <div className="bg-primary-bg p-4 px-60 min-h-[90vh]">
      <BackButton />
      <SeCard className="m-12 space-y-4 p-6">
        <p className="text-xl text-primary">Order Details</p>
        <div className="flex items-center gap-6">
          <p>
            <span className="text-slate-500">Order ID:</span> {order?.id}
          </p>
          <p>
            <span className="text-slate-500">Placed on:</span>{" "}
            {format(new Date(order?.createdAt as string), "dd, MMM yyyy")}
          </p>
        </div>
        <div>
          <SeTextField
            label="Order Status"
            select
            value={status || order?.status}
            onChange={(e) => {
              setStatus(e.target.value as OrderStatus);
            }}
            options={[
              { label: "Pending", value: OrderStatus.PENDING },
              { label: "Accepted", value: OrderStatus.ACCEPTED },
              { label: "Rejected", value: OrderStatus.REJECTED },
              { label: "Shipping", value: OrderStatus.SHIPPING },
            ]}
            className="w-52"
          />
        </div>
        {order?.orderOptions.map((option, index) => {
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CustomImage
                  src={option.item.images ? option?.item?.images[0] : ""}
                  alt={option.item.name}
                  className="w-20 h-20 rounded-md bg-slate-300"
                />
                <div className="flex items-start justify-between flex-col h-full">
                  <p className="text-lg">{option.item.name}</p>
                  <p className="text-slate-500">
                    ${option.item.price.toLocaleString()} x {option.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-slate-500">Product Properties: </p>
                <p>
                  {option.options.map((item, index) => {
                    return (
                      <span key={index} className="text-slate-500">
                        {item.value}
                        {option.options.length - 1 !== index && ", "}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <p className="text-primary">
          Shipping Method:{" "}
          {order?.shippingInfo.method === "ship" ? "Shipping" : "Pickup"}
        </p>
        {order?.shippingInfo.method === "ship" ? (
          <p>Shipping Address: {order?.shippingInfo.address}</p>
        ) : null}
        <div className="flex flex-col gap-2">
          <p className="text-xl text-primary">Total Summary</p>
          <div className="lg:max-w-[15rem]">
            <p className="flex items-center justify-between">
              <span className="text-slate-500">Sub Total:</span> $
              {order?.total.toLocaleString()}
            </p>
            <p className="flex items-center justify-between">
              <span className="text-slate-500">Shipping Fee:</span> $
              {order?.shippingInfo.method === "ship" ? 10 : 0}
            </p>
            <p className="flex items-center justify-between">
              <span className="text-slate-500">Discount(%):</span> %
              {order?.total && order?.total > 100 ? 5 : 0}
            </p>
          </div>
        </div>
        {status !== order?.status ? (
          <div className="flex items-center justify-end">
            <SeButton
              label={"Save"}
              onClick={() => {
                console.log("update order status");
                console.log("order", order?.status);
                console.log("status", store?.id);
                const toastId = toast.loading("Updating order status...");
                updateOrderStatus({
                  orderId: order?.id as string,
                  newStatus: status as OrderStatus,
                  orderStatus: orderStatus as OrderStatus,
                  storeId: store?.id as string,
                })
                  .unwrap()
                  .then(() => {
                    toast.dismiss(toastId);
                    toast.success("Order status updated successfully");
                  })
                  .catch(() => {
                    toast.dismiss(toastId);
                    toast.error("Failed to update order status");
                  });
              }}
              color_custom="admin-primary"
              variant="contained"
            />
          </div>
        ) : null}
      </SeCard>
    </div>
  );
}

export default ViewOrder;
