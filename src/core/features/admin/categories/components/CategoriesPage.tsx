"use client";
import React, { useState } from "react";
import CategoryAccordion from "./CategoryAccordion";
import { useGetACategoriesWithSubCategoriesQuery } from "../redux/rtk";
import { useParams } from "next/navigation";
import SeTextField from "@/components/global/SeTextField";
import DeleteSubCategoryDialog from "./dialogs/DeleteSubCategoryDialog";
import DeleteCategoryDialog from "./dialogs/DeleteCategoryDialog";
import SeButton from "@/components/global/SeButton";
import { useDispatch } from "react-redux";
import { setCreatedCategoryDialog } from "../redux/redux";
import CreateCategoryDialog from "./dialogs/CreateCategoryDialog";

type Props = {};

function CategoriesPage({}: Props) {
  const { store } = useParams();
  const { data } = useGetACategoriesWithSubCategoriesQuery(store as string);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="p-4 space-y-4">
      <DeleteSubCategoryDialog />
      <DeleteCategoryDialog />
      <CreateCategoryDialog />
      <div className="flex items-center justify-between">
        <SeTextField
          placeholder="Search"
          className="w-44"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SeButton
          label="Add Category"
          variant="contained"
          color_custom="admin-primary"
          onClick={() => {
            dispatch(setCreatedCategoryDialog(true));
          }}
        />
      </div>
      {data
        ?.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
        ?.map((category, index) => (
          <CategoryAccordion key={index} category={category} />
        ))}
    </div>
  );
}

export default CategoriesPage;
