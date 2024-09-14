import { createSlice } from "@reduxjs/toolkit";
import { ILinkEntity } from "../customer/landing/interfaces/link-interface";

const initialState: {
  store: ILinkEntity | null;
} = {
  store: null,
};

const GlobalAdminRedux = createSlice({
  name: "GlobalAdminRedux",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
  },
});

export const { setStore } = GlobalAdminRedux.actions;

export default GlobalAdminRedux.reducer;
