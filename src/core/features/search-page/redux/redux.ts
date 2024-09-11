import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchResults: number;
  sortBy: string;
  order: string;
} = {
  searchResults: 0,
  sortBy: "createdAt",
  order: "asc",
};

const SearchPageSlice = createSlice({
  name: "SearchPageSlice",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setSearchResults, setSortBy, setOrder } =
  SearchPageSlice.actions;

export default SearchPageSlice.reducer;
