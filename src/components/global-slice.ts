import { LoginInterface } from "@/core/features/landing/interfaces/authentication-interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isSearchDrawerOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchDialogOpen: boolean;
  isLandingPageLoading: boolean;
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;
  isAuthecationDialogOpen: boolean;
  user: LoginInterface | null;
} = {
  isSearchDrawerOpen: false,
  isCartDrawerOpen: false,
  isSearchDialogOpen: false,
  isLandingPageLoading: true,
  isLoginDialogOpen: false,
  isRegisterDialogOpen: false,
  isAuthecationDialogOpen: false,
  user: null,
};

const GlobalSlice = createSlice({
  name: "GlobalSlice",
  initialState,
  reducers: {
    setIsSearchDrawerOpen: (state, action) => {
      state.isSearchDrawerOpen = action.payload;
    },
    setIsCartDrawerOpen: (state, action) => {
      state.isCartDrawerOpen = action.payload;
    },
    setIsSearchDialogOpen: (state, action) => {
      state.isSearchDialogOpen = action.payload;
    },
    setIsLandingPageLoading: (state, action) => {
      state.isLandingPageLoading = action.payload;
    },
    setIsLoginDialogOpen: (state, action) => {
      state.isLoginDialogOpen = action.payload;
    },
    setIsRegisterDialogOpen: (state, action) => {
      state.isRegisterDialogOpen = action.payload;
    },
    setIsAuthecationDialogOpen: (state, action) => {
      state.isAuthecationDialogOpen = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  setIsSearchDrawerOpen,
  setIsCartDrawerOpen,
  setIsSearchDialogOpen,
  setIsLandingPageLoading,
  setIsLoginDialogOpen,
  setIsRegisterDialogOpen,
  setIsAuthecationDialogOpen,
  setUser,
} = GlobalSlice.actions;

export default GlobalSlice.reducer;
