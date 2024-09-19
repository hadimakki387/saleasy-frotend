import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  page: number;
  limit: number;
} = {
  page: 1,
  limit: 10,
};

const AdminCustomersSlice = createSlice({
  name: "AdminCustomersSlice",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setPage, setLimit } = AdminCustomersSlice.actions;

export default AdminCustomersSlice.reducer;
