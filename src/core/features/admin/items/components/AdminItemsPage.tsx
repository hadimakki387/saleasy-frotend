"use client";
import React, { useEffect } from "react";

import { useParams } from "next/navigation";
import SeTable from "@/components/global/Table/SE-Table";
import { ItemsColumn } from "../columns/items-column";
import SeDialog from "@/components/global/SeDialog";
import { useDispatch } from "react-redux";
import {
  setCreateItemDialogOpen,
  setPage,
  setSelectedItem,
} from "../redux/redux";
import EditItemDialog from "./EditItemDialog";
import SeTextField from "@/components/global/SeTextField";
import SeButton from "@/components/global/SeButton";
import { useSearchItemsQuery } from "@/core/features/customer/search-page/redux/rtk";
import { useDeleteItemMutation, useSearchAdminItemsQuery } from "../redux/rtk";
import AddItemDialog from "./AddItemDialog";
import { toast } from "sonner";
import { useAppSelector } from "@/providers/StoreWrapper";

type Props = {};

function AdminItemsPage({}: Props) {
  const { store } = useParams();
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const { page, limit } = useAppSelector((state) => state.AdminItemsSlice);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  const {
    data,
    isLoading: itemsLoading,
    error: itemsError,
  } = useSearchAdminItemsQuery({
    storeId: store as string,
    name: debouncedSearch,
    page,
    limit,
  });
  const dispatch = useDispatch();
  const [
    deleteItem,
    { isLoading: deleteItemLoading, isSuccess: deleteItemSuccess },
  ] = useDeleteItemMutation();
  const handleDelete = (id: string) => {
    const toastId = toast.loading("Deleting Item");
    deleteItem({
      itemId: id,
      name: debouncedSearch,
      storeId: store as string,
      page,
      limit,
    })
      .unwrap()
      .then(() => {
        toast.dismiss(toastId);
        toast.success("Item Deleted");
      })
      .catch(() => {
        toast.dismiss(toastId);
        toast.error("Failed to delete item");
      });
  };
  return (
    <div className="p-4">
      <div className="text-2xl text-primary font-semibold">Items List</div>
      <div className="flex items-center justify-between">
        <SeTextField
          placeholder="Search Items"
          className="w-40"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SeButton
          label={"Add Item"}
          color_custom="admin-primary"
          rounded
          variant="contained"
          onClick={() => {
            dispatch(setCreateItemDialogOpen(true));
          }}
        />
      </div>
      {!itemsError && (
        <SeTable
          loading={itemsLoading}
          onPaginationChange={(e, page) => {
            dispatch(setPage(page));
          }}
          pageNumber={page}
          pages={data?.meta.totalPages}
          onActionClick={(action, row) => {
            switch (row) {
              case "edit":
                dispatch(
                  setSelectedItem(data?.data.find((item) => item.id === action))
                );
                break;
              case "delete":
                handleDelete(action);
                break;
              default:
                break;
            }
          }}
          rows={
            data?.data?.map((item) => {
              return {
                ...item,
                createdAt: new Date(item.createdAt).toLocaleDateString(),
                updatedAt: new Date(item.updatedAt).toLocaleDateString(),
              };
            }) || []
          }
          columnGetter={ItemsColumn}
        />
      )}
      <EditItemDialog debouncedSearch={debouncedSearch} />
      <AddItemDialog debouncedSearch={debouncedSearch} />
    </div>
  );
}

export default AdminItemsPage;
