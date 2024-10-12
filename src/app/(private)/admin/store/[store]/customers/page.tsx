import CustomerPage from "@/core/features/admin/customers/components/CustomerPage";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <div className="grid grid-cols-1">
      <CustomerPage />
    </div>
  );
}

export default page;
