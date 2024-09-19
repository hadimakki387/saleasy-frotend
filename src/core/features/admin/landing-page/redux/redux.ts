import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { createSlice } from "@reduxjs/toolkit";
import { CarouselProp } from "../components/hero-edit/dialogs/edit-carousel/HeroAdminEditCarousel";

const initialState: {
  selectedHeroCarousel: (CarouselProp & { carouselItemIndex: number }) | null;
  createNewCarousel: boolean;
} = {
  selectedHeroCarousel: null,
  createNewCarousel: false,
};

const AdminLandingPageEdit = createSlice({
  name: "AdminLandingPageEdit",
  initialState,
  reducers: {
    setSelectedHeroCarousel: (state, action) => {
      state.selectedHeroCarousel = action.payload;
    },
    setCreateNewCarousel: (state, action) => {
      state.createNewCarousel = action.payload;
    },
  },
});

export const { setSelectedHeroCarousel, setCreateNewCarousel } =
  AdminLandingPageEdit.actions;

export default AdminLandingPageEdit.reducer;
