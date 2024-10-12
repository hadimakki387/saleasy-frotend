import { createSlice } from "@reduxjs/toolkit";
import { ILinkEntity } from "../customer/landing/interfaces/link-interface";
import { AuthenticationResponse } from "../customer/landing/interfaces/authentication-interface";

const initialState: {
  store: ILinkEntity | null;
  collapsed: boolean;
  AdminUser: AuthenticationResponse | null;
  toggle: boolean;
} = {
  store: null,
  collapsed: false,
  AdminUser: null,
  toggle: false,
};

const GlobalAdminRedux = createSlice({
  name: "GlobalAdminRedux",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setAdminUser: (state, action) => {
      state.AdminUser = action.payload;
    },
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
  },
});

export const { setStore, setCollapsed, setAdminUser, setToggle } =
  GlobalAdminRedux.actions;

export default GlobalAdminRedux.reducer;
