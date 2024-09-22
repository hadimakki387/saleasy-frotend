import Autocomplete from "@mui/joy/Autocomplete";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { SxProps } from "@mui/material";
import * as React from "react";

interface Props {
  data: Array<any> | undefined;
  placeholder: string;
  label?: string;
  // eslint-disable-next-line no-unused-vars
  setSearch?: (value: string) => any;
  // eslint-disable-next-line no-unused-vars
  setSelectedItem?: (value: string) => any;
  style?: React.CSSProperties;
  className?: string;
  name?: string;
  formik?: any; // Add formik prop
  defaultValue?: string;
  disabled?: boolean;
  loading?: boolean;
  value?: string;
  sx?: SxProps;
  formControlSx?: SxProps;
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (e: any) => any;
}

export default function AutoCompleteSearch({
  data = [],
  placeholder,
  label,
  setSearch,
  setSelectedItem,
  style,
  className,
  name,
  defaultValue,
  formik, // Assign formik prop
  disabled,
  value,
  sx,
  loading = false,
  formControlSx,
  handleSubmit,
}: Props) {
  const [menuItems, setMenuItems] = React.useState(data);

  React.useEffect(() => {
    if (data !== menuItems) {
      setMenuItems(data);
    }
  }, [data]);

  return (
    <FormControl
      sx={{
        "&:focus": {
          outline: "none",
        },
      }}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (handleSubmit) handleSubmit(e);
          }
        }}
        disableClearable={true}
        onChange={(event, value) => {
          const selectedItem = menuItems.find((item) => item.title === value);
          if (selectedItem && setSelectedItem) {
            setSelectedItem(selectedItem.id);
            formik?.setFieldValue(name, selectedItem.id);
          }
        }}
        loading={loading}
        loadingText="Loading..."
        options={menuItems?.map((option) => option.title)}
        onInputChange={(event, value) => {
          if (setSearch) setSearch(value);
          if (formik) formik.setFieldValue(name, value);
        }}
        value={value || ""}
        style={style}
        className={`${className}`}
        disabled={disabled}
        sx={{
          "&.Mui-disabled": {
            backgroundColor: "var(--silver-bg)",
          },
          "&:focus": {
            outline: "none",
          },
          "&::before": {
            boxShadow: "none",
          },
          width: "100%",
          ...sx,
        }}
      />
      {name && formik?.errors[name] && (
        <div className="text-sm text-error">{formik?.errors[name]}</div>
      )}
    </FormControl>
  );
}
