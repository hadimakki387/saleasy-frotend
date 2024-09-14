"use client";
import React from "react";
import { useGetStoreItemsQuery } from "../redux/rtk";
import { useParams } from "next/navigation";
import SeTable from "@/components/global/Table/SE-Table";
import { ItemsColumn } from "../columns/items-column";

type Props = {};

function AdminItemsPage({}: Props) {
  const { store } = useParams();
  const { data } = useGetStoreItemsQuery(store as string);
  console.log(data);
  return (
    <div>
      {data && (
        <SeTable
          rows={data.map((item) => {
            return {
              ...item,
              createdAt: new Date(item.createdAt).toLocaleDateString(),
              updatedAt: new Date(item.updatedAt).toLocaleDateString(),
            };
          })}
          columnGetter={ItemsColumn}
        />
      )}
    </div>
  );
}

export default AdminItemsPage;
