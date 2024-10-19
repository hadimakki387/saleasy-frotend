import AdminItemsPage from "@/core/features/admin/items/components/AdminItemsPage";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div className="grid grid-cols-1">
      <AdminItemsPage />
    </div>
  );
}

export default page;
