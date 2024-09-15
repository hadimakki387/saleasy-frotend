import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  selectedItem: ItemInterface | null;
  createItemDialogOpen: boolean;
  page: number;
  limit: number;
} = {
  selectedItem: null,
  createItemDialogOpen: false,
  page: 1,
  limit: 10,
};

const AdminItemsSlice = createSlice({
  name: "AdminItemsSlice",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setCreateItemDialogOpen: (state, action) => {
      state.createItemDialogOpen = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setSelectedItem, setCreateItemDialogOpen, setPage, setLimit } =
  AdminItemsSlice.actions;

export default AdminItemsSlice.reducer;
