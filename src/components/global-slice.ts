import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isSearchDrawerOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchDialogOpen: boolean;
} = {
  isSearchDrawerOpen: false,
  isCartDrawerOpen: false,
  isSearchDialogOpen: false,
};

const GlobalSlice = createSlice({
  name: "GlobalSlice",
  initialState,
  reducers: {
    setIsSearchDrawerOpen: (state, action) => {
      state.isSearchDrawerOpen = action.payload;
    },
    setIsCartDrawerOpen: (state, action) => {
      state.isCartDrawerOpen = action.payload;
    },
    setIsSearchDialogOpen: (state, action) => {
      state.isSearchDialogOpen = action.payload;
    },
  },
});

export const {
  setIsSearchDrawerOpen,
  setIsCartDrawerOpen,
  setIsSearchDialogOpen,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
