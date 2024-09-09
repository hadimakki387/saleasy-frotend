"use client";
import {
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FormikProps } from "formik";
import React, { ReactNode } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { DropdownValue } from "@/services/types";

export type CITextfieldProps = TextFieldProps & {
  center?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  formik?: FormikProps<any>;
  hasShadow?: boolean;
  noValue?: boolean;
  options?: DropdownValue[];
  noBorders?: boolean;
  multiple?: boolean;
  className?: string;
  whiteInput?: boolean;
  selectedItem?: string;
  order?: any;
  setOrder?: (e: string) => any;
  noOrder?: boolean;
};

export default function SeFilterDropDown({
  type,
  autoComplete,
  rows,
  maxRows,
  fullWidth = true,
  multiline,
  sx,
  label,
  placeholder,
  value,
  onBlur,
  name,
  error,
  helperText,
  center,
  leadingIcon,
  trailingIcon,
  onChange,
  hasShadow = false,
  formik,
  noValue = false,
  options = [],
  multiple = false,
  select = true,
  noBorders = false,
  className,
  whiteInput = false,
  selectedItem,
  order,
  setOrder,
  noOrder = false,
  ...rest
}: CITextfieldProps) {
  const textField = (
    <TextField
      type={type}
      value={noValue ? undefined : formik && name ? formik.values[name] : value}
      onBlur={formik && name ? formik.handleBlur : onBlur}
      onChange={formik && name ? formik.handleChange : onChange}
      name={name}
      error={
        formik && name
          ? Boolean(formik.touched[name] && formik.errors[name])
          : error
      }
      helperText={
        formik && name
          ? (formik.touched[name] && formik.errors[name]?.toString()) ||
            helperText
          : helperText
      }
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          boxShadow: hasShadow ? "var(--shadow)" : undefined,
          borderRadius: "var(--input-border-radius)",
          "& fieldset": {
            borderColor: noBorders
              ? "transparent !important"
              : (formik &&
                  name &&
                  formik.touched[name] &&
                  formik.errors[name]) ||
                error
              ? "var(--error) !important"
              : "var(--input-border) !important",
            borderRadius: "var(--input-border-radius)",
          },
          "&:hover fieldset": {
            borderColor: noBorders
              ? "transparent !important"
              : (formik &&
                  name &&
                  formik.touched[name] &&
                  formik.errors[name]) ||
                error
              ? "var(--error) !important"
              : "var(--input-border) !important",
            borderRadius: "var(--input-border-radius)",
          },
          "&.Mui-focused fieldset": {
            borderColor: noBorders
              ? "transparent !important"
              : (formik &&
                  name &&
                  formik.touched[name] &&
                  formik.errors[name]) ||
                error
              ? "var(--error)"
              : "var(--primary) !important",
            borderRadius: "var(--input-border-radius)",
          },
        },
        "& .MuiOutlinedInput-input": {
          color: whiteInput ? "white" : "black",
        },
        "& .MuiInputLabel-root": {
          color: whiteInput ? "white" : "black",

          "&.Mui-focused": {
            color: whiteInput ? "white" : "black",
          },
        },

        "& .MuiInputAdornment-root": {
          color: whiteInput ? "white" : "var(--text-primary) !important",
        },

        ...(sx || {}),
      }}
      InputProps={{
        startAdornment: leadingIcon,
        endAdornment: trailingIcon,
        ...rest.InputProps,
      }}
      inputProps={{
        style: {
          textAlign: center ? "center" : "left",
          ...rest.inputProps?.style,
        },
        ...rest.inputProps,
      }}
      label={label}
      placeholder={placeholder}
      select={select}
      size="small"
      SelectProps={{
        MenuProps: {
          sx: {
            marginTop: "2px",
          },
        },
        multiple: multiple,
        fullWidth: true,
        ...(rest.SelectProps || {}),
      }}
      InputLabelProps={{
        sx: {
          color: "var(--hint) !important",
        },
        ...(rest.InputLabelProps || {}),
      }}
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
            checked={value === option.value}
            style={{
              height: "20px",
            }}
          />
        </MenuItem>
      ))}
      {!noOrder && (
        <>
          <div className="border-t border-[#E5E5E5]  mt-1"></div>
          <div
            className="px-[19px]  py-2 hover:cursor-pointer z-10"
            style={{
              backgroundColor:
                order === "asc" ? "var(--primary-transparent)" : "white",
            }}
            role="button"
          >
            <div
              className=" flex gap-4 items-center w-full"
              onClick={() => {
                if (setOrder) setOrder("asc");
              }}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className="text-sub-title-text"
              />
              Ascending
            </div>
          </div>
          <div
            className="px-[19px] flex gap-3 items-center hover:cursor-pointer py-2"
            style={{
              backgroundColor:
                order === "desc" ? "var(--primary-transparent)" : "white",
            }}
          >
            <div
              className=" flex gap-4 items-center w-full"
              onClick={() => {
                if (setOrder) setOrder("desc");
              }}
            >
              <FontAwesomeIcon
                icon={faArrowDown}
                className="text-sub-title-text"
              />
              Descending
            </div>
          </div>
        </>
      )}
    </TextField>
  );

  return className ? <div className={className}>{textField}</div> : textField;
}
