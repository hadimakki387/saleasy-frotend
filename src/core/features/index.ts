import { combineReducers } from "@reduxjs/toolkit";
import LandingPage from "./landing/redux/redux";
import { mainApi } from "../rtk-query";
import globalSlice from "@/components/global-slice";
import SearchPageSlice from "./search-page/redux/redux";
import ItemSlice from "./item-page/redux/redux";

const reducers = combineReducers({
  landingPage: LandingPage,
  GlobalSlice: globalSlice,
  SearchPageSlice: SearchPageSlice,
  ItemSlice: ItemSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

export default reducers;
