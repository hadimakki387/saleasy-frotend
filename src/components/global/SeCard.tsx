import { CircularProgress } from "@mui/material";
import React from "react";

interface SeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  noPadding?: boolean;
}
function SeCard({
  children,
  className,
  loading = false,
  noPadding = false,
  ...rest
}: SeCardProps) {
  return (
    <div
      className={`${
        noPadding ? "" : "p-4"
      } bg-white rounded-sm max-md:p-2  ${className}`}
      {...rest}
      onClick={(e) => {
        if (rest.onClick && !loading) {
          rest.onClick(e);
        }
      }}
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
