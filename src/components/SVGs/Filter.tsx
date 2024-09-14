import { IconProps } from "@/services/types";
import React from "react";

export const ColumnsIcon: React.FC<IconProps> = ({
  size = 18,
  fill = "var(--primary)",
  ...rest
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M11.0025 3.75V14.25H6.9975V3.75H11.0025ZM11.7525 14.25H15.75V3.75H11.7525V14.25ZM6.2475 14.25V3.75H2.25V14.25H6.2475Z"
        fill={fill}
      />
    </svg>
  );
};
