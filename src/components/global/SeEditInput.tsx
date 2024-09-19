"use client";
import React, { useState } from "react";
import SeTextField from "./SeTextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  defaultValue: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  type?: "text" | "number";
  extraCharachters?: string;
};

function SeEditInput({
  defaultValue,
  onChange,
  className,
  type = "text",
  extraCharachters,
}: Props) {
  const [edit, setEdit] = useState(false);

  return (
    <div>
      {edit ? (
        <div className={`flex items-center gap-1`}>
          <SeTextField
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
            onBlur={() => {
              setEdit(false);
            }}
            className="lg:max-w-[50%]"
          />
          {extraCharachters}
          <FontAwesomeIcon
            icon={faCheck}
            className="text-primary text-sm cursor-pointer"
            onClick={() => setEdit(false)}
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
              className="text-primary text-sm cursor-pointer"
            />
          </p>
        </div>
      )}
    </div>
  );
}

export default SeEditInput;
