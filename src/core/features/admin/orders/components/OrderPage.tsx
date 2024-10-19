"use client";
import React from "react";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useGetStoreOrderQuery } from "../redux/rtk";
import SeTable from "@/components/global/Table/SE-Table";
import { OrdersColumns } from "../columns/list-orders-column";

type Props = {};

function OrderPage({}: Props) {
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  const { data } = useGetStoreOrderQuery(store?.id as string, {
    skip: !store?.id,
  });
  console.log(data);
  return <SeTable columnGetter={OrdersColumns} rows={data || []} />;
}

export default OrderPage;
