import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchResults: number;
  sortBy: string;
  order: string;
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  maxDiscount: number;
} = {
  searchResults: 0,
  sortBy: "createdAt",
  order: "asc",
  minPrice: 0,
  maxPrice: 100,
  minDiscount: 0,
  maxDiscount: 100,
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
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setMinDiscount: (state, action) => {
      state.minDiscount = action.payload;
    },
    setMaxDiscount: (state, action) => {
      state.maxDiscount = action.payload;
    },
  },
});

export const {
  setSearchResults,
  setSortBy,
  setOrder,
  setMaxPrice,
  setMinPrice,
  setMinDiscount,
  setMaxDiscount,
} = SearchPageSlice.actions;

export default SearchPageSlice.reducer;
