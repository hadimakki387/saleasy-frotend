import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  selectedSubCat: string | null;
  selectedCategory: string | null;
  deleteCategoryId: string | null;
  createdCategoryDialog: boolean;
} = {
  selectedCategory: null,
  selectedSubCat: null,
  deleteCategoryId: null,
  createdCategoryDialog: false,
};

const AdminCategoriesSlice = createSlice({
  name: "AdminCategoriesSlice",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubCat: (state, action) => {
      state.selectedSubCat = action.payload;
    },
    setDeleteCategoryId: (state, action) => {
      state.deleteCategoryId = action.payload;
    },
    setCreatedCategoryDialog: (state, action) => {
      state.createdCategoryDialog = action.payload;
    },
  },
});

export const {
  setCreatedCategoryDialog,
  setSelectedCategory,
  setSelectedSubCat,
  setDeleteCategoryId,
} = AdminCategoriesSlice.actions;

export default AdminCategoriesSlice.reducer;
