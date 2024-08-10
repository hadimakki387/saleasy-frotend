import { combineReducers } from "@reduxjs/toolkit";
import LandingPage from "./landing/redux/redux";

const reducers = combineReducers({
  landingPage: LandingPage,
});

export default reducers;
