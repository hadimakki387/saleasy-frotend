"use client";
import React, { useState } from "react";
import SeTextField from "./SeTextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";
import { SxProps } from "@mui/material";

type Props = {
  defaultValue: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  type?: "text" | "number";
  extraCharachters?: string;
  handleSubmition?: () => void;
  iconsClassName?: string;
  sx?: SxProps;
  multiline?: boolean;
  fullWidth?: boolean;
};

function SeEditInput({
  defaultValue,
  onChange,
  className,
  type = "text",
  extraCharachters,
  handleSubmition,
  iconsClassName,
  sx,
  multiline,
  fullWidth,
}: Props) {
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {edit ? (
        <div className={`flex items-center gap-1`}>
          <SeTextField
            multiline={multiline}
            type={type}
            defaultValue={defaultValue}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEdit(false);
              }
            }}
            className={!fullWidth ? "lg:max-w-[50%] " : ""}
            sx={{
              width: "100%",
              ...(sx ? sx : {}),
            }}
          />
          {extraCharachters}
          <FontAwesomeIcon
            icon={faCheck}
            className={`${iconsClassName ? "" : "text-primary"} ${twMerge(
              iconsClassName
            )} text-sm cursor-pointer`}
            onClick={() => {
              console.log("handleSubmition");
              handleSubmition && handleSubmition();
              setEdit(false);
            }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <p
            className={twMerge(
              className,
              `${extraCharachters ? "flex items-center gap-1" : ""}`
            )}
          >
            {defaultValue || "Click to Add"} {extraCharachters}
          </p>
          <p onClick={() => setEdit(true)} className="flex items-center">
            <FontAwesomeIcon
              icon={faPen}
              className={`${iconsClassName ? "" : "text-primary"} ${twMerge(
                iconsClassName
              )}  text-sm cursor-pointer`}
            />
          </p>
        </div>
      )}
    </div>
  );
}

export default SeEditInput;
