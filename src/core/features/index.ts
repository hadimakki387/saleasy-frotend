import { combineReducers } from "@reduxjs/toolkit";
import LandingPage from "./customer/landing/redux/redux";
import { mainApi } from "../rtk-query";
import globalSlice from "@/components/global-slice";
import SearchPageSlice from "./customer/search-page/redux/redux";
import ItemSlice from "./customer/item-page/redux/redux";
import CheckoutSlice from "./customer/checkout/redux/redux";
import GlobalAdminRedux from "./admin/global-admin-redux";
import AdminItemsSlice from "./admin/items/redux/redux";
import AdminCategoriesSlice from "./admin/categories/redux/redux";
import AdminCustomersSlice from "./admin/customers/redux/redux";
import AdminLandingPageEdit from "./admin/landing-page/redux/redux";
import AdminOrdersSlice from "./admin/orders/redux/redux";

const reducers = combineReducers({
  landingPage: LandingPage,
  GlobalSlice: globalSlice,
  SearchPageSlice: SearchPageSlice,
  ItemSlice: ItemSlice,
  CheckoutSlice: CheckoutSlice,
  GlobalAdminRedux: GlobalAdminRedux,
  AdminItemsSlice: AdminItemsSlice,
  AdminCategoriesSlice: AdminCategoriesSlice,
  AdminCustomersSlice: AdminCustomersSlice,
  AdminLandingPageEdit: AdminLandingPageEdit,
  AdminOrdersSlice: AdminOrdersSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

export default reducers;
