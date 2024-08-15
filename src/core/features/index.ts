import { combineReducers } from "@reduxjs/toolkit";
import LandingPage from "./landing/redux/redux";
import { mainApi } from "../rtk-query";

const reducers = combineReducers({
  landingPage: LandingPage,
  [mainApi.reducerPath]: mainApi.reducer,
});

export default reducers;
