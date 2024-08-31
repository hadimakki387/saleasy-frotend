import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function HeaderSearchBar() {
  const [category, setCategory] = React.useState("all");

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        borderRadius: 0,
        "& .MuiSelect-select": {
          paddingLeft: 10,
        },
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
      }}
    >
      <TextField
        id="search-field"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            paddingRight: 0,
          },
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        placeholder="Searching for..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
              <Divider orientation="vertical" flexItem />
            </InputAdornment>
          ),
        }}
      />

      <Select
        value={category}
        onChange={handleCategoryChange}
        displayEmpty
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="fashion">Fashion</MenuItem>
        <MenuItem value="grocery">Grocery</MenuItem>
      </Select>
    </FormControl>
  );
}

export default HeaderSearchBar;
