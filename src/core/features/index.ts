import { combineReducers } from "@reduxjs/toolkit";
import LandingPage from "./customer/landing/redux/redux";
import { mainApi } from "../rtk-query";
import globalSlice from "@/components/global-slice";
import SearchPageSlice from "./customer/search-page/redux/redux";
import ItemSlice from "./customer/item-page/redux/redux";
import CheckoutSlice from "./customer/checkout/redux/redux";
import GlobalAdminRedux from "./admin/global-admin-redux";

const reducers = combineReducers({
  landingPage: LandingPage,
  GlobalSlice: globalSlice,
  SearchPageSlice: SearchPageSlice,
  ItemSlice: ItemSlice,
  CheckoutSlice: CheckoutSlice,
  GlobalAdminRedux: GlobalAdminRedux,
  [mainApi.reducerPath]: mainApi.reducer,
});

export default reducers;
