"use client";
import React, { useState } from "react";
import SePopover from "../Popover/SE-Popover";

type MenuItem = {
  name: string;
  onClick: () => void;
};

export type ActionBarProps = {
  menuItems: MenuItem[];
  className?: string;
};

export default function SeActionBar({ menuItems, className }: ActionBarProps) {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  return (
    <div className="flex justify-center">
      <div
        className={`bg-primary gap-3 p-4 text-coloredText rounded-lg hidden sm:flex ${className}`}
      >
        {menuItems?.map((item, index) => (
          <div
            key={item.name}
            onClick={item.onClick}
            className="cursor-pointer select-none"
          >
            <div className="w-px bg-white rounded-md"></div>
            <p className="text-xs">
              {index != 0 ? "| " : ""} {item.name}
            </p>
          </div>
        ))}
      </div>
      <div className="sm:hidden">
        <SePopover className="md:hidden cursor-pointer" menuItems={menuItems}>
          <div
            className="p-2 bg-primary rounded-md shadow-md text-coloredText cursor-pointer"
            onClick={togglePopover}
          >
            Actions
          </div>
        </SePopover>
      </div>
    </div>
  );
}
