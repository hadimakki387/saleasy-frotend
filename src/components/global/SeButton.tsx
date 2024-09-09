"use client";
import { Button, ButtonProps, IconButton } from "@mui/material";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface CIButtonProps extends ButtonProps {
  label?: any;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error";
  padding?: string;
  rounded?: boolean;
  radius?: string;
  iconBefore?: ReactNode;
  disabled?: boolean;
  fullRounded?: boolean;
  iconButton?: boolean;
  icon?: ReactNode;
  noBorder?: boolean;
}

const sxOptions = (
  color: "primary" | "secondary" | "error",
  disabled: boolean,
  noBorder: boolean = false
) => ({
  text: {
    color: `var(--${!disabled ? color : "deactivated-text"}) !important`,
    backgroundColor: "transparent !important",
    border: "none !important",
  },
  outlined: {
    color: `var(--${!disabled ? color : "deactivated-text"}) !important`,
    backgroundColor: "white !important",
    border: `2px solid  var(--${
      noBorder
        ? "transparent !important"
        : !disabled
        ? color
        : disabled && "deactivated-text"
    }) !important`,
  },
  contained: {
    color: "white !important",
    backgroundColor: `var(--${
      noBorder
        ? "transparent !important"
        : !disabled
        ? color
        : disabled && "deactivated-text"
    }) !important`,
    border: `2px solid  var(--${
      noBorder
        ? "transparent !important"
        : !disabled
        ? color
        : disabled && "deactivated-text"
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
  iconButton = false,
  noBorder = false,
  icon,
  ...rest
}: CIButtonProps) {
  return (
    <>
      {!iconButton && label ? (
        <Button
          onClick={onClick}
          variant={"text"}
          fullWidth={fullWidth}
          className={twMerge(rest.className)}
          sx={{
            "&:hover": {
              backgroundColor:
                variant === "outlined"
                  ? sxOptions(color || "primary", disabled, noBorder).outlined
                      .color
                  : variant === "contained"
                  ? "white !important"
                  : "var(--primary) !important",
              color:
                variant === "contained" && color === "primary"
                  ? "var(--primary) !important"
                  : variant === "contained" && color === "error"
                  ? "var(--error) !important"
                  : variant === "outlined" &&
                    (color === "error" || color === "primary")
                  ? "white !important"
                  : "var(--primary) !important",
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
            ...sxOptions(color || "primary", disabled, noBorder)[
              variant || "text"
            ],
            ...sx,
          }}
          startIcon={rest.startIcon}
          endIcon={rest.endIcon}
          {...rest}
        >
          <div>{label}</div>
        </Button>
      ) : (
        <IconButton
          onClick={onClick}
          sx={{
            color: `var(--${color || "primary"}) !important`,
            backgroundColor: "transparent !important",
            border: "none !important",
            padding: padding || "var(--button-padding) !important",
            borderRadius: fullRounded
              ? "10000000px !important"
              : radius ??
                (!rounded
                  ? "var(--button-border-radius) !important"
                  : "10px !important"),
            ...sx,
          }}
          {...rest}
        >
          {icon}
        </IconButton>
      )}
    </>
  );
}

export default SeButton;
