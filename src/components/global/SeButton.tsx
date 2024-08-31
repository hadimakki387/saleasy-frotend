"use client";
import { Button, ButtonProps } from "@mui/material";
import React, { ReactNode } from "react";

export interface CIButtonProps extends ButtonProps {
  label: any;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error";
  padding?: string;
  rounded?: boolean;
  radius?: string;
  iconBefore?: ReactNode;
  disabled?: boolean;
  fullRounded?: boolean;
}

const sxOptions = (
  color: "primary" | "secondary" | "error",
  disabled: boolean
) => ({
  text: {
    color: `var(--${!disabled ? color : "deactivated-text"}) !important`,
    backgroundColor: "transparent !important",
    border: "none !important",
  },
  outlined: {
    color: `var(--${!disabled ? color : "deactivated-text"}) !important`,
    backgroundColor: "transparent !important",
    border: `2px solid  var(--${
      !disabled ? color : "deactivated-text"
    }) !important`,
  },
  contained: {
    color: "white !important",
    backgroundColor: `var(--${
      !disabled ? color : "deactivated-text"
    }) !important`,
    border: `2px solid  var(--${
      !disabled ? color : "deactivated-text"
    }) !important`,
  },
});

function SeButton({
  label,
  variant,
  color,
  onClick,
  padding,
  rounded,
  radius,
  sx,
  iconBefore,
  disabled = false,
  fullWidth = false,
  fullRounded = false,
  ...rest
}: CIButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={"text"}
      fullWidth={fullWidth}
      sx={{
        "&:hover": {
          backgroundColor:
            variant === "outlined"
              ? sxOptions(color || "primary", disabled).outlined.color
              : variant === "contained"
              ? "white !important"
              : "var(--primary) !important",
          color:
            variant === "contained" && color === "primary"
              ? "var(--primary) !important"
              : variant === "contained" && color === "error"
              ? "var(--error) !important"
              : "white !important",
        },
        fontWeight: "bold",
        minWidth: "100px",
        borderRadius: fullRounded
          ? "10000000px !important"
          : radius ??
            (!rounded
              ? "var(--button-border-radius) !important"
              : "10px !important"),
        padding: padding || "var(--button-padding) !important",
        whiteSpace: "nowrap",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        textTransform: "none",
        ...sxOptions(color || "primary", disabled)[variant || "text"],
        ...sx,
      }}
      startIcon={rest.startIcon}
      endIcon={rest.endIcon}
      {...rest}
    >
      <div>{label}</div>
    </Button>
  );
}

export default SeButton;
