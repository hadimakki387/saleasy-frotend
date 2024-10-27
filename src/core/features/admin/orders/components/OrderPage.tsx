"use client";
import SeTable from "@/components/global/Table/SE-Table";
import { useAppDispatch, useAppSelector } from "@/providers/StoreWrapper";
import { OrdersColumns } from "../columns/list-orders-column";
import { useGetStoreOrderQuery } from "../redux/rtk";
import { useRouter } from "nextjs-toploader/app";
import SeTextField from "@/components/global/SeTextField";
import { setOrderStatus } from "../redux/redux";
import { OrderStatus } from "../interfaces/order-entity";

type Props = {};

function OrderPage({}: Props) {
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  const { status } = useAppSelector((state) => state.AdminOrdersSlice);
  const { data } = useGetStoreOrderQuery(
    {
      storeId: store?.id as string,
      status: status === "all" ? "" : status,
    },
    {
      skip: !store?.id,
    }
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="mx-4 grid grid-cols-1 my-8">
      <div className="flex items-center justify-between">
        <p className="text-3xl text-primary">View Orders</p>
        <SeTextField
          select
          value={status}
          options={[
            { label: "All", value: "all" },
            { label: "Pending", value: OrderStatus.PENDING },
            { label: "Accepted", value: OrderStatus.ACCEPTED },
            { label: "Rejected", value: OrderStatus.REJECTED },
            { label: "Shipping", value: OrderStatus.SHIPPING },
          ]}
          className="w-52"
          label="Filter by status"
          onChange={(e) => {
            dispatch(setOrderStatus(e.target.value));
          }}
        />
      </div>
      <SeTable
        columnGetter={OrdersColumns}
        onActionClick={(action, row) => {
          switch (row) {
            case "view":
              router.push(`/admin/${store?.id}/orders/${action}`);
              break;
            case "delete":
              console.log("delete", row);
              break;
            default:
              break;
          }
        }}
        rows={data || []}
      />
    </div>
  );
}

export default OrderPage;
