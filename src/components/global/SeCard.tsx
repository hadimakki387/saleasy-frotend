import { CircularProgress } from "@mui/material";
import React from "react";

function SeCard({
  children,
  className,
  loading = false,
  noPadding = false,
}: {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  noPadding?: boolean;
}) {
  return (
    <div
      className={`${
        noPadding ? "" : "p-4"
      } bg-white rounded-sm max-md:p-2  ${className}`}
    >
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <CircularProgress />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default SeCard;
