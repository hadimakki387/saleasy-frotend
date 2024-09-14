import { IconProps } from "../../../icons/types";
import { ReactNode } from "react";


export interface MenuItemType {
    name: string;
    icon?: (props?: IconProps) => ReactNode;
    suffix?: ReactNode;
    onClick: () => void;
    className?: string;
  }