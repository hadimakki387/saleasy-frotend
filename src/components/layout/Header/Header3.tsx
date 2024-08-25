"use client";
import { Container, useTheme } from "@mui/material";
import React, { MouseEvent, useState } from "react";

import SeTextField from "@/components/global/SeTextField";
import CategoryIcon from "@/components/SVGs/category-icon";

const Header3: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: "top" | "left" | "bottom" | "right", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Tab"
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  return (
    <div className="flex items-center justify-start mb-4">
      <SeTextField
        className="w-56"
        leadingIcon={<CategoryIcon fill="black" size={35} className="mr-4" />}
        select
        defaultValue={{
          label: "Categories",
          value: "all",
        }}
        options={[
          {
            label: "Categories",
            value: "all",
          },
          {
            label: "CAR",
            value: "car",
          },
          {
            label: "Clothes",
            value: "clothes",
          },
          {
            label: "Electronics",
            value: "electronics",
          },
        ]}
      />
    </div>
  );
};

export default Header3;
