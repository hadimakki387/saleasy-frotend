import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  status: string;
} = {
  status: "",
};

const AdminOrderSlice = createSlice({
  name: "AdminOrderSlice",
  initialState,
  reducers: {
    setOrderStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setOrderStatus } = AdminOrderSlice.actions;

export default AdminOrderSlice.reducer;
