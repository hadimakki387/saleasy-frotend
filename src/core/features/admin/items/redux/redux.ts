import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  selectedItem: ItemInterface | null;
  createItemDialogOpen: boolean;
} = {
  selectedItem: null,
  createItemDialogOpen: false,
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
  },
});

export const { setSelectedItem, setCreateItemDialogOpen } =
  AdminItemsSlice.actions;

export default AdminItemsSlice.reducer;
