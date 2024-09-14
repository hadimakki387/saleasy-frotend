import { Popover, PopoverProps } from "@mui/material";
import React from "react";

import { MenuItemType } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children?: React.ReactNode;
  className?: string;
  popoverProps?: Omit<
    PopoverProps,
    "children" | "open" | "anchorEl" | "onClose"
  >;
  containerClass?: string;
  menuItems?: MenuItemType[];
  hasClose?: boolean;
  closeOnClick?: boolean;
  offset?: {
    top?: any;
    left?: any;
  };
};

function SePopover({
  children,
  className,
  popoverProps,
  containerClass,
  menuItems,
  hasClose = true,
  closeOnClick = true,
  offset,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "Popover-Menu" : undefined;
  return (
    <div className={containerClass}>
      <div aria-describedby={id} onClick={handleClick} className={className}>
        {children}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "8px",
              ml: offset?.left,
              mt: offset?.top,
            },
          },
          ...popoverProps?.slotProps,
        }}
        {...popoverProps}
      >
        <div className="flex flex-col py-1">
          {menuItems?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center flex-grow py-2 px-3 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  item.onClick && item.onClick();
                  closeOnClick && handleClose();
                }}
              >
                {item.icon && item.icon()}
                <div
                  className={`flex-grow text-sm ${
                    item.className ? item.className : "text-icons"
                  } ${item.icon ? "ml-2" : ""} ${item.suffix ? "mr-2" : ""}`}
                >
                  {item.name}
                </div>
                {item.suffix}
              </div>
            );
          })}
          {hasClose && (
            <>
              <div className="border-b border-gray-200 my-1" />
              <div
                className="flex flex-row items-center flex-grow py-2 px-3 cursor-pointer hover:bg-gray-100"
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faX} className="text-icons" />
                <div className="flex-grow ml-2">Close</div>
              </div>
            </>
          )}
        </div>
      </Popover>
    </div>
  );
}

export default SePopover;
