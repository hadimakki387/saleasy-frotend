import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isSearchDrawerOpen: boolean;
} = {
  isSearchDrawerOpen: false,
};

const GlobalSlice = createSlice({
  name: "GlobalSlice",
  initialState,
  reducers: {
    setIsSearchDrawerOpen: (state, action) => {
      state.isSearchDrawerOpen = action.payload;
    },
  },
});

export const { setIsSearchDrawerOpen } = GlobalSlice.actions;

export default GlobalSlice.reducer;
