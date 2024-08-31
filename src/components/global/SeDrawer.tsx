import { SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import React from "react";
import SeButton from "./SeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type Props = SwipeableDrawerProps & {
  open: boolean;
  title?: string;
  onClose: () => void;
  onOpen: () => void;
  hasHeader?: boolean;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  extraIcons?: React.ReactNode;
  footerButtons?: {
    label: string;
    onClick: () => void;
    variant?: "text" | "outlined" | "contained";
    color?: "primary" | "secondary" | "error";
    className?: string;
  }[];
  wrapperClassName?: string;
  childrenClassName?: string;
};

function SeDrawer({
  open,
  onClose,
  onOpen,
  title,
  hasHeader = true,
  children,
  footer,
  footerButtons = [],
  extraIcons,
  wrapperClassName = "",
  childrenClassName = "",
  ...props
}: Props) {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{
        "& .MuiDrawer-paper": {
          minWidth: {
            xs: "100%",
            sm: "400px",
          },
        },
      }}
      {...props}
    >
      <div className={`${wrapperClassName}`}>
        {hasHeader && (
          <div className="sticky top-0 left-0 right-0 w-full bg-white py-4 px-4 flex justify-between z-50">
            <p className="text-lg font-medium text-subtitleText">{title}</p>
            <div className="flex items-center justify-center w-min gap-4">
              {extraIcons}
              <FontAwesomeIcon
                icon={faX}
                className="cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>
        )}
        <div className={`py-3 px-4 ${childrenClassName}`}>{children}</div>
        {(footer != undefined || footerButtons.length > 0) && (
          <div className="sticky bottom-0 left-0 right-0 w-full bg-white py-4 px-4 z-50">
            {footerButtons.length > 0 ? (
              <div className="w-full flex justify-between gap-3">
                {footerButtons.map((button) => {
                  return (
                    <SeButton
                      key={button.label}
                      label={button.label}
                      className={button.className}
                      variant={button.variant}
                    />
                  );
                })}
              </div>
            ) : (
              footer
            )}
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );
}

export default SeDrawer;
