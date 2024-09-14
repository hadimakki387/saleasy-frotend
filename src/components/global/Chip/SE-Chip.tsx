import { ChipType } from "../../../services/constants";
import React from "react";

type Props = {
  type: ChipType;
  label: string;
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
        return "bg-gray-200 text-gray-800";
      case ChipType.low:
        return "bg-gray-200 text-gray-800";
      case ChipType.success:
        return "bg-green-100 text-green-600";
      case ChipType.warning:
        return "bg-yellow-200 text-yellow-800";
      case ChipType.error:
        return "bg-chipBg text-chipText";
      case ChipType.critical:
        return "bg-chipBg text-chipText";
      case ChipType.info:
        return "bg-blue-100 text-blue-300";
      case ChipType.medium:
        return "bg-blue-100 text-blue-300";
      case ChipType.high:
        return "bg-yellow-100 text-yellow-400";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-block px-3 py-2 rounded-full text-xs font-normal tracking-wide ${color()} ${className} ${
        noBg && "!bg-transparent"
      }`}
    >
      {label}
    </span>
  );
}

export default SeChip;
