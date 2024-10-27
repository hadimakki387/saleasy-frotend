import { ChipType } from "../../../services/constants";
import React from "react";

type Props = {
  type: ChipType;
  label: string | React.ReactNode;
  className?: string;
  noBg?: boolean;
};

function SeChip({
  type = ChipType.default,
  label,
  className,
  noBg = false,
}: Props) {
  const color = () => {
    switch (type) {
      case ChipType.default:
        return "bg-gray-200 text-gray-800 border border-gray-200";
      case ChipType.low:
        return "bg-gray-200 text-gray-800 border border-gray-200";
      case ChipType.success:
        return "bg-green-100 text-green-600 border border-green-200";
      case ChipType.warning:
        return "bg-yellow-50 text-yellow-600 border border-yellow-200";
      case ChipType.error:
        return "bg-red-100 text-error border border-error";
      case ChipType.critical:
        return "bg-chipBg text-chipText border border-chipBg";
      case ChipType.info:
        return "bg-blue-100 text-blue-400 border border-blue-200";
      case ChipType.medium:
        return "bg-blue-100 text-blue-300 border border-blue-200";
      case ChipType.high:
        return "bg-yellow-100 text-yellow-400 border border-yellow-200";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-normal tracking-wide  ${color()} ${className} ${
        noBg && "!bg-transparent"
      }`}
    >
      {label}
    </span>
  );
}

export default SeChip;
