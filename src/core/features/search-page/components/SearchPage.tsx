"use client";
import React from "react";
import FilterSidebar from "./FilterSidebar";
import Items from "./Items";
import SeDrawer from "@/components/global/SeDrawer";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useDispatch } from "react-redux";
import { setIsSearchDrawerOpen } from "@/components/global-slice";

type Props = {};

function SearchPage({}: Props) {
  const { isSearchDrawerOpen } = useAppSelector((state) => state.GlobalSlice);
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-1 max-lg:hidden">
        <FilterSidebar />
      </div>
      <div className="lg:hidden">
        <SeDrawer
          open={isSearchDrawerOpen}
          anchor="left"
          onClose={() => {
            dispatch(setIsSearchDrawerOpen(false));
          }}
          onOpen={() => {}}
        >
          <FilterSidebar />
        </SeDrawer>
      </div>
      <div className="col-span-5 max-lg:col-span-6">
        <Items />
      </div>
    </div>
  );
}

export default SearchPage;
