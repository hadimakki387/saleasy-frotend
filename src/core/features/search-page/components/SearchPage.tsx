"use client";
import React, { Suspense } from "react";
import FilterSidebar from "./FilterSidebar";
import Items from "./Items";
import SeDrawer from "@/components/global/SeDrawer";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useDispatch } from "react-redux";
import { setIsSearchDrawerOpen } from "@/components/global-slice";
import CartDrawer from "./CartDrawer";

type Props = {};

function SearchPage({}: Props) {
  const { isSearchDrawerOpen } = useAppSelector((state) => state.GlobalSlice);
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="max-lg:hidden col-span-1">
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
          <Suspense fallback={<div>Loading...</div>}>
            <FilterSidebar />
          </Suspense>
        </SeDrawer>
      </div>
      <div className="lg:col-span-5 max-lg:col-span-6">
        <Items />
      </div>
    </div>
  );
}

export default SearchPage;
