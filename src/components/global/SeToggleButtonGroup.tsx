import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

type Props = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

function SeToggleButtonGroup({
  options,
  setSelectedOption,
  selectedOption,
}: Props) {
  return (
    <ToggleButtonGroup
      color="error"
      value={selectedOption} // This is hardcoded, it should be dynamic and
      exclusive
      onChange={(event, newValue) => {
        setSelectedOption(newValue);
      }}
      aria-label="text alignment"
      className="space-x-2"
      sx={{
        ".Mui-selected": {
          border: "1px solid var(--error) !important",
          color: "var(--error)",
          backgroundColor: "initial",
        },
        ".MuiToggleButton-root": {
          borderRadius: "5px",
        },
      }}
    >
      {options?.map((option) => (
        <ToggleButton
          sx={{
            padding: "2px 15px",
            fontWeight: "bold",
          }}
          key={option}
          value={option}
        >
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default SeToggleButtonGroup;
