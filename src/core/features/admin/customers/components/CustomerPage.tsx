"use client";
import React, { useEffect } from "react";
import { useGetStoreCustomersQuery } from "../redux/rtk";
import { useParams } from "next/navigation";
import SeTable from "@/components/global/Table/SE-Table";
import { ItemsColumn } from "../../items/columns/items-column";
import SeButton from "@/components/global/SeButton";
import SeTextField from "@/components/global/SeTextField";
import { CustomerColumns } from "./columns/CustomerColumns";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useDispatch } from "react-redux";

type Props = {};

function CustomerPage({}: Props) {
  const { store } = useParams();
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const { page, limit } = useAppSelector((state) => state.AdminCustomersSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const {
    data: customers,
    error: customersError,
    isLoading: customersLoading,
  } = useGetStoreCustomersQuery({
    name: debouncedSearch,
    storeId: store as string,
    page,
    limit,
  });
  console.log(customers?.data);
  return (
    <div className="p-4">
      <div className="text-2xl text-primary font-semibold mb-8">
        Customers List
      </div>
      <div className="flex items-center justify-between">
        <SeTextField
          placeholder="Search Items"
          className="w-40"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {!customersError && (
        <SeTable
          loading={customersLoading}
          onPaginationChange={(e, page) => {}}
          pageNumber={1}
          pages={1}
          onActionClick={(action, row) => {
            switch (row) {
              case "contactOnWhatsApp":
                const getCustomer = customers?.data.find(
                  (customer) => customer.id === action
                );
                const url = `https://wa.me/${getCustomer?.phoneNumber}`;
                window.open(url, "_blank");
                break;

              default:
                break;
            }
          }}
          rows={
            customers?.data?.map((customer) => {
              return {
                ...customer,
                createdAt: new Date(customer.createdAt).toLocaleDateString(),
              };
            }) || []
          }
          columnGetter={CustomerColumns}
        />
      )}
    </div>
  );
}

export default CustomerPage;
