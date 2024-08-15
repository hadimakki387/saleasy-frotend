import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  test: string;
} = {
  test: "test",
};

const LandingPage = createSlice({
  name: "LandingPage",
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.test = action.payload;
    },
  },
});

export const { setTest } = LandingPage.actions;

export default LandingPage.reducer;
