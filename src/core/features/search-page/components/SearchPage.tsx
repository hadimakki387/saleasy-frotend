import React from "react";
import FilterSidebar from "./FilterSidebar";
import Items from "./Items";

type Props = {};

function SearchPage({}: Props) {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-1">
        <FilterSidebar />
      </div>
      <div className="col-span-5">
        <Items />
      </div>
    </div>
  );
}

export default SearchPage;
