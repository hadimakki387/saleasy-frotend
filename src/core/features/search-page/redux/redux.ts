import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  searchResults: number;
} = {
  searchResults: 0,
};

const SearchPageSlice = createSlice({
  name: "SearchPageSlice",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchResults } = SearchPageSlice.actions;

export default SearchPageSlice.reducer;
