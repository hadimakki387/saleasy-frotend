import { combineReducers } from "@reduxjs/toolkit";
import LandingPage from "./landing/redux/redux";
import { mainApi } from "../rtk-query";
import globalSlice from "@/components/global-slice";

const reducers = combineReducers({
  landingPage: LandingPage,
  GlobalSlice: globalSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

export default reducers;
